import Auth from "./Auth";
import Fetcher from "./Fetcher";
import Reminders from "./Reminders";
import Sub from "./Sub";

export default function App() {
  return (
    <Auth>
      <Fetcher>
        <Sub>
          <Reminders />
        </Sub>
      </Fetcher>
    </Auth>
  );
}
