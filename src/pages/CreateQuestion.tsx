import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom';
// user id !
const CreateQuestion = (props: { id: string }) => {
    const [title, setTitle] = useState('');
    const [question_text, setText] = useState('');
    const [new_keyword, setNewKeyword] = useState('');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        fetch('api/question/create',{
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                "user_id": props.id,
                "title": title,
                "question_text": question_text,
                "keywords": JSON.stringify(keywords)
            })
        }).then((response) => response.json())
        .then(json => {   
            console.log(json);
        }).catch( function(error) {alert("Error create answer");});

        setRedirect(true);
    }

   if (redirect) {
       return <Redirect to="/qa"/>;
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h1 className="h3 mb-3 fw-normal">Ask A Question</h1>

            <div>
            <label>Question Title</label>
            <input className="form-control" required
                   onChange={e => setTitle(e.target.value)}
            />
            </div>

            <div>
            <label>Question Text</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" 
                    onChange={e => setText(e.target.value)}
            />
            </div>

            <div>
            <label>Keywords</label>
            <input type="text" className="form-control" placeholder="computers, python..." required
                    onChange={e => setNewKeyword(e.target.value)}
            /> 
            <button onClick = {() => setKeywords([...keywords, new_keyword])}> Add new keyword</button>
            <ul>
                {keywords.map((value,index) => <li key = {index}>{value}</li>)}
            </ul>
            </div> 

            <button onClick={submit} className="w-100 btn btn-lg btn-primary" type="submit">Create</button>
        </form>
    );
};

export default CreateQuestion;
