import React, { Component } from 'react'
import { Container, Row, Col, Card, Image, Badge, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class QuestionResult extends Component {

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



    render() {
        console.log("question => result => ", this.props);

        const { question, authedUser, user } = this.props;
        const { optionOne, optionTwo } = question;
        const { name, avatarURL } = user;

        const optionOneVotes = optionOne.votes.length;
        const optionTwoVotes = optionTwo.votes.length;

        const totalVotes = optionOneVotes + optionTwoVotes;

        const optionOnepercentage = Math.round(((optionOneVotes / totalVotes) * 100), 2);
        const optionTwopercentage = Math.round(((optionTwoVotes / totalVotes) * 100), 2);

        const optionOneSelected = optionOne.votes.includes(authedUser);
        const optionTwoSelected = optionTwo.votes.includes(authedUser);

        return (
            <Container>
                <Row className="mt-4">
                    <Col
                        md={{ span: 10, offset: 1 }}
                        lg={{ span: 10, offset: 1 }}
                    >
                        <Card>
                            <Card.Header> Answer Result </Card.Header>
                            <Image
                                className="mb-4"
                                src={avatarURL}
                                alt={`image of ${name}`}
                                roundedCircle
                                style={this.styles.cardImage}
                            />
                            <Card.Text as="h3" className="mb-3" style={this.styles.cardText}>
                                Would you rather
                            </Card.Text>
                            <Card.Text as="h3" className="mb-3" style={this.styles.cardText}>
                                {` ${optionOneVotes} : ${optionTwoVotes} in total ${totalVotes}`}
                            </Card.Text>


                            <Col xs={12}>
                                <Row className="mt-4">
                                    <Col xs lg="3">
                                        {question.optionOne.text}
                                    </Col>
                                    <Col><ProgressBar now={optionOnepercentage} label={`${optionOnepercentage} % `} variant="success" /></Col>
                                </Row>

                                <Col xs="auto" as={Card.Text}>
                                    {optionOneSelected && <Badge variant="success">You Choose</Badge>}
                                </Col>

                                <Row className="mt-4">
                                    <Col xs lg="3">
                                        {question.optionTwo.text}
                                    </Col>
                                    <Col><ProgressBar now={optionTwopercentage} label={`${optionTwopercentage} % `} variant="warning" /></Col>
                                </Row>

                                <Col xs="auto" as={Card.Text}>
                                    {optionTwoSelected && <Badge variant="warning">You Choose</Badge>}
                                </Col>
                            </Col>

                            <Col className="mt-2 mb-2 text-center">
                                <Button variant='info' as={Link} to={`/`}>
                                    Back to Home Page
                                    </Button>
                            </Col>

                        </Card>
                    </Col>
                </Row>
            </Container>
        )
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

export default connect(mapStateToProps)(QuestionResult);