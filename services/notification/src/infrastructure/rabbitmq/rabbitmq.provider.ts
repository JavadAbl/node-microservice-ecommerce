import amqp, { Channel, Connection } from "amqplib";

export class RabbitMQClient {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  async connect() {
    try {
      // Create TCP connection
      this.connection = await amqp.connect("amqp://localhost");

      // Handle connection errors
      this.connection.on("error", (err) => {
        console.error("RabbitMQ connection error:", err);
        this.reconnect();
      });

      // Handle connection close
      this.connection.on("close", () => {
        console.log("RabbitMQ connection closed");
        this.reconnect();
      });

      // Create channel
      this.channel = await this.connection.createChannel();

      // Handle channel errors
      this.channel.on("error", (err) => {
        console.error("RabbitMQ channel error:", err);
      });

      console.log("Connected to RabbitMQ successfully");

      return { connection: this.connection, channel: this.channel };
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
      await this.reconnect();
      throw error;
    }
  }

  async publish(exchange: string, routingKey: string, content: Buffer) {
    if (!this.channel) {
      throw new Error("Channel not available");
    }
    return this.channel.publish(exchange, routingKey, content);
  }

  async consume(queue: string, onMessage: (msg: any) => void) {
    if (!this.channel) {
      throw new Error("Channel not available");
    }
    return this.channel.consume(queue, onMessage);
  }

  async reconnect() {
    // Close existing channel if open
    if (this.channel) {
      await this.channel.close().catch(() => {});
    }

    // Reconnect after delay
    setTimeout(() => {
      console.log("Attempting to reconnect...");
      this.connect();
    }, 5000);
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}

// Usage example
const rabbitMQ = new RabbitMQClient();

// One connection, multiple channels for different purposes
async function setup() {
  await rabbitMQ.connect();

  // You could create separate channels for different concerns
  const { channel } = rabbitMQ;

  // Producer channel setup
  await channel.assertExchange("orders", "direct", { durable: true });

  // Consumer channel setup
  await channel.assertQueue("order.process", { durable: true });
  await channel.bindQueue("order.process", "orders", "order.created");

  // Consume messages
  channel.consume("order.process", (msg) => {
    if (msg) {
      console.log("Processing order:", msg.content.toString());
      channel.ack(msg);
    }
  });
}
