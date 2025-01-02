import { dbCreateUser } from "./db";
import ItemsForm from "./ItemsForm";

export default function Begin({ save }: { save: (items: string[]) => void }) {
  const submit = async (items: string[]) => {
    await dbCreateUser(items);
    save(items);
  };
  return (
    <div>
      <h2>Get Started</h2>
      <section>
        <h3>Reminders</h3>
        <ItemsForm onSave={submit} items={[]} />
      </section>
    </div>
  );
}
