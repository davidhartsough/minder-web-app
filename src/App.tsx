import Intro from "./Intro";
import Auth from "./Auth";
import Fetcher from "./Fetcher";
import Sub from "./Sub";
import Reminders from "./Reminders";

export default function App() {
  return (
    <Intro>
      <Auth>
        <Fetcher>
          <Sub>
            <Reminders />
          </Sub>
        </Fetcher>
      </Auth>
    </Intro>
  );
}
