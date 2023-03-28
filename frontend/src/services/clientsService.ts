export function getClients(token: string) {
    return fetch(`${process.env.REACT_APP_API_URL}/clients`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': token,
        }
    }).then(data => {
        if(data.status !== 200) {
            throw new Error('Could not fetch clients');
        }
        return data.json()
    });
}

export function getClient(token: string, id: string) {
    return fetch(`${process.env.REACT_APP_API_URL}/clients/${id}`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': token,
        }
    }).then(data => {
        if(data.status !== 200) {
            throw new Error('Could not fetch client');
        }
        return data.json()
    });
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

export function updateClient(token: string, {name, email}: Client, id: string) {
    return fetch(`${process.env.REACT_APP_API_URL}/clients/${id}`, {
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
            throw new Error('Could not update client');
        }
    });
}

export function deleteClient(token: string, id: string) {
    return fetch(`${process.env.REACT_APP_API_URL}/clients/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': token,
        },
    }).then(data => {
        if(data.status !== 200) {
            throw new Error('Could not delete client');
        }
    });
}

export interface Client {
    name: string;
    email: string;
}