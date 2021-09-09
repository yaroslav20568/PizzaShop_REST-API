import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
    return (
        <div>
            <div>Пожалуйста войдите или зарегестрируйтесь</div>
            <Link to="/login"><button>Войти</button></Link>
            <Link to="/register"><button>Зарегистрируйтесь</button></Link>
        </div>
    )
}

export default Auth;
