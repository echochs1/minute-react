import React from 'react';
import axios from 'axios';
// import { Popover, Tooltip } from 'antd';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export const grammarCheck = async function (text) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("text", text);
    encodedParams.append("language", "en-US");

    const options = {
        method: 'POST',
        url: 'https://grammarbot.p.rapidapi.com/check',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Host': 'grammarbot.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_GRAMMARBOT_API_KEY
        },
        data: encodedParams
    };
    const res = {};
    await axios.request(options)
    .then(function (response) {
        res.data = response.data;
    }).catch(function (error) {
        console.error(error);
    });
    return res;
}

// transcription = original transcription string
// data = response from grammarbot API
export const underlineErrors = (transcription, data) => {
    console.log(data);
    if(data == null || data.matches == null) {
        return;
    }
    let errors = [];
    // loop through error matches, break up transcription into alternating words and errors
    for(let i=0; i<data.matches.length; i++) {
        const errorSubstr = {
            offset: data.matches[i].offset,
            length: data.matches[i].length,
            title: data.matches[i].shortMessage,
            message: data.matches[i].message,  // or matches[i].shortMessage
            replacement: data.matches[i].replacements[0].value
        }
        errors.push(errorSubstr);
    }
    // array of transcript substrings, alternating between words and errors
    const splitArr = breakWhere(errors, transcription);
    // underline alternatively between array items
    // if first item is an error (transcription begins with a grammar error)
    if(data.matches[0].offset === 0) {
        const underlined = splitArr.map((x, i) => {
            if(i%2 === 0) {
                const errIndex = i/2;
                console.log(errors[errIndex]);
                return (
                    <OverlayTrigger 
                        key={x} 
                        // trigger = 'click'
                        trigger={['hover', 'focus']} 
                        placement="top" 
                        overlay={popover(errors[errIndex].title, errors[errIndex].message, errors[errIndex].replacement)}
                    >
                        {({placement, show, ...props}) => (
                        <span key={i} className="errorUnderline">{x}</span>
                        )}
                    </OverlayTrigger>
                )
            } else {
                return <span key={i}>{x}</span>
            }
        });
        return underlined;
    } else {    // first item is correct, error starting second item
        const underlined = splitArr.map((x, i) => {
            if(i%2 === 0) {
                return <span key={i}>{x}</span>
            } else {
                const errIndex = Math.floor(i/2);
                console.log(errors[errIndex]);
                return (
                <OverlayTrigger 
                    key={x} 
                    // trigger = 'click'
                    trigger={['hover', 'focus']} 
                    placement="top" 
                    overlay={popover(errors[errIndex].title, errors[errIndex].message, errors[errIndex].replacement)}
                    >
                    {({placement, show, ...props}) => (
                    <span key={i} className="errorUnderline">{x}</span>
                    )}
                </OverlayTrigger>
                )
            }
        });
        return underlined;
    }
}

// Helper functions
const intoPairs = xs => xs.slice(1).map((x, i) => [xs[i], x])
const breakAt = (places, str) => intoPairs([0, ...places, str.length]).map(
  ([a, b]) => str.substring(a, b)
)
const breakWhere = (words, str) => breakAt(
  words.slice(0).sort(({offset: o1}, {offset: o2}) => o1 - o2).reduce(
    (a, {offset, length}) => [...a, offset, offset + length],
    []
  ),
  str
)

const popover = (title, message, replacement) => {
    <Popover id="popover-basic">
        <Popover.Header as="h3">{title}</Popover.Header>
        <Popover.Body>
            {/* <p>{message}</p> */}
            <p className="greenText">Did you mean: <strong>{replacement}</strong></p>
        </Popover.Body>
    </Popover>
}
