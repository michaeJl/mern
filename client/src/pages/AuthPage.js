import React, {useEffect, useState, useContext } from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/Auth.context';

export const AuthPage = () => {

    const auth = useContext(AuthContext);

    const message = useMessage();
    const {loading,request,error,clearError} = useHttp();

    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    },[error,message,clearError]);

    useEffect(()=>{
        window.M.updateTextFields();
    },[]);

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
            auth.logIn(data.token,data.userId);
        } catch (e) {}
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Добро пожаловать</h1>
                
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизвция</span>
                        <div>
                            
                            <div className="input-field ">
                                <input value={form.email} placeholder="Введите email" id="email" type="text" className="yellow-input" name="email" onChange={changeHandler}/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field ">
                                <input value={form.password} placeholder="Введите пароль" id="password" type="password" className="yellow-input" name="password" onChange={changeHandler}/>
                                <label htmlFor="email">Password</label>
                            </div>

                        </div>
                    </div>
                <div className="card-action">
                    <button disabled={loading} 
                            onClick={loginHandler} 
                            className="btn yellow darken-4" 
                            style={{marginRight: 10}}>Войти</button>
                    <button disabled={loading} 
                            onClick={registerHandler} 
                            className="btn grey lighten-1 black-text"> Зарегистроваться</button>
                </div>
                </div>
               

            </div>

        </div>
    )
}