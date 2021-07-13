import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from "react-router-dom";

const Login = (props: { setUsername: (username: string) => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(username);
        const response = await fetch('http://localhost:3006/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        });
        const content = await response.json();
        console.log(content);
        setRedirect(true);
        props.setUsername(content.username);
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-group">
            <label >Username</label>
            <input type="text" className="form-control" placeholder="Username" required
                   onChange={e => setUsername(e.target.value)}
            />
            </div>
            
            <div className="form-group">
            <label >Password</label>
            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />
            </div>
            

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;
