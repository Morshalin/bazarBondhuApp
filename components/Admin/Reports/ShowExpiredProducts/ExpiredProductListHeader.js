import React from 'react';

const ExpiredProductListHeader = (props) => {
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

                <th scope="col">Image</th>

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

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('purchase_qty');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'purchase_qty' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'purchase_qty' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Purchase Qty.
                </th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('selling_qty');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'selling_qty' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'selling_qty' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Selling Qty.
                </th>

                <th scope="col">Stock</th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('purchase_price');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'purchase_price' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'purchase_price' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Purchase Price
                </th>

                <th
                    onClick={(e) => {
                        e.preventDefault();
                        props.setColumn('selling_price');
                        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');
                    }}
                    scope="col">
                    <i

                        className={`icon-long-arrow-alt-down-solid mr-1 
                        ${(props.column === 'selling_price' && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>
                    <i

                        className={`icon-long-arrow-alt-up-solid mr-1 
                        ${(props.column === 'selling_price' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>
                    Selling Price
                </th>

                {/*<th*/}
                {/*    onClick={(e) => {*/}
                {/*        e.preventDefault();*/}
                {/*        props.setColumn('create_at');*/}
                {/*        props.setOrderBy((props.orderBy === 'ASC') ? 'DESC' : 'ASC');*/}
                {/*    }}*/}
                {/*    scope="col">*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-down-solid mr-1*/}
                {/*        ${(props.column === `create_at` && props.orderBy === 'ASC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    <i*/}
                {/*        className={`icon-long-arrow-alt-up-solid mr-1 */}
                {/*        ${(props.column === 'create_at' && props.orderBy === 'DESC') ? `text-primary` : `d-none`}`}></i>*/}
                {/*    Actions*/}
                {/*</th>*/}

            </tr>
        </>
    );
};

export default ExpiredProductListHeader;