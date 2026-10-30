import React from "react";

const ComponentToPrint = () => {
  // console.log("ComponentToPrint");

  const getPrintStyle = () => {
    return `
    
    @media print {
      *,
      html,
      body,
      ul,
      ol {
        margin: 0;
        padding: 0;
        outline: none !important;
      }
    
      html {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    
      *,
      *:before,
      *:after {
        -webkit-box-sizing: inherit;
        box-sizing: inherit;
      }
    
      body {
        font-family: "Hind Siliguri", "Roboto", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.25;
        color: #424242;
        color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
      }
    
      ul,
      ol {
        list-style: none;
      }
    
      // html,
      // body {
      //   width: 210mm;
      //   height: 297mm;
      // }
    
      .info_table {
        border: 1px solid #dee2e6;
        margin: 0 auto;
        width: 50%;
        border-collapse: collapse;
        display:block;
      }
  
      .info_table .thead tr th {
        color: #495057;
        background-color: #e9ecef;
        vertical-align: middle;
        padding: 8px 6px;
      }
      .info_table .tbody tr td {
        width: 50%;
        text-align: center;
        color: #616161;
        border: 1px solid #dee2e6;
        vertical-align: middle;
        padding: 6px 8px;
      }
      .info_table .tfoot tr td {
        text-align: center;
        color: #616161;
        vertical-align: middle;
        padding: 4px 4px;
        font-weight: 700;
      }
    
      .main_section {
        margin-top: 24px;
      }
    
      .main_table {
        border: 1px solid #dee2e6;
        width: 100%;
        border-collapse: collapse;
      }
      .main_table .thead tr th {
        color: #495057;
        background-color: #e9ecef;
        vertical-align: middle;
        padding: 8px 4px;
      }
      .main_table .tbody tr td {
        text-align: center;
        color: #616161;
        border: 1px solid #dee2e6;
        vertical-align: middle;
        padding: 8px 4px;
      }
    }
    
    `;
  };

  return (
    <section style={{ display: "none", width: "100%" }}>
      <div id="printJS-form">
        <style type="text/css" media="print">
          {getPrintStyle()}
        </style>
        <header>
          <section>
            <table className="info_table">
              <thead className="thead">
                <tr>
                  <th colSpan="2">Sale Information</th>
                </tr>
              </thead>
              <tbody className="tbody">
                <tr>
                  <td>নাম</td>
                  <td>Jon Jon</td>
                </tr>
                <tr>
                  <td>মোবাইল নম্বর</td>
                  <td>Jon</td>
                </tr>
                <tr>
                  <td>ইমেইল</td>
                  <td>Jon</td>
                </tr>
                <tr>
                  <td>ঠিকানা</td>
                  <td>Jon</td>
                </tr>
              </tbody>
              <tfoot className="tfoot">
                <tr>
                  <td colSpan="2">Total:400</td>
                </tr>
              </tfoot>
            </table>
          </section>
        </header>

        <main>
          <section className="main_section">
            <table className="main_table">
              <thead className="thead">
                <tr>
                  <th>ক্রমিক নং</th>
                  <th>হিসাবের নাম</th>
                  <th>গ্রহীতার ধরণ</th>
                  <th>গ্রহীতার নাম</th>
                  <th>প্রদানের ধরণ</th>
                  <th>পেমেন্ট নোট</th>
                  <th>টাকার পরিমান</th>
                </tr>
              </thead>
              <tbody className="tbody">
                <tr>
                  <td>1</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </section>
  );
};

export default ComponentToPrint;
