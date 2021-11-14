import React from 'react';
import Pagination from '@mui/material/Pagination';
import "./paginations.css";

export const Paginations = ({ onChangePage, page, totalResultNumber, limit }) => {
    const count = Math.ceil(totalResultNumber / limit)

    return (
        <div className="pagination">
            <Pagination count={count} page={page} onChange={onChangePage} color="primary" />
        </div>
    )
}

