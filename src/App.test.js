/* eslint-disable jest/no-identical-title */
import React from "react";
import { Progress } from "./Progress";
import userEvent from "@testing-library/user-event";
import { fireEvent, render } from "@testing-library/react";
import { App } from "./App";

describe("<App />", () => {
  test("truth", () => {
    expect(true).toBe(true);
  });
});
