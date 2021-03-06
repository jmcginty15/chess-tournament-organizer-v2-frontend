import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import Profile from './Profile';
import EditProfile from './EditProfile';
import TournamentWrapper from './TournamentWrapper';
import TournamentsPage from './TournamentsPage';
import TournamentForm from './TournamentForm';
import TeamInfo from './TeamInfo';
import './App.css';

// App component
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
          <Route exact path="/users/:username/edit">
            <EditProfile />
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
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
