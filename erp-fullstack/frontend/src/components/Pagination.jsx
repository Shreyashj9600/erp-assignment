import React from 'react';

export default function Pagination({ meta, onPageChange }) {
    const { page, limit, total } = meta || { page: 1, limit: 10, total: 0 };
    const totalPages = Math.ceil(total / limit) || 1;
    return (
        <div className="pagination">
            {/* <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</button> */}
        </div>
    );
}
