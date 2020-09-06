import axios from "../../utils/axios";
import {
    FETCH_QUIZE_BY_ID_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ, QUIZ_NEXT_QUESTION, RETRY_ZQUIZ
} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json')

            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizeByIdSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }

    }
}

export function fetchQuizeByIdSuccess(quiz) {
    return {
        type: FETCH_QUIZE_BY_ID_SUCCESS,
        quiz
    }
}


export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return {
        type: 'QUIZ_SET_STATE',
        answerStatus: answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {

        const state = getState().quiz

        let {activeQuestion, quiz, answerStatus, results} = state;

        //Пропускать логику если кнопка прожата несколько раз )
        if (answerStatus) {
            const key = Object.keys(answerStatus)[0];
            if (answerStatus[key] === 'success') {
                return
            }
        }

        if (answerId === quiz[activeQuestion].rightAnswer) {

            if (!results[quiz[activeQuestion].id]) {
                results[quiz[activeQuestion].id] = 'success'
            }

            // this.setState({answerStatus: {[id]: 'success'}})
            dispatch(quizSetState({[answerId]: 'success'}, results))

            window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    // this.setState({isFinished: true})
                    dispatch(finishQuiz())
                } else {
                    activeQuestion += 1;
                    // this.setState({answerStatus: {[id]: null}, activeQuestion})
                    dispatch(quizNextQuestion(activeQuestion))
                }
            }, 1500);


        } else {
            results[quiz[activeQuestion].id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
    }
}

export function retryQuiz() {
    return {
        type : RETRY_ZQUIZ
    }
}


function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}
