class Profile {
    constructor(name, tweetsNumber, location, joinOn, following, followers, bio) {
        this.name = name;
        this.tweetsNumber = tweetsNumber;
        this.joinOn = joinOn;
        this.location = location;
        this.bio = bio;
        this.following = following;
        this.followers = followers;
    }

    static fromJson(json) {
        return new Profile(json.name, json.tweetsNumber, json.location,
            json.joinOn, json.following, json.followers, json.bio);
    }
}

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

class TweetList {
    constructor(json) {
        if (json === undefined)
            this.list = [];
        else
            this.list = json.list.map(tweet => Tweet.fromJson(tweet));
    }

    addTweet(tweet) {
        this.list.splice(0, 0, tweet);
    }

    getTweetById(id) {
        return this.list.filter(tweet => tweet.id === parseInt(id))[0];
    }
}

function getNewTweetId() {
    let nextTweetId = parseInt(localStorage.getItem("nextTweetId"));
    localStorage.setItem("nextTweetId", Number(nextTweetId + 1).toString());
    return nextTweetId;
}

function load() {
    localStorage.setItem("tweets", JSON.stringify(new TweetList()));
    localStorage.setItem("nextTweetId", Number(4).toString());
    localStorage.setItem("profile", JSON.stringify(new Profile("Adi", 3, "Tel Aviv", "March 2020",
        152, 2548, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid, " +
        "asperiores assumenda beatae cupiditate dolorem, ea esse fugiat iure mollitia odio odit pariatur perspiciatis " +
        "possimus qui repellendus sapiente sunt velit.")));
    setInterval(addPost, 2000);
}

function removeProfilePage() {
    let profilePage = document.getElementById("profile-page");
    if (profilePage != null) {
        document.body.removeChild(profilePage);
    }
}

function getTemplate(template) {
    return document.getElementById(template).content.cloneNode(true);
}

function loadProfilePage() {
    removeProfilePage();
    const profileTemplate = getTemplate("profile-template");
    document.body.insertBefore(profileTemplate, document.getElementById("follow"));
    let profile = Profile.fromJson(JSON.parse(localStorage.getItem("profile")));
    document.getElementById("profile-title").innerHTML = profile.name;
    document.getElementById("profile-name").innerHTML = profile.name;
    document.getElementById("tweet-number").innerHTML = profile.tweetsNumber + " Tweets";
    document.getElementById("bio").innerHTML = "Joined " + profile.bio;
    document.getElementById("location").innerHTML = profile.location;
    document.getElementById("join-on").innerHTML = "Joined " + profile.joinOn;
    document.getElementById("following").innerHTML = profile.following;
    document.getElementById("followers").innerHTML = profile.followers;
    setStreamDisplay("none");
}

function loadStream() {
    removeProfilePage();
    setStreamDisplay("flex");
}

function setStreamDisplay(display) {
    document.getElementById("stream").setAttribute("style", `display:${display};`);
}

function openDialogById(editProfileDialog) {
    let dialog = document.getElementById(editProfileDialog);
    dialog.open = true;
    dialog.parentElement.setAttribute("style", "display:block;");
}

function closeDialogById(editProfileDialog) {
    let dialog = document.getElementById(editProfileDialog);
    dialog.open = false;
    dialog.parentElement.setAttribute("style", "display:none;")
}

function editProfile() {
    openDialogById("edit-profile-dialog");
    const inputs = document.getElementById("edit-profile-form").getElementsByTagName("input");

    let profile = Profile.fromJson(JSON.parse(localStorage.getItem("profile")));
    document.getElementById("name-input").value = profile.name;
    document.getElementById("bio-input").value = profile.bio;
    document.getElementById("location-input").value = profile.location;

    for (let i = 0; i < inputs.length; i++) {
        validateLength(inputs[i].id);
    }
}

function closeEditProfile() {
    closeDialogById("edit-profile-dialog");
}

function validateLength(id) {
    document.getElementById(id + "-length").innerText = document.getElementById(id).value.length.toString() + "/" + document.getElementById(id).getAttribute("maxlength");
}

function preventRefresh() {
    return false;
}

function saveProfile() {
    let profile = Profile.fromJson(JSON.parse(localStorage.getItem("profile")));
    profile.name = document.getElementById("name-input").value;
    profile.bio = document.getElementById("bio-input").value;
    profile.location = document.getElementById("location-input").value;
    localStorage.setItem("profile", JSON.stringify(profile));
    closeEditProfile();
    loadProfilePage();
}

function addTweet() {
    const newTweet = document.getElementById("write-post-text").value;
    const tweets = new TweetList(JSON.parse(localStorage.getItem("tweets")));
    tweets.addTweet(new Tweet(newTweet));
    localStorage.setItem("tweets", JSON.stringify(tweets));
    addPost();
}

function addPost() {
    const tweets = new TweetList(JSON.parse(localStorage.getItem("tweets")));
    tweets.list.forEach(tweet => {
        if (document.querySelectorAll(`.post[dataId="${tweet.id}"]`).length === 0) {
            const post = getTemplate("post-template");
            document.getElementById("stream").insertBefore(post, document.getElementsByClassName("post")[0]);
            let newPost = document.getElementsByClassName("post-text")[0];
            newPost.innerHTML = tweet.text;
            document.getElementsByClassName("post")[0].setAttribute("dataId", Number(tweet.id).toString());
            document.getElementsByClassName("post")[0].setAttribute("style", "display:flex;");
        }
    });
}

function likeOrUnlikePost(event) {
    const tweets = new TweetList(JSON.parse(localStorage.getItem("tweets")));
    let tweet = tweets.getTweetById(event.target.closest(".post").getAttribute("dataId"));
    tweet.like = !tweet.like;
    tweet.like ? event.target.classList.add("liked") : event.target.classList.remove("liked");
    localStorage.setItem("tweets", JSON.stringify(tweets));
}