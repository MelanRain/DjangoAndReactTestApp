import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link, useNavigate } from "react-router-dom"; 


export default function CreateRoomPage() {
  const defaultVotes = 2;
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    guestCanPause: true,
    votesToSkip: defaultVotes,
  });

  const handleVotesChange = (e) => {
    setState({
      ...state,
      votesToSkip: e.target.value,
    });
  };

  const handleGuestCanPauseChange = (e) => {
    setState({
      ...state,
      guestCanPause: e.target.value === 'true' ? true : false,
    });
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/room/${data.code}`));
  };

  return (
  <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">
                Guest Control of Playback State
              </div>
            </FormHelperText>
            <RadioGroup 
              row 
              defaultValue="true" 
              onChange={handleGuestCanPauseChange}
            >
            <FormControlLabel 
                value="true" 
                control={<Radio color="primary"/>} 
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel 
                value="false" 
                control={<Radio color="secondary"/>} 
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField 
            required={true} 
            type="number" 
            onChange={handleVotesChange}
            defaultValue={defaultVotes}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            />
            <FormHelperText>
              <div align="center">
                Votes Required To Skip Song
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button  
            color="primary" 
            variant="contained"
            onClick={handleRoomButtonPressed}
            >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button 
            color="secondary"  
            variant="contained" 
            to="/" 
            component={Link}
          >
            Back
          </Button>
        </Grid>
      </Grid>
  );
}