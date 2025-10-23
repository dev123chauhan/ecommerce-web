import { useState, useEffect } from "react";
export default function useCountdownTimer(initialTime) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = { ...prev };
        if (newTime.Seconds > 0) newTime.Seconds--;
        else {
          newTime.Seconds = 59;
          if (newTime.Minutes > 0) newTime.Minutes--;
          else {
            newTime.Minutes = 59;
            if (newTime.Hours > 0) newTime.Hours--;
            else {
              newTime.Hours = 23;
              if (newTime.Days > 0) newTime.Days--;
            }
          }
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}
