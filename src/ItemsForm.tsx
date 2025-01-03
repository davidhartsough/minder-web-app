import { useState } from "react";

export default function ItemsForm({
  onSave,
  items,
}: {
  onSave: (items: string[]) => Promise<void>;
  items: string[];
}) {
  const [saving, setSaving] = useState(false);
  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const newItems = (formData.get("reminders") as string)
      .trim()
      .split("\n")
      .map((i) => i.trim());
    onSave(newItems).then(() => setSaving(false));
  };
  return (
    <form onSubmit={save}>
      <fieldset disabled={saving}>
        <label htmlFor="reminders">
          Write each reminder on a separate line.
        </label>
        <textarea
          name="reminders"
          id="reminders"
          placeholder="List your reminders here, one per line."
          rows={16}
          minLength={5}
          defaultValue={items.join("\n")}
          required
          autoFocus
          disabled={saving}
        ></textarea>
        <button type="submit" disabled={saving}>
          {saving ? "Saving" : "Save"}
        </button>
      </fieldset>
    </form>
  );
}
