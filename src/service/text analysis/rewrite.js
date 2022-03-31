// RESOURCES
// https://developers.tinq.ai/reference/rewriter

import './App.css';
import React, {Component} from 'react';

// Function takes in a string and calls the Tinq.ai Rewriter API, which rewrites/rephrases the content of the string.
// The function outputs the rephrased string from the Rewriter API JSON object. 

export default async function Rewrite(input_text) {
    
  // "I have so much homework to do but I dont know how to do it. Office hours dont help much, and I dont have enough money to get a tutor. I dont know what to do. Where do i go for help?"
  //   text: this.state.original_text

  try{
  const options = {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer key-52cfa8ce-16ee-44f3-ba14-5bc4ded303cc-624206f3ebf8b'
      },
      body: new URLSearchParams({
          text: input_text
      })
  };
      fetch('https://tinq.ai/api/v1/rewrite', options)
        .then(response => response.json())
        .then(response => {
          console.log(response.paraphrase);
          return response.paraphrase;
        })
        .catch(err => console.error(err));
    }
    catch (error) {
      console.log(error)
    }
  }


