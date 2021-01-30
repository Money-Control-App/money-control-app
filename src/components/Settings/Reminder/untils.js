export const parseData = (key) => {
    const data=localStorage.getItem(key);
    return JSON.parse(data);
}

export const setItemsToLocalStorage = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item));
}


// export default {parseData, setItemsToLocalStorage}