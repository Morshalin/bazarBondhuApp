const CompanyHeadList = (props) => {
  const { column, orderBy, setColumn, setOrderBy, action } = props;
  return (
    <thead className="thead-light">
      <tr>
        <th
          onClick={(e) => {
            e.preventDefault();
            setColumn("id");
            setOrderBy(orderBy === "ASC" ? "DESC" : "ASC");
          }}
          scope="col"
          style={{ cursor: "pointer" }}
        >
          <i
            className={`icon-long-arrow-alt-down-solid mr-1
            ${
              column === "id" && orderBy === "ASC" ? `text-primary` : `d-none`
            }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
            ${
              column === "id" && orderBy === "DESC" ? `text-primary` : `d-none`
            }`}
          ></i>
          SL
        </th>

        <th
          onClick={(e) => {
            e.preventDefault();
            setColumn("name");
            setOrderBy(orderBy === "ASC" ? "DESC" : "ASC");
          }}
          scope="col"
          style={{ cursor: "pointer" }}
        >
          <i
            className={`icon-long-arrow-alt-down-solid mr-1
            ${
              column === "name" && orderBy === "ASC" ? `text-primary` : `d-none`
            }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
            ${
              column === "name" && orderBy === "DESC"
                ? `text-primary`
                : `d-none`
            }`}
          ></i>
          Name
        </th>

        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
  );
};

export default CompanyHeadList;
