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
import { useDispatch, useSelector } from 'react-redux';
import { register } from './actions/users';
import IndSubForm from './IndSubForm';
import TeamSubForm from './TeamSubForm';
import axios from 'axios';
import './TournamentForm.css';

const TournamentForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        tournamentType: '',
        ind: {
            name: '',
            timeControl: '',
            minPlayers: 10,
            maxPlayers: 25,
            rounds: 4,
            roundLength: 7
        },
        team: {}
    });

    const handleChange = (evt) => {
        if (evt.form === 'ind') {
            setFormData({
                ...formData,
                ind: {
                    ...formData.ind,
                    [evt.target.name]: evt.target.value
                }
            });
        } else if (evt.form === 'team') {
            setFormData({
                ...formData,
                team: {
                    ...formData.team,
                    [evt.target.name]: evt.target.value
                }
            });
        } else {
            setFormData({
                ...formData,
                [evt.target.name]: evt.target.value
            });
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
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
                        {formData.tournamentType === 'ind' ? <IndSubForm formData={formData.ind} sendChange={handleChange} /> : null}
                        {formData.tournamentType === 'team' ? <TeamSubForm formData={formData.team} sendChange={handleChange} /> : null}
                        <hr />
                        <Button type="submit" color="secondary" outline>Sign Up</Button>
                        <Button className="TournamentForm-cancel-button" type="button" color="danger" outline>Cancel</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default TournamentForm;