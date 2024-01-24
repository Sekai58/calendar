import React, { useState, useEffect } from "react";
import NepaliDate from "nepali-datetime";

const nepaliNumbers = {
  0: "०",
  1: "१",
  2: "२",
  3: "३",
  4: "४",
  5: "५",
  6: "६",
  7: "७",
  8: "८",
  9: "९",
};

const nepaliDays = {
  Sunday: "आइतबार",
  Monday: "सोमबार",
  Tuesday: "मङ्गलबार",
  Wednesday: "बुधबार",
  Thursday: "बिहीबार",
  Friday: "शुक्रबार",
  Saturday: "शनिवार",
};

const CurrentDate = () => {
  const [hours, setHours] = useState(new NepaliDate().format("HH"));
  const [minutes, setMinutes] = useState(new NepaliDate().format("mm"));
  const [seconds, setSeconds] = useState(new NepaliDate().format("ss"));

  const todayNepaliDate = new NepaliDate()
    .format("YYYY-MM-DD")
    .toString()
    .split("-")
    .map((part) =>
      part
        .split("")
        .map((digit) => nepaliNumbers[digit] || digit)
        .join("")
    )
    .join("-");

  const todayNepaliDay = nepaliDays[new NepaliDate().format("dddd")];

  useEffect(() => {
    const timer = setInterval(() => {
      const newSeconds = new NepaliDate().format("ss");
      setSeconds(newSeconds);

      if (newSeconds === "59") {
        const newMinutes = parseInt(minutes) + 1;
        setMinutes(newMinutes.toString().padStart(2, "0"));
        setSeconds("00");

        if (newMinutes === "60") {
          const newHours = parseInt(hours) + 1;
          setHours(newHours.toString().padStart(2, "0"));
          setMinutes("00");
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nepaliHours = hours
    .split("")
    .map((digit) => nepaliNumbers[digit])
    .join("");
  const nepaliMinutes = minutes
    .split("")
    .map((digit) => nepaliNumbers[digit])
    .join("");
  const nepaliSeconds = seconds
    .split("")
    .map((digit) => nepaliNumbers[digit])
    .join("");

  return (
    <p className="py-[1px] px-2 border-2 border-blue-500 rounded-md w-fit text-blue-500 flex justify-center my-3">
      {nepaliHours}:{nepaliMinutes}:{nepaliSeconds},{" "}
      <span className="ml-1">{todayNepaliDate},</span>
      <span className="ml-1">{todayNepaliDay}</span>
    </p>
  );
};

export default CurrentDate;
