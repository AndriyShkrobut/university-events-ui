import React from "react";
import { Typography } from "antd";

import AuthContext from "context/auth-context";
import { useProvideAuth } from "hooks/use-auth";
import AppRoute from "./app-route";
import AppLayout from "./app-layout";

const App: React.FC = () => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      <AppLayout>
        <AppRoute header={false} footer={false}>
          <Typography.Title>Hello World!</Typography.Title>
        </AppRoute>
      </AppLayout>
    </AuthContext.Provider>
  );
};

export default App;
