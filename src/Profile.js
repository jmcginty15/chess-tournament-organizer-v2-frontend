import { useParams } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { username } = useParams();

    return (
        <div className="Profile">
            {username ? <h1>{username} profile</h1> : null}
        </div>
    )
}

export default Profile;