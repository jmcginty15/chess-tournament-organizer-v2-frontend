import { Card, CardBody, CardTitle } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from './actions/config';
import axios from 'axios';
import MemberCard from './MemberCard';
import NameChangeField from './NameChangeField';
import { checkMember } from './helpers/teams';
import './TeamInfo.css';

// Team info page
const TeamInfo = () => {
    const [team, setTeam] = useState(null);
    const [tournament, setTournament] = useState(null);
    const [isMember, setIsMember] = useState(false);
    const [reloadTeam, setReloadTeam] = useState(true);
    const { id } = useParams();
    const loggedInUser = useSelector(state => state.users.loggedInUser);

    useEffect(() => {
        if (reloadTeam) {
            axios.get(`${BASE_URL}/teams/${id}`)
                .then(res => {
                    setTeam(res.data.team);
                    axios.get(`${BASE_URL}/tournaments/team/${res.data.team.tournament}`)
                        .then(res => setTournament(res.data.tournament));
                });
            setReloadTeam(false);
        }
    }, [id, reloadTeam]);

    useEffect(() => {
        if (team && loggedInUser) {
            setIsMember(checkMember(loggedInUser, team));
        }
    }, [team, loggedInUser]);

    return (
        <div className="TeamInfo">
            {team ? (
                <Card>
                    <CardBody>
                        <CardTitle tag="h3">
                            {team.name} | <span className="TeamInfo-rating">{team.rating.toFixed(0)}</span>
                        </CardTitle>
                        {tournament ? <CardTitle tag="h5">{tournament.name}</CardTitle> : null}
                    </CardBody>
                    <CardBody>
                        {team.members.map((member, idx) => <MemberCard key={member.id} member={member} board={idx + 1} />)}
                    </CardBody>
                    <CardBody>
                        {isMember ? (
                            <NameChangeField reloadTeam={setReloadTeam} teamId={team.id} token={loggedInUser._token} />
                        ) : (
                                <h6>Only members of this team are able to change the team name</h6>
                            )}
                    </CardBody>
                </Card>
            ) : null}
        </div>
    )
}

export default TeamInfo;