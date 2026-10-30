import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import React from "react";
const Dashboard = () => {
    return (
        <>
            <AdminHeader>demo-from</AdminHeader>
            <Layout>
                <section className="information-alert">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="alert alert-info alert-dismissible fade show" role="alert">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, culpa aut natus neque vero optio ipsa
                                        minima alias quae a nemo, numquam sunt rem reprehenderit assumenda facere cumque in voluptatem.</p>
                                    <ul>
                                        <li><i className="fas fa-info-circle"></i><strong>Lorem ipsum dolor sit, amet consectetur adipisicing
                                        elit.
                                        Mollitia, magni veritatis delectus velit
                                        odio facilis quidem</strong></li>
                                        <li><i className="fas fa-info-circle"></i> <strong>Mollitia, magni veritatis delectus velit odio facilis
                                        quidem
                                        voluptas id optio natus cupiditate</strong>
                                        eos vitae obcaecati exercitationem, quos quis, nemo reiciendis. Voluptate.</li>
                                        <li><i className="fas fa-info-circle"></i>Magni veritatis delectus velit odio facilis quidem voluptas id
                                        optio natus cupiditate eos vitae
                                        obcaecati exercitationem, <strong>quos quis, nemo reiciendis. Voluptate.</strong></li>
                                        <li><i className="fas fa-info-circle"></i> Velit odio facilis quidem voluptas id optio natus cupiditate
                                            eos vitae obcaecati exercitationem,
                                            quos quis, nemo reiciendis. Voluptate.</li>
                                    </ul>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="custom-card">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="custom-card-box">
                                    <div className="custom-card-box-header">
                                        <div className="fbh-title">
                                            <i className="far fa-plus-square"></i>
                                            <h2>Add Product</h2>
                                        </div>
                                        <div className="fbh-info">
                                            <p>Please fill in the information below. The field labels marked with * are required input fields.</p>
                                        </div>
                                    </div>
                                    <div className="custom-card-box-content">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <form action="#">

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Text Field *</label>
                                                                <input type="text" className="form-control" placeholder="This is a text field" required />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label for="exampleInputEmail1">Email Field *</label>
                                                                <input type="email" className="form-control" id="exampleInputEmail1"
                                                                    aria-describedby="emailHelp" placeholder="This is an email field" required />
                                                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label for="">Example select</label>
                                                                <select className="form-control" id="">
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                    <option>Option 3</option>
                                                                    <option>Option 4</option>
                                                                    <option>Option 5</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label for="">Switch Options</label>
                                                                <div className="custom-control custom-switch">
                                                                    <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                                                                    <label className="custom-control-label" for="customSwitch1">Toggle this switch element</label>
                                                                </div>
                                                                <div className="custom-control custom-switch">
                                                                    <input type="checkbox" className="custom-control-input" disabled id="customSwitch2" />
                                                                    <label className="custom-control-label" for="customSwitch2">Disabled switch element</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Checkbox</label>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                                    <label className="custom-control-label" for="customCheck1">Check this custom checkbox</label>
                                                                </div>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                                                    <label className="custom-control-label" for="customCheck2">Check this custom checkbox</label>
                                                                </div>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" id="customCheckDisabled1" disabled />
                                                                    <label className="custom-control-label" for="customCheckDisabled1">Check this custom checkbox</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label for="">Radios Buttons</label>
                                                                <div className="custom-control custom-radio">
                                                                    <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" />
                                                                    <label className="custom-control-label" for="customRadio1">Toggle this custom radio</label>
                                                                </div>
                                                                <div className="custom-control custom-radio">
                                                                    <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                                                                    <label className="custom-control-label" for="customRadio2">Or toggle this other custom radio</label>
                                                                </div>
                                                                <div className="custom-control custom-radio">
                                                                    <input type="radio" name="radioDisabled" id="customRadioDisabled2"
                                                                        className="custom-control-input" disabled />
                                                                    <label className="custom-control-label" for="customRadioDisabled2">Toggle this custom  radio</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Checkbox Inline</label>
                                                                <div className="d-block">
                                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                                        <input type="checkbox" className="custom-control-input" id="customInlineCheck1" />
                                                                        <label className="custom-control-label" for="customInlineCheck1">Checkbox 01</label>
                                                                    </div>
                                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                                        <input type="checkbox" className="custom-control-input" id="customInlineCheck2" />
                                                                        <label className="custom-control-label" for="customInlineCheck2">Checkbox 02</label>
                                                                    </div>
                                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                                        <input type="checkbox" className="custom-control-input" id="customCheckDisabled3"
                                                                            disabled />
                                                                        <label className="custom-control-label" for="customCheckDisabled3">Disabled checkbox</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label for="">Radios Buttons Inline</label>
                                                                <div className="d-block">
                                                                    <div className="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" id="customRadioInline1" name="customRadioInline1"
                                                                            className="custom-control-input" />
                                                                        <label className="custom-control-label" for="customRadioInline1">Radio 01</label>
                                                                    </div>
                                                                    <div className="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" id="customRadioInline2" name="customRadioInline1"
                                                                            className="custom-control-input" />
                                                                        <label className="custom-control-label" for="customRadioInline2">Radio 02</label>
                                                                    </div>
                                                                    <div className="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" name="radioDisabled" id="customRadioDisabled3"
                                                                            className="custom-control-input" disabled />
                                                                        <label className="custom-control-label" for="customRadioDisabled3">Disabled radio</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Input Group Left</label>
                                                                <div className="input-group mb-2">
                                                                    <div className="input-group-prepend">
                                                                        <div className="input-group-text">User ID</div>
                                                                    </div>
                                                                    <input type="text" className="form-control" id="inlineFormInputGroup"
                                                                        placeholder="Username" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Input Group Right</label>
                                                                <div className="input-group mb-2 ig-right-align">
                                                                    <input type="text" className="form-control" id="inlineFormInputGroup"
                                                                        placeholder="Username" />
                                                                    <div className="input-group-prepend">
                                                                        <div className="input-group-text"><i className="far fa-user"></i></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>File Browser Left</label>
                                                                <div className="custom-file">
                                                                    <input type="file" className="custom-file-input" id="customFile" />
                                                                    <label className="custom-file-label" for="customFile">Choose file</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>File Browser Right</label>
                                                                <div className="custom-file">
                                                                    <input type="file" className="custom-file-input" id="customFile" />
                                                                    <label className="custom-file-label cfl-left-align" for="customFile">Choose file</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-list2"></i>
                    <h2>Product List (Warehouses 01)</h2>
                  </div>
                  <div className="fbh-info">
                    <p>Please use the table below to navigate or filter the results. You can download the table as excel
                      and pdf.
                    </p>
                  </div>
                </div>
                <div className="custom-card-box-content">
                  <div className="row table-top-option mb-3">
                    <div className="col-sm-6">
                      <div className="showing-table-row">
                        <label className="">Show</label>
                        <select className="custom-select">
                          <option selected>10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="table-search">
                        <label className="">Search</label>
                        <input type="text" className="form-control" placeholder="type your need"/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive custom-table">
                        <table className="table table-bordered table-hover table-striped">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="customTablecheck01"/>
                                  <label className="custom-control-label" for="customTablecheck01"></label>
                                </div>
                              </th>
                              <th scope="col">SL</th>
                              <th scope="col">Image</th>
                              <th scope="col">Name <i className="fas fa-sort-amount-up-alt"></i></th>
                              <th scope="col">Code</th>
                              <th scope="col">Brand</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Purchase unit</th>
                              <th scope="col">Sale unit</th>
                              <th scope="col">Alert Quantity</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope="row">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="customTablecheck02"/>
                                  <label className="custom-control-label" for="customTablecheck02"></label>
                                </div>
                              </td>
                              <td scope="row">01</td>
                              <td>
                                <img src="img/product/product2.png" alt=""/>
                              </td>
                              <td className="nowrap">Detol antiseptic liquid 500ml</td>
                              <td>detol10101088</td>
                              <td>Unilever Bangladesh</td>
                              <td>1000</td>
                              <td>Pic</td>
                              <td>Pic</td>
                              <td>10.00</td>
                              <td>status</td>
                              <td>
                                <div className="dropdown action-btn-group">
                                  <button className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Actions
                                  </button>
                                  <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#"><i className="icon-enlarge"></i> Product
                                      Details</a>
                                    <a className="dropdown-item" href="#"><i className="icon-files-empty"></i> Duplicate
                                      Product</a>
                                    <a className="dropdown-item" href="#"><i className="icon-pencil-alt"></i> Edit Product</a>
                                    <a className="dropdown-item" href="#"><i className="icon-image"></i> View Image</a>
                                    <a className="dropdown-item" href="#"><i className="icon-printer"></i> Print
                                      Barcode/Label</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#"><i className="icon-trash-alt-regular"></i> Delete
                                      Product</a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td scope="row">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="customTablecheck03"/>
                                  <label className="custom-control-label" for="customTablecheck03"></label>
                                </div>
                              </td>
                              <td scope="row">02</td>
                              <td>
                                <img src="img/product/product3.jpg" alt=""/>
                              </td>
                              <td className="nowrap">Nestle LACTOGEN 3 Follow Up Formula (12 Month+) TIN</td>
                              <td>Nestle10101088</td>
                              <td>Unilever Bangladesh</td>
                              <td>1000</td>
                              <td>Pic</td>
                              <td>Pic</td>
                              <td>10.00</td>
                              <td>status</td>
                              <td>
                                <div className="dropdown action-btn-group">
                                  <button className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Actions
                                  </button>
                                  <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#"><i className="icon-enlarge"></i> Product
                                      Details</a>
                                    <a className="dropdown-item" href="#"><i className="icon-files-empty"></i> Duplicate
                                      Product</a>
                                    <a className="dropdown-item" href="#"><i className="icon-pencil-alt"></i> Edit Product</a>
                                    <a className="dropdown-item" href="#"><i className="icon-image"></i> View Image</a>
                                    <a className="dropdown-item" href="#"><i className="icon-printer"></i> Print
                                      Barcode/Label</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#"><i className="icon-trash-alt-regular"></i> Delete
                                      Product</a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td scope="row">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="customTablecheck04"/>
                                  <label className="custom-control-label" for="customTablecheck04"></label>
                                </div>
                              </td>
                              <td scope="row">03</td>
                              <td>
                                <img src="img/product/product4.jpg" alt=""/>
                              </td>
                              <td className="nowrap">Nestle Cerelac 4 Rice & Potato With Chicken (12 months+) BIB</td>
                              <td>Nestle10101088</td>
                              <td>Square Toiletries Bangladesh</td>
                              <td>1000</td>
                              <td>Pic</td>
                              <td>Pic</td>
                              <td>10.00</td>
                              <td>status</td>
                              <td>
                                <div className="dropdown action-btn-group">
                                  <button className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Actions
                                  </button>
                                  <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#"><i className="icon-enlarge"></i> Product
                                      Details</a>
                                    <a className="dropdown-item" href="#"><i className="icon-files-empty"></i> Duplicate
                                      Product</a>
                                    <a className="dropdown-item" href="#"><i className="icon-pencil-alt"></i> Edit Product</a>
                                    <a className="dropdown-item" href="#"><i className="icon-image"></i> View Image</a>
                                    <a className="dropdown-item" href="#"><i className="icon-printer"></i> Print
                                      Barcode/Label</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#"><i className="icon-trash-alt-regular"></i> Delete
                                      Product</a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td scope="row">
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="customTablecheck05"/>
                                  <label className="custom-control-label" for="customTablecheck05"></label>
                                </div>
                              </td>
                              <td scope="row">04</td>
                              <td>
                                <img src="img/product/product2.png" alt=""/>
                              </td>
                              <td className="nowrap">Detol antiseptic liquid 500ml</td>
                              <td>detol10101088</td>
                              <td>Unilever Bangladesh</td>
                              <td>1000</td>
                              <td>Pic</td>
                              <td>Pic</td>
                              <td>10.00</td>
                              <td>status</td>
                              <td>
                                <div className="dropdown action-btn-group">
                                  <button className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Actions
                                  </button>
                                  <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#"><i className="icon-enlarge"></i> Product
                                      Details</a>
                                    <a className="dropdown-item" href="#"><i className="icon-files-empty"></i> Duplicate
                                      Product</a>
                                    <a className="dropdown-item" href="#"><i className="icon-pencil-alt"></i> Edit Product</a>
                                    <a className="dropdown-item" href="#"><i className="icon-image"></i> View Image</a>
                                    <a className="dropdown-item" href="#"><i className="icon-printer"></i> Print
                                      Barcode/Label</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#"><i className="icon-trash-alt-regular"></i> Delete
                                      Product</a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
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


                <section className="class_name">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">

                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Dashboard
