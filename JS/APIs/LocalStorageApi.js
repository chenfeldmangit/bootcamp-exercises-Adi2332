class LocalStorageApi {
    static getInstantOfClass = (key, _class) => {
        return _class.fromJson(JSON.parse(localStorage.getItem(key)));
    };

    static setAsJson = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    static getInt = (key) => {
        return parseInt(localStorage.getItem(key));
    };

    static setInt = (key, value) => {
        localStorage.setItem(key, Number(value).toString());
    }
}

