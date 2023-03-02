import { Box } from "@mui/material";
import React from "react";
import { dataContext } from "../../context/DataContext";
import './FormSelect.css';

export default function FormSelect({ label, onChange, options }) {

  const { disableSelect } = React.useContext(dataContext);

  const onSelectChange = value => {
    if (value !== "" ) {
      onChange(value);
    } 
  };

  return (
    <Box>
      <label className="selectLabel" >{label}</label>
      <select 
      disabled={ disableSelect ? true : false }
      className="selectInput"
      onChange={(e) => onSelectChange(e.target.value)}>
        {options}
      </select>
    </Box>
  );
}
