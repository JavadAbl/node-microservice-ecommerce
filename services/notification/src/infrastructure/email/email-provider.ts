// src/mailer.ts
import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";
import { readFile } from "fs/promises";
import Handlebars from "handlebars";
import { config } from "../app-config.js";

// Interface to define the shape of our mailer service
interface IMailerService {
  send(options: SendMailOptions): Promise<SentMessageInfo>;
  sendTemplate(
    templatePath: string,
    context: Record<string, unknown>,
    baseOptions: Omit<SendMailOptions, "html" | "text">,
  ): Promise<SentMessageInfo>;
}

// Factory function to create the mailer logic
const createMailerService = (): IMailerService => {
  // Initialize transporter once (equivalent to the class constructor)
  const host = config.MAIL_HOST;
  const port = config.MAIL_PORT;
  const user = config.MAIL_USER;
  const pass = config.MAIL_PASSWORD;

  const transporter: Transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: false,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  /** Send a plain email (text, html, attachments, etc.). */
  const send = async (options: SendMailOptions): Promise<SentMessageInfo> => {
    if (!options.to || !options.subject) {
      throw new Error("`to` and `subject` are required fields");
    }

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await transporter.sendMail(options);
      } catch (err) {
        if (attempt === maxAttempts) throw err;
        // Exponential backoff: 200ms → 400ms → 800ms
        const delay = 2 ** attempt * 100;
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    // Unreachable – TypeScript needs a return
    throw new Error("Unexpected failure in send()");
  };

  /** Render a Handlebars template and send the result as HTML. */
  const sendTemplate = async (
    templatePath: string,
    context: Record<string, unknown>,
    baseOptions: Omit<SendMailOptions, "html" | "text">,
  ): Promise<SentMessageInfo> => {
    const source = await readFile(templatePath, "utf8");
    const compiled = Handlebars.compile(source)(context);
    return send({ ...baseOptions, html: compiled });
  };

  return { send, sendTemplate };
};

// Export a singleton instance to mimic the @injectable() behavior where one instance is shared across the app
export const mailer = createMailerService();

/*
/////////////////////Example Usage
// src/app.ts
import path from "path";
import { fileURLToPath } from "url";
import { mailer } from "./mailer.js"; // Import the instance

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  // 1️⃣ Simple text email
  await mailer.send({
    from: '"Acme Corp" <no-reply@acme.com>',
    to: "work.javadabl@gmail.com",
    subject: "Welcome!",
    text: "Your account has been created.",
  });

  // 2️⃣ HTML email with attachment
  await mailer.send({
    from: '"Acme Corp" <no-reply@acme.com>',
    to: "work.javadabl@gmail.com",
    subject: "Invoice #1234",
    html: "<p>Please find your invoice attached.</p>",
    attachments: [{ filename: "invoice-1234.pdf", path: "/tmp/invoice-1234.pdf" }],
  });
 
  // 3️⃣ Templated email
  const tmpl = path.resolve(__dirname, "templates", "reset-password.hbs");
  await mailer.sendTemplate(
    tmpl,
    { name: "Jane", link: "https://example.com/reset?token=abc" },
    {
      from: '"Acme Support" <support@acme.com>',
      to: "jane@example.com",
      subject: "Password Reset Request",
    },
  ); 
})();
*/
