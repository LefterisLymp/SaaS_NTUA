import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { QuestionPreview } from './QuestionPreview';

function question_filter_by_date (question_array, from_date, to_date) {
    let questions = await fetch('localhost:3000/api/filter/date', 
    {method: 'GET', body: {questions: question_array, from_date: from_date, to_date: to_date}})
    return questions;
}

export class SearchQuestions extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            keyword: null
        }
    }

    async question_search(Keyword) {
        let questions = await fetch('localhost:3000/api/search', 
        {method: 'GET', body: {keyword: Keyword}})
        this.state.questions = JSON.parse(questions);        
        return questions;
    }

    async question_filter_by_keywords(question_array, keyword_array) {
        let questions = await fetch('localhost:3000/api/filter/keyword', 
        {method: 'GET', body: {questions: question_array, keywords: keyword_array}})
    }

    async SubmissionHandler() {
        let questions = await this.question_search(this.state.keyword);
        if (questions.length == 0) {
            return (<b>Δεν βρέθηκαν ερωτήσεις!</b>)
        }
        else {
            return (
                <Route path="/QuestionPreview" render={new QuestionPreview(questions)}/>
            )
        }
    }

    render() {
        return (
            <div align="center">
                <b>Ψάξε ερωτήσεις με βάση ένα keyword...</b>
                <br></br>
                <form onSubmit= {this.SubmissionHandler()}>
                    <label for="fname">Keyword:</label><br></br>
                    <input type="text" id="keyword" name="keyword" input={this.state.keyword}/><br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}