import { useState } from "react";
import { dbSetItems, lsGetItems } from "./db";
import ItemsForm from "./ItemsForm";

export default function Reminders() {
  const [editing, setEditing] = useState(false);
  const showForm = () => setEditing(true);
  const items = lsGetItems()!;
  const save = async (newItems: string[]) => {
    if (items.join("\n") !== newItems.join("\n")) {
      await dbSetItems(newItems);
    }
    setEditing(false);
  };
  return (
    <section>
      <h3>Reminders</h3>
      {editing ? (
        <ItemsForm onSave={save} items={items} />
      ) : (
        <>
          <ul>
            {items.map((item, i) => (
              <li key={`${item}-${i}`}>{item}</li>
            ))}
          </ul>
          <button onClick={showForm}>Edit</button>
        </>
      )}
    </section>
  );
}
