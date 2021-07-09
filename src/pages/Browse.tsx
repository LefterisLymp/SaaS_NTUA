import React, {SyntheticEvent, useState} from 'react';
import DatePicker from "react-datepicker"; 
import 'react-datepicker/dist/react-datepicker.css'

const Browse = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data,setData] = useState<any>([]);
    const [keyword,setKeyword] = useState("");
    const[fromDate,setfromDate] = useState(null);
    const[toDate,settoDate] = useState(null);

    
    const submitdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);

        fetch('http://localhost:3006/api/search/date',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              fromDate,
              toDate
          })
      }).then(function(response){
          console.log(response)
          return response.json();
        }).then(function(myJson) {
          console.log(myJson);
          setData(myJson)
        }).finally(() => {
          setIsLoading(false);
        });    
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);

          fetch('http://localhost:3006/api/search',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                keyword
            })
        }).then(function(response){
            console.log(response)
            return response.json();
          }).then(function(myJson) {
            console.log(myJson);
            setData(myJson)
          }).finally(() => {
            setIsLoading(false);
          });
    }

        let load;
        if (isLoading || data === []) 
        {
            load = (
            <div>
            <p>Please fill up the form</p>
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            </div>);
        }
        else
        { 
            load = (
            <div>
            <h2>Questions</h2>
            <br></br>
            {data.map((object, index) => (
            <div className={["rounded","p-3 mb-2 bg-dark text-white"].join(" ")} id={index}>
            <h5>{object.title}</h5>
            <div className={["rounded","p-3 mb-2 bg-secondary text-white"].join(" ")}><p>{object.question_text}</p></div>
            </div>
             ))}
            </div>
        );
        }

        return(
            <div>
            <h1 className="h3 mb-3 fw-normal">Browse Questions</h1>
            <div>
            <form onSubmit={submitdate}>
            <DatePicker
                selected = {fromDate}
                onChange={date => setfromDate(date)}
                dateFormat='yyyy/MM/dd'
                maxDate = {new Date()}
            />
            <DatePicker
                selected = {toDate}
                onChange={date => settoDate(date)}
                dateFormat='yyyy/MM/dd'
                maxDate = {new Date()}
            />
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
            </div>
            <br></br>
            <div>
            <form onSubmit={submit}>
            <input type="text" className="form-control" placeholder="Keyword" required
                   onChange={e => setKeyword(e.target.value)}/>  
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
            </div>
            <br></br>
            {load}
            </div>
        );
};

export default Browse;
