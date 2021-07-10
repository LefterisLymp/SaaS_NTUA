import React, { useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2'

const ChartPerId = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data,setData] = useState<any>();
    const [user_id,setUserId] = useState("");
    
      useEffect(()=>{
        setIsLoading(true);
        
            fetch('https://service-bus.herokuapp.com/api/user',{
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

        fetch('https://service-bus.herokuapp.com/api/search/postings/'+user_id,{
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
            <Bar
                type="Bar"
                data={data}
                  height={400}
                  width={600}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                    legend: {
                      labels: {
                        fontSize: 25,
                      },
                    },
                  }}
            />
        </div>
        );
};

export default ChartPerId;
