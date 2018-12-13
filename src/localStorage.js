export const loadState = () => {
    try {
        const serializeState = localStorage.getItem('state');
        if (serializeState === null) return;
        return JSON.parse(serializeState);
    } catch (err) {

    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {

    }
};
