import React, { useEffect, useState } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    async function autoEnter() {
      fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    }
    autoEnter();
  }, []);



  
  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant='h3' compact='h3'>
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" component={Link} to="/join">
              Join a Room
            </Button>
            <Button color="secondary" component={Link} to="/create">
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()}
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}
