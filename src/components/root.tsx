import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, EventProvider, EventCategoryProvider, UserProvider } from "providers";

import App from "./app";

const Root: React.FC = () => (
  <UserProvider>
    <AuthProvider>
      <EventCategoryProvider>
        <EventProvider>
          <Router>
            <App />
          </Router>
        </EventProvider>
      </EventCategoryProvider>
    </AuthProvider>
  </UserProvider>
);

export default Root;
