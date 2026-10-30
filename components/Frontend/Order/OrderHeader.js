import React from 'react';

const OrderHeader = (props) => {
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
                    <i className={`icon-long-arrow-alt-down-solid mr-1
                      ${(props.column === 'id' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i
                        className={`icon-long-arrow-alt-up-solid mr-1 
                       ${(props.column === 'id' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    SL
                </th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('order_number');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i
                        className={`icon-long-arrow-alt-down-solid mr-1
                       ${(props.column === 'order_number' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i
                        className={`icon-long-arrow-alt-up-solid mr-1 
                       ${(props.column === 'order_number' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Order
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
                    Total
                </th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('payment_status');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i
                        className={`icon-long-arrow-alt-down-solid mr-1
                       ${(props.column === 'payment_status' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i
                        className={`icon-long-arrow-alt-up-solid mr-1 
                       ${(props.column === 'payment_status' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Payment
                </th>


                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('order_status');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i
                        className={`icon-long-arrow-alt-down-solid mr-1
                       ${(props.column === 'order_status' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i
                        className={`icon-long-arrow-alt-up-solid mr-1 
                       ${(props.column === 'order_status' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Status
                </th>
            </tr>
        </>
    );
};

export default OrderHeader;