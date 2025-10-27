import API from "../api";

export async function login(payload) {
    const res = await API.post("/auth/login", payload);
    if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
}

export async function register(payload) {
    return (await API.post("/auth/register", payload)).data;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function getToken() {
    return localStorage.getItem("token");
}
export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}
