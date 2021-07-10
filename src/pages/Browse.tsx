import React, {SyntheticEvent, useState} from 'react';

const Browse = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data,setData] = useState<any>([]);
    const [keyword,setKeyword] = useState("");
    const[fromDate,setfromDate] = useState("");
    const[toDate,settoDate] = useState("");

    
    const submitdate = async (e: SyntheticEvent) => {
        console.log(fromDate);
        e.preventDefault();
        setIsLoading(true);
        console.log(JSON.stringify({
          "from_date": fromDate,
          "to_date": toDate
      }));
        fetch('https://service-bus.herokuapp.com/api/search/date',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "from_date": fromDate,
            "to_date": toDate
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

          fetch('https://service-bus.herokuapp.com/api/search',{
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
            <div className="form-group">
            <label>Set from date</label>
            <input type="date" className="form-control" maxLength={10}  required
                   onChange={e => setfromDate(e.target.value)}/> 
            </div>
            <div className="form-group">
            <label>Set to date</label>
            <input type="date" className="form-control" maxLength={10}  required
                   onChange={e => settoDate(e.target.value)}/>
            </div> 
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
            </div>
            <br></br>
            <div>
            <form onSubmit={submit}>
            <div className="form-group">
            <label>Set keyword</label>
            <input type="text" className="form-control" placeholder="keyword" required
                   onChange={e => setKeyword(e.target.value)}/>  
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
            </div>
            <br></br>
            {load}
            </div>
        );
};

export default Browse;
