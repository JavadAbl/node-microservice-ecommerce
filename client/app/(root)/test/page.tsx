import { action } from "./action";

export default function Page() {
  console.log(1);

  return (
    <form action={action}>
      <input name="id" type="text" />
      <button type="submit">ok</button>
    </form>
  );
}
