import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RoomCard from "./roomCard";
import { getRooms } from "../../services/roomServices";

export default function FullWidthGrid() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      const res = await getRooms();
      setRooms(res);
      setLoading(false);
    }
    fetchRooms();
  }, []);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Grid
        container
        spacing={2}
        rowGap={2}
        direction={{ xs: "column", md: "row", sm: "column" }}
      >
        {loading
          ? "Loading..."
          : rooms.map((room) => {
              return (
                <Grid key={room.id} item xs={12} md={6} lg={4}>
                  <RoomCard room={room} />
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
}
