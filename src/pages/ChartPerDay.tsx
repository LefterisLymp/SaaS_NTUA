import React, {SyntheticEvent, useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2'

const ChartPerDay = () => {
    const [data,setData] = useState<any>([]);

    const getData=()=>{
        fetch('https://service-bus.herokuapp.com/api/search/day',{
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
                data={data.questions}
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
        <div>
        <Bar
            type="Bar"
            data={data.answers}
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

export default ChartPerDay