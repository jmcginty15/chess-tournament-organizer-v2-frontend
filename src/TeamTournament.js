import { Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTeamTournament } from './actions/team_tournaments';
import TournamentInfo from './TournamentInfo';
import EntryList from './EntryList';
import TeamList from './TeamList';
import './TeamTournament.css';

const TeamTournament = ({ id }) => {
    const [activeTab, setActiveTab] = useState('1');
    const tournament = useSelector(state => state.tournaments.tournament);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTeamTournament(id));
    }, [id]);

    const toggleTabs = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    console.log(tournament);

    return (
        <div className="TeamTournament">
            {tournament && tournament.id === id && tournament.teamSize ? (
                <div>
                    <h1>{tournament.name}</h1>
                    <div className="TeamTournament-body">
                        <TournamentInfo tournament={tournament} />
                        <Nav tabs className="TeamTournament-nav">
                            <NavItem>
                                <NavLink className="TeamTournament-tab" active={activeTab === '1'} onClick={() => toggleTabs('1')}>Entries</NavLink>
                            </NavItem>
                            {tournament.currentRound > 0 ? (
                                <NavItem>
                                    <NavLink className="TeamTournament-tab" active={activeTab === '2'} onClick={() => toggleTabs('2')}>Standings</NavLink>
                                </NavItem>
                            ) : null}
                            <TabContent activeTab={activeTab} className="TeamTournament-nav-content">
                                <TabPane tabId="1"><EntryList entries={tournament.entries} /></TabPane>
                                {tournament.currentRound > 0 ? (
                                    <TabPane tabId="2">
                                        <Card>
                                            <CardBody className="TeamTournament-round-indicator">
                                                <h6>Standings after {tournament.currentRound - 1} round{tournament.currentRound - 1 === 1 ? '' : 's'}</h6>
                                            </CardBody>
                                            <TeamList teams={tournament.teams} />
                                        </Card>
                                    </TabPane>
                                ) : null}
                            </TabContent>
                        </Nav>
                    </div>
                </div>
            ) : null}

        </div>
    )
}

export default TeamTournament;