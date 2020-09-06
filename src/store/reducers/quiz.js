import {
    FETCH_QUIZE_BY_ID_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, RETRY_ZQUIZ
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    activeQuestion: 0,
    answerStatus: null, // [{ 1: success }]
    isFinished: false,
    results: {},
    quiz: null
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                quizes: action.quizes,
                loading: false,
            }
        case FETCH_QUIZE_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case QUIZ_SET_STATE:
            return {
                ...state,
                answerStatus: action.answerStatus,
                results: action.results
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerStatus: null,
                activeQuestion: action.number
            }
        case RETRY_ZQUIZ:
            return {
                ...state,
                activeQuestion: 0,
                isFinished: false,
                answerStatus: null,
                results: {}
            }
        default:
            return state;
    }
}