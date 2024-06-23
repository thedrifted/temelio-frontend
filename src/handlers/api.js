import { BASE_PATH } from "./constants";

export function createNonProfit(nonProfitData) {
    const url = BASE_PATH + "/v1/non-profits/create";  // Replace with your actual server address
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nonProfitData)
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.errorMessage)
                });
            }
        })
}

export function createFoundation(foundationData) {
    const url = BASE_PATH + "/v1/foundation/create"; // Replace with your actual server address
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(foundationData)
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.errorMessage)
                });
            }
        })
}

export function fetchAllFoundations() {
    const url = BASE_PATH + "/v1/foundation/get-all"; // Replace with your actual server address

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.errorMessage);
                });
            }
            return response.json();
        })
}


export function fetchAllNonProfits() {
    const url = BASE_PATH + "/v1/non-profits/get-all"; // Replace with your actual server address

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.errorMessage);
                });
            }
            return response.json();
        })
}

export function sendEmail(sendEmailData) {
    console.log(sendEmailData)
    if (!sendEmailData?.foundationId) {
        throw new Error("Foundation id is missing");
    }

    if (!sendEmailData?.nonProfitIds?.length > 0) {
        throw new Error("Non profit id is missing");
    }

    const url = BASE_PATH + "/v1/email/send"; // Replace with your actual server address
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendEmailData)
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.errorMessage)
                });
            }
        })
}

export function getAllEmails() {
    const url = BASE_PATH + "/v1/email/get-all"; // Replace with your actual server address

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.errorMessage);
                });
            }
            return response.json();
        })
}