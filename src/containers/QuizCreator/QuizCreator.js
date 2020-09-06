import React, {Component} from 'react'
import classes from "./QuizCreator.module.css"
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../utils/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";


// email: {
//   value: '',
//       type: 'email',
//       label: 'Email',
//       errorMessage: 'Введите корректный e-mail',
//       valid: false,
//       touched: false,
//       validation: {
//     required: true,
//         email: true
//   }

function createControlOptions(number) {
    return createControl({
            label: `Варинат ${number}`,
            id: number,
            errorMessage: 'Поле не может быть пустым'
        },
        {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: `Введите вопрос`,
            errorMessage: 'Поле не может быть пустым'
        }, {required: true}),
        option1: createControlOptions(1),
        option2: createControlOptions(2),
        option3: createControlOptions(3),
        option4: createControlOptions(4),
    }

}

class QuizCreator extends Component {

    state = {
        isFormValid: true,
        rightAnswer: 1,
        formControls: createFormControls()
    }

    addQuestionHandler = (event) => {
        event.preventDefault();
        // {
        //     question: 'Какой язык программирования сейчас самый популярный?',
        //         rightAnswer: 2,
        //     id: 1,
        //     answers: [
        //     {text: 'PHP', id: 1},
        //     {text: 'JS', id: 2},
        //     {text: 'C#', id: 3},
        //     {text: 'PYTHON', id: 4},
        // ]
        // }

        const {question, option1, option2, option3, option4} = this.state.formControls

        const quizQuestion = {
            question: question.value,
            rightAnswer: this.state.rightAnswer,
            id: this.props.quiz.length+1,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        this.props.createQuizQuestion(quizQuestion)

        this.setState({
            isFormValid: true,
            rightAnswer: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = (event) => {
        event.preventDefault();
        this.setState({
            isFormValid: false,
            rightAnswer: 1,
            formControls: createFormControls()
        })
        this.props.finishCreateQuiz();

    }

    onChangeHandler = (event, controlName) => {
        const value = event.target.value
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls, isFormValid: validateForm(formControls)
        })


    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswer: event.target.value
        })
    }

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <React.Fragment key={controlName + index}>
                    <Input key={controlName + index}
                           type={control.type}
                           value={control.value}
                           valid={control.valid}
                           touched={control.touched}
                           label={control.label}
                           shouldValidate={!!control.validation}
                           errorMessage={control.errorMessage}
                           onChange={event => this.onChangeHandler(event, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )

        })
    }

    submitHandler = () => {

    }


    render() {

        const options = [
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4},
        ]

        const select = <Select label="Выберите правильный ответ" options={options} onChange={this.selectChangeHandler}/>

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz : state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion : item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)