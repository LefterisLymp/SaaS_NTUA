import React, {SyntheticEvent, useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import { Bar } from 'react-chartjs-2'

const ChartPerKeyword = () => {
    const [data,setData] = useState<any>([]);

    const getData=()=>{
        fetch('api/search/questions_per_keyword',{
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
      getData()
    },[])
    console.log(data.questions);

    return (
        <div>
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
    </div>
    );
}

export default ChartPerKeyword
