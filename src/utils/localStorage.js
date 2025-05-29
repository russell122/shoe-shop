export function getLocalStorage(key, defaultValue) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch(error) {
        console.error('Error getting localStorage item:', error);
        return defaultValue;
    }
}

export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch(error) {
        console.error('Error setting localStorage item:', error);
    }
}
