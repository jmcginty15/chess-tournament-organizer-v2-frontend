import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sortGames } from './helpers/games';
import GameList from './GameList';
import './RoundSelect.css';

// Displays a set of tabs corresponding to the rounds of a tournament
const RoundSelect = ({ type, currentRound }) => {
    const tournament = useSelector(state => state.tournaments.tournament);
    const [rounds, setRounds] = useState(null);
    const [activeTab, setActiveTab] = useState(`${currentRound}`);

    const toggleTabs = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => {
        if (tournament) setRounds(sortGames(tournament.games));
    }, [tournament]);

    return (
        <div className="RoundSelect">
            {rounds ? (
                <Nav tabs className="RoundSelect-nav">
                    {Object.keys(rounds).map(round => (
                        <NavItem>
                            <NavLink className="RoundSelect-tab" active={activeTab === `${round}`} onClick={() => toggleTabs(`${round}`)}>Round {round}</NavLink>
                        </NavItem>
                    ))}
                    <TabContent activeTab={activeTab} className="RoundSelect-nav-content">
                        {Object.keys(rounds).map(round => (
                            <TabPane key={round} tabId={`${round}`}><GameList games={rounds[round]} type={type} /></TabPane>
                        ))}
                    </TabContent>
                </Nav>
            ) : null}
        </div>
    )
}

export default RoundSelect;