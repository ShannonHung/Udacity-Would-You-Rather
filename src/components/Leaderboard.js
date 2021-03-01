import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Card } from 'react-bootstrap';
import LeaderBoardUserCard from "./LeaderBoardUserCard"

class Leaderboard extends Component {


    styles = {
        cardText: {
            textAlign: 'center',
            width: '100%',
        },
    };

    render() {

        const { users } = this.props;

        console.log("leader user -> ", users);

        return (
            <Container>
                <Row className="mt-4">

                    <Card.Text as="h3" className="mb-3" style={this.styles.cardText}>
                        Leaderboard
                        </Card.Text>

                    {users.map((user) => (
                        <LeaderBoardUserCard user={user} key={user.id} />
                    ))}

                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ users }) {
    return {

        users: Object.keys(users)
            .sort((a, b) => {
                console.log("leader => ", users);

                //每個user 的 answer總數
                const answersA = Object.keys(users[a].answers).length;
                const answersB = Object.keys(users[b].answers).length;

                //每個user 的 questions總數
                const questionsA = users[a].questions.length;
                const questionsB = users[b].questions.length;

                //一個人的回應 + 問題的加總為贏家
                return (answersB + questionsB) - (answersA + questionsA);

            }).map((id) => users[id])
    };
}

export default connect(mapStateToProps)(Leaderboard);
