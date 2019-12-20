export const arrToObj = arr => arr.reduce( (acc, item) => {
    acc[item._id] = item;
    return acc;
}, {});

export const objToArr = obj => Object.keys(obj).map( item => obj[item]);