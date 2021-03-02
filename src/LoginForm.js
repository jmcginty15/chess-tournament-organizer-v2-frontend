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
import { login } from './actions/users';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css';

// Form component for logging in
const LoginForm = () => {
    const dispatch = useDispatch();
    const errMessage = useSelector(state => state.users.errMessage);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(login(formData.username, formData.password));
    }

    return (
        <div className="LoginForm">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Login</CardTitle>
                </CardBody>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" name="username" placeholder="Username" autoComplete="off" required value={formData.email} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" name="password" placeholder="Password" autoComplete="off" required value={formData.password} onChange={handleChange} />
                        </FormGroup>
                        {errMessage ? <div className="LoginForm-alert-container"><p className="LoginForm-alert"><em>{errMessage}</em></p></div> : null}
                        <Button type="submit" color="secondary" outline>Login</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default LoginForm;