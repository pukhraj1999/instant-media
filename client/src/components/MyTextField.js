import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  textField: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  textFiledLabel: {
    color: "grey !important",
  },
  textFilednNotchedOutline: {
    borderWidth: "1px",
    borderColor: "grey !important",
    color: "black",
  },
});

function MyTextField({
  label,
  placeholder,
  name,
  value,
  onChange,
  type,
  vissibleBtn,
}) {
  const classes = useStyle();

  return (
    <TextField
      InputLabelProps={{
        classes: {
          root: classes.textFiledLabel,
          focused: classes.textFiledLabel,
        },
      }}
      InputProps={{
        classes: {
          root: classes.textFilednNotchedOutline,
          focused: classes.textFilednNotchedOutline,
          notchedOutline: classes.textFilednNotchedOutline,
        },
      }}
      className={classes.textField}
      onChange={onChange}
      type={type}
      name={name}
      value={value}
      label={label}
      placeholder={placeholder}
      variant="outlined"
    />
  );
}

export default MyTextField;
