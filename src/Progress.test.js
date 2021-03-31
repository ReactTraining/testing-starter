/* eslint-disable jest/no-identical-title */
import React from "react";
import { Progress } from "./Progress";
import userEvent from "@testing-library/user-event";
import { fireEvent, render } from "@testing-library/react";

describe("<Progress /> component", () => {
  describe("rendering", () => {
    test("should render the correct value for the progress slider", () => {
      let { getByRole } = render(<Progress maxValue={6} currentValue={3} />);
      let slider = getByRole("slider");
      expect(getSliderValue(slider)).toEqual(3);
    });

    test("should update the value when moved with keyboard", () => {
      function ProgressWithState() {
        let [completedMinutes, setCompletedMinutes] = React.useState(3);
        return (
          <Progress
            onValueChange={setCompletedMinutes}
            maxValue={6}
            currentValue={completedMinutes}
          />
        );
      }
      let { getByRole } = render(<ProgressWithState />);
      let slider = getByRole("slider");

      fireEvent.click(slider);
      fireEvent.keyDown(slider, { key: "ArrowRight", code: 39 });
      expect(getSliderValue(slider)).toEqual(4);
    });
  });
});

function getSliderValue(el) {
  return Number(el.getAttribute("aria-valuenow"));
}
