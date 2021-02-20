import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from './actions/config';
import axios from 'axios';
import TournamentList from './TournamentList';
import './Profile.css';

const Profile = () => {
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const { username } = useParams();
    const [tournaments, setTournaments] = useState(null);
    const [directedTournaments, setDirectedTournaments] = useState(null);
    const [user, setUser] = useState(null);
    const history = useHistory();
    const followLink = (route) => history.push(route);

    useEffect(() => {
        axios.get(`${BASE_URL}/users/${username}/tournaments`)
            .then(res => setTournaments(res.data.tournaments));
        axios.get(`${BASE_URL}/users/${username}/directed_tournaments`)
            .then(res => setDirectedTournaments(res.data.tournaments));
        axios.get(`${BASE_URL}/users/${username}`)
            .then(res => setUser(res.data.user));
    }, [username]);

    return (
        <div className="Profile">
            {username ? (
                <div>
                    <h1>{username}{username === loggedInUser.username ? (
                        <span> <Button type="button" outline color="secondary" onClick={() => followLink(`/users/${username}/edit`)}>Edit profile</Button></span>
                    ) : null}</h1>
                    {user ? <div><h3>{user.firstName} {user.lastName}</h3><h5>{user.email}</h5></div> : null}
                </div>
            ) : null}
            <Card className="Profile-card">
                <CardHeader>
                    <h2>Entered Tournaments</h2>
                </CardHeader>
                {tournaments ? (
                    <CardBody className="Profile-body">
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
                ) : null}
            </Card>
            <Card className="Profile-card">
                <CardHeader>
                    <h2>Directed Tournaments</h2>
                </CardHeader>
                {directedTournaments ? (
                    <CardBody className="Profile-body">
                        <Card>
                            <CardHeader>
                                <h3>Individual</h3>
                            </CardHeader>
                            {directedTournaments.ind.length ? <TournamentList tournaments={directedTournaments.ind} type={'I'} /> : <CardBody><h4>None yet</h4></CardBody>}
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3>Team</h3>
                            </CardHeader>
                            {directedTournaments.team.length ? <TournamentList tournaments={directedTournaments.team} type={'T'} /> : <CardBody><h4>None yet</h4></CardBody>}
                        </Card>
                    </CardBody>
                ) : null}
            </Card>
        </div>
    )
}

export default Profile;