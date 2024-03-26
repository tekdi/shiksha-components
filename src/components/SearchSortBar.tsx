import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ModalComponent from "./Modal";
import { Stack } from "@mui/system";

export default function SearchSortBar() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [nestedModalOpen, setNestedModalOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [valueName, setValueName] = React.useState("female");
  const [valueAttendance, setValueAttendance] = React.useState("lowToHigh");

  const handleChangeNames = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueName((event.target as HTMLInputElement).value);
  };

  const handleChangeAttendance = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValueAttendance((event.target as HTMLInputElement).value);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box
        display={"flex"}
        mt={3}
        mb={3}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "auto",
            borderRadius: "100px",
            background: "#EDEDED",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, mb: "0" }}
            placeholder="Search Student.."
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          // variant="outlined"
          onClick={handleOpenModal}
          sx={{
            // border: "darkgray",
            color: "black",
            height: "32px",
            width: "100px",
            padding: "6px, 8px, 6px, 16px",
          }}
          endIcon={<ArrowDropDownSharpIcon />}
          size="small"
          variant="outlined"
        >
          Sort By
        </Button>
      </Box>

      {/* ------------------modal for sorting ------------------- */}
      <ModalComponent
        open={modalOpen}
        onClose={handleCloseModal}
        heading={"Mark attendance"}
        // SubHeading={"Sort"}
        btnText="apply"
      >
        <Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontSize={"16px"} fontWeight={"500"}>
              {" "}
              Sort By
            </Typography>

            <CloseSharpIcon onClick={handleCloseModal} />
          </Box>
          <Divider
            style={{
              backgroundColor: "darkgray",
              marginBottom: "10px",
              marginTop: "15px",
            }}
          />

          <Box mt={2}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Names
              </FormLabel>

              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueName}
                onChange={handleChangeNames}
              >
                <FormControlLabel
                  value="aToz"
                  control={<Radio sx={{ ml: "300px" }} />}
                  label="A to Z"
                  labelPlacement="start"
                  sx={{ fontWeight: "500", fontSize: "14px" }}
                />
                <FormControlLabel
                  value="zToA"
                  labelPlacement="start"
                  sx={{ fontWeight: "500", fontSize: "14px" }}
                  control={<Radio sx={{ ml: "300px" }} />}
                  label="Z to A"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={2}>
            {" "}
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Attendance
              </FormLabel>

              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueAttendance}
                onChange={handleChangeAttendance}
              >
                <FormControlLabel
                  value="lowToHigh"
                  control={<Radio sx={{ ml: "270px" }} />}
                  label="Low to High"
                  labelPlacement="start"
                  sx={{ fontWeight: "500", fontSize: "14px", m: "0px" }}
                />
                <FormControlLabel
                  value="highToLow"
                  labelPlacement="start"
                  sx={{ fontWeight: "500", fontSize: "14px", m: "0px" }}
                  control={<Radio sx={{ ml: "270px" }} />}
                  label="High To Low"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={2}>
            {" "}
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Class Missed
              </FormLabel>

              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueAttendance}
                onChange={handleChangeAttendance}
                // style={{ flexDirection: "row" }}
              >
                <FormControlLabel
                  value="lowToHigh"
                  control={<Radio sx={{ ml: "270px" }} />}
                  label="Low to High"
                  labelPlacement="start"
                  sx={{ fontWeight: "500", fontSize: "14px", m: "0px" }}
                />
                <FormControlLabel
                  value="highToLow"
                  labelPlacement="start"
                  sx={{ fontWeight: "500", fontSize: "14px", m: "0px" }}
                  control={<Radio sx={{ ml: "270px" }} />}
                  label="High to Low"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Divider
            style={{
              backgroundColor: "darkgray",
              marginBottom: "10px",
              marginTop: "15px",
            }}
          />
        </Box>
      </ModalComponent>
    </>
  );
}