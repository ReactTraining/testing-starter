import React from "react";
import {
  Minutes as MinutesRoot,
  MinutesAdd,
  MinutesSubtract,
  MinutesInput,
} from "./Minutes";
import * as ReactTestingLibrary from "@testing-library/react";
import ReactTestUtils from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("<Minutes />", () => {
  describe("rendering", () => {
    it("that input contains accurate value based on value prop", () => {
      let { getByRole } = ReactTestingLibrary.render(<Minutes value={5} />);
      let input = getByRole("textbox");
      expect(input.value).toBe(String(5));
    });

    it("should increment when the add button is clicked", () => {
      let { getByRole, getByLabelText } = ReactTestingLibrary.render(
        <MinutesWithState />
      );
      let input = getByRole("textbox");
      let addButton = getByLabelText("Add");
      userEvent.click(addButton);
      expect(input.value).toBe(String(6));
    });

    it("should decrement when the subtract button is clicked", () => {
      let { getByRole, getByLabelText } = ReactTestingLibrary.render(
        <MinutesWithState />
      );
      let input = getByRole("textbox");
      let subtractButton = getByLabelText("Subtract");
      userEvent.click(subtractButton);
      expect(input.value).toBe(String(4));
    });

    describe("if the value is at 0", () => {
      it("should not decrement when the subtract button is clicked", () => {
        let { getByRole, getByLabelText } = ReactTestingLibrary.render(
          <MinutesWithState defaultValue={0} />
        );
        let input = getByRole("textbox");
        let subtractButton = getByLabelText("Subtract");
        userEvent.click(subtractButton);
        expect(input.value).toBe(String(0));
      });
    });

    it("should update when the user types a valid value", () => {
      let { getByRole } = ReactTestingLibrary.render(
        <MinutesWithState defaultValue={5} />
      );
      let input = getByRole("textbox");

      userEvent.type(input, "{backspace}");
      userEvent.type(input, "10");

      expect(input.value).toBe(String(10));
    });
  });
});

function Minutes({ "aria-labelledby": ariaLabelledBy, ...props }) {
  return (
    <MinutesRoot {...props}>
      <MinutesSubtract aria-label="Subtract" />
      <MinutesInput aria-labelledby={ariaLabelledBy} />
      <MinutesAdd aria-label="Add" />
    </MinutesRoot>
  );
}

function MinutesWithState({ defaultValue = 5 }) {
  let [minutes, setMinutes] = React.useState(defaultValue);
  return <Minutes value={minutes} onValueChange={setMinutes} />;
}
