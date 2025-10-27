import React, { useEffect, useState } from 'react';
import { fetchCustomers, deleteCustomer } from '../services/customerService';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import SearchFilterBar from '../components/SearchFilterBar';

export default function CustomerListPage() {
    const [customers, setCustomers] = useState([]);
    const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 });
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);

    const load = async (page = 1) => {
        setLoading(true);
        try {
            const params = { page, limit: meta.limit, ...filters };
            const res = await fetchCustomers(params);
            setCustomers(res.data);
            setMeta(res.meta);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(1); }, [filters]);

    const onDelete = async (id) => {
        if (!window.confirm('Delete customer? (soft delete)')) return;
        try {
            await deleteCustomer(id);
            alert('Deleted');
            load(meta.page);
        } catch (err) { alert(err.response?.data?.message || err.message); }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Customers</h2>
                <Link to="/customers/new">Add Customer</Link>
            </div>

            <SearchFilterBar onSearch={(f) => { setFilters(f); }} />

            {loading ? <div>Loading...</div> : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Code</th><th>Name</th><th>Business</th><th>Phone</th><th>Status</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(c => (
                                <tr key={c._id}>
                                    <td>{c.customerCode}</td>
                                    <td>{c.customerName}</td>
                                    <td>{c.businessType}</td>
                                    <td>{c.phoneNumber}</td>
                                    <td>{c.status}</td>
                                    <td>
                                        <Link to={`/customers/${c._id}/edit`}>Edit</Link>
                                        <button onClick={() => onDelete(c._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination meta={meta} onPageChange={p => load(p)} />
                </>)}
        </div>
    );
}
