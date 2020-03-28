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

}

this.data = {
    profile: new Profile("Adi", 3, "Tel Aviv", "March 2020", 152, 2548, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid, asperiores assumenda beatae cupiditate dolorem, ea esse fugiat iure mollitia odio odit pariatur perspiciatis possimus qui repellendus sapiente sunt velit.")
};

function removeProfilePage() {
    let profilePage = document.getElementById("profile-page");
    if (profilePage != null) {
        document.body.removeChild(profilePage);
    }
}

function getTemplate(template) {
    return document.getElementById(template);
}

function loadProfilePage() {
    removeProfilePage();
    const profileTemplate = getTemplate("profile-template").content.cloneNode(true);
    document.body.insertBefore(profileTemplate, document.getElementById("follow"));
    document.getElementById("profile-title").innerHTML = this.data.profile.name;
    document.getElementById("profile-name").innerHTML = this.data.profile.name;
    document.getElementById("tweet-number").innerHTML = this.data.profile.tweetsNumber + " Tweets";
    document.getElementById("bio").innerHTML = "Joined " + this.data.profile.bio;
    document.getElementById("location").innerHTML = this.data.profile.location;
    document.getElementById("join-on").innerHTML = "Joined " + this.data.profile.joinOn;
    document.getElementById("following").innerHTML = this.data.profile.following;
    document.getElementById("followers").innerHTML = this.data.profile.followers;
    setStreamDisplay("none");
}

function loadStream() {
    removeProfilePage();
    setStreamDisplay("flex");
}

function setStreamDisplay(display) {
    document.getElementById("stream").setAttribute("style", "display:" + display + ";");
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

    document.getElementById("name-input").value = this.data.profile.name;
    document.getElementById("bio-input").value = this.data.profile.bio;
    document.getElementById("location-input").value = this.data.profile.location;

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
    this.data.profile.name = document.getElementById("name-input").value;
    this.data.profile.bio = document.getElementById("bio-input").value;
    this.data.profile.location = document.getElementById("location-input").value;
    closeEditProfile();
    loadProfilePage();
}