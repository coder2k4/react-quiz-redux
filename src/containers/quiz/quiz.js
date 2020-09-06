import React from 'react'
import ActiveQuiz from "../../components/active-quiz";
import classes from './quiz.module.css'
import FinishedQuiz from "../../components/finished-quiz";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends React.Component {

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }


    render() {

        const {isFinished, results, quiz, loading} = this.props

        let returnComponent;

        if (loading || !quiz)
            returnComponent = <h2>Loading...</h2>
        else if (isFinished)
            returnComponent = <FinishedQuiz
                results={results}
                quiz={quiz}
                onRetry={this.props.retryQuiz}
            />
        else
            returnComponent = <ActiveQuiz
                answers={this.props.quiz[this.props.activeQuestion].answers}
                onAnswer={this.props.quizAnswerClick}
                question={this.props.quiz[this.props.activeQuestion].question}
                activeQuestion={this.props.activeQuestion + 1}
                quizLength={this.props.quiz.length}
                answerStatus={this.props.answerStatus}
            />


        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Выберите правильный вариант</h1>
                    {returnComponent}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        error: state.quiz.error,
        activeQuestion: state.quiz.activeQuestion,
        answerStatus: state.quiz.answerStatus,
        isFinished: state.quiz.isFinished,
        results: state.quiz.results,
        quiz: state.quiz.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz : () => dispatch(retryQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)