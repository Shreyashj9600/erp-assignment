import API from "../api";

export const fetchCustomers = (params) =>
    API.get("/customers", { params }).then((r) => r.data);
export const getCustomer = (id) =>
    API.get(`/customers/${id}`).then((r) => r.data);
export const createCustomer = (payload) =>
    API.post("/customers", payload).then((r) => r.data);
export const updateCustomer = (id, payload) =>
    API.put(`/customers/${id}`, payload).then((r) => r.data);
export const deleteCustomer = (id) =>
    API.delete(`/customers/${id}`).then((r) => r.data);
