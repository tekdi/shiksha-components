import React from "react";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import config from "../config.json";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("preferredLanguage") || "en"
  );
  const [language, setLanguage] = useState(selectedLanguage);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const theme = useTheme<any>();
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);

  };
  const handleProfileClick = () => {
    navigate('/profile');
  };
  return (
    <>
      <Stack
        sx={{ minWidth: 360 }}
        direction="row"
        justifyContent={"space-between"}
        // bgcolor="white"
        padding={"1rem"}
        height="auto"
      >
        <FormControl>
          <InputLabel>{t("COMMON.LANGUAGE")}</InputLabel>
          <Select
            value={language}
            label="Language"
            style={{
              borderRadius: "20px",
              color: theme.palette.warning["200"],
              width: "5rem",
              height: "0.5 rem",
            }}
            onChange={handleChange}
          >
            {config?.languages.map((lang, index) => (
              <MenuItem value={lang.code} key={index} id={`lang-${lang.code}`}>
                {lang.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ margin: "0 auto" }}>
          <img src="/appLogo.svg" alt="logo" />
        </Box>
        <Box
              onClick={handleProfileClick}

        >
          <AccountCircleIcon fontSize="large" color="action"
          />
        </Box>
      </Stack>
      <Divider sx={{ borderBottomWidth: "0.25rem" }} />
    </>
  );
};
export default Header;
