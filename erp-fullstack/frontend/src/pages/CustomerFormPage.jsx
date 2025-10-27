import React, { useEffect, useState } from "react";
import {
    createCustomer,
    getCustomer,
    updateCustomer,
} from "../services/customerService";
import { useNavigate, useParams } from "react-router-dom";

const defaultAddress = { street: "", city: "", state: "", pincode: "" };

export default function CustomerFormPage() {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        customerName: "",
        address: "",
        email: "",
        gstNumber: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        phoneNumber: "",
        businessType: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) load();
    }, [id]);

    const load = async () => {
        setLoading(true);
        try {
            const res = await getCustomer(id);
            setForm(res.data);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
        setLoading(false);
    };

    const handle = (key, val) => setForm({ ...form, [key]: val });
    const handleAddress = (key, val) =>
        setForm({ ...form, address: { ...form.address, [key]: val } });

    const submit = async (e) => {
        e.preventDefault();
        // simple client validation
        const errs = {};
        if (!form.customerName) errs.customerName = "Name required";
        if (!form.email) errs.email = "Email required";
        if (!form.phoneNumber) errs.phoneNumber = "Phone required";
        if (!form.address.street) errs.address = "Address required";
        setErrors(errs);
        if (Object.keys(errs).length) return;

        try {
            if (id) {
                // Send only editable fields to API
                const payload = {
                    customerName: form.customerName,
                    address: form.address,
                    email: form.email,
                    gstNumber: form.gstNumber,
                    city: form.city,
                    state: form.state,
                    country: form.country,
                    postalCode: form.postalCode,
                    phoneNumber: form.phoneNumber,
                    businessType: form.businessType
                };

                await updateCustomer(id, payload);
                alert("Customer updated successfully!");
            } else {
                await createCustomer(form);
                alert("Customer created successfully!");
            }

            navigate("/customers");
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <div>
            <h2>{id ? "Edit" : "Add"} Customer</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <form className="form" onSubmit={submit}>
                    <label>
                        Name
                        <input
                            value={form.customerName}
                            onChange={(e) => handle("customerName", e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email
                        <input
                            value={form.email}
                            onChange={(e) => handle("email", e.target.value)}
                            required
                        />
                    </label>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                    />
                    <label>
                        Business Type
                        <select
                            name="businessType"
                            value={form.businessType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Retailer">Retailer</option>
                            <option value="Wholesaler">Wholesaler</option>
                            <option value="Distributor">Distributor</option>
                        </select>
                    </label>
                    <label>
                        Credit Limit
                        <input
                            type="number"
                            value={form.creditLimit}
                            onChange={(e) => handle("creditLimit", e.target.value)}
                        />
                    </label>

                    <fieldset>
                        <legend>Address</legend>
                        <label>
                            Street
                            <input
                                value={form.address.street || ""}
                                onChange={(e) => handleAddress("street", e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            City
                            <input
                                value={form.address.city || ""}
                                onChange={(e) => handleAddress("city", e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            State
                            <input
                                value={form.address.state || ""}
                                onChange={(e) => handleAddress("state", e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Pincode
                            <input
                                value={form.address.pincode || ""}
                                onChange={(e) => handleAddress("pincode", e.target.value)}
                                required
                            />
                        </label>
                    </fieldset>

                    <label>
                        GST
                        <input
                            value={form.gstNumber || ""}
                            onChange={(e) => handle("gstNumber", e.target.value)}
                        />
                    </label>
                    <label>
                        Status
                        <select
                            value={form.status}
                            onChange={(e) => handle("status", e.target.value)}
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </label>

                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
}
