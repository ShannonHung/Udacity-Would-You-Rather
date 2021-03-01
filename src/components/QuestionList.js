import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import QuestionItem from './QuestionItem'
import { Row } from 'react-bootstrap';

class QuestionList extends Component {
    render() {
        const { questions } = this.props;
        console.log("QuestionList => ", this.props);

        return (
            <div>
                 <Row>
                    {questions.map((question) => (
                        <QuestionItem key={question.id} id={question.id} />
                    ))}
                </Row>
            </div>
        )
    }
}


  
export default withRouter(QuestionList);