import React from "react";
import "./Button.css";

export function Button({ children, ...props }) {
  return (
    <div className="Button" {...props}>
      {children}
    </div>
  );
}
