const ProductHeadList = (props) => {
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
        <th scope="col">Image</th>
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

        {action === "withoutPermision" ? (
          <>
            <th
              onClick={(e) => {
                e.preventDefault();
                setColumn("selling_price");
                setOrderBy(orderBy === "ASC" ? "DESC" : "ASC");
              }}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              <i
                className={`icon-long-arrow-alt-down-solid mr-1
            ${
              column === "selling_price" && orderBy === "ASC"
                ? `text-primary`
                : `d-none`
            }`}
              ></i>
              <i
                className={`icon-long-arrow-alt-up-solid mr-1 
            ${
              column === "selling_price" && orderBy === "DESC"
                ? `text-primary`
                : `d-none`
            }`}
              ></i>
              MRP
            </th>

            <th scope="col"> Current stock </th>
          </>
        ) : (
          <th scope="col">Product Scope</th>
        )}

        <th scope="col">Product Status</th>
        {action === "withoutPermision" ? (
          <th scope="col">Action</th>
        ) : (
          (props.hasMenuPermission("product", "edit") ||
            props.hasMenuPermission("product", "edit")) && (
            <th scope="col">Action</th>
          )
        )}
      </tr>
    </thead>
  );
};

export default ProductHeadList;
