import React from "react";
import { styled } from "@mui/material";
import "./FilterRadioGroup.css";

const FilterRadioGroup = () => {
  const [value, setValue] = React.useState("program");
  return (
    <div className="radio-group">
      <input
        id="toggle-on"
        className="toggle toggle-left"
        name="selector"
        value="program"
        type="radio"
        onChange={() => {
          setValue("program");
        }}
        checked={value === "program"}
      />
      <label htmlFor="toggle-on" className="btn">
        Program Types
      </label>
      <input
        id="toggle-off"
        className="toggle toggle-right"
        name="selector"
        value="other"
        type="radio"
        onChange={() => {
          setValue("other");
        }}
        checked={value === "other"}
      />
      <label htmlFor="toggle-off" className="btn">
        Other Filters
      </label>
    </div>
  );
};

export default FilterRadioGroup;
