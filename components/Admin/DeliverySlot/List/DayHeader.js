import React from 'react';

const DayHeader = () => {
    return (
        <>
            <tr>
                <th scope="col">
                    SL
                </th>
                <th scope="col">
                    Day Name
                </th>

                <th scope="col">
                    Total Slots
                </th>

                <th scope="col">
                    Status
                </th>
                <th scope="col">Action</th>
            </tr>
        </>
    );
};

export default DayHeader;