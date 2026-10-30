import React from 'react';

const UserHeader = (props) => {
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
                        props.setColumn('first_name');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'first_name' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'first_name' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Name
                </th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('username');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i
                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'username' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'username' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Username
                </th>

                <th onClick={(e) => {
                    e.preventDefault();
                    props.setColumn('email');
                    props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                }}
                    scope="col">
                    <i
                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'email' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'email' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>

                    Email
                </th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">
                    Actions
                </th>
            </tr>
        </>
    );
};

export default UserHeader;