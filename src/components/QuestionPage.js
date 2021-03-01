import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Image, Button, Form } from 'react-bootstrap';
import { handleAnswerQuestion } from '../actions/question';
import QuestionResult from './QuestionResult';
class QuestionPage extends Component {

    styles = {
        cardImage: {
            width: 250,
            height: 250,
            alignSelf: 'center',
            marginTop: 30
        },
        cardText: {
            alignSelf: 'center'
        }
    }

    handleAnsweredQuestion = (e) => {
        e.preventDefault();
        console.log("questionpage => ", e.target.value);
        const selected = e.target.value

        this.props.dispatch(
            handleAnswerQuestion({
                qid: this.props.question.id,
                answer: selected,
            })
        );
        this.props.history.push(`/questions/${this.props.question.id}/view`);
    }




    render() {


        console.log("questionpage =>", this.props);

        const { question, authedUser, user } = this.props;
        const { optionOne, optionTwo } = question;
        const { name, avatarURL } = user;

        //answer or not 
        if (optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)) {
            return (
                <QuestionResult question={question} authedUser={authedUser} id={this.props.question.id} />
            )
        } else {
            return (
                <Container>
                    <h1>Question not answer</h1>

                    <Row className="mt-4">
                        <Col
                            md={{ span: 10, offset: 1 }}
                            lg={{ span: 10, offset: 1 }}
                        >
                            <Card>
                                <Card.Header>{name}</Card.Header>
                                <Image
                                    className="mb-4"
                                    src={avatarURL}
                                    alt={`avatarURL of ${name}`}
                                    style={this.styles.cardImage}
                                />
                                <Card.Text as="h3" className="mb-3" style={this.styles.cardText}>
                                    Would you rather
                            </Card.Text>

                                <Form
                                    className="text-center"
                                >
                                    <Row className="my-3">

                                        <Col>
                                            <Button
                                                name='options'
                                                variant="outline-dark"
                                                onClick={this.handleAnsweredQuestion}
                                                value="optionOne"
                                                block
                                            >
                                                {optionOne.text}
                                            </Button>
                                        </Col>

                                        <Col>
                                            <Button
                                                name='options'
                                                variant="outline-dark"
                                                onClick={this.handleAnsweredQuestion}
                                                value="optionTwo"
                                                block
                                            >
                                                {optionTwo.text}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>

                            </Card>

                        </Col>
                    </Row>
                </Container>
            )
        }


    }
}


function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id];
    const { author } = question;

    return {
        authedUser,
        question,
        user: users[author]
    };
}

export default withRouter(connect(mapStateToProps)(QuestionPage));