import React from "react";
import Header from "../components/Header";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Link,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import CohortCard from "../components/CohortCard";
import TodayIcon from "@mui/icons-material/Today";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import AttendanceStatusListView from "../components/AttendanceStatusListView";
import { useTheme } from '@mui/material/styles';

interface DashboardProps {
  //   buttonText: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleModalToggle = () => setOpen(!open);
  const [classes, setClasses] = React.useState("");
  const theme = useTheme<any>();

  const handleChange = (event: SelectChangeEvent) => {
    setClasses(event.target.value as string);
  };
  const modalContainer = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: theme.palette.warning["A400"],
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box minHeight="100vh" textAlign={"center"}>
      <Header />
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        padding={"1rem"}
      >
        <Box display={"flex"} sx={{color: theme.palette.warning["A200"]}}>
          <TodayIcon />
          <Typography marginBottom={"0px"}>
            Ongoing: Foundation Course (May to Sep)
          </Typography>
        </Box>
        <Box
          border={"1px solid black"}
          height={"auto"}
          width={"18.5rem"}
          padding={"2rem"}
          borderRadius={"2rem"}
          bgcolor={"black"}
          textAlign={"left"}
        >
          <Typography  marginBottom={"0px"} sx={{color: theme.palette.warning["A400"]}}>
            {" "}
            {t("COMMON.MARK_MY_ATTENDANCE")}
          </Typography>
          <Typography sx={{color: theme.palette.warning["A400"]}}>25 May 2024</Typography>
          <Stack
            direction="row"
            spacing={1}
            marginTop={1}
            justifyContent={"space-between"}
          >
            <Link href="#" sx={{color: theme.palette.primary.main}}>
              {t("DASHBOARD.HISTORY")}
            </Link>
            <Button variant="contained" color="primary">
              {t("COMMON.MARK_MY_ATTENDANCE")}
            </Button>
          </Stack>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleModalToggle}
        >
          {t("COMMON.MARK_STUDENT_ATTENDANCE")}
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleModalToggle}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={modalContainer} borderRadius={'1rem'}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box marginBottom={"0px"}>
                  <Typography variant="h6" component="h2">
                    {t("COMMON.MARK_STUDENT_ATTENDANCE")}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    25 May 2024
                  </Typography>
                </Box>
                <Box onClick={() => handleModalToggle()}>
                  <CloseIcon />
                </Box>
              </Box>
              <Divider sx={{ borderBottomWidth: "0.2rem" }} />
              <Box sx={{ mt: 2 }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel>Class</InputLabel>
                    <Select
                      value={classes}
                      label="Class"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Class A</MenuItem>
                      <MenuItem value={20}>Class B</MenuItem>
                      <MenuItem value={30}>Class C</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Typography>{t("MARK_MY_ATTENDANCE.TOTAL_STUDENTS")}</Typography>
              <AttendanceStatusListView studentName={"Mark All"}/>
              <AttendanceStatusListView studentName={"Ajay"}/>
              <AttendanceStatusListView studentName={"Vijay"}/>
              <AttendanceStatusListView studentName={"Deepak"}/>
              <AttendanceStatusListView studentName={"Vinod"}/>
            </Box>
          </Fade>
        </Modal>
      </Box>
      <Divider sx={{ borderBottomWidth: "0.1rem" }} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        padding={"1rem"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"2px"}
        >
          <Box>
            <Link sx={{color: theme.palette.warning["300"]}}>{t("DASHBOARD.MY_CLASSES")}</Link>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{color: theme.palette.secondary.main}}
          >
            <Link  sx={{color: theme.palette.secondary.main}}>{t("DASHBOARD.ADD_NEW_CLASS")}</Link>
            <AddIcon />
          </Box>
        </Stack>
        <Box
          display={"flex"}
          flexDirection={"column"}
          //   gap={"1rem"}
          textAlign={"left"}
          height={"auto"}
          width={"20.5rem"}
          sx={{bgcolor: theme.palette.secondary.light}}
          p={"1rem"}
          borderRadius={"1rem"}
        >
          <Typography>Gurukrupa Building, Paud Road</Typography>
          <CohortCard
            showBackground={true}
            isRemote={false}
            cohortName={"Class A"}
          />
          <Typography pt={"0.5rem"}>Remote</Typography>
          <CohortCard
            showBackground={true}
            isRemote={true}
            cohortName={"Class B"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
