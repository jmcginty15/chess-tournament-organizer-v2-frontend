import { Card, CardBody, CardHeader } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TournamentList from './TournamentList';
import { BASE_URL } from './actions/config';
import './TournamentsPage.css';

const TournamentsPage = () => {
    const [indTournaments, setIndTournaments] = useState(null);
    const [teamTournaments, setTeamTournaments] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/tournaments/ind/all`)
            .then(res => setIndTournaments(res.data.tournaments));
    }, []);

    return (
        <div className="TournamentsPage">
            <h1>Tournaments</h1>
            <div className="TournamentsPage-body">
                <div className="TournamentsPage-list">
                    <Card>
                        <CardHeader>
                            <h1>Individual</h1>
                        </CardHeader>
                        <CardBody className="TournamentsPage-list-body">
                            {indTournaments ? <TournamentList tournaments={indTournaments} type="I" /> : null}
                        </CardBody>
                    </Card>
                </div>
                <div className="TournamentsPage-list">
                    <Card>
                        <CardHeader>
                            <h1>Team</h1>
                        </CardHeader>
                        <CardBody className="TournamentsPage-list-body">
                            {teamTournaments ? <TournamentList tournaments={teamTournaments} /> : null}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TournamentsPage;