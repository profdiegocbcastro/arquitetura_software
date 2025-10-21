export const wait = time => {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    });
};