import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-wlh1bxowv4qegpvp.us.auth0.com"
    clientId="1DgfA2TGanfsKnDXM39aDaG9PkNRYeYv"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
