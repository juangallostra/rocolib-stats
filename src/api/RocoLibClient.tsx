export interface Gym {
  _id: string;
  id: string;
  name: string;
  coordinates: number[];
}

export interface Wall {
  _id: string;
  image: string;
  name: string;
  radius: number;
  latest: boolean;
}

export interface Boulder {
  color: string;
  creator: string;
  date_climbed: string[];
  difficulty: string;
  feet: string;
  gym: string;
  holds: Hold[];
  is_done: boolean;
  name: string;
  radius: number;
  raters: number;
  rating: number;
  repetitions: number;
  safe_name: string;
  section: string;
  time: string;
  notes: string;
  _id: string;
}

interface Hold {
  color: string;
  x: number;
  y: number;
}

export interface Ticklist {
  boulders: Boulder[];
}

export const getUserTicklist = async (token: string) => {
  return fetch(
    "https://rocolib.onrender.com/api/v1/user/ticklist", // This gets whole ticklist, both done and todo
    // 'http://localhost:5050/api/v1/user/ticklist',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => data.json())
    .then((data) => data.boulders);
};

export const getGyms = async (): Promise<Gym[]> => {
  return fetch("https://rocolib.onrender.com/api/v1/gym/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => data.gyms);
};

export const getGymWalls = async (gymId: string): Promise<Wall[]> => {
  return fetch(`https://rocolib.onrender.com/api/v1/gym/${gymId}/walls`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => data.walls);
};

export const getProblems = async (gymId: string): Promise<Boulder[]> => {
  return fetch(`https://rocolib.onrender.com/api/v1/boulders/${gymId}/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => data.boulders);
};
