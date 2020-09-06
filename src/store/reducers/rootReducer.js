import {combineReducers} from "redux";
import quizReducer from "./quiz";
import quizCreatorReducer from "./create";
import authReducer from "./auth";

export default combineReducers({
    quiz: quizReducer,
    create: quizCreatorReducer,
    auth: authReducer
})