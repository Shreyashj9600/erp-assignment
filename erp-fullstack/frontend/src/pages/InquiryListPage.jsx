import React, { useEffect, useState } from "react";
import { fetchInquiries, deleteInquiry } from "../services/inquiryService";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function InquiryListPage() {
    const [inquiries, setInquiries] = useState([]);
    const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 });
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);

    const load = async (page = 1) => {
        setLoading(true);
        try {
            const params = { page, limit: meta.limit, ...filters };
            const res = await fetchInquiries(params);
            setInquiries(res.data);
            setMeta(res.meta);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(1);
    }, [filters]);

    const remove = async (id) => {
        if (!window.confirm("Delete inquiry?")) return;
        try {
            await deleteInquiry(id);
            load(meta.page);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Sales Inquiries</h2>
                <Link to="/inquiries/new">New Inquiry</Link>
            </div>

            <div className="filters">
                <button onClick={() => setFilters({})}>Clear Filters</button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Delivery</th>
                                <th>Status</th>
                                <th>Items</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((i) => (
                                <tr key={i._id}>
                                    <td>{i.inquiryNumber}</td>
                                    <td>{i.customer?.customerName || i.customer}</td>
                                    <td>{new Date(i.inquiryDate).toLocaleDateString()}</td>
                                    <td>
                                        {new Date(i.expectedDeliveryDate).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <span className={`badge ${i.status.toLowerCase()}`}>
                                            {i.status}
                                        </span>
                                    </td>
                                    <td>{i.totalItemsCount}</td>
                                    <td>
                                        <Link to={`/inquiries/${i._id}/edit`}>Edit</Link>
                                        <button onClick={() => remove(i._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination meta={meta} onPageChange={(p) => load(p)} />
                </>
            )}
        </div>
    );
}
