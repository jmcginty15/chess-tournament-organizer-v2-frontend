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
import axios from 'axios';
import './SignupForm.css';

let timeout = null;

// Form component for registering new users
const SignupForm = () => {
    const dispatch = useDispatch();
    const [mismatch, setMismatch] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [showValidity, setShowValidity] = useState(false);
    const [validUsername, setValidUsername] = useState(0);
    const errMessage = useSelector(state => state.users.errMessage);
    const BASE_URL = useSelector(state => state.config.apiRequestUrl);

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
        if (evt.target.name === 'username') {
            setValidUsername(2);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                checkUsername(evt.target.value)
                    .then(res => {
                        if (res) setValidUsername(1);
                        else setValidUsername(0);
                    });
                setShowValidity(!!evt.target.value);
            }, 1000);
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (formData.password === formData.confirmPassword) {
            setMismatch(false);
            const user = {
                ...formData,
            };
            dispatch(register(user));
        } else setMismatch(true);
    }

    const checkUsername = async (username) => {
        try {
            await axios.get(`${BASE_URL}/api/user/${username}`);
            return true;
        } catch {
            return false;
        }
    }

    return (
        <div className="SignupForm">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Sign Up</CardTitle>
                </CardBody>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
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
                            <Input type="email" name="email" placeholder="Email" autoComplete="off" required value={formData.email} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="username">
                                Username
                                <p className="SignupForm-notice"><em>Must be the same as your Lichess.org username</em></p>
                                {showValidity ? <ValidityCheck validity={validUsername} /> : null}
                            </Label>
                            <Input type="text" name="username" placeholder="Username" autoComplete="off" required value={formData.username} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" name="password" placeholder="Password" autoComplete="off" required value={formData.password} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="confirmPassword">
                                Confirm password
                                {mismatch ? <p className="SignupForm-alert"><em>* Passwords must match</em></p> : null}
                            </Label>
                            <Input type="password" name="confirmPassword" placeholder="Confirm password" autoComplete="off" required value={formData.confirmPassword} onChange={handleChange} />
                        </FormGroup>
                        {errMessage ? <div className="SignupForm-alert-container"><p className="SignupForm-alert"><em>{errMessage}</em></p></div> : null}
                        <Button type="submit" color="secondary" outline>Sign Up</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default SignupForm;