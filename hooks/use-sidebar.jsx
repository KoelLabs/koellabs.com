"use client"

import * as React from "react"

export function useSidebar() {
  const [state, setState] = React.useState("open")

  return {
    open: state === "open",
    onOpenChange: (open) => setState(open ? "open" : "closed"),
  };
}
