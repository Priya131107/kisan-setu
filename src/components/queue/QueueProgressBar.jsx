import React from "react";
import ProgressBar from "../ui/ProgressBar";

export default function QueueProgressBar({ position, total = 20 }) {
  const progress = Math.max(0, ((total - position) / total) * 100);
  return <ProgressBar value={progress} max={100} label="Queue Progress" color="primary" />;
}