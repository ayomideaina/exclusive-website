"use client";

import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(num) {
  return String(num).padStart(2, "0");
}

export default function CountdownTimer({ targetDate, variant = "default" }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  if (variant === "circle") {
    return (
      <div className="flex items-center gap-4">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black font-semibold">
              {pad(unit.value)}
            </div>
            <span className="text-xs text-white">{unit.label[0]}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-text-primary">{unit.label}</span>
            <span className="text-xl font-semibold text-text-primary">{pad(unit.value)}</span>
          </div>
          {index < units.length - 1 && (
            <span className="text-xl font-semibold text-primary">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
