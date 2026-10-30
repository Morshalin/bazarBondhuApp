import React from 'react';

const ModuleHeader = (props) => {
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
                <th scope="col">Total Permission</th>
                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('active');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i
                        className={`icon-long-arrow-alt-down-solid mr-1
                        ${(props.column === `active` && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i
                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'active' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Status
                </th>
                <th scope="col">Action</th>
            </tr>
        </>
    );
};

export default ModuleHeader;