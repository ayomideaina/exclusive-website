"use client";

import { useState } from "react";

export default function Toggle({ initialOn = false, render }) {
  const [on, setOn] = useState(initialOn);

  const toggle = () => {
    setOn((prev) => !prev);
  };

  return render(on, toggle);
}
