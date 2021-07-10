import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CreateQuestion from "./pages/CreateQuestion"
import Answer from './pages/Answer';
import ChartPerDay from './pages/ChartPerDay';
import MyQaA from './pages/MyQaA';
import ChartPerKeyword from './pages/ChartPerKeyword';
import ChartPerId from './pages/ChartPerId';
import Browse from './pages/Browse';


function App() {
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('api/user', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();
                setUsername(content.username);
                setId(content.id);
            }
        )();
    });


    return (
        <div className="App">
            <BrowserRouter>
                <Nav username={username} setUsername={setUsername}/>

                <main className="form-signin">
                    <Route path="/" exact component={() => <Home username={username}/>}/>
                    <Route path="/login" component={() => <Login setUsername={setUsername}/>}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/question" exact component={() => <CreateQuestion id={id}/>}/>
                    <Route path="/answer" exact component={() => <Answer id={id}/>}/>
                    <Route path="/chart" component={ChartPerDay}/>
                    <Route path="/chartk" component={ChartPerKeyword}/>
                    <Route path="/charti" component={ChartPerId}/>
                    <Route path="/browse" component={Browse}/>
                    <Route path="/qa" exact component={() => <MyQaA id={id}/>}/>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
