# minder

Reminders

// windows
// 1: 9am to 2pm
// 2: 2pm to 8pm
// minimum time gap: 2 hours

```TypeScript
export interface UserData {
  id: string;
  items: string[];
  sequence: number[];
  index: number;
  timezone: string;
  pushTime: string;
  subEndpoint: string;
  subP256dh: string;
  subAuth: string;
}
```
