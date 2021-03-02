import { Card, CardBody, CardTitle, Button, CardHeader } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/users';
import { BASE_URL } from './actions/config';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import TournamentList from './TournamentList';
import axios from 'axios';
import './Home.css';

// Site homepage
const Home = () => {
    const app = useSelector(state => state.config.app);
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const [tournaments, setTournaments] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const followLink = (route) => history.push(route);

    const handleLogout = () => {
        dispatch(logout());
    }

    useEffect(() => {
        if (loggedInUser) {
            axios.get(`${BASE_URL}/users/${loggedInUser.username}/tournaments/ongoing`)
                .then(res => setTournaments(res.data.tournaments));
        }
    }, [loggedInUser]);

    return (
        <div className="Home">
            <h1>Welcome to {app.name}!</h1>
            <h3>{app.tagline}</h3>
            {loggedInUser ? (
                <Card className="Home-card-container">
                    <CardBody>
                        <CardTitle tag="h4">
                            Welcome {loggedInUser.username}
                        </CardTitle>
                        <Button className="Home-button" color="secondary" outline onClick={() => followLink(`/users/${loggedInUser.username}`)}>My profile</Button>
                        <Button className="Home-button" color="primary" outline onClick={() => followLink(`/tournaments`)}>Find a tournament</Button>
                        <Button className="Home-button" color="success" outline onClick={() => followLink(`/tournaments/create`)}>Create a tournament</Button>
                        <Button className="Home-button" color="danger" outline onClick={handleLogout}>Logout</Button>
                        {tournaments ? (
                            <Card className="Home-ongoing">
                                <CardHeader>
                                    <h2>Ongoing Tournaments</h2>
                                </CardHeader>
                                <CardBody className="Home-ongoing-body">
                                    <Card>
                                        <CardHeader>
                                            <h3>Individual</h3>
                                        </CardHeader>
                                        {tournaments.ind.length ? <TournamentList tournaments={tournaments.ind} type={'I'} /> : <CardBody><h4>None yet</h4></CardBody>}
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <h3>Team</h3>
                                        </CardHeader>
                                        {tournaments.team.length ? <TournamentList tournaments={tournaments.team} type={'T'} /> : <CardBody><h4>None yet</h4></CardBody>}
                                    </Card>
                                </CardBody>
                            </Card>
                        ) : null}
                    </CardBody>
                </Card>
            ) : (
                    <Card className="Home-card-container">
                        <div className="Home-card">
                            <div className="Home-form-container">
                                <LoginForm />
                            </div>
                            <div className="Home-form-container">
                                <SignupForm />
                            </div>
                        </div>
                    </Card>
                )}
        </div>
    )
}

export default Home;