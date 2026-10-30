import {CHECK_BOX_STATUS, DECREASE, INCREASE, REMOVE} from "../../../store/frontend/actions/cartAction";
import {connect} from "react-redux";

const ShopCartItem = (props) => {
    return (
        <>
            <div className="cart-list-box">
                <div className="cart-item-select">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"
                               id={`ProductCheck ${props.item.id}`}
                               onClick={(event) => props.checkStatus(event.target.checked, props.item.id)}
                               defaultChecked={props.item.checked}
                        />
                        <label className="custom-control-label"
                               htmlFor={`ProductCheck ${props.item.id}`}></label>
                    </div>
                </div>
                <div className="cart-product-image">
                    <img src={props.item.feature_image} alt=""/>
                </div>
                <div className="cart-description">
                    <h4>{props.item.name}</h4>
                    <p>
                        <span>{props.item.weight} {props.item.sale_unit} / ৳ {props.item.unit_price}</span>
                    </p>
                </div>
                <div className="cart-product-count">
                    <div className="cart-count input-group">
                        <button className="incrise" onClick={() => props.add(props.item.id)}>
                        </button>
                        <input name="qty" type="text" readOnly value={props.item.quantity}/>
                        <button className="decrise" onClick={() => props.sub(props.item.id, props.item.amount)}>
                        </button>

                    </div>
                </div>
                <div className="cart-product-price-count">
                    <div className="cart-product-price">
                        <div className="product-price">
                            <span className="off-price">৳ {props.item.price}</span>
                            {
                                (props.item.discount > 0) ? (
                                    <span
                                        className="original-price">৳ {(props.item.unit_price * props.item.quantity).toFixed(2)}</span>
                                ) : ''
                            }

                        </div>
                    </div>
                </div>
                <div className="cart-item-remove">

                    <button onClick={() => props.remove(props.item.id)}><i className="icon-cross-circle"/>
                    </button>
                </div>
            </div>


        </>
    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        checkStatus: (checkedValue, id) => dispatch({type: CHECK_BOX_STATUS, payload: {checkedValue, id}}),
        add: (id) => dispatch({type: INCREASE, payload: {id}}),
        sub: (id, amount) => dispatch({type: DECREASE, payload: {id, amount}}),
        remove: (id) => dispatch({type: REMOVE, payload: {id}}),
    }
}

export default connect(null, mapDispatchToProps)(ShopCartItem)

