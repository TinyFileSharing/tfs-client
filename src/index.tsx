import "./index.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Auth0Provider
    domain="dev-unodm5dngxg4hqwm.eu.auth0.com"
    clientId="UmUEFly5Zu4OvKr5axHsTYVG6hpBXPU6"
    authorizationParams={{
      audience: "https://tinyfilesharing.com/",
      redirect_uri: window.location.origin,
      scope: "openid profile email",
    }}
  >
    <App />
  </Auth0Provider>
);
