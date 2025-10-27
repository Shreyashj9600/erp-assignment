import React, { useEffect, useState } from "react";
import {
    createInquiry,
    getInquiry,
    updateInquiry,
} from "../services/inquiryService";
import { fetchCustomers } from "../services/customerService";
import { useNavigate, useParams } from "react-router-dom";
import { formatISO } from "date-fns";

const emptyLine = {
    productName: "",
    description: "",
    quantity: 1,
    unit: "Pcs",
    expectedUnitPrice: 0,
};

export default function InquiryFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        customer: "",
        inquiryDate: formatISO(new Date(), { representation: "date" }),
        expectedDeliveryDate: "",
        status: "Draft",
        priority: "Medium",
        remarks: "",
        lineItems: [{ ...emptyLine }],
    });
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCustomers();
        if (id) loadInquiry();
    }, [id]);

    const loadCustomers = async () => {
        try {
            const res = await fetchCustomers({ page: 1, limit: 1000 });
            // only Active
            setCustomers(res.data.filter((c) => c.status === "Active"));
        } catch (err) {
            console.error(err);
        }
    };

    const loadInquiry = async () => {
        setLoading(true);
        try {
            const res = await getInquiry(id);
            const data = res.data;
            setForm({
                customer: data.customer._id,
                inquiryDate: formatISO(new Date(data.inquiryDate), {
                    representation: "date",
                }),
                expectedDeliveryDate: formatISO(new Date(data.expectedDeliveryDate), {
                    representation: "date",
                }),
                status: data.status,
                priority: data.priority,
                remarks: data.remarks,
                lineItems: data.lineItems.length ? data.lineItems : [{ ...emptyLine }],
            });
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
        setLoading(false);
    };

    const setField = (k, v) => setForm({ ...form, [k]: v });
    const setLine = (idx, k, v) => {
        const arr = [...form.lineItems];
        arr[idx] = { ...arr[idx], [k]: v };
        setForm({ ...form, lineItems: arr });
    };
    const addLine = () =>
        setForm({ ...form, lineItems: [...form.lineItems, { ...emptyLine }] });
    const removeLine = (idx) =>
        setForm({ ...form, lineItems: form.lineItems.filter((_, i) => i !== idx) });

    const validate = () => {
        if (!form.customer) return "Select customer";
        if (!form.expectedDeliveryDate) return "Select delivery date";
        if (new Date(form.expectedDeliveryDate) <= new Date())
            return "Delivery must be future date";
        if (!form.lineItems.length) return "Add at least one line item";
        for (const li of form.lineItems) {
            if (!li.productName) return "Line item product required";
            if (!(li.quantity > 0)) return "Line item quantity must be > 0";
        }
        return null;
    };

    const submit = async (e) => {
        e && e.preventDefault();
        const err = validate();
        if (err) return alert(err);
        try {
            if (id) {
                await updateInquiry(id, {
                    customer: form.customer,
                    inquiryDate: form.inquiryDate,
                    expectedDeliveryDate: form.expectedDeliveryDate,
                    status: form.status,
                    priority: form.priority,
                    remarks: form.remarks,
                    lineItems: form.lineItems,
                });
                alert("Updated");
            } else {
                await createInquiry({
                    customer: form.customer, 
                    inquiryDate: form.inquiryDate,
                    expectedDeliveryDate: form.expectedDeliveryDate,
                    status: form.status,
                    priority: form.priority,
                    remarks: form.remarks,
                    lineItems: form.lineItems,
                });
                alert("Created");
            }
            navigate("/inquiries");
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <div>
            <h2>{id ? "Edit" : "New"} Inquiry</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <form className="form" onSubmit={submit}>
                    <label>
                        Customer
                        <select
                            value={form.customer}
                            onChange={(e) => setField("customer", e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            {customers.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.customerName} - {c.customerCode}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Inquiry Date
                        <input
                            type="date"
                            value={form.inquiryDate}
                            onChange={(e) => setField("inquiryDate", e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Expected Delivery{" "}
                        <input
                            type="date"
                            value={form.expectedDeliveryDate}
                            onChange={(e) => setField("expectedDeliveryDate", e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Priority
                        <select
                            value={form.priority}
                            onChange={(e) => setField("priority", e.target.value)}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </label>

                    <label>
                        Remarks
                        <textarea
                            value={form.remarks}
                            onChange={(e) => setField("remarks", e.target.value)}
                        />
                    </label>

                    <h3>Line Items</h3>
                    {form.lineItems.map((li, idx) => (
                        <div key={idx} className="line-item">
                            <input
                                placeholder="Product"
                                value={li.productName}
                                onChange={(e) => setLine(idx, "productName", e.target.value)}
                                required
                            />
                            <input
                                placeholder="Description"
                                value={li.description}
                                onChange={(e) => setLine(idx, "description", e.target.value)}
                            />
                            <input
                                type="number"
                                min="1"
                                placeholder="Qty"
                                value={li.quantity}
                                onChange={(e) =>
                                    setLine(idx, "quantity", Number(e.target.value))
                                }
                            />
                            <select
                                value={li.unit}
                                onChange={(e) => setLine(idx, "unit", e.target.value)}
                            >
                                <option>Pcs</option>
                                <option>Kg</option>
                                <option>Ltr</option>
                                <option>Mtr</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Unit Price"
                                value={li.expectedUnitPrice}
                                onChange={(e) =>
                                    setLine(idx, "expectedUnitPrice", Number(e.target.value))
                                }
                            />
                            <button type="button" onClick={() => removeLine(idx)}>
                                Remove
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addLine}>
                        Add Line Item
                    </button>

                    <div>
                        <strong>Total Items: </strong>{" "}
                        {form.lineItems.reduce((s, li) => s + (li.quantity || 0), 0)}
                    </div>

                    <button type="submit">Save Inquiry</button>
                </form>
            )}
        </div>
    );
}
