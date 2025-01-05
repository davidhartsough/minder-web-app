import { useState, ReactNode } from "react";

export default function Intro({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(localStorage.getItem("ready") === "true");
  if (ready) return children;
  const onClick = () => {
    localStorage.setItem("ready", "true");
    setReady(true);
  };
  return (
    <section id="intro">
      <h2>
        <strong>Twice Daily Reminders</strong>
        <br />
        <span>for what&apos;s worth remembering</span>
      </h2>
      <h3>How it works:</h3>
      <p>
        Simply make a list of things you want to be reminded of, and{" "}
        <strong>minder</strong> will send you{" "}
        <strong>two random reminders</strong> each day, randomly scheduled{" "}
        <strong>between 9am-8pm</strong>.
        <br />
        Once the list is complete, it starts fresh with a new random sequence.
      </p>
      <p>The unpredictable order and timing keeps your reminders engaging.</p>
      <p>
        <strong>For example</strong>, if someone makes a tiny list like this:
      </p>
      <ul>
        <li>Hydrate</li>
        <li>Stretch</li>
        <li>Smile</li>
        <li>Take a deep breath</li>
      </ul>
      <p>Their notifications might start to look like this:</p>
      <ul>
        <li>
          <strong>Day 1:</strong>
          <ul>
            <li>&quot;Take a deep breath&quot; (at 10am)</li>
            <li>&quot;Hydrate&quot; (at 3pm)</li>
          </ul>
        </li>
        <li>
          <strong>Day 2:</strong>
          <ul>
            <li>&quot;Smile&quot; (at 12pm)</li>
            <li>&quot;Stretch&quot; (at 7pm)</li>
          </ul>
        </li>
        <li>
          <strong>Day 3:</strong>
          <ul>
            <li>&quot;Hydrate&quot; (at 9am)</li>
            <li>&quot;Smile&quot; (at 2pm)</li>
          </ul>
        </li>
      </ul>
      <p>And so on — always shuffling, always refreshing.</p>
      <h3>What it&apos;s for:</h3>
      <p>
        Some people use this tool to build healthy habits, instill personal
        values, and practice skills.
      </p>
      <p>You decide what goes on your list.</p>
      <p>So what&apos;s worth remembering?</p>
      <p>What will you keep in mind? What will you keep fresh?</p>
      <p>
        <strong>Re:Mind. Re:Fresh.</strong>
      </p>
      <button onClick={onClick}>Let&apos;s Go</button>
    </section>
  );
}
