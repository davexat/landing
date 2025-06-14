'use strict';

let fetchFakerData =  (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => ({
            success: true,
            body: data
        }))
        .catch(error => ({
            success: false,
            error: error.message
        }));
};

export { fetchFakerData }
