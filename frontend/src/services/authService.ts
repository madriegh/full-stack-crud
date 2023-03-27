export function registerAdmin(name: string, email: string, password: string): Promise<void> {
    return fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("invalid register");
        }
        return response.json();
    });

}

export function loginAdmin(email: string, password: string): Promise<LoginInfo> {
    return fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
            if (response.status !== 200) {
                throw Error("invalid login");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return {
                token: data.data.token,
                name: data.data.name
            }
        });
}

interface LoginInfo {
    token: string,
    name: string,
}
