import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormAuth } from './../components/importComponents';
import { setUser } from './../redux/actions/importActions';

const Login = () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [messageInfo, setMessageInfo] = useState('');

    const showMessageInfo = (message) => {
        setMessageInfo(message);
        setTimeout(() => setMessageInfo(''), 3000);
    }

    const authorization = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/login', {
            login,
            password
        })
        .then(({ data }) => {
            const { message, userInfo, token } = data;
            showMessageInfo(message);
            userInfo && dispatch(setUser(userInfo));
            localStorage.setItem('token', token);
            console.log(data);
        })
    }

    const authentication = () => {
        axios.get('http://localhost:3001/auth', {
            headers: {authorization: `bearer ${localStorage.getItem('token')}`}
        })
        .then(({ data }) => {
            const { message, userInfo, token } = data;
            showMessageInfo(message);
            userInfo && dispatch(setUser(userInfo));
            localStorage.setItem('token', token);
            console.log(data);
        })
    }

    useEffect(() => {
        authentication();
    }, []);

    return (
        <div>
            <div>Авторизация</div>

            <FormAuth
                login={login}
                password={password}
                setLogin={setLogin}
                setPassword={setPassword}
                messageInfo={messageInfo}
                buttonText="Авторизоваться"
                func={authorization}
            />
            
            <Link to="/register">
                <button>Регистрация</button>
            </Link>
        </div>
    )
}

export default Login;
