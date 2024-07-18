import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import RoutePath from '../../routes/RoutePath';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null,
            dropdownOpen: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    async componentDidMount() {
        await this.populateState();
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        const userName = user && user.name ? user.name.split('@')[0] : null;
        this.setState({
            isAuthenticated,
            userName
        });
    }

    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { isAuthenticated, userName, dropdownOpen } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = `${ApplicationPaths.LogOut}`;
            const logoutState = { local: true };
            return this.authenticatedView(userName, profilePath, logoutPath, logoutState, dropdownOpen);
        }
    }

    authenticatedView(userName, profilePath, logoutPath, logoutState, dropdownOpen) {
        return (
            <Fragment>
                <div className="dropdown" style={{ width: '40px', marginRight: '15px' }}>
                    <button className="border-0 header-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={this.toggleDropdown}>
                        <i className="bi bi-person-circle " style={{color:'#9D6330'}}></i>
                    </button>
                    <ul className={`dropdown-menu dropdown-effect${dropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" tag={Link} to={profilePath} >Profile</Link></li>
                        <li><Link className="dropdown-item" tag={Link} to={RoutePath.DASHBOARD} >Admin</Link></li>
                        <li><Link className="dropdown-item" to={'/'} >Sign in</Link></li>
                        <li><Link className="dropdown-item" tag={Link} to={logoutPath} state={logoutState} >Sign out ㅤ<i className="bi bi-box-arrow-right"></i></Link></li>
                    </ul>
                </div>
            </Fragment>
        );
    }

    anonymousView(registerPath, loginPath) {
        return (
            <div className='d-lg-flex d-md-flex list-unstyled'>
                <NavItem>
                    <NavLink tag={Link} className="text-dark fw-bold header-btn" style={{color:'#9D6330'}} to={registerPath}><i class="bi bi-r-circle-fill" style={{color:'#9D6330'}}></i></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark fw-bold header-btn" style={{color:'#9D6330'}} to={loginPath}><i class="bi bi-box-arrow-right" style={{color:'#9D6330'}}></i></NavLink>
                </NavItem>
            </div>
        );
    }
}
