import './Scheduler.css';

const ValidityCheck = ({ validity }) => {
    if (!validity) return <p className="Scheduler-alert"><em>Invalid URL<br />
        Be sure to copy and paste the entire URL from your finished game</em></p>
    else if (validity === 1) return <p className="Scheduler-check"><em>URL is valid</em></p>
    else if (validity === 2) return <p className="Scheduler-notice"><em>Checking URL validity...</em></p>
    else if (validity === -1) return <p className="Scheduler-alert"><em>The players' colors for the game at this URL do not match the colors for the scheduled game<br />
        Please make sure you are entering the correct URL</em></p>
    else if (validity === -2) return <p className="Scheduler-alert"><em>The participants in the game at this URL do not match the participants for the scheduled game<br />
        Please make sure you are entering the correct URL</em></p>
    else if (validity === -3) return <p className="Scheduler-alert"><em>The time control for this game does not match the time control of the tournament<br />
        Please make sure you are entering the correct URL</em></p>
    else if (validity === -4) return <p className="Scheduler-alert"><em>Can't report a game with an invalid URL<br />
        Please double check the URL, or contact the Tournament Director if this is a mistake</em></p>
}

export default ValidityCheck;