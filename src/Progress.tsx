import React from "react";
import { Slider } from "@reach/slider";
import "./Progress.scss";

type Props = {
  currentValue: number;
  maxValue: number;
  onValueChange(value: number): void;
  // Some lessons use this
  status?: undefined | "none" | "progress" | "complete";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
};

export const Progress: React.FC<Props> = ({
  currentValue,
  maxValue,
  onValueChange,
  status,
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
}) => {
  return (
    <div className="progress" data-status={status}>
      <Slider
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        min={0}
        max={maxValue}
        step={1}
        value={currentValue}
        onChange={onValueChange}
      />
    </div>
  );
};
