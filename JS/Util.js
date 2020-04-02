class Util {
    static getNewTweetId() {
        let nextTweetId = LocalStorageApi.getInt("nextTweetId");
        LocalStorageApi.setInt("nextTweetId", Number(nextTweetId + 1));
        return nextTweetId;
    }

    static removeProfilePage() {
        let profilePage = document.getElementById("profile-page");
        if (profilePage != null) {
            document.body.removeChild(profilePage);
        }
    }

    static setStreamDisplay(display) {
        document.getElementById("stream").setAttribute("style", `display:${display};`);
    }

    static openDialogById(editProfileDialog) {
        let dialog = document.getElementById(editProfileDialog);
        dialog.open = true;
        dialog.parentElement.setAttribute("style", "display:block;");
    }

    static closeDialogById(editProfileDialog) {
        let dialog = document.getElementById(editProfileDialog);
        dialog.open = false;
        dialog.parentElement.setAttribute("style", "display:none;")
    }

    static getTemplate(template) {
        return document.getElementById(template).content.cloneNode(true);
    }
}

