import { Card, CardBody } from 'reactstrap';
import GameCard from './GameCard';
import './GameList.css';

const GameList = ({ games, type }) => {
    return (
        <div className="GameList">
            <Card>
                <CardBody>
                    {games.map(game => <GameCard key={game.id} game={game} type={type} />)}
                </CardBody>
            </Card>
        </div>
    )
}

export default GameList;