import React from 'react';
import axios from 'axios';
import ReactTooltip from "react-tooltip";

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
    if(data == null || data.matches == null || data.matches.length == 0) {
        return transcription;
    }
    let errors = [];
    // loop through error matches, break up transcription into alternating words and errors
    for(let i=0; i<data.matches.length; i++) {
        let errorSubstr = {};
        if (data.matches[i].replacements != [] && data.matches[i].replacements != null) {
            errorSubstr = {
                offset: data.matches[i].offset,
                length: data.matches[i].length,
                title: data.matches[i].shortMessage,
                message: data.matches[i].message,  // or matches[i].shortMessage
                replacement: data.matches[i].replacements[0]
            }
            // errors.push(errorSubstr);
            // errorSubstr.offset = data.matches[i].offset,
            // errorSubstr.length = data.matches[i].length,
            // errorSubstr.title = data.matches[i].shortMessage,
            // errorSubstr.message = data.matches[i].message,  // or matches[i].shortMessage
            // errorSubstr.replacement = data.matches[i].replacements[0].value
        } else {
            // errorSubstr.offset = data.matches[i].offset,
            // errorSubstr.length = data.matches[i].length,
            // errorSubstr.title = data.matches[i].shortMessage,
            // errorSubstr.message = data.matches[i].message  // or matches[i].shortMessage
            // errorSubstr.replacement = "None"
            errorSubstr = {
                offset: data.matches[i].offset,
                length: data.matches[i].length,
                title: data.matches[i].shortMessage,
                message: data.matches[i].message,  // or matches[i].shortMessage
                replacement: "None"
            }
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
                    <>
                        <a data-for={x}
                            data-tip={tooltip(errors[errIndex].title, errors[errIndex].message, errors[errIndex].replacement)}
                            data-iscapture="true">
                            <span key={i} className="grammarHighlight">{x}</span>
                        </a>
                        <ReactTooltip
                            id={x}
                            place="top"
                            type="success"
                            effect="solid"
                            multiline={true}
                        />
                    </>
                    
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
                    <>
                    <a data-for={x}
                        data-tip={tooltip(errors[errIndex].title, errors[errIndex].message, errors[errIndex].replacement)}
                        data-iscapture="true">
                        <span key={i} className="grammarHighlight">{x}</span>
                    </a>
                    <ReactTooltip
                        id={x}
                        place="top"
                        type="success"
                        effect="solid"
                        multiline={true}
                    />
                </>
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

// Tooltip tooltip
const tooltip = (title, message, replacement) => {
    return (
        // `${title}<br/>${message}<br/>Replacement Suggestion: ${replacement}`
        `${message}<br/>Replacement Suggestion: ${replacement}`
    )
}
