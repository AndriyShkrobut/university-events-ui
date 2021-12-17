import React from "react";

import Page from "./page";
import AppLayout from "./app-layout";
import { Routes, Route } from "react-router-dom";
import Home from "pages/home";
import Register from "pages/register";
import Login from "pages/login";
import CreateEvent from "pages/create-event";
import EditEvent from "pages/edit-event";
import NotFound from "./not-found";
import EventDetails from "../pages/event-details";

const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route
          path={"/"}
          element={
            <Page>
              <Home />
            </Page>
          }
        >
          <Route path={"/events/create"} element={<CreateEvent />} />
          <Route path={"/events/:id/edit"} element={<EditEvent />} />
        </Route>
        <Route
          path={"/events/:id"}
          element={
            <Page>
              <EventDetails />
            </Page>
          }
        />
        <Route
          path={"/register"}
          element={
            <Page header={false} footer={false}>
              <Register />
            </Page>
          }
        />
        <Route
          path={"/login"}
          element={
            <Page header={false} footer={false}>
              <Login />
            </Page>
          }
        />
        <Route
          path={"*"}
          element={
            <Page>
              <NotFound />
            </Page>
          }
        />
      </Routes>
    </AppLayout>
  );
};

export default App;
