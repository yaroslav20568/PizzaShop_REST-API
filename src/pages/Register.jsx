import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FormAuth } from './../components/importComponents';

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [messageInfo, setMessageInfo] = useState('');

    const showMessageInfo = (message) => {
        setMessageInfo(message);
        setTimeout(() => setMessageInfo(''), 3000);
    }

    const clearInputState = () => {
        setLogin('');
        setPassword('');
    }

    const registration = (e) => {
        e.preventDefault();

        if(!login || !password) {
            showMessageInfo('Заполните поля');
        } else if(login.length < 6 || password.length < 6) {
            showMessageInfo('Поля должны содержать не меньше 6 символов');
        } else if(login.length >= 6 && password.length >= 6) {
            axios.post('http://localhost:3001/register', {
                login,
                password
            })
            .then(({ data }) => {
                showMessageInfo(data.message);
                if(data.message === 'Регистрация прошла успешно') {
                    clearInputState();
                }
            })
        }
    };
    
    return (
        <div>
            <div>Регистрация</div>

            <FormAuth
                login={login}
                password={password}
                setLogin={setLogin}
                setPassword={setPassword}
                messageInfo={messageInfo}
                buttonText="Зарегистрироваться"
                func={registration}
            />

            <Link to="/login">
                <button>Авторизация</button>
            </Link>
        </div>
    )
}

export default Register;
