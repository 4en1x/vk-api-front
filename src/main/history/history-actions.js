import historyService from '../../service/history-service';

const GET_HISTORY = 'GET_HISTORY';

function addHistoryValues(data) {
    return {
        type: GET_HISTORY,
        data,
    };
}

export function getHistory(page = 1, handler, t) {
    return (dispatch) => {
        historyService.getHistory(page)
            .then(res => dispatch(addHistoryValues(res.data)))
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}
