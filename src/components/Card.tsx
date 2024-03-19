import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const PlaneCard = () => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Boeing 747
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The Boeing 747 is a large, long-range wide-body airliner designed and
          manufactured by Boeing Commercial Airplanes.
        </Typography>
      </CardContent>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  Mini Box 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is the content of Mini Box 1.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  Mini Box 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is the content of Mini Box 2.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default PlaneCard;
