import { Card, CardBody, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { getPlayers } from './helpers/matches';
import { parseTeamResult } from './helpers/matches';
import { parseDate } from './helpers/dates';
import TeamScheduler from './TeamScheduler';
import './MatchGameCard.css';

// Card component for displaying games of a team match
const MatchGameCard = ({ game, team1, team2, type }) => {
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const players = getPlayers(game, team1, team2);
    const followExternalLink = (url) => window.open(url, '_blank');

    let white = '';
    let black = '';
    if (players[1].id === game.white || players[1].id === game.white.id) {
        players[1].color = 'white';
        white = players[1].player;
    } else {
        players[1].color = 'black';
        black = players[1].player;
    }
    if (players[2].id === game.white || players[2].id === game.white.id) {
        players[2].color = 'white';
        white = players[2].player;
    } else {
        players[2].color = 'black';
        black = players[2].player;
    }

    const result = parseTeamResult(game, players[1], players[2]);

    return (
        <div className="MatchGameCard">
            <Card>
                <CardBody className="MatchGameCard-body">
                    <div className="MatchGameCard-player-container">
                        <h5><span className={`MatchGameCard-color MatchGameCard-${players[1].color}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;<a className="MatchGameCard-link" href={`https://lichess.org/@/${players[1].player}`} target="_blank" rel="noreferrer">{players[1].player}</a> | <span className="MatchGameCard-rating">{players[1].rating}</span></h5>
                        {result ? <h5>{result.player1}</h5> : null}
                    </div>
                    <div className="MatchGameCard-player-container">
                        <h5><span className={`MatchGameCard-color MatchGameCard-${players[2].color}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;<a className="MatchGameCard-link" href={`https://lichess.org/@/${players[2].player}`} target="_blank" rel="noreferrer">{players[2].player}</a> | <span className="MatchGameCard-rating">{players[2].rating}</span></h5>
                        {result ? <h5>{result.player2}</h5> : null}
                    </div>
                </CardBody>
                {result ? (
                    <CardBody className="MatchGameCard-button-container">
                        <div>
                            {result.player1 !== 0 || result.player2 !== 0 ? (
                                <Button color="secondary" outline onClick={() => followExternalLink(game.url)}>View game</Button>
                            ) : (
                                    <div className="MatchGameCard-double-forfeit"><h5>Double forfeit</h5><h5>No game</h5></div>
                                )}
                        </div>
                    </CardBody>
                ) : (
                        <div>
                            {loggedInUser ? (
                                <div>
                                    {loggedInUser.username === players[1].player || loggedInUser.username === players[2].player ? (
                                        <CardBody className="MatchGameCard-schedule"><TeamScheduler game={game} type={type} white={white} black={black} /></CardBody>
                                    ) : (
                                            <div>
                                                {result ? null : (
                                                    <div>
                                                        {game.schedule ? <CardBody className="MatchGameCard-schedule"><h6>{parseDate(new Date(game.schedule))}</h6></CardBody> : null}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                </div>) : null}
                        </div>
                    )}
            </Card>
        </div>
    )
}

export default MatchGameCard;