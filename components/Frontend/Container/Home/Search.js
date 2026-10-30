import Router from "next/router";

const HomeSearch = () => {

    const WAIT_INTERVAL = 500;
    const ENTER_KEY = 13;
    let keyword;
    let timer = null;

    const handleChange = e => {
        e.preventDefault();
        clearTimeout(timer);
        keyword = e.target.value;
        timer = setTimeout(triggerChange, WAIT_INTERVAL);
    }
    const handleKeyDown = e => {
        if (e.keyCode === ENTER_KEY) {
            clearTimeout(timer);
            triggerChange();
        }
    }

    const triggerChange = () => {
        Router.push(`/search/${keyword}`);
        // Router.push({
        //     pathname: '/search/[keyword]',
        //     query: { keyword: keyword },
        // })
    }

    return (
        <>
            <section className="product-search">
                <div className="container-fluid text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Groceries Delivered in 90 Minute</h3>
                            <p>Get your needs delivered at your doorsteps all day everyday</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="searc-form">
                                <form action="#">
                                    <div className="input-group">
                                        <input type="text" className="form-control"
                                               onChange={handleChange}
                                               onKeyDown={handleKeyDown}
                                               placeholder="search your need (e.g. mask, sanitizer, spray bottle, etc)"
                                               required/>
                                        <div className="input-group-append">
                                            <button className="btn" type="button"><i className="fas fa-search"/>
                                                <span>Search</span></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomeSearch;
