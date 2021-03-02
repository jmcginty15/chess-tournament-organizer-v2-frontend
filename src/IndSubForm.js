import { FormGroup, Label, Input } from 'reactstrap';
import { useState, useEffect } from 'react';
import './TournamentForm.css';

// Subform component for creating individual tournaments
const IndSubForm = ({ formData, tc, sendChange }) => {
    const [customTimeControl, setCustomTimeControl] = useState({
        start: parseFloat(tc.slice(0, tc.indexOf('|'))),
        inc: parseFloat(tc.slice(tc.indexOf('|') + 1))
    });
    const [categoryName, setCategoryName] = useState('Classical');

    useEffect(() => {
        const start = parseFloat(customTimeControl.start);
        const inc = parseFloat(customTimeControl.inc) / 60;
        const adjustedTime = start + 40 * inc;
        let category = '';
        if (adjustedTime < 0.5) category = 'Ultrabullet';
        else if (adjustedTime < 3) category = 'Bullet';
        else if (adjustedTime < 8) category = 'Blitz';
        else if (adjustedTime < 25) category = 'Rapid';
        else category = 'Classical';
        setCategoryName(category);
    }, [customTimeControl]);

    const handleChange = (evt) => {
        evt.form = 'ind';
        sendChange(evt);
    }

    const handleCustomChange = (evt) => {
        const newTimeControl = {
            ...customTimeControl,
            [evt.target.name]: evt.target.value
        };
        setCustomTimeControl(newTimeControl);
        evt.customTimeControl = `${newTimeControl.start}|${newTimeControl.inc}`;
        handleChange(evt);
    }

    return (
        <div className="IndSubForm">
            <hr />
            <FormGroup>
                <Label>Tournament name:</Label>
                <Input type="text" name="name" value={formData.name} placeholder="Name" autoComplete="off" required onChange={handleChange} />
            </FormGroup>
            <Label>Time control:</Label>
            <div className="TournamentForm-timeControl-container">
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="1|0" onChange={handleChange} />{' '}
                        1|0 - Bullet
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="2|1" onChange={handleChange} />{' '}
                        2|1 - Bullet
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="3|0" onChange={handleChange} />{' '}
                        3|0 - Blitz
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="3|2" onChange={handleChange} />{' '}
                        3|2 - Blitz
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="5|0" onChange={handleChange} />{' '}
                        5|0 - Blitz
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="5|3" onChange={handleChange} />{' '}
                        5|3 - Blitz
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="10|0" onChange={handleChange} />{' '}
                        10|0 - Rapid
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="10|5" onChange={handleChange} />{' '}
                        10|5 - Rapid
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="15|10" onChange={handleChange} />{' '}
                        15|10 - Rapid
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="30|0" onChange={handleChange} />{' '}
                        30|0 - Classical
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="timeControl" value="30|20" onChange={handleChange} />{' '}
                        30|20 - Classical
                    </Label>
                </FormGroup>
            </div>
            <Label className="TournamentForm-custom-label" check>Custom - enter a starting time and increment</Label>
            <FormGroup check>
                <Label check>
                    <Input type="radio" name="timeControl" value="custom" onChange={handleChange} />{' '}
                    <Input className="TournamentForm-custom-tc" name="start" type="select" min="0" max="180" value={customTimeControl.start} onChange={handleCustomChange}>
                        <option className="TournamentForm-option" value={0}>0</option>
                        <option className="TournamentForm-option" value={0.25}>0.25</option>
                        <option className="TournamentForm-option" value={0.5}>0.5</option>
                        <option className="TournamentForm-option" value={0.75}>0.75</option>
                        <option className="TournamentForm-option" value={1}>1</option>
                        <option className="TournamentForm-option" value={1.5}>1.5</option>
                        <option className="TournamentForm-option" value={2}>2</option>
                        <option className="TournamentForm-option" value={3}>3</option>
                        <option className="TournamentForm-option" value={4}>4</option>
                        <option className="TournamentForm-option" value={5}>5</option>
                        <option className="TournamentForm-option" value={6}>6</option>
                        <option className="TournamentForm-option" value={7}>7</option>
                        <option className="TournamentForm-option" value={8}>8</option>
                        <option className="TournamentForm-option" value={9}>9</option>
                        <option className="TournamentForm-option" value={10}>10</option>
                        <option className="TournamentForm-option" value={11}>11</option>
                        <option className="TournamentForm-option" value={12}>12</option>
                        <option className="TournamentForm-option" value={13}>13</option>
                        <option className="TournamentForm-option" value={14}>14</option>
                        <option className="TournamentForm-option" value={15}>15</option>
                        <option className="TournamentForm-option" value={16}>16</option>
                        <option className="TournamentForm-option" value={17}>17</option>
                        <option className="TournamentForm-option" value={18}>18</option>
                        <option className="TournamentForm-option" value={19}>19</option>
                        <option className="TournamentForm-option" value={20}>20</option>
                        <option className="TournamentForm-option" value={25}>25</option>
                        <option className="TournamentForm-option" value={30}>30</option>
                        <option className="TournamentForm-option" value={35}>35</option>
                        <option className="TournamentForm-option" value={40}>40</option>
                        <option className="TournamentForm-option" value={45}>45</option>
                        <option className="TournamentForm-option" value={60}>60</option>
                        <option className="TournamentForm-option" value={75}>75</option>
                        <option className="TournamentForm-option" value={90}>90</option>
                        <option className="TournamentForm-option" value={105}>105</option>
                        <option className="TournamentForm-option" value={120}>120</option>
                        <option className="TournamentForm-option" value={135}>135</option>
                        <option className="TournamentForm-option" value={150}>150</option>
                        <option className="TournamentForm-option" value={165}>165</option>
                        <option className="TournamentForm-option" value={180}>180</option>
                    </Input>
                    {' | '}
                    <Input className="TournamentForm-custom-tc" name="inc" type="select" min="0" max="180" value={customTimeControl.inc} onChange={handleCustomChange}>
                        <option className="TournamentForm-option" value={0}>0</option>
                        <option className="TournamentForm-option" value={1}>1</option>
                        <option className="TournamentForm-option" value={2}>2</option>
                        <option className="TournamentForm-option" value={3}>3</option>
                        <option className="TournamentForm-option" value={4}>4</option>
                        <option className="TournamentForm-option" value={5}>5</option>
                        <option className="TournamentForm-option" value={6}>6</option>
                        <option className="TournamentForm-option" value={7}>7</option>
                        <option className="TournamentForm-option" value={8}>8</option>
                        <option className="TournamentForm-option" value={9}>9</option>
                        <option className="TournamentForm-option" value={10}>10</option>
                        <option className="TournamentForm-option" value={11}>11</option>
                        <option className="TournamentForm-option" value={12}>12</option>
                        <option className="TournamentForm-option" value={13}>13</option>
                        <option className="TournamentForm-option" value={14}>14</option>
                        <option className="TournamentForm-option" value={15}>15</option>
                        <option className="TournamentForm-option" value={16}>16</option>
                        <option className="TournamentForm-option" value={17}>17</option>
                        <option className="TournamentForm-option" value={18}>18</option>
                        <option className="TournamentForm-option" value={19}>19</option>
                        <option className="TournamentForm-option" value={20}>20</option>
                        <option className="TournamentForm-option" value={25}>25</option>
                        <option className="TournamentForm-option" value={30}>30</option>
                        <option className="TournamentForm-option" value={35}>35</option>
                        <option className="TournamentForm-option" value={40}>40</option>
                        <option className="TournamentForm-option" value={45}>45</option>
                        <option className="TournamentForm-option" value={60}>60</option>
                        <option className="TournamentForm-option" value={90}>90</option>
                        <option className="TournamentForm-option" value={120}>120</option>
                        <option className="TournamentForm-option" value={150}>150</option>
                        <option className="TournamentForm-option" value={180}>180</option>
                    </Input>
                    {' - '}<span id="category-name">{categoryName}</span>
                </Label>
            </FormGroup>
            <div className="TournamentForm-number-container">
                <FormGroup className="TournamentForm-number-group">
                    <Label>Minimum entries:</Label>{' '}
                    <Input className="TournamentForm-number-input" type="number" name="minPlayers" value={formData.minPlayers} autoComplete="off" min={0} max={parseInt(formData.maxPlayers) - 1} required onChange={handleChange} />
                </FormGroup>
                <FormGroup className="TournamentForm-number-group">
                    <Label>Number of rounds:</Label>{' '}
                    <Input className="TournamentForm-number-input" type="number" name="rounds" value={formData.rounds} autoComplete="off" min={1} max={parseInt(formData.minPlayers - 1)} required onChange={handleChange} />
                </FormGroup>
                <FormGroup className="TournamentForm-number-group">
                    <Label>Maximum entries:</Label>{' '}
                    <Input className="TournamentForm-number-input" type="number" name="maxPlayers" value={formData.maxPlayers} autoComplete="off" min={parseInt(formData.minPlayers) + 1} max={100} required onChange={handleChange} />
                </FormGroup>
                <FormGroup className="TournamentForm-number-group">
                    <Label>Days per round:</Label>{' '}
                    <Input className="TournamentForm-number-input" type="number" name="roundLength" value={formData.roundLength} autoComplete="off" min={1} max={14} required onChange={handleChange} />
                </FormGroup>
                <p className="TournamentForm-rounds-note">
                    Note: The optimal number of rounds for a Swiss system tournament is the binary logarithm of the
                    number of players rounded up. For example, for 5-8 players the optimal number of rounds is 3, for
                    9-16 players 4 rounds are optimal, for 17-32 players 5 rounds are optimal, for 33-64 players 6
                    rounds are optimal, and so on.
                </p>
                <p className="TournamentForm-rounds-note">
                    Additionally, the maximum number of rounds to guarantee valid sets of pairings throughout the
                    tournament is half the number of players rounded up. For example, for 5-6 players the maximum
                    number of rounds is 3, for 7-8 players the maximum is 4 rounds, for 9-10 players the maximum is 5
                    rounds, and so on.
                </p>
                <p className="TournamentForm-rounds-note">
                    Fewer rounds than the optimal number are possible, but may not guarantee a clear winner. More
                    rounds than the maximum are also possible, but as the number of rounds approaches the number of
                    players, it may not be possible to produce a valid set of pairings for the later rounds. If this
                    happens, you will be notified and the tournament will be ended early.
                </p>
            </div>
            <div className="TournamentForm-date-container">
                <FormGroup className="TournamentForm-date-input">
                    <Label>Registration open date:</Label>
                    <Input name="registrationOpen" type="datetime-local" value={formData.registrationOpen} onChange={handleChange}></Input>
                </FormGroup>
                <FormGroup className="TournamentForm-date-input">
                    <Label>Tournament start date:</Label>
                    <Input name="startDate" type="datetime-local" value={formData.startDate} onChange={handleChange}></Input>
                </FormGroup>
                <FormGroup className="TournamentForm-date-input">
                    <Label>Registration close date:</Label>
                    <Input name="registrationClose" type="datetime-local" value={formData.registrationClose} onChange={handleChange}></Input>
                </FormGroup>
            </div>
            <p className="TournamentForm-note">
                Note: The registration and start dates, as well as the number of days per round, are for reference and
                display purposes only. As the Tournament Director you will have control over when rounds start and end,
                and will be able to extend rounds or end them early if you choose.
            </p>
        </div>
    )
}

export default IndSubForm;