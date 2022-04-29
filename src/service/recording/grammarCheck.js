import React from 'react';
import axios from 'axios';
import { Popover, Tooltip } from 'antd';

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
    const errors = [];
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
    let errIndex = -1;
    // if first item is an error (transcription begins with a grammar error)
    if(data.matches[0].offset === 0) {
        const underlined = splitArr.map((x, i) => {
            if(i%2 === 0) {
                errIndex++;
                return (
                    // <Tooltip title="Grammar Correction">
                    <Popover content={popupContent(errors[errIndex].message, errors[errIndex].replacement)} title={errors[errIndex].title} trigger="hover">
                        <span key={i} className="errorUnderline">{x}</span>
                    </Popover>
                    // </Tooltip>
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
                errIndex++;
                return (
                // <Tooltip title="Grammar Correction">
                <Popover content={popupContent(errors[errIndex].message, errors[errIndex].replacement)} title={errors[errIndex].title} trigger="hover">
                    <span key={i} className="errorUnderline">{x}</span>
                </Popover>
                // </Tooltip>
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

const popupContent = (message, replacement) => {
    return (
        <div>
            <p>{message}</p>
            <p>Suggestion: {replacement}</p>
        </div>
    )
}
