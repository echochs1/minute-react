export const parseDisfluencies = (string) => {
    this.setState({transcriptionStrlist:  string.split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g)});
    console.log("transcriptionlist: ", this.state.transcriptionStrlist);
}