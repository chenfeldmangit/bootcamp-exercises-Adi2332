class Tweet {
    constructor(text, id = getNewTweetId(), like = false) {
        this.id = id;
        this.text = text.replace(/\r?\n/g, '<br />');
        this.like = like;
    }

    static fromJson(json) {
        return new Tweet(json.text, json.id, json.like);
    }
}