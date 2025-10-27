import React from "react";

export default function SearchFilterBar({ onSearch, defaultFilters }) {
    const [search, setSearch] = React.useState("");
    const [businessType, setBusinessType] = React.useState("");
    const [status, setStatus] = React.useState("");

    const submit = (e) => {
        e.preventDefault();
        onSearch({ search, businessType, status });
    };

    return (
        <form className="searchbar" onSubmit={submit}>
            <input
                placeholder="Search name/code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
            >
                <option value="">All Business Types</option>
                <option value="Retailer">Retailer</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Distributor">Distributor</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Search</button>
        </form>
    );
}
