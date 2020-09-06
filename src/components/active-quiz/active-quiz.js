import React from 'react'
import classes from './active-quiz.module.css'
import AnswerList from "./answer-list";


const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.activeQuestion}.</strong>&nbsp;{props.question}
            </span>
            <small>{props.activeQuestion} из {props.quizLength}</small>

        </p>
        <AnswerList answers={props.answers}
                    onAnswer={props.onAnswer}
                    answerStatus={props.answerStatus}
        />
    </div>
)

export default ActiveQuiz