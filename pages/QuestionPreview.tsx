import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";

async function question_filter_by_date (question_array, from_date, to_date) {
    let questions = await fetch('localhost:3006/api/filter/date', 
    {method: 'GET', body: JSON.stringify({questions: question_array, from_date: from_date, to_date: to_date})})
    return questions;
}

class ListItem extends Component {
    props: any;

    state = { color : 'white' };
    onClick = () => {
       this.setState({ color: 'red' });
    }
    render () {
         return (
          <li className="nameBox">
              {this.props.value}
           <div onClick={this.onClick} style={{backgroundColor: this.props.color}} 
      className="clickBox">
          </div>
         </li>
     );
    }
  }

const Aux = (props) => {
    return props.children;
};

export class QuestionPreview extends React.Component{
    props: any;
    
    async DateSubmissionEvent(from_date, to_date) {
        if (from_date == null || to_date == null) {
            return (<b>Βάλε και τις δύο ημερομηνίες.</b>)
        }
        let question_array = await question_filter_by_date(this.props.questions, from_date, to_date)
        let q_prev = new QuestionPreview({questions: question_array})
        return (
            <Route path= "/QuestionPreview" render={q_prev}/>
        )
    }

    render() {

        let mainList = [];

        for(let i = 0; i <= min(this.state.limit, this.state.questions.length); i++) {
            mainList[i] = <ListItem key={i} value={questions[i]["question_text"]} />
        }

        return (
            <Aux>
                <div align="center">
                    <p> Φίλτραρε με βάση την ημερομηνία </p>
                    <form onSubmit={this.DateSubmissionEvent(this.state.from_date, this.state.to_date)}>

                        <label for={this.state.from_date}>Από:</label>
                        <input type="date" id="from_date" name={this.state.from_date}/>

                        <label for={this.state.to_date}>Έως:</label>
                        <input type="date" id="to_date" name={this.state.to_date}/>
                        <input type="submit"/>
                    </form>
                <br> </br>
                </div>
                <ul className = "mainList">{mainList}</ul>
            </Aux>
        )
    }
}