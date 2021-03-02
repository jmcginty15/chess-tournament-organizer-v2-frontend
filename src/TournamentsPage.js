import { Card, CardBody, CardHeader } from 'reactstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TournamentList from './TournamentList';
import { BASE_URL } from './actions/config';
import './TournamentsPage.css';

// Page displaying lists of individual and team tournaments
const TournamentsPage = () => {
    const [indTournaments, setIndTournaments] = useState(null);
    const [teamTournaments, setTeamTournaments] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            axios.get(`${BASE_URL}/tournaments/ind/all`)
                .then(res => setIndTournaments(res.data.tournaments));
            axios.get(`${BASE_URL}/tournaments/team/all`)
                .then(res => setTeamTournaments(res.data.tournaments));
        }, 200);
    }, []);

    return (
        <div className="TournamentsPage">
            <h1>Tournaments</h1>
            <div className="TournamentsPage-body">
                <div className="TournamentsPage-list">
                    <Card>
                        <CardHeader>
                            <h2>Individual</h2>
                        </CardHeader>
                        <CardBody className="TournamentsPage-list-body">
                            {indTournaments ? <TournamentList tournaments={indTournaments} type="I" /> : null}
                        </CardBody>
                    </Card>
                </div>
                <div className="TournamentsPage-list">
                    <Card>
                        <CardHeader>
                            <h2>Team</h2>
                        </CardHeader>
                        <CardBody className="TournamentsPage-list-body">
                            {teamTournaments ? <TournamentList tournaments={teamTournaments} type="T" /> : null}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TournamentsPage;