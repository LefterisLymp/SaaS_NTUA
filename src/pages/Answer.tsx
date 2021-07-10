import React, {SyntheticEvent, useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";

const Answer = (props: { id: string }) => {
    const [data,setData] = useState<any>([]);
    const [answer,setAnswer] = useState<any>([]);
    const [question_id,setQuestionId] = useState("");
    const [answer_text,setAnswerText] = useState("");
    const [user_id,setUserId] = useState("");
    const [redirect, setRedirect] = useState(false);

    const getData=()=>{
        fetch('https://service-bus.herokuapp.com/api/question/all',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        }
        ).then(function(response){
            console.log(response)
            return response.json();
          }).then(function(myJson) {
            console.log(myJson);
            setData(myJson)
          });
      }

      useEffect(()=>{
      getData();
      setUserId(props.id);
      console.log(user_id);
    },[])

      const getAnswer = async (e) => {
        console.log(e);
        const response = await fetch('https://service-bus.herokuapp.com/api/question/view/'+e,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        const data = await response.json();
        const item = data.answers
        console.log(data.answers);       
        setAnswer(item);
        console.log(answer);
        return item;
    }

    const onChangeQuestion = (e) => {
      setQuestionId(e.target.value);
      getAnswer(e.target.value)
    }

    const submit = async (e: SyntheticEvent) => {
      e.preventDefault();
      await fetch('api/answer/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id,
                answer_text,
                question_id
            })
        });

      setRedirect(true);
  }

 if (redirect) {
     return <Redirect to="/qa"/>;
  }

    return (
        <div>
        <label>Select Question</label>
        <select onChange={onChangeQuestion}>
        <option disabled selected> -- select an option -- </option>
        {data.map(item => (
            <option key={item.id} id={item.id} value={item.id}>
                {item.title}
            </option>
        ))}
        </select>
        <h3>Answers for the question selected</h3>
        <ul>
          {answer.map(index => <li>{index.answer_text}</li>)}
        </ul>

        <form onSubmit={e => e.preventDefault()}>
            <h1 className="h3 mb-3 fw-normal">Create Answer</h1>

            <div>
            <label>Question Text</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" 
                    onChange={e => setAnswerText(e.target.value)}
            />
            </div>

            <button onClick={submit} className="w-100 btn btn-lg btn-primary" type="submit">Create</button>
        </form>
        </div>
    );
};

export default Answer;
