import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import useDebounce from "./custom-hook/use-debounce";
import MySucces from "../../Notification/MySuccess";
import MyError from "../../Notification/MyError";


const ShopSettingTable = () => {


  const [shopSettingLists ,setShopSettingLists]=useState([]);
  const [pagination ,setPagination]=useState(1);
  const [listPerPage ,setListPerPage]=useState(10);
  const [page ,setPage]=useState(1);
  const [loadingState ,setLoadingState]=useState(true);
  const [searchKeyword ,setSearchKeyword]=useState('');
  const [operationshopSetting ,setOperationshopSetting]=useState('');
  const [operationshopSettingDelete ,setOperationshopSettingDelete]=useState('');

  const debouncedSearch = useDebounce(searchKeyword, 1000);

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });


  const resetSuccesMessage = () => {
    setSuccessMessage({
      ...successMessage,
      status: false,
      message: "",
    });
  };

  const resetErrorMessage = () => {
    setErrorMessage({
      ...errorMessage,
      status: false,
      message: "",
    });
  };




  const shopSettingApiData = async ()=>{
    // setLoadingState(true);
    return await axios.get(`/backend/shop-settings?show=${listPerPage}&page=${page}&searchKeyword=${debouncedSearch}`).then(responses=>responses.data).catch(errors=>errors);
  }


  useEffect(()=>{
    let mounted = true;

    shopSettingApiData().then((responses)=>{
     if(responses.success){
      responses.data.data.length > 0 ? setShopSettingLists(responses.data.data):setShopSettingLists([]);
      setPagination(responses.data.meta);
     } else {
      setshopSettingLista([]);
     }
    }).catch((errors)=>{
      console.error(errors);
    }).finally(()=>{
      setLoadingState(false);
    });


    return () => {
      mounted = false;
    }

  },[listPerPage,page,debouncedSearch,operationshopSetting,operationshopSettingDelete]);


  const disableOrEnablaeOnclick = async (id,old_status)=>{
    await axios.post(`/backend/shop-settings/${id}`,{status:old_status === 1 ? 0:1,_method:"PUT"}).then(responses=>{
      if(responses.data.success){
        const updatedId = {
          id:id,
          status:old_status
        }
        setOperationshopSetting(updatedId);
        setSuccessMessage({
          ...successMessage,
          status: true,
          message: responses.data.message,
        });
      } else{
        setErrorMessage({
          ...errorMessage,
          status: true,
          message: responses.data.message,
        });
      }
    }).catch(errors=>errors);
  }

  const deleteOnclick = async (id)=>{
    await axios.delete(`/backend/shop-settings/${id}`).then(responses=>{
      if(responses.data.success){
        setOperationshopSettingDelete(id);
        setSuccessMessage({
          ...successMessage,
          status: true,
          message: responses.data.message,
        });
      } else{
        setErrorMessage({
          ...errorMessage,
          status: true,
          message: responses.data.message,
        });
      }
    }).catch(errors=>errors);
  }

  return (
    <>

      {successMessage.status && (
        <MySucces
          message={successMessage.message}
          resetSuccesMessage={resetSuccesMessage}
        />
      )}

      {errorMessage.status && (
        <MyError
          message={errorMessage.message}
          resetErrorMessage={resetErrorMessage}
        />
      )}

      <section className="custom-card">
        
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="custom-card-box">

                  <div className="custom-card-box-header">

                    <div className="fbh-title">
                      <i className="icon-list2" />
                      <h2>Shop Setting List</h2>
                      <Link legacyBehavior href={`/admin/shop-setting/add`}>
                        <a className="fbh-btn" title="Add Shop Setting">
                          <i className="icon-plus-square-regular" />
                        </a>
                      </Link>
                    </div>

                  </div>

                  <div className="custom-card-box-content">
                    <div className="row table-top-option mb-3">
                      
                      <div className="col-sm-6">
                        <div className="showing-table-row">
                          <label className="">Show</label>
                          <select className="custom-select" defaultValue={`10`} onChange={(event)=>{
                                                                                          event.preventDefault();
                                                                                          setListPerPage(Number(event.target.value));
                                                                                          setPage(1);
                                                                                          setPagination('');
                                                                                          }}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="table-search">
                          <label className="">Search</label>
                          <input type="text" className="form-control" placeholder="search slider title" onChange={(event)=>{event.preventDefault();setSearchKeyword(event.target.value);}} />
                        </div>
                      </div>

                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        
                        { loadingState ? 
                        <div style={{display: "flex", alignItems: "center", height: "100vh",}}>
                          <div style={{width: "100%", textAlign: "center"}}>
                              <img src="/processing-loder/loader.gif"/>
                              <br/>
                            </div>
                        </div>
                        :
                        <div className="table-responsive custom-table">
                          <table className="table table-bordered table-hover table-striped text-center">
                            
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Setting Type</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {shopSettingLists.length > 0 ?
                              shopSettingLists.map((shopSetting,index)=>
                                <tr key={shopSetting.id}>
                                  <td>{pagination.from ? index + pagination.from : ''}</td>
                                  <td>{shopSetting.setting_type}</td>
                                  <td><i className={`icon icon-check-circle-solid ${shopSetting.status === 1 ? 'text-success':'text-danger'}`}/></td>
                                  <td>

                                    <div className="dropdown action-btn-group">
                                      <button className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle" type="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Actions
                                      </button>
                                      
                                      <div className="dropdown-menu">
                                        <Link legacyBehavior href={`/admin/shop-setting/edit/${shopSetting.id}`}>
                                          <a className="dropdown-item"><i className="icon-pencil-alt text-primary"/> Edit </a>
                                        </Link>
                                        
                                        <a className="dropdown-item" href="#" onClick={(event)=>{event.preventDefault();deleteOnclick(shopSetting.id);}}><i className="icon-trash-alt-regular text-danger"></i> Delete</a>

                                        <div className="dropdown-divider"></div>

                                        <a className="dropdown-item" href="#" onClick={(event)=>{event.preventDefault();disableOrEnablaeOnclick(shopSetting.id,shopSetting.status);}}>
                                          <i className={`icon-sphere ${shopSetting.status === 1 ? 'text-danger':'text-success'}`}/>
                                          {shopSetting.status === 1 ? 'Disable':'Enable'}
                                        </a>
                                        
                                      </div>

                                    </div>

                                  </td>
                                </tr>
                              ):<tr><td colSpan='6'>No record found for home slider</td></tr>}
                            </tbody>

                          </table>
                        </div>
                        }

                      </div>
                      <div className="col-lg-12">
                        {pagination && (
                          <nav
                            aria-label="Page navigation example"
                            className="d-flex justify-content-end"
                          >
                            <ReactPaginate
                              previousLabel={"previous"}
                              nextLabel={"next"}
                              breakLabel={"..."}
                              pageCount={pagination.last_page}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={2}
                              onPageChange={(pageNumber)=>{setPage(parseInt(pageNumber.selected + 1))}}
                              containerClassName={"pagination"}
                              pageClassName={"page-item"}
                              pageLinkClassName={"page-link"}
                              activeClassName={"active"}
                              previousClassName={"page-item"}
                              previousLinkClassName={"page-link"}
                              nextClassName={"page-item"}
                              nextLinkClassName={"page-link"}
                              breakClassName={"page-item"}
                              breakLinkClassName={"page-link"}
                            />
                          </nav>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </section>
    </>
  );
};
export default ShopSettingTable;
