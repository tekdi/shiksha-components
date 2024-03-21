import * as React from "react";
import Button from "@mui/material/Button";

export default function ButtonFunctional(props: any) {
  const { handleClickButton, buttonName } = props;
  return (
    <Button
      variant="contained"
      style={{
        background: "#FBBC13",
        color: "#1E1B16",
        borderRadius: "100px",
        width: "100%",
        height: "40px",
        marginTop: "20px",
      }}
      onClick={handleClickButton}
    >
      {buttonName}
    </Button>
  );
}
