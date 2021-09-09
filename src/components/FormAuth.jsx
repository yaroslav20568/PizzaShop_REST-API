import React from 'react';

const FormAuth = ({ login, password, setLogin, setPassword, messageInfo, buttonText, func }) => {
    return (
        <form>
            <input 
                type="text" 
                placeholder="login" 
                value={login} 
                onChange={(e) => setLogin(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>{messageInfo}</div>
            <button onClick={(e) => func(e)}>{buttonText}</button>
        </form>
    )
}

export default FormAuth;
