"use client";;
import { useState } from "react";

export function useCharacterLimit({
  maxLength,
  initialValue = ""
}) {
  const [value, setValue] = useState(initialValue);
  const [characterCount, setCharacterCount] = useState(initialValue.length);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
      setCharacterCount(newValue.length);
    }
  };

  return {
    value,
    characterCount,
    handleChange,
    maxLength,
  };
}
