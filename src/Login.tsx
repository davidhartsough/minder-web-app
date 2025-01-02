import { useState } from "react";
import { saveUID } from "./auth-utils";

export default function Login({ setUID }: { setUID: (uid: string) => void }) {
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const bday = formData.get("birthday") as string;
    setUID(saveUID(bday));
  };
  return (
    <section>
      <h3>Welcome!</h3>
      <p>
        To get started, just enter your birthday.
        <br />
        Your birthday is used to help you recover your info{" "}
        <strong>on this device</strong> if you ever happen to clear your browser
        data for this site.
        <br />
        It's like a PIN that you'll never forget.
        <br />
        (And this sure beats having to log in with an email/username and
        password!)
        <br />
        You may enter a date that isn't your actual birthday, but just make sure
        you remember it. (Any date is fine, since this is just a PIN for this
        device.)
      </p>
      <form onSubmit={onSubmit}>
        <fieldset disabled={loading}>
          <label htmlFor="birthday">Your Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            required
            autoComplete="bday"
            autoFocus
            defaultValue="1990-01-01"
            placeholder="YYYY-MM-DD"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting" : "Submit"}
          </button>
        </fieldset>
      </form>
    </section>
  );
}
