import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import Profile from './Profile';
import TournamentWrapper from './TournamentWrapper';
import TournamentsPage from './TournamentsPage';
import TournamentForm from './TournamentForm';
import TeamInfo from './TeamInfo';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/users/:username">
            <Profile />
          </Route>
          <Route exact path="/tournaments">
            <TournamentsPage />
          </Route>
          <Route exact path="/tournaments/create">
            <TournamentForm />
          </Route>
          <Route exact path="/tournaments/:idStr">
            <TournamentWrapper />
          </Route>
          <Route exact path="/teams/:id">
            <TeamInfo />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
