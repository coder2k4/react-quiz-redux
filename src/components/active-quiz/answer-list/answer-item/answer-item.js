import React from 'react'
import classes from './answer-item.module.css'

const AnswerItem = props => {
    const cls = [classes.AnswerItem]

    if(props.answerStatus)
    {
        cls.push(classes[props.answerStatus])
    }

    return (
        <li className={cls.join(' ')}
            onClick={() => props.onAnswer(props.answer.id)}>
            {props.answer.text}
        </li>
    )
}

export default AnswerItem