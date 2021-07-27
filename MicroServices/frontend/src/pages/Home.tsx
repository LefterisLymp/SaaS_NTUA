import React from 'react';
import {Link} from "react-router-dom";

const Home = (props: { username: string }) => {
    if(props.username) {
        return(
            <div>
                <div className="container px-4 py-5" id="featured-4">
                <h2 className="pb-2 border-bottom">{'Hi '+props.username+', Welcome to My.AskMeAnything'}</h2>
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-4">
                    <div className={["feature col","rounded","p-3 mb-2 bg-dark text-white","clearfix"].join(" ")}>
                    <h6>My questions and answers</h6>
                    <p>All the questions and all the answers you have given.</p>
                    <Link to="/qa">Click here</Link>
                    </div>
                    <div className={["feature col","rounded","p-3 mb-2 bg-dark text-white"].join(" ")}>
                    <h6>My contributions per day</h6>
                    <p>Bar chart of the sum of questions and answers you have given each day.</p>
                    <Link to="/charti">Click here</Link>
                    </div>
                    <div className={["feature col","rounded","p-3 mb-2 bg-dark text-white"].join(" ")}>
                    <h6>Ask a new question</h6>
                    <p>Form that you can create a new question and add some keywords.</p>
                    <Link to="/question">Click here</Link>
                    </div>
                    <div className={["feature col","rounded","p-3 mb-2 bg-dark text-white"].join(" ")} >
                    <h6>Answer a question</h6>
                    <p>Browse through questions and answers and give your own answer to the question selected.</p>
                    <Link to="/answer">Click here</Link>
                    </div>
                </div>
                </div>

                <div className="b-example-divider"></div>
            </div>
        );
    }
    else{
        return(
            <div>
                <div className="container px-4 py-5" id="featured-3">
                <h2 className="pb-2 border-bottom">Welcome to AskMeAnything</h2>
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-2">
                    <div className={["feature col","rounded","p-3 mb-2 bg-dark text-white"].join(" ")}>
                    <h2>Questions Per Keyword</h2>
                    <p>Bar chart of the number of questions containing a certain keyword.</p>
                    <Link to="/chartk">Click here</Link>
                    </div>
                    <div className={["feature col","rounded","p-3 mb-2 bg-dark text-white"].join(" ")}>
                    <h2>Postings Per Day</h2>
                    <p>Bar chart of the number of questions asked each day and Bar chart of answers given each day.</p>
                    <Link to="/chart">Click here</Link>
                    </div>
                </div>
                </div>

                <div className="b-example-divider"></div>
            </div>
        );
    }
};

export default Home;
