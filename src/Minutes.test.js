import React from "react";
import {
  Minutes as MinutesRoot,
  MinutesAdd,
  MinutesSubtract,
  MinutesInput,
} from "./Minutes";
import * as ReactTestingLibrary from "@testing-library/react";

describe("<Minutes />", () => {
  describe("rendering", () => {
    test("that input contains accurate value based on value prop", () => {
      let { getByRole } = ReactTestingLibrary.render(<Minutes value={5} />);
      let input = getByRole("textbox");
      expect(input.value).toBe(String(5));
    });
  });
});

function Minutes({ "aria-labelledby": ariaLabelledBy, ...props }) {
  return (
    <MinutesRoot {...props}>
      <MinutesSubtract aria-label="Subtract" />
      <MinutesInput />
      <MinutesInput aria-labelledby={ariaLabelledBy} />
      <MinutesAdd aria-label="Add" />
    </MinutesRoot>
  );
}
