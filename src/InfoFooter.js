import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';

const InfoFooter = ({ started, full, alreadyEntered, handleClick }) => {
    const loggedInUser = useSelector(state => state.users.loggedInUser);

    return (
        <div className="InfoFooter">
            {alreadyEntered ? <h5>You have entered this tournament</h5> : (
                <div>
                    {started ? <h5>This tournament is already started</h5> : (
                        <div>
                            {full ? <h5>This tournament is full</h5> : (
                                <div>
                                    {loggedInUser ? (
                                        <Button outline color="secondary" onClick={handleClick}>Enter this tournament</Button>
                                    ) : (
                                            <Button outline color="secondary" onClick={handleClick}>Log in to enter this tournament</Button>
                                        )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default InfoFooter;
