import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Stack } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "react-i18next";

interface Header {
  label1: string;
  value1: string;
  label2: boolean;
  value2: string;
}

const Header: React.FC<Header> = () => {
  const [age, setAge] = React.useState("");
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Stack
      sx={{ minWidth: 360 }}
      direction="row"
      justifyContent={"space-between"}
      alignItems="center"
      bgcolor="white"
      padding={"1rem"}
      borderBottom={"2px solid #4D4639"}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">
          {t("COMMON.LANG")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          style={{
            borderRadius: "20px",
            color: "#4D4639",
            width: "7rem",
            height: "1.625 rem",
          }}
          onChange={handleChange}
        >
          <MenuItem value="English">EN</MenuItem>
          <MenuItem value="Hindi">HI</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ margin: "0 auto" }}>
        <img src="/appLogo.svg" alt="logo" />
      </Box>
      <Box>
        <AccountCircleIcon fontSize="large" color="action" />
      </Box>
    </Stack>
  );
};
export default Header;
