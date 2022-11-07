
export interface Gym {
    id: string;
    name: string;
    coordinates: number[];
    _id: string;
}

export const getUserTicklist = async (token: string) => {
    return fetch(
        'https://rocolib.herokuapp.com/api/v1/user/ticklist', // This gets whole ticklist, both done and todo
        // 'http://localhost:5050/api/v1/user/ticklist',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
        .then(data => data.json())
        .then(data => data.boulders)
}


export const getGyms = async (): Promise<Gym[]> => {
    return fetch(
        'https://rocolib.herokuapp.com/api/v1/gym/list',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(data => data.json())
        .then(data => data.gyms)
}

export const getGymWalls = async (gymId: string) => {
    return fetch(
        `https://rocolib.herokuapp.com/api/v1/gym/${gymId}/walls`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(data => data.json())
        .then(data => data.walls)
}

export const getProblems = async (gymId: string) => {
    return fetch(
        `https://rocolib.herokuapp.com/api/v1/boulders/${gymId}/list`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
        .then(data => data.json())
        .then(data => data.boulders)
}
