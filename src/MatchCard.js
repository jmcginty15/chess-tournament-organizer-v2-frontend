import { Card, CardBody, CardHeader } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from './actions/config';
import axios from 'axios';
import { parseMatchResult } from './helpers/matches';
import MatchGameCard from './MatchGameCard';
import './MatchCard.css';

// Card component for displaying matches of a team tournament
const MatchCard = ({ match, type }) => {
    const [team1, setTeam1] = useState(null);
    const [team2, setTeam2] = useState(null);
    const [res1, res2] = match.result ? parseMatchResult(match.result) : [0, 0];
    const [showGames, setShowGames] = useState(false);
    const history = useHistory();
    const toggleGames = () => setShowGames(!showGames);
    const followLink = (route) => history.push(route);

    useEffect(() => {
        axios.get(`${BASE_URL}/teams/${match.team1}`)
            .then(res => setTeam1(res.data.team));
        axios.get(`${BASE_URL}/teams/${match.team2}`)
            .then(res => setTeam2(res.data.team));
    }, [match.team1, match.team2]);

    return (
        <div className="MatchCard">
            <Card>
                <CardHeader className="MatchCard-header">
                    {team1 ? (
                        <div className="MatchCard-team-container">
                            <h4 className="MatchCard-rating">{team1.place}</h4>
                            <h4><a className="MatchCard-link" href="" onClick={() => followLink(`/teams/${team1.id}`)}>{team1.name}</a> | <span className="MatchCard-rating">{team1.rating.toFixed(0)}</span></h4>
                            <h4>{res1}</h4>
                        </div>
                    ) : null}
                    {team2 ? (
                        <div className="MatchCard-team-container">
                            <h4 className="MatchCard-rating">{team2.place}</h4>
                            <h4><a className="MatchCard-link" href="" onClick={() => followLink(`/teams/${team2.id}`)}>{team2.name}</a> | <span className="MatchCard-rating">{team2.rating.toFixed(0)}</span></h4>
                            <h4>{res2}</h4>
                        </div>
                    ) : (
                            <div className="MatchCard-team-container">
                                <h4> </h4>
                                <h4>Bye</h4>
                                <h4>0</h4>
                            </div>
                        )}
                    <div>{team2 ? <h4 className="MatchCard-toggle" onClick={toggleGames}><i className={`fa fa-caret-${showGames ? 'up' : 'down'}`} aria-hidden="true"></i> </h4> : null}</div>
                </CardHeader>
                {team1 && team2 ? (
                    <CardBody className="MatchCard-body" hidden={!showGames}>
                        {match.games.map(game => <MatchGameCard key={game.id} game={game} team1={team1} team2={team2} type={type} />)}
                    </CardBody>
                ) : null}
            </Card>
        </div>
    )
}

export default MatchCard;