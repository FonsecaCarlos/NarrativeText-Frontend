import React, { Component } from 'react'

import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, signup, forgotPassword, resetPassword } from './authActions'

import InputCustom from '../../components/inputCustom'
import HeaderLogin from '../../components/headerLogin'

import './style.css'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            loginMode: true,
            forgot: false,
            reset: false
        }
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    handleForgot() {
        this.setState({ forgot: !this.state.forgot })
    }

    handleReset() {
        this.setState({ reset: !this.state.reset})
        this.setState({ forgot: !this.state.forgot })
    }

    handleForgotReset(v) {
        const { forgot, reset } = this.state
        const { resetPassword } = this.props

        if(!reset && forgot) {
            forgotPassword(v)
            this.setState({ reset: !this.state.reset })
        }
        if(reset && forgot)
            resetPassword(v)
    }

    onSubmit(values) {
        const { login, signup } = this.props
        this.state.loginMode ? login(values) : signup(values)
    }

    render() {
        const { loginMode, forgot, reset } = this.state
        const { handleSubmit } = this.props

        if (forgot)
            return (
                <div className='login-wrapper'>
                    <div>
                        <div className='login-header'>
                            <HeaderLogin />
                        </div>
                        <div className='login-form'>
                            <form onSubmit={handleSubmit(v => this.handleForgotReset(v))}>
                                <p>{ reset ? 'Informe o Token recebido e a Nova Senha' :
                                'Informe o e-mail para receber o Token de alteração' }</p>

                                <Field component={InputCustom} type='email'
                                        name='email' placeholder='E-mail' />
                                { reset ?
                                    <div><Field component={InputCustom} type='input'
                                        name='token' placeholder='Token está em sua caixa e e-mail' />
                                    <Field component={InputCustom} type='password'
                                        name='password' placeholder='Nova senha' />
                                    <Field component={InputCustom} type='password'
                                        name='confirm_password' placeholder='Confirmar nova senha' />
                                    </div>
                                    :
                                    null
                                }

                                <button type='submit' className='button-form'>
                                    { reset ? 'Alterar Senha' : 'Solicitar Token'}
                                </button>

                                <p onClick={() => 
                                    reset ? this.handleReset() : this.handleForgot()
                                }>Voltar</p>
                            </form>
                        </div>
                    </div>
                </div>
            )

        return (
            <div className='login-wrapper'>
                <div>
                    <div className='login-header'>
                        <HeaderLogin />
                    </div>
                    <div className='login-form'>
                        <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                            <Field component={InputCustom} type='input' name='name'
                                placeholder='Nome' hide={loginMode} />
                            <Field component={InputCustom} type='email' name='email'
                                placeholder='E-mail' />
                            <Field component={InputCustom} type='password' name='password'
                                placeholder='Senha' />
                            <Field component={InputCustom} type='password' name='confirm_password'
                                placeholder='Confirmar Senha' hide={loginMode} />

                            <p onClick={() => this.changeMode()}>
                                {loginMode ? 'Novo usuário? Registrar aqui!' :
                                    'Já é cadastrado? Entrar aqui!'}
                            </p>

                            <button type='submit' className='button-form'>
                                {loginMode ? 'Entrar' : 'Registrar'}
                            </button>

                            {loginMode ? <p onClick={() => this.handleForgot()}>Esquecei minha senha</p> : null}

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login = reduxForm({ form: 'authForm' })(Login)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup, resetPassword }, dispatch)
export default connect(null, mapDispatchToProps)(Login)