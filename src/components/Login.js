import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Image, Form, Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../css/login.css'
import { withRouter } from "react-router-dom";
import { loginUser } from "../actions/authedUser";


class Login extends Component {
    state = {
        authedUser: "",
    };

    handleChange = (e) => {
        const id = e.target.value;
        
        this.setState(
            {
                authedUser: id
            }
        );
    };

    handleLogin = (e) => {
        e.preventDefault();

        console.log("test => ", this.state.authedUser);

        if (this.state.authedUser) {
          this.props.dispatch(loginUser(this.state.authedUser));
          this.props.history.push("/");
        } else {
          this.props.history.push("/not-found");
        }        
    };


    render() {
        const { users } = this.props

        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <Row className="justify-content-md-center">
                        <Form>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label as="h4" className="my-4">
                                    Choose The User to Login
                            </Form.Label>

                                <Form.Control as="select" name="users" onChange={this.handleChange}>
                                    <option value=''>Select user</option>
                                    {Object.keys(users).map((id) => (
                                        <option key={id} value={id} >
                                            {users[id].name}
                                        </option>
                                    ))}
                                </Form.Control>

                            </Form.Group>
                        </Form>
                    </Row>
                    <Row className="justify-content-md-center my-4">
                        <Button
                            onClick={this.handleLogin}
                            disabled={!this.state.authedUser}
                            variant="primary"
                        >
                            Login
                      </Button>
                    </Row>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users,
    }
}

export default withRouter(connect(mapStateToProps)(Login));
// export default connect(mapStateToProps)(Login);