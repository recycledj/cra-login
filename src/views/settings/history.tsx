import { createBrowserHistory } from "history";
export const browser = createBrowserHistory({
  basename: process.env.PUBLIC_URL || "/",
});
