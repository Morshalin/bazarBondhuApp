import React from 'react';

const EarningHeader = (props) => {
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
                        props.setColumn('name');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'name' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'name' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Shop Name
                </th>
                <th scope="col">Shop Owner</th>
                <th scope="col">Total Order</th>
                <th scope="col">Total Earning</th>
                <th scope="col">Total Withdrawn</th>
                <th scope="col">Current Balance</th>
                <th scope="col">Can Request Amount</th>
                <th scope="col">Admin Earning</th>



                <th scope="col">Action</th>
            </tr>
        </>
    );
};

export default EarningHeader;