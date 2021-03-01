import React, { Component } from 'react'
import { Container, Row, Col, Card, Image, Badge, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class QuestionResult extends Component {

    styles = {
        cardImage: {
          width : 250,
          height : 250,
          alignSelf: 'center',
          marginTop : 30
        },
        cardText: {
            alignSelf: 'center'
        }
    }



    render() {
        console.log("question => result => ", this.props);

        const { question, authedUser, user } = this.props;

        console.log("question : " , question , 
                    " | authedUser : " , authedUser , "| user : " , user)
        
        const { optionOne, optionTwo } = question;                

        const { name , avatarURL} = user;

        const optionOneVotes = optionOne.votes.length;
        const optionTwoVotes = optionTwo.votes.length;
        
        const totalVotes = optionOneVotes + optionTwoVotes;

        const optionOnepercentage = Math.round(((optionOneVotes / totalVotes) * 100),2);
        const optionTwopercentage = Math.round(((optionTwoVotes / totalVotes) * 100),2);

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

                                <Col xs="auto" as={Card.Text}>
                                    {optionOneSelected && <Badge variant="danger">Your pick</Badge>}
                                </Col>

                                <Col xs={12}>
                                    <ProgressBar now={optionOnepercentage}  label={`${optionOnepercentage} % `} variant="success" />

                                    <Card.Text>
                                    {`${optionOneVotes} out of ${totalVotes} votes`}
                                    </Card.Text>
                                </Col>

                                <Col xs="auto" as={Card.Text}>
                                    {optionTwoSelected && <Badge variant="warning">Your pick</Badge>}
                                </Col>

                                <Col xs={12}>
                                    <ProgressBar now={optionTwopercentage} label={`${optionTwopercentage} % `} variant="warning" />

                                    <Card.Text>
                                    {`${optionTwoVotes} out of ${totalVotes} votes`}
                                    </Card.Text>
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