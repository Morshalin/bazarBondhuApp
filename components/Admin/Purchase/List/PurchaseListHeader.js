import React from 'react';

const PurchaseListHeader = (props) => {
    return (
        <>
            <tr>
                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('id');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i
                        className={`icon-long-arrow-alt-down-solid mr-1
                        ${(props.column === 'id' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i
                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'id' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    SL
                </th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('invoice_date');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'invoice_date' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'invoice_date' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Invoice Date
                </th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('invoice_number');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'invoice_number' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'invoice_number' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Invoice Number
                </th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('grand_total');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'grand_total' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'grand_total' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Grand Total
                </th>

                <th scope="col">Supplier</th>
            </tr>
        </>
    );
};

export default PurchaseListHeader;