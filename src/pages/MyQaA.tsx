import React, { useState, useEffect} from 'react';

const MyQaA = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data,setData] = useState<any>();
    const [user_id,setUserId] = useState("");
    
      useEffect(()=>{
        setIsLoading(true);
        
            fetch('http://localhost:3006/api/user',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            }
            ).then(function(content){
                console.log(content)
                return content.json();
              }).then(function(myJson) {
                console.log(myJson);
                setUserId(myJson.id)
              });

        fetch('http://localhost:3006/api/search/user_id/'+user_id,{
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
          }).finally(() => {
            setIsLoading(false);
          });

    },[user_id])


        if (isLoading || data.statusCode === 404) {
            return (<div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>);
            };
    
        return(
        <div>
            <h2>My Questions</h2>
            <br></br>
            {data.questions.map((object, index) => (
            <div className={["rounded","p-3 mb-2 bg-dark text-white"].join(" ")} id={index}>
               <h5>{object.title}</h5>
               <div className={["rounded","p-3 mb-2 bg-secondary text-white"].join(" ")}><p>{object.question_text}</p></div>
            </div>
             ))}
            <br></br>
            <h2>My Answers</h2>
            <br></br>
            {data.answers.map((object, index) => (
            <div className={["rounded","p-3 mb-2 bg-dark text-white"].join(" ")} id={index}>
               <h5>{object.question_title}</h5>
               <div className={["rounded","p-3 mb-2 bg-secondary text-white"].join(" ")}><p>{object.answer_text}</p></div>
            </div>
             ))}
        </div>
        );
};

export default MyQaA;
