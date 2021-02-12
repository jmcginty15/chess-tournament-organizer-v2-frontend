import { Card, CardBody } from 'reactstrap';
import { useEffect, useState } from 'react';
import { BASE_URL } from './actions/config';
import axios from 'axios';
import './GameCard.css';

const GameCard = ({ game, type }) => {
    const endpoint = type === 'I' ? 'ind' : 'team';
    const [white, setWhite] = useState(null);
    const [black, setBlack] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/entries/${endpoint}/${game.white}`)
            .then(res => setWhite(res.data.entry));
        axios.get(`${BASE_URL}/entries/${endpoint}/${game.black}`)
            .then(res => setBlack(res.data.entry));
    }, [game]);

    return (
        <div className="GameCard">
            <Card>
                <CardBody className="GameCard-body">
                    {white ? <h1>{white.player}</h1> : null}
                    {black ? <h1>{black.player}</h1> : null}
                </CardBody>
            </Card>
        </div>
    )
}

export default GameCard;