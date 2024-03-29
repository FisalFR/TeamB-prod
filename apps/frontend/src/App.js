import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ExampleRoute from "./routes/ExampleRoute.tsx";
function App() {
  var router = createBrowserRouter([
    {
      path: "/",
      errorElement: _jsx("div", {}),
      element: _jsx(Root, {}),
      children: [
        {
          path: "",
          element: _jsx(ExampleRoute, {}),
        },
      ],
    },
  ]);
  return _jsx(RouterProvider, { router: router });
  function Root() {
    return _jsxs("div", {
      className: "w-full flex flex-col px-20 gap-5",
      children: [
        _jsx("h1", { children: "Welcome to your starter code." }),
        _jsx(Outlet, {}),
      ],
    });
  }
}
export default App;
