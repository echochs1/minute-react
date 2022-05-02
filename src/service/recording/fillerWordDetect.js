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
        if (arr[i].includes("um") || arr[i].includes("Um") 
        || arr[i].includes("uh") || arr[i].includes("Uh")
        || arr[i].includes("hmm") || arr[i].includes("Hmm") 
        || arr[i].includes("mhm") || arr[i].includes("Mhm")
        || arr[i].includes("uh huh") || arr[i].includes("Uh huh")) {
            newArr.push(<span className="redHighlight">{arr[i]}</span>);
        } else {
            newArr.push(<span>{arr[i]}</span>);
        }
    }
    return newArr;
}
export const fillerWordCount = (string) => {
    const arr = parseDisfluencies(string).stringSplit;
    var count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("um") || arr[i].includes("Um") 
        || arr[i].includes("uh") || arr[i].includes("Uh")
        || arr[i].includes("hmm") || arr[i].includes("Hmm") 
        || arr[i].includes("mhm") || arr[i].includes("Mhm")
        || arr[i].includes("uh huh") || arr[i].includes("Uh huh")) {
            count++;
        }
    }
    return count;
}