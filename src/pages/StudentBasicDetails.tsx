import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import StudentStatsCard from "../components/StudentStatsCard";
import Header from "../components/Header";
import CustomSelect from "../components/CustomSelect";
import EastIcon from "@mui/icons-material/East";

const StudentDetails = () => {
  const [studentData, setStudentData] = useState([
    {
      dob_title: "Date of Birth",
      dob: "22/12/1998",
      latest_education: "Latest Education",
      grade: "9th Grade",
    },
  ]);

  return (
    <>
      <Header label1="hi" label2={false} value1="1" value2="2" />
      <Card
        sx={{
          bgcolor: "#E7F3F8",
          borderRadius: "24px",
          marginTop: "20px",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: 600, color: "#4D4639" }}
              variant="h6"
              gutterBottom
            >
              Attendance Report
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
            >
              <Typography
                sx={{ color: "#0D599E", fontSize: "16px", marginRight: "4px" }}
                variant="h6"
                gutterBottom
              >
                History
              </Typography>
              <EastIcon
                fontSize="inherit"
                sx={{ color: "#0D599E", marginBottom: "5px" }}
              />
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
            gap={1}
            sx={{
              bgcolor: "transparent",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <StudentStatsCard
              label1="Attendance"
              value1="78%"
              label2={false}
              value2="5"
            />
            <StudentStatsCard
              label1="Classes Missed"
              value1="2"
              label2={false}
              value2="5"
            />
          </Box>
        </CardContent>
      </Card>{" "}
      <Card
        sx={{
          bgcolor: "#E7F3F8",
          borderRadius: "24px",
          marginTop: "20px",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 600, color: "#4D4639" }}
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
              label1="Status"
              value1="Passed"
              label2={false}
              value2="5"
            />
            <StudentStatsCard
              label1="Score"
              value1="82%"
              label2={false}
              value2="5"
            />
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          bgcolor: "#FFEFD5",
          marginTop: "20px",
          height: "688px",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 600, color: "#4D4639" }}
            variant="h6"
            gutterBottom
          >
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
            boxShadow: "none",
          }}
        >
          {studentData.map((item, index) => (
            <Box key={index} sx={{ padding: 2 }}>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 600, color: "#969088" }}
              >
                {item.dob_title}
              </Typography>
              <Typography
                sx={{ fontSize: "16px", fontWeight: 500, color: "#4D4639" }}
              >
                {item.dob}
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 600, color: "#969088" }}
              >
                {item.latest_education}
              </Typography>
              <Typography
                sx={{ fontSize: "16px", fontWeight: 500, color: "#4D4639" }}
              >
                {item.grade}
              </Typography>
            </Box>
          ))}
        </Card>
      </Card>
    </>
  );
};

export default StudentDetails;
