import { Button, Card, CardBody } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from './actions/config';
import axios from 'axios';
import { parseResult } from './helpers/games';
import { parseDate } from './helpers/dates';
import Scheduler from './Scheduler';
import './GameCard.css';

// Card component for displaying tournament games
const GameCard = ({ game, type }) => {
    const history = useHistory();
    const endpoint = type === 'I' ? 'ind' : 'team';
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const [white, setWhite] = useState(null);
    const [black, setBlack] = useState(null);
    const result = game.result ? parseResult(game.result) : null;
    const followLink = (route) => history.push(route);
    const followExternalLink = (url) => window.open(url, '_blank');

    useEffect(() => {
        axios.get(`${BASE_URL}/entries/${endpoint}/${game.white}`)
            .then(res => setWhite(res.data.entry));
        axios.get(`${BASE_URL}/entries/${endpoint}/${game.black}`)
            .then(res => setBlack(res.data.entry));
    }, [game, endpoint]);

    return (
        <div className="GameCard">
            <Card>
                <CardBody className="GameCard-body">
                    <div>
                        {white ? <h4 className="GameCard-rating GameCard-top">{white.place}</h4> : null}
                        {black ? <h4 className="GameCard-rating">{black.place}</h4> : null}
                    </div>
                    <div>
                        {white ? <h4 className="GameCard-top">{black ? <span className="GameCard-color GameCard-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : null}&nbsp;<a className="GameCard-link" href={`https://lichess.org/@/${white.player}`} target="_blank" rel="noreferrer">{white.player}</a> | <span className="GameCard-rating">{white.rating}</span> {loggedInUser && loggedInUser.username !== white.player && <Button className="GameCard-button" color="secondary" outline size="sm" onClick={() => followLink(`/users/${white.player}`)}>Contact</Button>}</h4> : null}
                        {black ? <h4><span className="GameCard-color GameCard-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;<a className="GameCard-link" href={`https://lichess.org/@/${black.player}`} target="_blank" rel="noreferrer">{black.player}</a> | <span className="GameCard-rating">{black.rating}</span> {loggedInUser && loggedInUser.username !== black.player && <Button className="GameCard-button" color="secondary" outline size="sm" onClick={() => followLink(`/users/${black.player}`)}>Contact</Button>}</h4> : <h4>Bye</h4>}
                    </div>
                    <div>
                        {result ? <h4 className="GameCard-top GameCard-score">{result.white}</h4> : null}
                        {result ? <h4 className="GameCard-score">{result.black}</h4> : null}
                    </div>
                    {result ? (
                        <div>
                            {black && (result.white !== 0 || result.black !== 0) ? (
                                <div>
                                    {game.url ? (
                                        <Button className="GameCard-button" color="secondary" outline onClick={() => followExternalLink(game.url)}>View game</Button>
                                    ) : (
                                        <div className="GameCard-button-container">
                                            <h5>Forfeit</h5>
                                            <h5>No game</h5>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                    <div className="GameCard-double-forfeit">{black ? <h5>Double forfeit</h5> : <h5>Bye</h5>}<h5>No game</h5></div>
                                )}
                        </div>
                    ) : (
                            <div className="GameCard-button-container">
                                {loggedInUser ? (
                                    <div>
                                        {(white && black) && (loggedInUser.username === white.player || loggedInUser.username === black.player) ? <Scheduler game={game} type={type} white={white.player} black={black.player} /> : (
                                            <div>{game.schedule ? <h5>{parseDate(new Date(game.schedule))}</h5> : null}</div>
                                        )}
                                    </div>
                                ) : <div>{game.schedule ? <h5>{parseDate(new Date(game.schedule))}</h5> : null}</div>}
                            </div>
                        )}
                </CardBody>
            </Card>
        </div>
    )
}

export default GameCard;