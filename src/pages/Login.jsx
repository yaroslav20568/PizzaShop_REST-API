import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormAuth } from './../components/importComponents';
import { setUser, setAuth } from './../redux/actions/importActions';

const Login = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(({ user }) => user);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [messageInfo, setMessageInfo] = useState('');
    const history = useHistory();

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
            showMessageInfo(data.message);
            dispatch(setAuth(data.auth));
            data.data && dispatch(setUser(data.data[0].login));
        })
    }

    return (
        <div>
            {
                !isAuth ?
                    <>
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
            
                        <button onClick={() => history.goBack()}>Назад</button>
                    </> :
                    <Redirect to="/home" />
            }
        </div>
    )
}

export default Login;
