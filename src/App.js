import React from "react";
import './App.css';

import { HashRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, PrivateRoute } from "./hooks/auth";

import { Layout } from "./containers/layout";
import { Login } from "./containers/login";
import { NewService } from "./containers/new-service";
import { Services } from "./containers/services";
import { Expired } from "./containers/expired";
import { NotFound } from "./containers/not-found";

function App() {

  return (
    <div className="App">
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <Services />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/servicio"
              element={
                <PrivateRoute>
                  <Layout>
                    <NewService />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/expired" element={<Expired />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export { App };
