import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { ExampleComponent } from "../components/ExampleComponent.tsx";
export default function ExampleRoute() {
  return _jsxs("div", {
    className: "w-100",
    children: [
      _jsx("h1", { children: "This is an example page." }),
      _jsx(ExampleComponent, {}),
    ],
  });
}
