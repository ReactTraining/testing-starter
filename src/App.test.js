/* eslint-disable jest/no-identical-title */
import React from "react";
import { Progress } from "./Progress";
import userEvent from "@testing-library/user-event";
import { fireEvent, render } from "@testing-library/react";
import { App } from "./App";

describe("<App />", () => {
  // should render the text input
  // should render the progress slider
  // completion % should not exceed 100%
  // should update progress slider when input value increases
  // should update progress slider when input value decreases
  // should now allow input value to change to less than slider value
  // should now allow slider value to change to greater than slider value
  test("truth", () => {
    expect(true).toBe(true);
  });
});

function getCurrentValue(el) {
  return Number(el.getAttribute("aria-valuenow"));
}
