import { Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTournament } from './actions/ind_tournaments';
import TournamentInfo from './TournamentInfo';
import EntryList from './EntryList';
import StandingsList from './StandingsList';
import DirectorTools from './DirectorTools';
import RoundSelect from './RoundSelect';
import './IndTournament.css';

const IndTournament = ({ id }) => {
    const [activeTab, setActiveTab] = useState('1');
    const tournament = useSelector(state => state.tournaments.tournament);
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTournament(id));
    }, [id]);

    const toggleTabs = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="IndTournament">
            {tournament && tournament.id === id && !tournament.teamSize ? (
                <div>
                    <h1>{tournament.name}</h1>
                    <div className="IndTournament-body">
                        <TournamentInfo tournament={tournament} />
                        <Nav tabs className="IndTournament-nav">
                            <NavItem>
                                <NavLink className="IndTournament-tab" active={activeTab === '1'} onClick={() => toggleTabs('1')}>Entries</NavLink>
                            </NavItem>
                            {tournament.currentRound > 0 ? (
                                <NavItem>
                                    <NavLink className="IndTournament-tab" active={activeTab === '2'} onClick={() => toggleTabs('2')}>{tournament.ended ? 'Results' : 'Standings'}</NavLink>
                                </NavItem>
                            ) : null}
                            {tournament.currentRound > 0 ? (
                                <NavItem>
                                    <NavLink className="IndTournament-tab" active={activeTab === '3'} onClick={() => toggleTabs('3')}>Rounds</NavLink>
                                </NavItem>
                            ) : null}
                            {loggedInUser ? (
                                <div>
                                    {tournament.director === loggedInUser.username ? (
                                        <NavItem>
                                            <NavLink className="IndTournament-tab" active={activeTab === '4'} onClick={() => toggleTabs('4')}>Director tools</NavLink>
                                        </NavItem>
                                    ) : null}
                                </div>) : null}
                            <TabContent activeTab={activeTab} className="IndTournament-nav-content">
                                <TabPane tabId="1"><EntryList entries={tournament.entries} /></TabPane>
                                {tournament.currentRound > 0 ? (
                                    <TabPane tabId="2">
                                        <Card>
                                            <CardBody className="IndTournament-round-indicator">
                                                {tournament.ended ? <h6>Final standings</h6> : <h6>Standings after {tournament.currentRound - 1} round{tournament.currentRound - 1 === 1 ? '' : 's'}</h6>}
                                            </CardBody>
                                            <StandingsList entries={tournament.entries} ended={!!tournament.ended} />
                                        </Card>
                                    </TabPane>
                                ) : null}
                                {tournament.currentRound > 0 ? (
                                    <TabPane tabId="3"><Card><RoundSelect type="I" currentRound={tournament.currentRound} /></Card></TabPane>
                                ) : null}
                                {tournament.director === loggedInUser.username ? (
                                    <TabPane tabId="4"><DirectorTools type="I" /></TabPane>
                                ) : null}
                            </TabContent>
                        </Nav>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default IndTournament;