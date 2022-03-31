import './App.css';
import React, {Component} from 'react';


//Example application of rewriter. Input some text into the textbox and the console should log the rewritten text.

class Rewriter extends Component {
  
  constructor() {
    super();
    this.state = {
      original_text: "",
    translation: "",
    isBlocked: false
    };
    
    this.callPost2 = this.callPost2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkState = this.checkState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
    // "I have so much homework to do but I dont know how to do it. Office hours dont help much, and I dont have enough money to get a tutor. I dont know what to do. Where do i go for help?"
     //   text: this.state.original_text

    callPost2 = async (some_text) => {
        try{
        const options = {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer key-52cfa8ce-16ee-44f3-ba14-5bc4ded303cc-624206f3ebf8b'
            },
            body: new URLSearchParams({
                text: some_text
            })
        };
      
      fetch('https://tinq.ai/api/v1/rewrite', options)
        .then(response => response.json())
        .then(response => console.log(response.paraphrase))
        .catch(err => console.error(err));
    }
    catch (error) {
      console.log(error)
    }
  }

  handleChange(event) {
    this.setState({original_text: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.original_text);
    console.log(this.state.original_text);
    this.callPost2(this.state.original_text);
    event.preventDefault();
  }

  checkState(){
    console.log(this.state.original_text)
  }

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
        <label>
        <input type="text" value={this.state.original_text} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>
        <button onClick={this.checkState}>Check State</button>
        </header>
      </div>
    );
  }
}

export default Rewriter;
