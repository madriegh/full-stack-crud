export interface ClientDTO {
    id: string,
    name: string,
    email: string,
}

export function getClients(token: string) {
    console.log(token);
    return fetch(`${process.env.REACT_APP_API_URL}/clients`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': token,
        }
    }).then(data => data.json());
}