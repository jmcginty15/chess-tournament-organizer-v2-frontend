import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sortMatches } from './helpers/matches';
import MatchList from './MatchList';
import './TeamRoundSelect.css';

const TeamRoundSelect = ({ type, currentRound }) => {
    const tournament = useSelector(state => state.tournaments.tournament);
    const [rounds, setRounds] = useState(null);
    const [activeTab, setActiveTab] = useState(`${currentRound}`);

    const toggleTabs = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => {
        if (tournament) setRounds(sortMatches(tournament.matches));
    }, [tournament]);

    return (
        <div className="TeamRoundSelect">
            {rounds ? (
                <Nav tabs className="TeamRoundSelect-nav">
                    {Object.keys(rounds).map(round => (
                        <NavItem key={round}>
                            <NavLink className="TeamRoundSelect-tab" active={activeTab === `${round}`} onClick={() => toggleTabs(`${round}`)}>Round {round}</NavLink>
                        </NavItem>
                    ))}
                    <TabContent activeTab={activeTab} className="TeamRoundSelect-nav-content">
                        {Object.keys(rounds).map(round => (
                            <TabPane key={round} tabId={`${round}`}><MatchList matches={rounds[round]} type={type} /></TabPane>
                        ))}
                    </TabContent>
                </Nav>
            ) : null}
        </div>
    )
}

export default TeamRoundSelect;