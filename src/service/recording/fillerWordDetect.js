// parseDisfluencies = (string) => {
//     this.setState({transcriptionStrlist:  string.split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g)});
//     console.log("transcriptionlist: ", this.state.transcriptionStrlist);
// }

export const parseDisfluencies = (string) => {
    const stringData = {
        stringSplit: string.split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g),
        // fillerCount: string.match(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g || []).length,
        // umCount: string.toLowerCase().split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g).match(/um/g || []).length,
        // uhCount: string.toLowerCase().split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g).match(/uh/g || []).length,
        // hmmCount: string.toLowerCase().split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g).match(/hmm/g || []).length,
        // mhmCount: string.toLowerCase().split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g).match(/mhm/g || []).length,
        // uhHuhCount: string.toLowerCase().split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g).match(/uh huh/g || []).length,
            
    }
    return stringData;
}

export const redHighlight = (string) => {
    const arr = parseDisfluencies(string).stringSplit;
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("um")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else if (arr[i].includes("Um")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else if (arr[i].includes("uh")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else if (arr[i].includes("Uh")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else if (arr[i].includes("hmm")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else if (arr[i].includes("Hmm")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else if (arr[i].includes("mhm")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else if (arr[i].includes("Mhm")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else if (arr[i].includes("uh huh")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else if (arr[i].includes("Uh huh")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else {
            newArr.push(<span>{arr[i]}</span>);
        }
    }
    return newArr;
}