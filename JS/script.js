class Profile{
    constructor(name) {
        this.name = name;
    }
}

this.data = {
    profile: new Profile("Adi")
};

function loadProfile() {
    const container = document.getElementsByClassName("container")[0];
    const profileTemplate = document.getElementById("profile-template");
    container.insertBefore(profileTemplate.content.cloneNode(true), document.getElementById("follow"));
    document.getElementById("stream").setAttribute("style", "display:none;");


    document.getElementsByClassName("profile-title")[0].innerHTML = this.data.profile.name;
}

function loadStream() {
    const container = document.getElementsByClassName("container")[0];
    container.removeChild(document.getElementById("profile"));
    document.getElementById("stream").setAttribute("style", "display:flex;");
}