import { Input, Button, Form } from 'reactstrap';
import { useState } from 'react';
import { BASE_URL } from './actions/config';
import axios from 'axios';
import './NameChangeField.css';

// Form component for changing the name of a team
// Displays on the team page if the logged in user is a member of that team
const NameChangeField = ({ reloadTeam, teamId, token }) => {
    const [name, setName] = useState('');
    const handleChange = (evt) => setName(evt.target.value);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.patch(`${BASE_URL}/teams/${teamId}/rename`, { newName: name, _token: token })
            .then(() => reloadTeam(true));
        setName('');
    }

    return (
        <div className="NameChangeField">
            <Form className="NameChangeField-form" onSubmit={handleSubmit}>
                <Input className="NameChangeField-input" autoComplete="off" type="text" placeholder="Enter a new name for your team" value={name} onChange={handleChange} />
                <Button className="NameChangeField-button" type="button" outline color="secondary">Submit</Button>
            </Form>
        </div>
    )
}

export default NameChangeField;