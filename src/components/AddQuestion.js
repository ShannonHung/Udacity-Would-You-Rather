import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { handleCreateQuestion } from '../actions/question';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddQuestion extends Component {


    state = {
        optionFirstQuestion: "",
        optionSecondQuestion: "",
    };

    handleFirstQuestion = (e) => {
        const optionFirst = e.target.value;
        this.setState(
            {
                optionFirstQuestion: optionFirst
            }
        );
    };

    handleSecondQuestion = (e) => {
        const optionSecond = e.target.value;
        this.setState(
            {
                optionSecondQuestion: optionSecond
            }
        );
    };

    // Submit Process
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("add => ", this.state);

        this.props.dispatch(
            handleCreateQuestion(
                this.state.optionFirstQuestion,
                this.state.optionSecondQuestion
            )
        );


        this.setState(
            {
                optionFirstQuestion: '',
                optionSecondQuestion: ''
            }
        );

        this.props.history.push('/');
    }

    render() {
        return (
            <Container>
                <Row className="mt-3">
                    <Col
                        xs={12}
                        md={{ span: 8, offset: 2 }}
                        className="text-center"
                    >
                        <Form.Text as="h4">Would you rather?</Form.Text>

                        <Form onSubmit={this.handleSubmit}>



                            <Form.Group>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Label>First Option : </Form.Label>
                                    </Col>
                                    <Col sm={8}> 
                                        <Form.Control
                                            type="text"
                                            placeholder="First Option"
                                            id="optionFirstQuestion"
                                            value={this.state.optionFirstQuestion}
                                            onChange={this.handleFirstQuestion}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Label>Second Option : </Form.Label>
                                    </Col>
                                    <Col sm={8}> 
                                        <Form.Control
                                            type="text"
                                            placeholder="Second Option"
                                            id="optionSecondQuestion"
                                            value={this.state.optionSecondQuestion}
                                            onChange={this.handleSecondQuestion}
                                        />
                                    </Col>
                                </Row>

                            </Form.Group>

                            <Button
                                type="submit"
                                disabled={this.state.optionFirstQuestion === "" || this.state.optionSecondQuestion === ""}
                                block>
                                Submit
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(connect(null)(AddQuestion));