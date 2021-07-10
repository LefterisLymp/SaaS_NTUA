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

        await fetch('api/register', {
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
            <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

            <div className="form-group">
            <label >Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
            required onChange={e => setRole(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label >Username</label>
            <input type="text" className="form-control" id="exampleInputUsername" placeholder="Username" required
                   onChange={e => setUsername(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label >First Name </label>
            <input type="text" className="form-control" placeholder="First Name" required
                   onChange={e => setFirstname(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label >Last Name</label>
            <input type="text" className="form-control" placeholder="Last Name" required
                   onChange={e => setLastname(e.target.value)}
            /> 
            </div>
 
            <div className="form-group">
            <label >Password</label>
            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setHashedpassword(e.target.value)}
            />
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default Register;
