/* eslint-disable jest/no-identical-title */
import React from "react";
import { Progress } from "./Progress";
import userEvent from "@testing-library/user-event";
import { fireEvent, render } from "@testing-library/react";
import { App } from "./App";

describe("<App />", () => {
  it("should render the text input", () => {
    let { getByRole } = render(<App />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("should render the progress slider", () => {
    let { getByRole } = render(<App />);
    expect(getByRole("slider")).toBeInTheDocument();
  });

  describe("when rendering the completion %", () => {
    test("should initially indicated no time allocated", () => {
      let { getByText } = render(<App />);
      expect(getByText("No time allocated yet")).toBeInTheDocument();
    });

    test("should read 100% Complete when task time is at max", () => {
      let { getByRole, getByText, getByLabelText } = render(<App />);
      let slider = getByRole("slider");
      let input = getByRole("textbox");

      userEvent.type(input, "2");
      fireEvent.click(slider);

      // nudge twice
      fireEvent.keyDown(slider, { key: "ArrowRight" });
      fireEvent.keyDown(slider, { key: "ArrowRight" });

      fireEvent.click(getByLabelText("Subtract"));

      expect(getByText("100% complete")).toBeInTheDocument();
    });

    test("should read 0% Complete when task time is at min", () => {
      let { getByRole, getByText, getByLabelText, container } = render(<App />);
      let input = getByRole("textbox");
      userEvent.type(input, "2");

      expect(getByText("0% complete")).toBeInTheDocument();
    });
  });
});
