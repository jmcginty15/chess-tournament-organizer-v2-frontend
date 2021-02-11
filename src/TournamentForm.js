import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import ValidityCheck from './ValidityCheck';
import { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './actions/users';
import IndSubForm from './IndSubForm';
import TeamSubForm from './TeamSubForm';
import axios from 'axios';
import { processFormData } from './helpers/forms';
import { createTournament } from './actions/ind_tournaments';
import './TournamentForm.css';

const openDate = moment();
const closeDate = moment();
closeDate.add(7, 'd');

const TournamentForm = () => {
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const dispatch = useDispatch();
    const [missingTimeControl, setMissingTimeControl] = useState(false);
    const [customTimeControl, setCustomTimeControl] = useState({
        ind: '45|45',
        team: '45|45'
    });
    const [formData, setFormData] = useState({
        tournamentType: '',
        ind: {
            name: '',
            timeControl: '',
            minPlayers: 4,
            maxPlayers: 20,
            rounds: 3,
            roundLength: 7,
            registrationOpen: openDate.format('YYYY-MM-DDTHH:mm'),
            registrationClose: closeDate.format('YYYY-MM-DDTHH:mm'),
            startDate: closeDate.format('YYYY-MM-DDTHH:mm')
        },
        team: {
            name: '',
            timeControl: '',
            teamSize: 4,
            minPlayers: 12,
            maxPlayers: 24,
            rounds: 2,
            roundLength: 7,
            registrationOpen: openDate.format('YYYY-MM-DDTHH:mm'),
            registrationClose: closeDate.format('YYYY-MM-DDTHH:mm'),
            startDate: closeDate.format('YYYY-MM-DDTHH:mm')
        }
    });

    const handleChange = (evt) => {
        if (evt.form === 'ind') {
            if (evt.customTimeControl) {
                setCustomTimeControl({
                    ...customTimeControl,
                    ind: evt.customTimeControl
                });
            } else {
                setFormData({
                    ...formData,
                    ind: {
                        ...formData.ind,
                        [evt.target.name]: evt.target.value
                    }
                });
            }
        } else if (evt.form === 'team') {
            if (evt.customTimeControl) {
                setCustomTimeControl({
                    ...customTimeControl,
                    team: evt.customTimeControl
                });
            } else {
                if (evt.target.name === 'teamSize') {
                    formData.team.minPlayers = evt.target.value * 3;
                    formData.team.maxPlayers = evt.target.value * 6;
                }

                setFormData({
                    ...formData,
                    team: {
                        ...formData.team,
                        [evt.target.name]: evt.target.value
                    }
                });
            }
        } else {
            setFormData({
                ...formData,
                [evt.target.name]: evt.target.value
            });
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const type = formData.tournamentType;
        const data = processFormData({ ...formData[type] }, customTimeControl[type], loggedInUser);
        if (!data.timeControl) setMissingTimeControl(true);
        else {
            setMissingTimeControl(false);
            dispatch(createTournament(data));
        }
    }

    return (
        <div className="TournamentForm">
            <Card>
                <CardBody className="TournamentForm-title">
                    <CardTitle tag="h1">Create a tournament</CardTitle>
                    <hr className="TournamentForm-hr" />
                </CardBody>
                <CardBody className="TournamentForm-body">
                    <Form onSubmit={handleSubmit}>
                        <h6>Individual or Team tournament?</h6>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="tournamentType" value="ind" onChange={handleChange} />{' '}
                                Individual
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="tournamentType" value="team" onChange={handleChange} />{' '}
                                Team
                            </Label>
                        </FormGroup>
                        {formData.tournamentType === 'ind' ? <IndSubForm formData={formData.ind} tc={customTimeControl.ind} sendChange={handleChange} /> : null}
                        {formData.tournamentType === 'team' ? <TeamSubForm formData={formData.team} tc={customTimeControl.team} sendChange={handleChange} /> : null}
                        <hr />
                        {missingTimeControl ? <p className="TournamentForm-alert">Please select a time control</p> : null}
                        <Button type="submit" color="secondary" outline>Create tournament</Button>
                        <Button className="TournamentForm-cancel-button" type="button" color="danger" outline>Cancel</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default TournamentForm;