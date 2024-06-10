const data = {};

module.exports = {
    set: (key, value) => {
        data[key] = value;
    },
    fetch: (key) => {
        return data[key];
    },
    keys: () => {
        return Object.keys(data);
    }
};
