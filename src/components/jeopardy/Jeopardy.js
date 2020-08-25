import React, { Component } from 'react';
//import our service
import JeopardyService from "../jeopardyService/JeopardyService";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props){
        super(props);
        this.client = new JeopardyService();
        this.state = {
            data: {},
            score: 0,
            answer: "",
            answerInput: ""
        }
    }
    //get a new random question from the API and add it to the data object in state
    getNewQuestion() {
        return this.client.getQuestion().then(result => {
            this.setState({
                data: result.data[0],
            })
        })
    }

    newAnswer() {
            this.setState({answer: this.state.data.answer})
    }

    userRightAnswer = (event) => {
        this.setState((currentState) => (
            {score: currentState.score += (this.state.data.value)}
            ))
            console.log(this.state)
    }
        
    userWrongAnswer = (event) => {
            this.setState((currentState) => (
                {score: currentState.score -= (this.state.data.value)}
                ))
    }
            
            
    userAnswer = (event) => {
        const answerInput = {...this.state.answerInput};
        answerInput[event.target.name] = event.target.value;
        
        this.setState({ answerInput });
        console.log(this.state.answerInput)
    }

    userAnswerTest = (event) => {
        this.setState({answerInput: event.target.value});
        console.log("the state is " + (this.state.answerInput))
        console.log("the answer is " + (this.state.data.answer))
        console.log("the state answer is " + (this.state.data.answer))

    }

    userAnswerTest2 = (event) => {
        this.setState({answerInput: event.target.value});
        this.getNewQuestion()
        if(this.state.answerInput === this.state.data.answer){
            console.log("right answer")
            return this.userRightAnswer();
        } else {
            return this.userWrongAnswer()
        }

        
    }
    
    //when the component mounts, get a the first question

    componentDidMount() {
        this.getNewQuestion();
        this.newAnswer();
    }
        
        render() {
            //conditional rendoring
            
            //rendor this
            let category = "loading"
            // till this exists
            if(this.state.data.category){
                category = this.state.data.category.title
            }
                
                return (
                    
                    <div>
                        <strong>Question: </strong>{this.state.data.question}
                        <br/>
                        <strong>Value: </strong>{this.state.data.value}
                        <br/>
                        <strong>Category: </strong>{category}<br/>
                        <strong>User Score: </strong>{this.state.score}
                        <br/>
                        <strong>Your Answer: </strong>       
                        <form>
                            <input 
                            className="userInput" 
                            name="whyIsThisSoHard"
                            onChange={this.userAnswerTest}
                            />
                        </form>
                        <button onClick={this.userAnswerTest2}>Submit</button>
                        <br/>
                        <strong>Answer to copy and paste: </strong>{this.state.data.answer}
                    </div>
                );
        }
}
export default Jeopardy;