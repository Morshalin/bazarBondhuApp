import React from "react";

const CurrentBalance = (props) => {
  return (
    <>
      <div
        className="modal fade"
        id="accounts_current_balance"
        tabIndex="-1"
        aria-labelledby="accounts_current_balance"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="add_due_payment_modal">
              বর্তমান ব্যালেন্স
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
                        <th className="text-right">বর্তমান ব্যালেন্স</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        props.CurrentReport.accounts && props.CurrentReport.accounts.map((account, index) => (
                         <tr key={index+1000}>
                            <td>{index+1}</td>
                            <td>{account.name}</td>
                            <td className="text-right">{account.on_date_balance}</td>
                          </tr>
                        ))
                      }
                      <tr>
                        <th colSpan={2} className="text-right">ক্যাশ</th>
                        <td className="text-right">{props.CurrentReport.cash}</td>
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


export default CurrentBalance;
