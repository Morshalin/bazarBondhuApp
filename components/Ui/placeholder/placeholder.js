import React from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

function Placeholder(props) {
  return [...Array(props.rows)].map((_, i) => (
    <React.Fragment key={i}>
      <ReactPlaceholder {...props} />
    </React.Fragment>
  ));
}

export default Placeholder;
