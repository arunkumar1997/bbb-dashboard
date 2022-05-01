import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import RoomRecordingTable from "../Rooms/roomRecordings";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormControl from "@mui/material/FormControl";

import Checkbox from "@mui/material/Checkbox";
const Input = styled("input")({
  display: "none",
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RoomDetails({ room }) {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [state, setState] = useState({
    muteOnStart: true,
    skipAudioCheck: false,
    chatStartClosed: false,
    enableRecording: true,
    enableMp4Convertion: false,
  });

  const handleCheckBoxChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.checked });
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={2}
      >
        <Box sx={{ justifyContent: "flex-start", mb: 4 }}>
          <ArrowBackIcon
            sx={{ cursor: "pointer" }}
            onClick={() => router.back()}
            color="primary"
          />
        </Box>
        <Box sx={{ justifyContent: "flex-start", mb: 4 }}>
          <Typography variant="h4" gutterBottom component="div">
            {room.title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {room.description}
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Recordings" {...a11yProps(0)} />
              <Tab label="Room Settings" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <RoomRecordingTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ display: "flex" }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.muteOnStart}
                        onChange={handleCheckBoxChange("muteOnStart")}
                        name="Mute on start"
                      />
                    }
                    label="Mute on start"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.skipAudioCheck}
                        onChange={handleCheckBoxChange("skipAudioCheck")}
                        name="Skip audio check"
                      />
                    }
                    label="Skip audio check"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.chatStartClosed}
                        onChange={handleCheckBoxChange("chatStartClosed")}
                        name="Chat start closed"
                      />
                    }
                    label="Chat start closed"
                  />
                </FormGroup>
              </FormControl>
              <FormControl
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.enableRecording}
                        onChange={handleCheckBoxChange("enableRecording")}
                        name="Enable recording"
                      />
                    }
                    label="Enable recording"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.enableMp4Convertion}
                        onChange={handleCheckBoxChange("enableMp4Convertion")}
                        name="Enable MP4 convertion"
                      />
                    }
                    label="Enable MP4 convertion"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </TabPanel>
        </Box>
      </Stack>
    </Box>
  );
}
