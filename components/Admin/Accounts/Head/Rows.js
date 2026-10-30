import React from "react";
import Link from "next/link";
import { deleteAction } from "../../../../Helpers/Utils/Utils";

const Rows = ({ heads, c, deletHead, setHead }) => {
  const displayNodeName = {
    bottom: "19px",
    right: "-6px",
    paddingTop: "17px",
    borderBottom: "1px solid #adadad",
    position: "relative",
    paddingBottom: "12px",
    borderLeft: "1px solid #adadad",
  };

  const displayNodeName2 = {
    bottom: "19px",
    right: "-6px",
    paddingTop: "14px",
    borderBottom: "1px solid #adadad",
    position: "relative",
    paddingBottom: "12px",
  };

  if (!heads || !heads.length) {
    c = c - 1;
    return null;
  } else {
    c = c + 1;
  }

  let row = 0;
  return heads.map((head, index) => (
    <React.Fragment key={head.id}>
      <tr className="border-bottom" id={head.id}>
        <td className="text-center">
          {head.system_check ? (
            <i className="fas fa-lock" title="System Define"></i>
          ) : (
            <i className="fas fa-check" title="User Define"></i>
          )}
        </td>
        <td>
          {/*{ c>0 ? `\u00A0 \u00A0 \u00A0`.repeat(c) : ''}*/}
          {/*{ c>0 ? <span style={displayNodeName}> &nbsp;&nbsp;&nbsp;&nbsp;</span> : ''}*/}
          {/*{ c>0 ? `\u00A0 \u00A0 \u00A0`.repeat(c) : ''}*/}
          {[...Array(c)].map((e, i) => (
            <>
              {i == 0
                ? `\u00A0\u00A0\u00A0`
                : `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}
              <span style={displayNodeName} key={i}></span>
            </>
          ))}
          {c > 0 ? (
            <span style={displayNodeName2}> &nbsp;&nbsp;&nbsp;</span>
          ) : (
            ""
          )}
          &nbsp;&nbsp;&nbsp;
          {head.children && head.children.length > 0 ? (
            <i className="far fa-folder-open"></i>
          ) : (
            <i className="far fa-folder"></i>
          )}{" "}
          &nbsp;
          {head.text}
        </td>
        <td className="text-center">{head.code}</td>
        <td className="text-center">{head.applicable_for}</td>
        {c > 0 ? (
          <td className="text-center">{head.details}</td>
        ) : (
          <td className="text-center">{""}</td>
        )}

        {/*  <td className="text-center">{head.root ? head.root.name : ""}</td> */}
        <td className="text-center">
          <div className="dropdown action-btn-group">
            <button
              className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Actions
            </button>
            <div className="dropdown-menu">
              {/*{*/}
              {/*    head.main_root == 6 ?*/}
              {/*        <a*/}
              {/*            className='dropdown-item'*/}
              {/*            href='#'*/}
              {/*            onClick={(event) => {*/}
              {/*                event.preventDefault()*/}
              {/*                setHead(head);*/}
              {/*                // props.addSupplier(supplier);*/}
              {/*                // props.resetSupplierData();*/}
              {/*            }}*/}
              {/*            data-toggle="modal"*/}
              {/*            data-target="#add_expense_modal"*/}
              {/*        >*/}
              {/*            <i className="fas fa-money-check-alt text-warning"></i>*/}
              {/*            {' '}*/}
              {/*            Add Expense*/}
              {/*        </a>*/}
              {/*        :*/}
              {/*        <></>*/}
              {/*}*/}

              {/*{*/}
              {/*    head.id == 1 ?*/}
              {/*        <a*/}
              {/*            className='dropdown-item'*/}
              {/*            href='#'*/}
              {/*            onClick={(event) => {*/}
              {/*                event.preventDefault()*/}
              {/*                setHead(head);*/}
              {/*                // props.addSupplier(supplier);*/}
              {/*                // props.resetSupplierData();*/}
              {/*            }}*/}
              {/*            data-toggle="modal"*/}
              {/*            data-target="#add_cash_modal"*/}
              {/*        >*/}
              {/*            <i className="fas fa-money-check-alt text-warning"></i>*/}
              {/*            {' '}*/}
              {/*            Add Cash*/}
              {/*        </a>*/}
              {/*        :*/}
              {/*        <></>*/}
              {/*}*/}

              {head.system_check ? (
                <Link legacyBehavior href={`accounts-head/add/${head.id}`}>
                  <a className="dropdown-item">
                    <i className="icon-plus-square-regular"></i> Add Head
                  </a>
                </Link>
              ) : (
                <>
                  <Link legacyBehavior href={`accounts-head/add/${head.id}`}>
                    <a className="dropdown-item">
                      <i className="icon-plus-square-regular"></i> Add Head
                    </a>
                  </Link>
                  <Link legacyBehavior href={`accounts-head/edit/${head.id}`}>
                    <a className="dropdown-item">
                      <i className="icon-edit-solid"></i> Edit Head
                    </a>
                  </Link>
                  {/*<button className="dropdown-item" onClick={(event => {*/}
                  {/*    event.preventDefault();*/}
                  {/*    deletHead(head.id);*/}
                  {/*    var row = document.getElementById(head.id);*/}
                  {/*    row.parentElement.removeChild(row);*/}
                  {/*})}>*/}
                  {/*    <i className="icon-trash-alt-regular text-danger"></i> Delete*/}
                  {/*</button>*/}
                </>
              )}
            </div>
          </div>
        </td>
      </tr>
      {Rows({
        heads: head.children,
        c: c,
        deletHead: deletHead,
        setHead: setHead,
      })}
    </React.Fragment>
  ));
};
export default Rows;
