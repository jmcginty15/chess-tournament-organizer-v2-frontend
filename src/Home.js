import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/users';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Home.css';

const Home = () => {
    const app = useSelector(state => state.config.app);
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
    }

    const followLink = (route) => history.push(route);

    return (
        <div className="Home">
            <h1>Welcome to {app.name}!</h1>
            <h3>{app.tagline}</h3>
            {loggedInUser ? (
                <Card className="Home-card-container">
                    <CardBody>
                        <CardTitle tag="h4">
                            Welcome {loggedInUser.username}
                        </CardTitle>
                        <Button color="secondary" outline onClick={() => followLink(`/users/${loggedInUser.username}`)}>My profile</Button>
                        <Button color="danger" outline onClick={handleLogout}>Logout</Button>
                    </CardBody>
                </Card>
            ) : (
                    <Card className="Home-card-container">
                        <div className="Home-card">
                            <div className="Home-form-container">
                                <LoginForm />
                            </div>
                            <div className="Home-form-container">
                                <SignupForm />
                            </div>
                        </div>
                    </Card>
                )}
        </div>
    )
}

export default Home;