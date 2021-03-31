/* eslint-disable jest/no-identical-title */
import React from "react";
import { Progress } from "./Progress";
import userEvent from "@testing-library/user-event";
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { App } from "./App";
import { api } from "./api";

jest.mock("./api");

describe("<App />", () => {
  beforeEach(() => {
    api.totalMinutes.update.mockImplementation((newValue) => {
      console.log("mocked!");
      return Promise.resolve({ status: 200, value: newValue });
    });
    api.completedMinutes.update.mockImplementation((newValue) => {
      console.log("mocked!");
      return Promise.resolve({ status: 200, value: newValue });
    });
  });

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

    test("should read 100% Complete when task time is at max", async () => {
      let { getByRole, getByText, getByLabelText } = render(<App />);
      let slider = getByRole("slider");
      let input = getByRole("textbox");

      userEvent.type(input, "2");
      await waitForLoadingElementToBeRemoved();

      fireEvent.click(slider);
      await waitForLoadingElementToBeRemoved();

      // nudge twice

      fireEvent.keyDown(slider, { key: "ArrowRight" });
      await waitForLoadingElementToBeRemoved();

      fireEvent.keyDown(slider, { key: "ArrowRight" });
      await waitForLoadingElementToBeRemoved();

      fireEvent.click(getByLabelText("Subtract"));
      await waitForLoadingElementToBeRemoved();

      expect(getByText("100% complete")).toBeInTheDocument();
    });

    // test("should read 0% Complete when task time is at min", () => {
    //   let { getByRole, getByText, getByLabelText, container } = render(<App />);
    //   let input = getByRole("textbox");
    //   userEvent.type(input, "2");

    //   expect(getByText("0% complete")).toBeInTheDocument();
    // });
  });
});

async function waitForLoadingElementToBeRemoved() {
  let blocker = document.querySelector(".loading-blocker");
  if (!blocker) {
    return true;
  }
  return await waitForElementToBeRemoved(blocker);
}
