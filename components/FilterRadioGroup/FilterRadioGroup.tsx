import React from "react";
import styles from "./FilterRadioGroup.module.css";

export interface Option {
  text: string;
  value: string;
}

interface Props {
  options: Option[];
  selected: string;
  setSelected: Function;
  name: string;
}
const FilterRadioGroup = (props: Props) => {
  const { selected, setSelected, options, name } = props;
  return (
    <div className="radio-group">
      {options.map((option: Option) => {
        return (
          <div
            className={styles.inputDiv}
            style={{ width: `${(1 / options.length) * 100}%` }}
            onClick={() => {
              setSelected(option.value);
            }}
            key={option.value}
          >
            <input
              id="toggle-on"
              className={`${styles.toggleInput} ${styles.toggleLeft}`}
              name={name}
              value={option.value}
              type="radio"
              checked={selected === option.value}
              onChange={() => {
                setSelected(option.value);
              }}
            />
            <label htmlFor={name} className={styles.btn}>
              {option.text}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default FilterRadioGroup;
