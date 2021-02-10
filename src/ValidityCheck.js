import './SignupForm.css';

const ValidityCheck = ({ validity }) => {
    if (!validity) return <p className="SignupForm-alert"><em>Username does not exist on Lichess.org</em></p>
    else if (validity === 1) return <p className="SignupForm-check"><em>Username is valid</em></p>
    else if (validity === 2) return <p className="SignupForm-notice"><em>Checking username validity...</em></p>
}

export default ValidityCheck;