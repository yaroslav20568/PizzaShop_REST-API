import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
    return (
        <div>
            <div>Пожалуйста зарегестрируйтесь и войдите</div>
            <Link to="/login"><button>Войти</button></Link>
            <Link to="/register"><button>Зарегистрируйтесь</button></Link>
        </div>
    )
}

export default Auth;
