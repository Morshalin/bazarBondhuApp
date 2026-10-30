import React from "react";

const PreviousBalance = (props) => {
  return (
    <>
      <div
        className="modal fade"
        id="accounts_previous_balance"
        tabIndex="-1"
        aria-labelledby="accounts_previous_balance"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="add_due_payment_modal">
              পূর্বের ব্যালেন্স
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th >#</th>
                        <th >তহবিল</th>
                        <th className="text-right">পূর্বের ব্যালেন্স</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        props.report.accounts && props.report.accounts.map((account, index) => (
                         <tr key={index}>
                            <td>{index+1}</td>
                            <td>{account.name}</td>
                            <td className="text-right">{account.previous_balance}</td>
                          </tr>
                        ))
                      }
                      <tr>
                        <th colSpan={2} className="text-right">মোট</th>
                        <td className="text-right">{props.report.previous_balance}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default PreviousBalance;
