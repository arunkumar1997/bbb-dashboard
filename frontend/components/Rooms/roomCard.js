import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

export default function RoomCard({ room }) {
  const router = useRouter();

  const handleRoomCaredClick = (id) => {
    router.push(`/rooms/${id}`);
  };

  return (
    <Card sx={{ minWidth: 275, minHeight: 150, maxHeight: 200, boxShadow: 1 }}>
      <CardActionArea onClick={() => handleRoomCaredClick(room.id)}>
        <CardHeader
          title={room.title}
          subheader={`Last session: ${room.lastSession}`}
        />
      </CardActionArea>
      <Box sx={{ mt: 2 }}>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button size="small"> Invite </Button>
          <Button size="small"> Start </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
