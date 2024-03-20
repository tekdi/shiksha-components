import React from "react";
import {
  Box,
  Card,
  CardContent,
  Input,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import StudentStatsCard from "../components/StudentStatsCard";
import ModalUsage from "./ModalUsage";
import Header from "../components/Header";
import CustomSelect from "../components/CustomSelect";
import EastIcon from "@mui/icons-material/East";

const StudentDetails = () => {
  return (
    <>
      <Header label1="hi" label2={false} value1="1" value2="2" />
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
              <Typography
                sx={{ color: "#0D599E", fontSize: "16px" }}
                variant="h6"
                gutterBottom
              >
                History
              </Typography>
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
      <Card
        sx={{ bgcolor: "#E7F3F8", borderRadius: "24px", marginTop: "20px" }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 500, color: "#4D4639" }}
            variant="h6"
            gutterBottom
          >
            Test Report
          </Typography>
          <CustomSelect />
          <Box
            sx={{ bgcolor: "trasparent", justifyContent: "center" }}
            display="flex"
            gap={1}
            alignItems="center"
          >
            <StudentStatsCard
              label1="Test Report"
              value1="90%" // Sample attendance data, replace with actual data
              label2={false}
              value2="5" // Sample late arrivals data, replace with actual data
            />
            <StudentStatsCard
              label1="Test Report"
              value1="90%" // Sample attendance data, replace with actual data
              label2={false}
              value2="5" // Sample late arrivals data, replace with actual data
            />
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          bgcolor: "#FFEFD5",
          borderRadius: "24px",
          marginTop: "20px",
          height: "688px",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Basic Details
          </Typography>
        </CardContent>
        <Card
          sx={{
            marginTop: "20px",
            height: "688px",
            width: "340px",
            margin: "auto",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h5" gutterBottom></Typography>
        </Card>
      </Card>
    </>
  );
};

export default StudentDetails;
