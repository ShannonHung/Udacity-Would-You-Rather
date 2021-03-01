import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import QuestionList from './QuestionList';

class Dashboard extends Component {
    state = {
        value: "answered",
    };

    answerQuestions = (arr) => {
        const answered = []
        arr.forEach((question) => (
            Object.keys(this.props.authedUser.answers).includes(question.id)
            ? answered.push(question) 
            : ''
        ))
        console.log("dashboard => answer => ", answered);
        return answered;
    }

    unansweredQuestions = (arr) => {
        const unanswered = []
        arr.forEach((question) => (
            Object.keys(this.props.authedUser.answers).includes(question.id)
            ? ''
            : unanswered.push(question)
        ))
        console.log("dashboard => unanswered => ", unanswered);
        return unanswered;
    }

    render() {
        console.log("dashboard", this.props);
        const { questions } = this.props;


        return (
            <Container>
                <Row className="my-3">

                    <Col>
                    <Button
                        variant="outline-success"
                        onClick={(e) => this.setState({value: 'answered'})}
                        value="answered"
                        active={this.state.value === 'answered'}
                        block
                    >
                        Answered Questions
                    </Button>
                    </Col>

                    <Col>
                    <Button
                        variant="outline-danger"
                        onClick={(e) => this.setState({value: 'unanswered'})}
                        value="unanswered"
                        active={this.state.value === 'unanswered'}
                        block
                    >
                        Unanswered Questions
                    </Button>
                    </Col>

                </Row>
                <QuestionList
                    questions={this.state.value === 'answered'
                    ? this.answerQuestions(Object.values(questions))
                    : this.unansweredQuestions(Object.values(questions))}
                />

            </Container>
        )
    }
}

export default Dashboard