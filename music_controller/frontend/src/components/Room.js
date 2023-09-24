import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button, Typography} from '@material-ui/core'
import { Link, useNavigate } from "react-router-dom"; 

export default function Room() {
    const navigate = useNavigate();
    const { roomCode } = useParams();

    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        getRoomDetails();
    }, []);

    const getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + roomCode).then((response) => 
            response.json()
        ).then((data) => {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);
        });
    }

    function leaveButtonPressed() {
        console.log("Leave");
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
          fetch("/api/leave-room", requestOptions)
            .then((response) => response.json())
            navigate(`/`);

    }


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {votesToSkip}
                </Typography>  
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                Leave Room
                </Button>
            </Grid>
        </Grid>
    );
}