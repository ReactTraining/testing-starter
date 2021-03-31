import React from "react";
import { Heading } from "./Heading";
import { Minutes, MinutesSubtract, MinutesAdd, MinutesInput } from "./Minutes";
import "./App.scss";
import { Progress } from "./Progress";

export const App: React.FC = () => {
  let [totalMinutes, setTotalMinutes] = React.useState(0);
  let [completedMinutes, setCompletedMinutes] = React.useState(0);

  return (
    <div className="App">
      <Heading>Task Progress</Heading>
      <span className="text label" id="total-minutes">
        Total Time Estimate (in minutes)
      </span>
      <Minutes
        value={totalMinutes}
        onValueChange={(newValue) => {
          if (completedMinutes <= newValue) {
            setTotalMinutes(newValue);
          }
        }}
      >
        <MinutesSubtract disabled={totalMinutes === completedMinutes} />
        <MinutesInput aria-labelledby="total-minutes" />
        <MinutesAdd />
      </Minutes>

      <br />
      <br />

      <span className="text label" id="completed-label">
        Time Completed (in minutes)
      </span>
      <Progress
        aria-labelledby="completed-label"
        aria-describedby="completed-percentage"
        maxValue={totalMinutes || 0}
        currentValue={completedMinutes || 0}
        onValueChange={(newValue) => {
          if (newValue <= totalMinutes) {
            setCompletedMinutes(newValue);
          }
        }}
        disabled={totalMinutes < 1}
        status={
          totalMinutes < 1
            ? "none"
            : completedMinutes < totalMinutes
            ? "progress"
            : "complete"
        }
      />
      <p className="text-small" id="completed-percentage">
        {totalMinutes === 0 && <i>No time allocated yet</i>}
        {totalMinutes > 0 && (
          <span className="task-completion-status">
            {((completedMinutes / totalMinutes) * 100).toFixed(0)}% complete
          </span>
        )}
      </p>
    </div>
  );
};
