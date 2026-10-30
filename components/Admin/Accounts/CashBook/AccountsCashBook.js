import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getActions } from "../../../../Helpers/Utils/Utils";
import axios from "axios";
import process from "../../../../next.config";
import PreviousBalance from "./PreviousBalance";
import CurrentBalance from "./CurrentBalance";


const AccountsCashBook = () => {

    const [dateSelection, setDateSelection] = useState(new Date().toISOString().slice(0, 10));
    const [report, setReport] = useState("")
    const dateCalculation = (sumb) => {
        let currentDateObj = new Date(dateSelection);
        let numberOfMlSeconds = currentDateObj.getTime();
        let addMlSeconds = 60 * 60 * 1000 * 24;
        if (sumb == "+") {
            let newDateObj2 = new Date(numberOfMlSeconds + addMlSeconds).toISOString().slice(0, 10);
            setDateSelection(newDateObj2);
        } else if (sumb == "-") {
            let newDateObj = new Date(numberOfMlSeconds - addMlSeconds).toISOString().slice(0, 10);
            setDateSelection(newDateObj);
        }
        // getReport();
    }

    const onValueChange = (event) => {
        const { name, value } = event.target
        setDateSelection(value);
        // getReport();
    }

    const getReport = async () => {

        let headApiUrl = `${process.env.api_backend_url}/accounts/cashbook`;
        const headFormData = new FormData();
        headFormData.append("selectDate", dateSelection);

        axios
            .post(headApiUrl, headFormData)
            .then((apiResponses) => {
                if (apiResponses.data.success) {
                    // console.log(apiResponses.data)
                    setReport(apiResponses.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });


    }

    useEffect(() => {
        getReport();
    }, [dateSelection]);


    return (
        <>
            <section className='custom-card'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='custom-card-box'>
                                <div className='custom-card-box-header'>
                                    <div className='fbh-title'>
                                        <i className='icon-list2' />
                                        <h2>ক্যাশবুক</h2>
                                    </div>
                                </div>
                                <div className='custom-card-box-content'>
                                    <div className="row mb-4">
                                        <div className="col-sm-12">

                                            <div className="list-group">

                                                <div className="list-group-item list-group-item-action d-flex">

                                                    <div className="p-2">
                                                        {/*<a href="#"><i className="fas fa-angle-left"></i></a>*/}
                                                        <button className="btn btn-primary" onClick={(event) => {
                                                            event.preventDefault();
                                                            dateCalculation("-")
                                                        }}>
                                                            <i className="fas fa-angle-left"></i>
                                                        </button>
                                                    </div>

                                                    {/*<div className="p-2 flex-grow-1">*/}
                                                    <div className="mx-auto mt-2 from-group">
                                                        <input type="date"
                                                            value={dateSelection ?? new Date().toISOString().slice(0, 10)}
                                                            max={new Date().toISOString().slice(0, 10)}
                                                            className="form-control" onChange={event => onValueChange(event)} />
                                                    </div>

                                                    <div className="p-2">
                                                        {/*<a href="#"><i className="fas fa-angle-right"></i></a>*/}
                                                        <button className="btn btn-primary" onClick={(event) => {
                                                            event.preventDefault();
                                                            dateCalculation("+")
                                                        }}
                                                            disabled={(dateSelection >= new Date().toISOString().slice(0, 10)) ? "disabled" : ""}>
                                                            <i className="fas fa-angle-right"></i>
                                                        </button>
                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='row table-top-option mb-1 mt-4'>
                                        <div className='col-sm-6'>
                                            <h3>জমা (Cr.)</h3>
                                        </div>
                                        <div className='col-sm-6'>
                                            <h3 className={'text-right'}>খরচ (Dr.)</h3>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='table-responsive custom-table'>
                                                <table className='table table-bordered table-hover'>
                                                    <thead className='thead-light'>
                                                        <tr>
                                                            <th scope='col'>#</th>
                                                            <th scope='col'>ভাউচার নং</th>
                                                            <th scope='col'>বিবরণ</th>
                                                            <th scope='col'>খাত</th>
                                                            <th scope='col'>অ্যাকাউন্ট</th>
                                                            <th scope='col'>টাকা</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* {
                                                            report.accounts && report.accounts.map((account, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td></td>
                                                                    <td>
                                                                        
                                                                    </td>
                                                                    <td>পূর্বের ব্যালেন্স</td>
                                                                    <td>{account.name ?? '-'}</td>
                                                                    <td className="text-right">{account.previous_balance}</td>
                                                                </tr>
                                                            ))
                                                        } */}
                                                        <tr
                                                            onDoubleClick={(event) => {
                                                                $("#accounts_previous_balance").modal("show");
                                                            }}
                                                            title="বিস্তারিত দেখতে ডাবল ক্লিক করুন।"
                                                        >
                                                            <td>{1}</td>
                                                            <td></td>
                                                            <td>
                                                                পূর্বের ব্যালেন্স
                                                            </td>
                                                            <td></td>
                                                            <td></td>
                                                            <td className="text-right">{report.previous_balance}</td>
                                                        </tr>
                                                        {
                                                            report.accounts && report.accounts.map((account, index) => (
                                                                account.sales_deposit && <tr key={index}>
                                                                    <td>{index + 2}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>{account.sales_deposit.head ?? '-'}</td>
                                                                    <td>{account.name}</td>
                                                                    <td className="text-right">{account.sales_deposit.amount}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                        {/* {
                                                            report.sales_deposit && report.sales_deposit.map((dep, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td></td>
                                                                    <td>
                                                                        
                                                                    </td>
                                                                    <td>{dep.head ?? '-'}</td>
                                                                    <td>{dep.payment_method ?? '-'}</td>
                                                                    <td className="text-right">{dep.amount?.toFixed(2)}</td>
                                                                </tr>
                                                            ))
                                                        } */}
                                                        {
                                                            report.deposit && report.deposit.map((dep, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{dep.reference ?? '-'}</td>
                                                                    <td>
                                                                        {dep?.particulars?.map((data) => (
                                                                            <React.Fragment key={index}>
                                                                                &#x2611;	 {data.particular} &#x21b2; ৳{data.amount}
                                                                                <br />
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </td>
                                                                    <td>{dep.head.replace(/\s+/g, '') ?? '-'}</td>
                                                                    <td>{dep.account ?? '-'}</td>
                                                                    <td className="text-right">{dep.amount?.toFixed(2)}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                    <tfoot className="text-right">
                                                        <tr>
                                                            <td colSpan={5} className="text-right">মোট (৳)</td>
                                                            <td>{report.deposit_sum?.toFixed(2)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={5} className="text-right">মোট খরচ</td>
                                                            <td>- {report.expense_sum}</td>
                                                        </tr>

                                                        <tr
                                                            onDoubleClick={(event) => {
                                                                $("#accounts_current_balance").modal("show");
                                                            }}
                                                            title="বিস্তারিত দেখতে ডাবল ক্লিক করুন।"
                                                        >
                                                            <td colSpan={5} className="text-right">ক্যাশ</td>
                                                            <td>{report.cash}</td>
                                                        </tr>

                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='table-responsive custom-table'>
                                                <table className='table table-bordered table-hover table-striped'>
                                                    <thead className='thead-light'>
                                                        <tr>
                                                            <th scope='col'>#</th>
                                                            <th scope='col'>ভাউচার নং</th>
                                                            <th scope='col'>বিবরণ</th>
                                                            <th scope='col'>খাত</th>
                                                            <th scope='col'>অ্যাকাউন্ট</th>
                                                            <th scope='col'>টাকা</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            report && report.expense.map((exp, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{exp.reference ?? '-'}</td>
                                                                    <td>
                                                                        {exp?.particulars?.map((data, index) => (
                                                                            <React.Fragment key={index}>
                                                                                &#x2611;	 {data.particular} &#x21b2; ৳{data.amount}
                                                                                <br />
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </td>
                                                                    <td>{exp.head.replace(/\s+/g, '') ?? '-'}</td>
                                                                    <td>{exp.account ?? '-'}</td>
                                                                    <td className="text-right">{exp.amount?.toFixed(2)}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                    <tfoot className="text-right">
                                                        <tr>
                                                            <td colSpan={5} className="text-right">মোট (৳)</td>
                                                            <td>{report.expense_sum?.toFixed(2)}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>

                                        <div className='col-lg-6 d-none'>
                                            <div className='table-responsive custom-table'>
                                                <table className='table table-bordered table-hover table-striped'>
                                                    <thead className='thead-light'>
                                                        <tr>
                                                            <th scope='col'>#</th>
                                                            <th scope='col'>অ্যাকাউন্ট</th>
                                                            <th scope='col'>বর্তমান ব্যালেন্স</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            report.accounts && report.accounts.map((account, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        {account.name ?? '-'}
                                                                        {
                                                                            account.default && <span className="badge badge-primary ml-2">Cash Drawer</span>
                                                                        }
                                                                    </td>
                                                                    <td className="text-right">{account.on_date_balance}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                    {/* <tfoot className="text-right">
                                                        <tr>
                                                            <td colSpan={2} className="text-right">ব্যালেন্স (৳)</td>
                                                            <td>{report.cash}</td>
                                                        </tr>
                                                    </tfoot> */}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <PreviousBalance report={report} />
            <CurrentBalance CurrentReport={report} />
        </>
    );
}

export default AccountsCashBook;