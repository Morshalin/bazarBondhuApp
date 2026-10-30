import React from 'react';

const PagesTableHeader = (props) => {
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
                    Name

                </th>

                <th>
                    Slug
                </th>

               <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('sort_order');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'sort_order' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'sort_order' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Sort Order
                </th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('status');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'status' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'status' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Status
                </th>

                <th scope="col">Action</th>
            </tr>

        </>
    );
};

export default PagesTableHeader;