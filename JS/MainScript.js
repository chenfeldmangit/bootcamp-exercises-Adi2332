
function load() {
    LocalStorageApi.setAsJson("tweets", new TweetList([]));
    LocalStorageApi.setAsJson("nextTweetId", Number(4));
    LocalStorageApi.setAsJson("profile", new Profile("Adi", 3, "Tel Aviv", "March 2020",
        152, 2548, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid, " +
        "asperiores assumenda beatae cupiditate dolorem, ea esse fugiat iure mollitia odio odit pariatur perspiciatis " +
        "possimus qui repellendus sapiente sunt velit."));
    setInterval(addPost, 2000);
}

function loadProfilePage() {
    Util.removeProfilePage();
    const profileTemplate = Util.getTemplate("profile-template");
    document.body.insertBefore(profileTemplate, document.getElementById("follow"));
    let profile = LocalStorageApi.getInstantOfClass("profile", Profile);
    document.getElementById("profile-title").innerHTML = profile.name;
    document.getElementById("profile-name").innerHTML = profile.name;
    document.getElementById("tweet-number").innerHTML = profile.tweetsNumber + " Tweets";
    document.getElementById("bio").innerHTML = "Joined " + profile.bio;
    document.getElementById("location").innerHTML = profile.location;
    document.getElementById("join-on").innerHTML = "Joined " + profile.joinOn;
    document.getElementById("following").innerHTML = profile.following;
    document.getElementById("followers").innerHTML = profile.followers;
    Util.setStreamDisplay("none");
}

function loadStream() {
    Util.removeProfilePage();
    Util.setStreamDisplay("flex");
}

function editProfile() {
    Util.openDialogById("edit-profile-dialog");
    const inputs = document.getElementById("edit-profile-form").getElementsByTagName("input");

    let profile = LocalStorageApi.getInstantOfClass("profile", Profile);
    document.getElementById("name-input").value = profile.name;
    document.getElementById("bio-input").value = profile.bio;
    document.getElementById("location-input").value = profile.location;

    for (let i = 0; i < inputs.length; i++) {
        validateLength(inputs[i].id);
    }
}

function closeEditProfile() {
    Util.closeDialogById("edit-profile-dialog");
}

function validateLength(id) {
    document.getElementById(id + "-length").innerText = document.getElementById(id).value.length.toString() + "/" + document.getElementById(id).getAttribute("maxlength");
}

function preventRefresh() {
    return false;
}

function saveProfile() {
    let profile = LocalStorageApi.getInstantOfClass("profile", Profile);
    profile.name = document.getElementById("name-input").value;
    profile.bio = document.getElementById("bio-input").value;
    profile.location = document.getElementById("location-input").value;
    LocalStorageApi.setAsJson("profile", profile);
    closeEditProfile();
    loadProfilePage();
}


/* TODO: should split to tweet API*/
function addTweet() {
    const newTweet = document.getElementById("write-post-text").value;
    const tweets = LocalStorageApi.getInstantOfClass("tweets", TweetList);
    tweets.addTweet(new Tweet(newTweet));
    LocalStorageApi.setAsJson("tweets", tweets);
}

function addPost() {
    const tweets = LocalStorageApi.getInstantOfClass("tweets", TweetList);
    tweets.list.forEach(tweet => {
        if (document.querySelectorAll(`.post[dataId="${tweet.id}"]`).length === 0) {
            const post = Util.getTemplate("post-template");
            document.getElementById("stream").insertBefore(post, document.getElementsByClassName("post")[0]);
            let newPost = document.getElementsByClassName("post-text")[0];
            newPost.innerHTML = tweet.text;
            document.getElementsByClassName("post")[0].setAttribute("dataId", Number(tweet.id).toString());
            document.getElementsByClassName("post")[0].setAttribute("style", "display:flex;");
        }
    });
}

function likeOrUnlikePost(event) {
    const tweets = LocalStorageApi.getInstantOfClass("tweets", TweetList);
    let tweet = tweets.getTweetById(event.target.closest(".post").getAttribute("dataId"));
    tweet.like = !tweet.like;
    tweet.like ? event.target.classList.add("liked") : event.target.classList.remove("liked");
    LocalStorageApi.setAsJson("tweets", tweets);
}

function deletePost(event) {
    let post = event.target.closest(".post");
    const postId = post.getAttribute("dataId");
    document.getElementById("stream").removeChild(post);
    const tweets = LocalStorageApi.getInstantOfClass("tweets", TweetList);
    tweets.removeTweetById(postId);
    LocalStorageApi.setAsJson("tweets", tweets);
}