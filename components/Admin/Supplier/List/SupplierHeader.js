import React from 'react';

const SupplierHeader = (props) => {
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


                {/*<th*/}
                {/*    onClick={(e) => {*/}
                {/*        e.preventDefault();*/}
                {/*        props.setColumn('address');*/}
                {/*        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');*/}
                {/*    }}*/}
                {/*    scope="col">*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-down-solid mr-1*/}
                {/*       ${(props.column === 'address' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-up-solid mr-1 */}
                {/*       ${(props.column === 'address' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    Address*/}
                {/*</th>*/}

                {/*<th*/}
                {/*    onClick={(e) => {*/}
                {/*        e.preventDefault();*/}
                {/*        props.setColumn('telephone_number');*/}
                {/*        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');*/}
                {/*    }}*/}
                {/*    scope="col">*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-down-solid mr-1*/}
                {/*       ${(props.column === 'telephone_number' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-up-solid mr-1 */}
                {/*       ${(props.column === 'telephone_number' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    Telephone Number*/}
                {/*</th>*/}

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('mobile_number');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i
                        className={`icon-long-arrow-alt-down-solid mr-1
                       ${(props.column === 'mobile_number' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i
                        className={`icon-long-arrow-alt-up-solid mr-1 
                       ${(props.column === 'mobile_number' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Mobile
                </th>

                <th
                    onClick={(e) => {
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

                {/*<th*/}
                {/*    onClick={(e) => {*/}
                {/*        e.preventDefault();*/}
                {/*        props.setColumn('products');*/}
                {/*        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');*/}
                {/*    }}*/}
                {/*    scope="col">*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-down-solid mr-1*/}
                {/*       ${(props.column === 'products' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-up-solid mr-1 */}
                {/*       ${(props.column === 'products' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    Supplier Products*/}
                {/*</th>*/}

                {/*<th*/}
                {/*    onClick={(e) => {*/}
                {/*        e.preventDefault();*/}
                {/*        props.setColumn('web');*/}
                {/*        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');*/}
                {/*    }}*/}
                {/*    scope="col">*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-down-solid mr-1*/}
                {/*       ${(props.column === 'web' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-up-solid mr-1 */}
                {/*       ${(props.column === 'web' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    Web*/}
                {/*</th>*/}

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('active');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i
                        className={`icon-long-arrow-alt-down-solid mr-1
                       ${(props.column === 'active' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
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

export default SupplierHeader;