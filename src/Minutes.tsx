import React, { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import "./Minutes.scss";

interface MinutesProps {
  value: number;
  minValue?: number;
  onValueChange(minutes: number): void;
}

const MinutesContext = React.createContext<MinutesContextValue>(null!);

export const Minutes: React.FC<MinutesProps> = ({
  children,
  value,
  minValue = 0,
  onValueChange,
}) => {
  function subtract() {
    if (value > minValue) {
      onValueChange(value - 1);
    }
  }

  function add() {
    onValueChange(value + 1);
  }

  function isValidValue(value: any): value is number {
    try {
      return typeof value === "number" && !isNaN(value);
    } catch (e) {
      return false;
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = parseInt(event.target.value, 10);
    if (isValidValue(value)) {
      onValueChange(value);
    }
  }

  function handleInputBlur(event: any) {
    if (event.target.value.trim() === "") {
      onValueChange(0);
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent) {
    let potentialValue = parseInt(event.key, 10);
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        add();
        return;
      case "ArrowDown":
        event.preventDefault();
        subtract();
        return;
      case "Escape":
      case "Enter":
      case "Home":
      case "End":
      case "PageUp":
      case "PageDown":
        return;
      case "Backspace":
        if (event.metaKey || String(value).length === 1) {
          onValueChange(0);
        }
        return;
      default:
        if (event.key.length === 1 && !isValidValue(potentialValue)) {
          // prevents cursor from moving
          event.preventDefault();
        }
    }
  }

  let ctx: MinutesContextValue = {
    value,
    onValueChange,
    add,
    subtract,
  };

  return (
    <div className="minutes">
      <MinutesContext.Provider value={ctx}>{children}</MinutesContext.Provider>
    </div>
  );
};

export const MinutesAdd: React.FC<SharedButtonProps> = (props) => {
  let { add } = React.useContext(MinutesContext);
  return (
    <MinutesButton onClick={add} aria-label="Add" {...props}>
      <FaPlusCircle />
    </MinutesButton>
  );
};

export const MinutesSubtract: React.FC<SharedButtonProps> = (props) => {
  let { subtract } = React.useContext(MinutesContext);
  return (
    <MinutesButton onClick={subtract} aria-label="Subtract" {...props}>
      <FaMinusCircle />
    </MinutesButton>
  );
};

const MinutesButton: React.FC<ButtonProps> = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  onClick,
  children,
  disabled,
}) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export const MinutesInput: React.FC<InputProps> = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  disabled,
}) => {
  let { onValueChange, add, subtract, value } = React.useContext(
    MinutesContext
  );

  function isValidValue(value: any): value is number {
    try {
      return typeof value === "number" && !isNaN(value);
    } catch (e) {
      return false;
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = parseInt(event.target.value, 10);
    if (isValidValue(value)) {
      onValueChange(value);
    }
  }

  function handleBlur(event: any) {
    if (event.target.value.trim() === "") {
      onValueChange(0);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    let potentialValue = parseInt(event.key, 10);
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        add();
        return;
      case "ArrowDown":
        event.preventDefault();
        subtract();
        return;
      case "Escape":
      case "Enter":
      case "Home":
      case "End":
      case "PageUp":
      case "PageDown":
        return;
      case "Backspace":
        if (event.metaKey || String(value).length === 1) {
          onValueChange(0);
        }
        return;
      default:
        if (event.key.length === 1 && !isValidValue(potentialValue)) {
          // prevents cursor from moving
          event.preventDefault();
        }
    }
  }

  return (
    <input
      className="form-field"
      type="text"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    />
  );
};

interface AriaLabelProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

interface ButtonProps extends AriaLabelProps, SharedButtonProps {
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

interface SharedButtonProps extends AriaLabelProps {
  disabled?: boolean;
}

interface InputProps extends AriaLabelProps {
  disabled?: boolean;
}

interface MinutesContextValue {
  onValueChange(minutes: number): void;
  value: number;
  add(): void;
  subtract(): void;
}
