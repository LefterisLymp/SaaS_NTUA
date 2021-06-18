import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [hashed_password, setHashedpassword] = useState('');
    const [role, setRole] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:3006/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                first_name,
                last_name,
                hashed_password,
                role
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/login"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input className="form-control" placeholder="Username" required
                   onChange={e => setUsername(e.target.value)}
            />
            <input type="text" className="form-control" placeholder="First Name" required
                   onChange={e => setFirstname(e.target.value)}
            />

            <input type="text" className="form-control" placeholder="Last Name" required
                   onChange={e => setLastname(e.target.value)}
            />  

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setHashedpassword(e.target.value)}
            />

            <input type="text" className="form-control" placeholder="Role" required
                   onChange={e => setRole(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default Register;
