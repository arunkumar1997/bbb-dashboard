import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function LoginComponent() {
  return (
    <CssBaseline>
      <Container fixed sx={{}}>
        <Box sx={{ justifyContent: "center", mt: 20 }}>
          <Box sx={{ width: "40%" }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  className=" text-center"
                  variant="h5"
                  component="div"
                  sx={{ mb: 1 }}
                >
                  Login
                </Typography>
                <TextField
                  required
                  variant="standard"
                  standard-basic
                  label="Email"
                  sx={{ width: "100%", mb: 2 }}
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  variant="standard"
                  autoComplete="current-password"
                  sx={{ width: "100%" }}
                />
              </CardContent>
              <CardActions>
                <Button size="large" variant="contained">
                  Submit
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Container>
    </CssBaseline>
  );
}
