import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Box,
  Button,
  Card,
  CardContent,
  ThemeProvider,
  Typography,
  createMuiTheme,
} from "@mui/material";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from "@mui/system";
import ButtonFunctional from "../components/ButtonFunctional";
import StudentsStatsList from "../components/StudentsStatsList";
import SearchSortBar from "../components/SearchSortBar";
import StudentStatsCard from "../components/StudentStatsCard";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";
import ModalComponent from "../components/Modal";
export default function MyClassDetails() {
  const handleSecondClickButton = () => {
    alert(" Mark Today’s Attendance");
  };

  const theme = createMuiTheme({
    typography: {
      fontFamily: "Poppins",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box>
          <Header label1="chek" label2={false} value1="65" value2="uyyah" />
          <Box mt={3} display={"flex"} gap={2} alignItems={"flex-start"}>
            <Link to={"/"}>
              <ArrowBackIcon fontSize="medium" />
            </Link>
            <Stack>
              <Typography variant="h5" fontFamily={"poppins"}>
                Class A
              </Typography>
              <Typography fontSize={"11px"} fontFamily={"poppins"}>
                Gurukrupa Building, Paud Road
              </Typography>
            </Stack>
          </Box>
        </Box>

        <ButtonFunctional
          handleClickButton={handleSecondClickButton}
          buttonName="Mark Today’s Attendance"
        />
        <Card
          sx={{ bgcolor: "#E7F3F8", borderRadius: "24px", marginTop: "20px" }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "16px", fontWeight: 600, color: "#4D4639" }}
                variant="h6"
                gutterBottom
              >
                Attendance Report
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Link to={""}>
                  <Typography
                    sx={{ color: "#0D599E", fontSize: "16px" }}
                    variant="h6"
                    gutterBottom
                  >
                    History
                  </Typography>
                </Link>
                <EastIcon fontSize="inherit" sx={{ color: "#0D599E" }} />
              </Box>
            </Box>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 600, color: "#969088" }}
              variant="h6"
              gutterBottom
            >
              As of 24 May
            </Typography>
            <Box
              sx={{
                bgcolor: "trasparent",
                justifyContent: "center",
              }}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <StudentStatsCard
                label1="Attendance"
                value1="78%" // Sample attendance data, replace with actual data
                label2={false}
                value2="5" // Sample late arrivals data, replace with actual data
              />
              <StudentStatsCard
                label1="Classes Missed"
                value1="2" // Sample attendance data, replace with actual data
                label2={false}
                value2="5" // Sample late arrivals data, replace with actual data
              />
            </Box>
          </CardContent>
        </Card>

        <SearchSortBar />
        <StudentsStatsList
          name="ananya"
          value1="34"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Upendra"
          value1="74"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Rahul"
          value1="34"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Jhon"
          value1="43"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Shubh"
          value1="23"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="ananya"
          value1="34"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Upendra"
          value1="74"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Rahul"
          value1="34"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Jhon"
          value1="43"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Shubh"
          value1="23"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="ananya"
          value1="34"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Upendra"
          value1="74"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Rahul"
          value1="34"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Jhon"
          value1="43"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
        <StudentsStatsList
          name="Shubh"
          value1="23"
          label1="Attendacne"
          value2="7"
          label2="Class Missed"
        />
      </ThemeProvider>
    </>
  );
}
