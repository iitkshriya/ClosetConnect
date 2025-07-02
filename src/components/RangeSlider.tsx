import { useEffect, useRef } from "react";
import { PRICE_MAX } from "@/types";

type Props = {
  valueOne: number;
  valueTwo: number;
  setValueOne: (val: number) => void;
  setValueTwo: (val: number) => void;
  onChangeComplete: (
    e: React.MouseEvent<HTMLInputElement> | null,
    t?: number[]
  ) => void;
  disabled?: boolean;
};

export default function RangeSlider({
  valueOne,
  valueTwo,
  setValueOne,
  setValueTwo,
  onChangeComplete,
  disabled,
}: Props) {
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const fillColor = (val1: number, val2: number) => {
    const percent1 = (val1 / PRICE_MAX) * 100;
    const percent2 = (val2 / PRICE_MAX) * 100;
    if (sliderTrackRef.current) {
      sliderTrackRef.current.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #3264fe ${percent1}%, #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
    }
  };

  useEffect(() => {
    fillColor(valueOne, valueTwo);
  }, [valueOne, valueTwo]);

  const handleChange =
    (setter: (val: number) => void, otherVal: number, isFirst: boolean) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = parseInt(e.target.value);
      if (isFirst && otherVal - val <= 0) val = otherVal;
      if (!isFirst && val - otherVal <= 0) val = otherVal;
      setter(val);
    };

  return (
    <div
      className={`flex w-[50%] items-center gap-4 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <span>$0</span>
      <div className="relative h-10 w-[80%]">
        <div
          ref={sliderTrackRef}
          className="absolute top-1/2 transform -translate-y-1/2 h-2 w-full rounded-full bg-red-500"
        ></div>
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          value={valueOne}
          onChange={handleChange(setValueOne, valueTwo, true)}
          onMouseUp={(e) => onChangeComplete(e)}
          className="absolute mt-4 w-full appearance-none pointer-events-auto bg-transparent"
        />
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          value={valueTwo}
          onChange={handleChange(setValueTwo, valueOne, false)}
          onMouseUp={(e) => onChangeComplete(e)}
          className="absolute mt-4 w-full appearance-none pointer-events-auto bg-transparent"
        />
      </div>
      <span>$999+</span>
    </div>
  );
}
