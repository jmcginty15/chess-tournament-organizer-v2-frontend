import { Button, Card, CardBody } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from './actions/config';
import { assignForfeit } from './actions/ind_games';
import { assignTeamForfeit } from './actions/team_games';
import axios from 'axios';
import { parseResult } from './helpers/games';
import { parseDate } from './helpers/dates';
import './ForfeitSelectCard.css';

// Card component for assigning forfeits
const ForfeitSelectCard = ({ game, type }) => {
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [winner, setWinner] = useState(null);
    const endpoint = type === 'I' ? 'ind' : 'team';
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const [white, setWhite] = useState(null);
    const [black, setBlack] = useState(null);
    const result = game.result ? parseResult(game.result) : null;
    const followExternalLink = (url) => window.open(url, '_blank');
    const handleChange = (evt) => setWinner(evt.target.value);

    useEffect(() => {
        axios.get(`${BASE_URL}/entries/${endpoint}/${game.white}`)
            .then(res => setWhite(res.data.entry));
        axios.get(`${BASE_URL}/entries/${endpoint}/${game.black}`)
            .then(res => setBlack(res.data.entry));
    }, [game, endpoint]);

    const handleSubmit = () => {
        if (!winner) setShowAlert(true);
        else {
            setShowAlert(false);
            if (type === 'I') dispatch(assignForfeit(game.id, winner, loggedInUser._token));
            else if (type === 'T') dispatch(assignTeamForfeit(game.id, winner, loggedInUser._token));
        }
    }

    return (
        <div className="ForfeitSelectCard">
            <Card>
                <CardBody className="ForfeitSelectCard-body">
                    {result ? <div /> : (
                        <div>
                            <div className="ForfeitSelectCard-input-container">
                                <input className="ForfeitSelectCard-input" type="radio" id="white" name={`game-${game.id}`} value="white" onChange={handleChange} />
                            </div>
                            <div className="ForfeitSelectCard-input-container">
                                <input className="ForfeitSelectCard-input" type="radio" id="black" name={`game-${game.id}`} value="black" onChange={handleChange} />
                            </div>
                        </div>
                    )}
                    <label htmlFor="white">
                        {white ? <h4 className="ForfeitSelectCard-rating ForfeitSelectCard-top">{white.place}</h4> : null}
                        {black ? <h4 className="ForfeitSelectCard-rating">{black.place}</h4> : null}
                    </label>
                    <label htmlFor="black">
                        {white ? <h4 className="ForfeitSelectCard-top">{black ? <span className="ForfeitSelectCard-color ForfeitSelectCard-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : null}&nbsp;<a className="ForfeitSelectCard-link" href={`https://lichess.org/@/${white.player}`} target="_blank" rel="noreferrer">{white.player}</a> | <span className="ForfeitSelectCard-rating">{white.rating}</span></h4> : null}
                        {black ? <h4><span className="ForfeitSelectCard-color ForfeitSelectCard-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;<a className="ForfeitSelectCard-link" href={`https://lichess.org/@/${black.player}`} target="_blank" rel="noreferrer">{black.player}</a> | <span className="ForfeitSelectCard-rating">{black.rating}</span></h4> : <h4>Bye</h4>}
                    </label>
                    <div>
                        {result ? <h4 className="ForfeitSelectCard-top">{result.white}</h4> : null}
                        {result ? <h4>{result.black}</h4> : null}
                    </div>
                    {result ? (
                        <div>
                            {black && (result.white !== 0 || result.black !== 0) ? (
                                <div>
                                    {game.url ? (
                                        <Button className="ForfeitSelectCard-button" color="secondary" outline onClick={() => followExternalLink(game.url)}>View game</Button>
                                    ) : (
                                        <div className="ForfeitSelectCard-button-container">
                                            <h5>Forfeit</h5>
                                            <h5>No game</h5>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="ForfeitSelectCard-double-forfeit">{black ? <h5>Double forfeit</h5> : <h5>Bye</h5>}<h5>No game</h5></div>
                            )}
                        </div>
                    ) : (
                        <div className="ForfeitSelectCard-button-container">
                            {loggedInUser ? (
                                <div>
                                    <Button color="secondary" outline onClick={handleSubmit}>Assign forfeit</Button>
                                    {showAlert ? <p className="ForfeitSelectCard-alert"><em>Please select a winner</em></p> : null}
                                </div>
                            ) : <div>{game.schedule ? <h5>{parseDate(new Date(game.schedule))}</h5> : null}</div>}
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    )
}

export default ForfeitSelectCard;