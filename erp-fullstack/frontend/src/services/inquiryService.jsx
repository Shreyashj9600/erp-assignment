import API from "../api";

export const fetchInquiries = (params) =>
    API.get("/inquiries", { params }).then((r) => r.data);
export const getInquiry = (id) =>
    API.get(`/inquiries/${id}`).then((r) => r.data);
export const createInquiry = (payload) =>
    API.post("/inquiries", payload).then((r) => r.data);
export const updateInquiry = (id, payload) =>
    API.put(`/inquiries/${id}`, payload).then((r) => r.data);
export const deleteInquiry = (id) =>
    API.delete(`/inquiries/${id}`).then((r) => r.data);
