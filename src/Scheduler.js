import { Input, Button } from 'reactstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parseDate } from './helpers/dates';
import { parseUrl } from './helpers/strings';
import { checkCorrectGame } from './helpers/games';
import { scheduleGame, reportGame } from './actions/ind_games';
import GameValidityCheck from './GameValidityCheck';
import moment from 'moment';
import axios from 'axios';
import './Scheduler.css';

const currentDate = moment();
let timeout = null;

const Scheduler = ({ game, type, white, black }) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const tournament = useSelector(state => state.tournaments.tournament);
    const BASE_URL = useSelector(state => state.config.apiRequestUrl);
    const [schedule, setSchedule] = useState(currentDate.format('YYYY-MM-DDTHH:mm'));
    const [gameUrl, setGameUrl] = useState('');
    const [inputShown, setInputShown] = useState(false);
    const [showValidity, setShowValidity] = useState(false);
    const [reportFieldShown, setReportFieldShown] = useState(false);
    const [validUrl, setValidUrl] = useState(0);
    const handleChange = (evt) => setSchedule(evt.target.value);
    const showScheduleInput = () => setInputShown(true);
    const showReportField = () => setReportFieldShown(true);
    
    const handleClick = () => {
        setInputShown(false);
        let formattedSchedule = moment(schedule);
        formattedSchedule = formattedSchedule.utc().format();
        dispatch(scheduleGame(game.id, formattedSchedule, loggedInUser._token));
    }

    const handleCancel = () => {
        setReportFieldShown(false);
        setInputShown(false);
    }

    const checkValidity = (evt) => {
        setGameUrl(evt.target.value);
        setValidUrl(2);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            checkUrl(evt.target.value)
                .then(res => {
                    if (res) setValidUrl(res);
                    else setValidUrl(0);
                });
            setShowValidity(!!evt.target.value);
        }, 1000);
    }

    const checkUrl = async (url) => {
        const gameId = parseUrl(url);
        try {
            const res = await axios.get(`${BASE_URL}/game/export/${gameId}`);
            const validity = checkCorrectGame(res.data, white, black, tournament.timeControl);
            return validity;
        } catch {
            return false;
        }
    }

    const handleSubmit = () => {
        if (validUrl !== 1) setValidUrl(-4);
        else {
            setShowValidity(false);
            if (type === 'I' ) dispatch(reportGame(game.id, parseUrl(gameUrl), loggedInUser._token));
        }
    }

    return (
        <div className="Scheduler">
            {game.schedule ? (
                <div>
                    {inputShown ? (
                        <div>
                            <Input className="Scheduler-input" value={schedule} type="datetime-local" onChange={handleChange} />
                            <Button className="Scheduler-button" type="button" color="secondary" outline onClick={handleClick}>Confirm</Button>
                            <Button className="Scheduler-button Scheduler-cancel" type="button" color="danger" outline onClick={handleCancel}>Cancel</Button>
                        </div>
                    ) : (
                            <div>
                                {reportFieldShown ? (
                                    <div>
                                        <p className="Scheduler-note">Copy and paste the game URL below</p>
                                        {showValidity ? <GameValidityCheck validity={validUrl} /> : null}
                                        <Input type="text" placeholder="Game URL" value={gameUrl} onChange={checkValidity} />
                                        <Button className="Scheduler-button Scheduler-report" type="button" color="success" outline onClick={handleSubmit}>Submit</Button>
                                        <Button className="Scheduler-button Scheduler-cancel" type="button" color="danger" outline onClick={handleCancel}>Cancel</Button>
                                    </div>
                                ) : (
                                        <div>
                                            <h5>{parseDate(new Date(game.schedule))}</h5>
                                            <Button className="Scheduler-button" type="button" color="secondary" outline onClick={showScheduleInput}>Reschedule</Button>
                                            <Button className="Scheduler-button Scheduler-report" type="button" color="success" outline onClick={showReportField}>Report result</Button>
                                        </div>
                                    )}
                            </div>
                        )}
                </div>
            ) : (
                    <div>
                        <Input className="Scheduler-input" value={schedule} type="datetime-local" onChange={handleChange} />
                        <Button className="Scheduler-button" type="button" color="secondary" outline onClick={handleClick}>Schedule game</Button>
                    </div>
                )
            }
        </div >
    )
}

export default Scheduler;