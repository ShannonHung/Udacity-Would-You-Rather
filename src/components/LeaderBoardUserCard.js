import React, { Component } from 'react'
import { Row, Card , Col, Image, Table} from 'react-bootstrap';

class LeaderBoardUserCard extends Component {

    styles = {
        cardImage: {
          width : 200,
          height : 200,
          marginTop : 30
        },
        card: {
          width: '18rem',
          marginBottom : 10  
        },
        text: {
          textAlign: 'center'
        },
        textHeaderCenter: {
          marginLeft: "auto",
          marginRight: "auto"
        }
    }

    render() {

        const { user } = this.props;
        const { name, avatarURL , answers , questions } = user;
        const questionsSize = questions.length;
        const answersSize = Object.keys(answers).length;
        const totalResult = questionsSize + answersSize;

        return (

            <Col xs={12}>
                <Card className="text-center">

                    <Row as={Card.Body}>
                    
                        <Col xs={12} md={4}>
                            <Image
                                className="mb-4"
                                src={avatarURL}
                                alt={`image of ${name}`}
                                style={this.styles.cardImage}                     
                            />
                        </Col>

                        <Col xs={12} md={8} className="text-left">


                            <Table className="mt-3" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th> 
                                            <h5>
                                                UserName: 
                                            </h5>    
                                        </th>
                                        <td style={this.styles.text}>
                                            <h5>
                                              {name}
                                            </h5>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>
                                            <h5> 
                                                Created Questions: 
                                            </h5>
                                        </th>
                                        <td style={this.styles.text}>
                                            <h5>
                                                {questionsSize}
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th > 
                                            <h5>
                                                Answered Questions: 
                                            </h5>
                                        </th>
                                        <td style={this.styles.text}>
                                            <h5>
                                                {answersSize}
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th> 
                                            <h5>
                                                Total Score : 
                                            </h5>    
                                        </th>
                                        <td style={this.styles.text}>
                                            <h5>
                                                {totalResult}
                                            </h5>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>


                    </Row>

                </Card>
            </Col>
        )
    }
}

export default LeaderBoardUserCard;
