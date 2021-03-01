import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Col, Card, Button, Image } from 'react-bootstrap';
class QuestionItem extends Component {

    styles = {
        cardImage: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: 30
        },
        card: {
            width: '18rem',
            marginBottom: 10
        }
    }


    render() {
        console.log("item => ", this.props);

        const { question, user } = this.props;
        const { name, avatarURL } = user;
        const { optionOne, optionTwo } = question;


        return (
            <Link to={`/questions/${this.props.question.id}`}>
                <Col className="container">
                    <Card style={this.styles.card}>
                        <Image
                            src={avatarURL}
                            alt={`image of ${name}`}
                            style={this.styles.cardImage}
                        />

                        <Card.Body>
                            <Card.Title>{name} Asks</Card.Title>
                            <Card.Text>
                                Would you rather
                        {' '}
                                {optionOne.text} or {optionTwo.text}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Link>

        )
    }
}

// id is from QuestionsList => <QuestionItem key={question.id} id={question.id} />
function mapStateToProps({ users, questions }, { id }) {
    const { author } = questions[id];

    return {
        user: users[author],
        question: questions[id],
    };
}

export default withRouter(connect(mapStateToProps)(QuestionItem));
