import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from './actions/users';
import './NavBar.css';

const NavBar = () => {
    const history = useHistory();
    const app = useSelector(state => state.config.app);
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);
    const followLink = (route) => history.push(route);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
    }

    return (
        <div className="NavBar">
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand href="/"><span className="NavBar-icon">&#x2654;</span>{app.name}</NavbarBrand>
                <NavbarToggler onClick={toggleOpen} />
                <Collapse isOpen={open} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink className="NavBar-link" onClick={() => followLink('/about')}>About the site</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="NavBar" nav caret>
                                Tournaments
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={() => followLink('/tournaments/create')}>
                                    Create a tournament
                                </DropdownItem>
                                <DropdownItem onClick={() => followLink('/tournaments')}>
                                    Enter a tournament
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {loggedInUser ? (
                            <NavItem>
                                <NavLink className="NavBar-link" onClick={() => followLink(`/users/${loggedInUser.username}`)}><i className="fa fa-user" style={{ fontSize: '20px' }} /> {loggedInUser.username}</NavLink>
                            </NavItem>
                        ) : null}
                        {loggedInUser ? (
                            <NavItem>
                                <NavLink className="NavBar-link" onClick={handleLogout}>Logout</NavLink>
                            </NavItem>
                        ) : null}
                    </Nav>
                    <NavbarText>Chess tournaments for busy people</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;