import { Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './MemberCard.css';

const MemberCard = ({ member, board }) => {
    const history = useHistory();
    const followLink = (route) => history.push(route);

    return (
        <div className="MemberCard">
            <Card>
                <CardBody className="MemberCard-body">
                    <h4 className="MemberCard-rating">{board}</h4>
                    <h4><a className="MemberCard-link" href="" onClick={() => followLink(`/users/${member.player}`)}>{member.player}</a> | <span className="MemberCard-rating">{member.rating}</span></h4>
                </CardBody>
            </Card>
        </div>
    )
}

export default MemberCard;