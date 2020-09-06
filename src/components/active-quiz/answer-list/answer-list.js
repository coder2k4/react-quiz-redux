import React from 'react'
import classes from './answer-list.module.css'
import AnswerItem from "./answer-item";

const AnswerList = props => {

    const answers = props.answers
    const mapanswers = answers.map((answer) => <AnswerItem answer={answer}
                                                           key={answer.id}
                                                           onAnswer={props.onAnswer}
                                                           answerStatus={props.answerStatus ? props.answerStatus[answer.id] : null }
    />)
    return (
        <ul className={classes.AnswersList}>
            {mapanswers}
        </ul>
    )

}

export default AnswerList
