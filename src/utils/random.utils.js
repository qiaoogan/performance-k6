const randomString = (length) => {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const randomTitle = () => {
    return "Perf_name_" + randomString(20);
};

const iosNow = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
};

const currentDate = () => {
    return iosNow().split("T")[0];
};

const randomAuthor = () => {
    return "Perf Author " + randomString(8);
};

const randomPrice = () => {
    const min = 50;
    const max = 300;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomStock = () => {
    const min = 10;
    const max = 500;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomBID = () => {
    return "FKBID" + randomString(20).toUpperCase();
}

export default {
    randomTitle,
    randomAuthor,
    randomPrice,
    randomBID,
    currentDate,
    randomStock
};