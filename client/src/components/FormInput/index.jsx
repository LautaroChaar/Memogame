import { Typography } from "@mui/material";
import React from "react";
import './FormInput.css';

export default function FormInput({ validationRegex, label, type, placeholder, onChange }) {

  const [error, setError] = React.useState(false);

  const onInputChange = value => {
    if (value !== "" && validationRegex.test(value)) {
      onChange(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <label className="formLabel">{label}</label>
      <input
        className="formInput"
        type={type}
        placeholder={placeholder}
        required
        onChange={(e) => onInputChange(e.target.value)}
      />
      {error && <Typography sx={{
        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.9rem' },
        color: '#AD343E',
      }}>Invalid field.</Typography>}
    </>
  );
}