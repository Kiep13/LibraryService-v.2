export const errorFetch = (error) => {
    return {
        type : 'FETCH_FAILURE',
        payload : error
    }
};