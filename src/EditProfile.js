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
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from './actions/config';
import { updateUser } from './actions/users';
import './EditProfile.css';
import axios from 'axios';

const EditProfile = () => {
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const history = useHistory();
    const { username } = useParams();
    const dispatch = useDispatch();
    const [mismatch, setMismatch] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const errMessage = useSelector(state => state.users.errMessage);

    useEffect(() => {
        axios.get(`${BASE_URL}/users/${username}`, { _token: loggedInUser._token })
            .then(res => {
                const user = res.data.user;
                setFormData({
                    ...formData,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                })
            });
    }, [loggedInUser, username]);

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (formData.password === formData.confirmPassword) {
            setMismatch(false);
            const user = {
                ...formData,
            };
            delete user.confirmPassword;
            for (let key of Object.keys(user)) {
                if (user[key] === '') delete user[key];
            }
            dispatch(updateUser(username, user, loggedInUser._token));
            setFormData({
                ...formData,
                password: '',
                confirmPassword: ''
            });
            history.push(`/users/${username}`);
        } else setMismatch(true);
    }

    const handleCancel = () => history.push(`/users/${username}`);

    return (
        <div className="EditProfile">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Edit Profile</CardTitle>
                </CardBody>
                <CardBody>
                    <Form className="EditProfile-form" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="firstName">First name</Label>
                            <Input type="text" name="firstName" placeholder="First name" autoComplete="off" value={formData.firstName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input type="text" name="lastName" placeholder="Last name" autoComplete="off" value={formData.lastName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" name="email" placeholder="Email" autoComplete="off" value={formData.email} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">New password</Label>
                            <Input type="password" name="password" placeholder="Password" autoComplete="off" value={formData.password} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="confirmPassword">
                                Confirm new password
                                {mismatch ? <p className="SignupForm-alert"><em>* Passwords must match</em></p> : null}
                            </Label>
                            <Input type="password" name="confirmPassword" placeholder="Confirm password" autoComplete="off" value={formData.confirmPassword} onChange={handleChange} />
                        </FormGroup>
                        {errMessage ? <div className="SignupForm-alert-container"><p className="SignupForm-alert"><em>{errMessage}</em></p></div> : null}
                        <Button type="submit" color="secondary" outline>Submit</Button>
                        <Button className="EditProfile-cancel" type="button" color="danger" outline onClick={handleCancel}>Cancel</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default EditProfile;