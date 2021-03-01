import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authedUser';
import icon from '../img/logo.jpg'
import { AiTwotoneHome } from "react-icons/ai";
import {BiMessageAltAdd} from 'react-icons/bi';
import {TiMessages} from 'react-icons/ti';
class NavigationBar extends Component {

    render() {
        console.log("test nav=>", this.props);
        const { authedUser, authedUserName } = this.props;

        return (
            <>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/">
                    <img
                        alt="logo"
                        src={icon}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Would You Rather
                    </Navbar.Brand>


                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/"><AiTwotoneHome /> Home</Nav.Link>
                            <Nav.Link as={Link} to="/add"><BiMessageAltAdd/> New Question</Nav.Link>
                            <Nav.Link as={Link} to="/leaderboard"><TiMessages/> Leader Board</Nav.Link>
                            <Navbar.Text className="ml-md-4">
                                <small>{`Hi ${authedUserName}!`}</small>
                                {' | '}
                                <Link to='/login' onClick={() => this.props.dispatch(logoutUser(authedUser))}>
                                    Logout
                                </Link>
                            </Navbar.Text>

                        </Nav>

                    </Navbar.Collapse>


                </Navbar>

            </>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        authedUser,
        authedUserName: users[authedUser].name,
    }
}

export default connect(mapStateToProps)(NavigationBar);

