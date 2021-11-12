import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { Filters } from "../../src/frontend/Interfaces";
import OutlinedInput from "@mui/material/OutlinedInput";

interface ISelectProps {
  data: item[];
  selected: Filters;
  setState: Function;
  name: string;
}
interface item {
  text: string;
  value: string;
  type?: string;
  children?: item[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function GroupedSelect(props: ISelectProps) {
  const { data, selected, setState, name } = props;

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setState({ [value[1]]: !selected[value[1]] });
  };

  const renderChilds = (child: item[]): React.ReactNode => {
    const toRender: React.ReactNode[] = [];
    child.forEach((elem: item) => {
      if (elem.type && elem.type === "label") {
        toRender.push(
          <ListSubheader key={elem.value}>{elem.text}</ListSubheader>
        );
        if (elem.children) {
          elem.children.forEach((subChild: item) => {
            toRender.push(
              <MenuItem key={subChild.value} value={subChild.value}>
                <Checkbox checked={selected[subChild.value]} />
                <ListItemText primary={subChild.text} />
              </MenuItem>
            );
          });
        }
      } else {
        toRender.push(
          <MenuItem key={elem.value} value={elem.value}>
            <Checkbox checked={selected[elem.value]} />
            <ListItemText primary={elem.text} />
          </MenuItem>
        );
      }
    });
    return toRender;
  };

  const calculateValueToRender = () => {
    let allChecked = true;
    let someChecked = false;
    for (let key of Object.keys(selected)) {
      if (key === "all") {
        continue;
      }
      if (!selected[key]) {
        allChecked = false;
      }
      if (selected[key]) {
        someChecked = true;
      }
    }
    if (allChecked) {
      return ["All filters selected"];
    }
    if (someChecked) {
      return ["Some filters selected"];
    }
    return ["No filter selected"];
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel htmlFor="grouped-select">{name}</InputLabel>
      <Select
        defaultValue=""
        id="grouped-select"
        labelId="demo-multiple-checkbox-label"
        multiple
        // @ts-ignore
        value={calculateValueToRender()}
        onChange={handleChange}
        input={<OutlinedInput label={name} />}
        renderValue={() => calculateValueToRender().join(",")}
        MenuProps={MenuProps}
        label={name}
      >
        {renderChilds(data ? data : [])}
      </Select>
    </FormControl>
  );
}
