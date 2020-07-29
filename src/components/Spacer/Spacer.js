import React from "react";
import "./Spacer.css";

export function Spacer({ space = 0 }) {
  return <div className="Spacer" style={{ margin: `${space / 2}px` }} />;
}
