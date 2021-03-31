import React from "react";
import { Heading } from "./Heading";
import { Minutes, MinutesSubtract, MinutesAdd, MinutesInput } from "./Minutes";
import "./App.scss";
import { Progress } from "./Progress";
import { LoadingBlocker } from "./LoadingBlocker";
import { api } from "./api";

export const App: React.FC = () => {
  let [totalMinutes, setTotalMinutes] = React.useState(0);
  let [completedMinutes, setCompletedMinutes] = React.useState(0);
  let [appState, setAppState] = React.useState<"loading" | "idle">("idle");

  let mounted = React.useRef(true);
  React.useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  async function updateCompletedMinutes(newValue: number) {
    setAppState("loading");
    let { value } = await api.completedMinutes.update(newValue);
    if (mounted.current) {
      setAppState("idle");
      setCompletedMinutes(value);
    }
  }

  async function updateTotalMinutes(newValue: number) {
    setAppState("loading");
    let { value } = await api.totalMinutes.update(newValue);
    if (mounted.current) {
      setAppState("idle");
      setTotalMinutes(value);
    }
  }

  return (
    <div className="App">
      {appState === "loading" ? <LoadingBlocker /> : null}

      <Heading>Task Progress</Heading>
      <span className="text label" id="total-minutes">
        Total Time Estimate (in minutes)
      </span>
      <Minutes
        value={totalMinutes}
        onValueChange={(newValue) => {
          if (completedMinutes <= newValue) {
            updateTotalMinutes(newValue);
          }
        }}
      >
        <MinutesSubtract
          disabled={appState === "loading" || totalMinutes === completedMinutes}
        />
        <MinutesInput
          aria-labelledby="total-minutes"
          disabled={appState === "loading"}
        />
        <MinutesAdd disabled={appState === "loading"} />
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
            updateCompletedMinutes(newValue);
          }
        }}
        disabled={appState === "loading" || totalMinutes < 1}
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
