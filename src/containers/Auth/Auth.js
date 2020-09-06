import React, {Component} from 'react'
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css"
import Input from "../../components/UI/Input/Input";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

class Auth extends Component {

    state = {
        formValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный e-mail',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    onSubmit = () => {

    }

    loginHandler = (event) => {
        event.preventDefault();
        const {formControls: {email, password}} = this.state

        this.props.auth(email.value, password.value, true)
    }

    registerHandler = (event) => {
        event.preventDefault()
        const {formControls: {email, password}} = this.state

        this.props.auth(email.value, password.value, false)
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateControl(value, validation) {

        if (!validation)
            return true

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            return this.validateEmail(value)
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, item) => {
        const control = {...this.state.formControls[item]}
        const formControls = {...this.state.formControls}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[item] = control

        let formValid = true
        Object.keys(formControls).forEach(key => {
            formValid = formValid && formControls[key].valid;
        })


        this.setState({formControls, formValid})

    }


    render() {

        const {formControls, formValid} = this.state;

        const inputs = Object.keys(formControls).map((item, index) => {
            const control = formControls[item]
            return <Input key={item + index}
                          type={control.type}
                          value={control.value}
                          valid={control.valid}
                          touched={control.touched}
                          label={control.label}
                          shouldValidate={!!control.validation}
                          errorMessage={control.errorMessage}
                          onChange={event => this.onChangeHandler(event, item)}
            />
        })

        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.onSubmit} className={classes.AuthForm}>
                        {inputs}

                        <Button onClick={this.loginHandler}
                                type="success"
                                disabled={!formValid}
                        >
                            Войти
                        </Button>

                        <Button onClick={this.registerHandler}
                                type="primary"
                                disabled={!formValid}
                        >
                            Зарегестрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}


export default connect(null, mapDispatchToProps)(Auth)