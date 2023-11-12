import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import CreateSongForm from "./components/CreateSongForm";
import SongDetailsPage from "./components/SongDetailsPage";
import EditSongForm from "./components/EditSongForm";
import ManageSongs from "./components/ManageSongs";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/new">
            <CreateSongForm />
          </Route>
          <Route exact path="/songs/:songId">
            <SongDetailsPage />
          </Route>
          <Route path="/songs/edit/:songId">
            <EditSongForm />
          </Route>
          <Route exact path="/current">
            <ManageSongs />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
