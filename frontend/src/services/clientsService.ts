export function getClients(token: string) {
    return fetch(`${process.env.REACT_APP_API_URL}/clients`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': token,
        }
    }).then(data => data.json());
}

export function createClient(token: string, {name, email}: Client) {
    return fetch(`${process.env.REACT_APP_API_URL}/clients`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': token,
        },
        body: JSON.stringify({
            name: name,
            email: email,
        }),
    }).then(data => {
        if(data.status !== 200) {
            throw new Error('Could not create client');
        }
    });
}

export interface Client {
    name: string;
    email: string;
}