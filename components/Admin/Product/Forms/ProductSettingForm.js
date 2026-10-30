const ProductSettingForm = (props) => {
  const { productFiledError, productInformation, handleChange } = props;

  const splitStartDate = productInformation.promotional_start_date
    ? new Date(productInformation.promotional_start_date)
        .toISOString()
        .split("T")
    : "";
  const convertedStartDate = splitStartDate[0];

  const splitEndDate = productInformation.promotional_end_date
    ? new Date(productInformation.promotional_end_date).toISOString().split("T")
    : "";
  const convertedEndDate = splitEndDate[0];

  return (
    <div className="card rounded-0 mb-3">
      <div className="card-header rounded-0">
        <div className="fbh-title mt-2">
          <h6>Product Settings</h6>
        </div>
      </div>
      <div className="card-body">
        <div className="form-row">
          <div className="form-group col-lg-12 text-center">
            <div className="text-nowrap">
              <label className="mr-4">Product Status</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="status_active"
                  checked={productInformation.status === "1"}
                  value="1"
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="status_active">
                  Active
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="status_inactive"
                  checked={productInformation.status === "0"}
                  value="0"
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="status_inactive">
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="form-group col-lg-4">
            <label>E-commerce Sale</label>

            <div className="text-nowrap">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ecommerce_sale_status"
                  id="ecommerce_sale_status_active"
                  checked={productInformation.ecommerce_sale_status === "1"}
                  value="1"
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                  }}
                  disabled={productInformation.status === "0"}
                />
                <label
                  className="form-check-label"
                  htmlFor="ecommerce_sale_status_active"
                >
                  Active
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ecommerce_sale_status"
                  id="ecommerce_sale_status_inactive"
                  checked={productInformation.ecommerce_sale_status === "0"}
                  value="0"
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                  }}
                  disabled={productInformation.status === "0"}
                />
                <label
                  className="form-check-label"
                  htmlFor="ecommerce_sale_status_inactive"
                >
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="form-group col-lg-8">
            <label htmlFor="reserved_ecommerce_product">
              Reserved E-commerce Product
            </label>
            <input
              type="text"
              className={`form-control ${
                productFiledError.reserved_ecommerce_product ? "is-invalid" : ""
              }`}
              placeholder="Reserved E-commerce Product"
              min="0"
              step="1"
              id="reserved_ecommerce_product"
              name="reserved_ecommerce_product"
              value={productInformation.reserved_ecommerce_product}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
              disabled={productInformation.ecommerce_sale_status === "0"}
            />
            {productFiledError.reserved_ecommerce_product && (
              <div className="invalid-feedback">
                {productFiledError.reserved_ecommerce_product}
              </div>
            )}
          </div>

          <div className="form-group col-lg-6">
            <label>E-commerce Cash on Delivery</label>

            <div className="text-nowrap">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="cash_on_delivery"
                  id="cash_on_delivery"
                  checked={productInformation.cash_on_delivery === "1"}
                  onChange={(event) => {
                    handleChange(
                      event.target.name,
                      event.target.checked ? "1" : "0"
                    );
                  }}
                  disabled={productInformation.ecommerce_sale_status === "0"}
                />
                <label className="form-check-label" htmlFor="cash_on_delivery">
                  Enable
                </label>
              </div>
            </div>
          </div>

          <div className="form-group col-lg-6">
            <label>E-commerce Stock Dependency</label>

            <div className="text-nowrap">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="over_selling"
                  id="over_selling"
                  checked={productInformation.over_selling === "1"}
                  onChange={(event) => {
                    handleChange(
                      event.target.name,
                      event.target.checked ? "1" : "0"
                    );
                  }}
                  disabled={productInformation.ecommerce_sale_status === "0"}
                />
                <label className="form-check-label" htmlFor="over_selling">
                  Enable
                </label>
              </div>
            </div>
          </div>

          <div className="form-group col-lg-4">
            <label>Pos Sale</label>

            <div className="text-nowrap">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="pos_sale_status"
                  id="pos_sale_status_active"
                  checked={productInformation.pos_sale_status === "1"}
                  value="1"
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                  }}
                  disabled={productInformation.status === "0"}
                />
                <label
                  className="form-check-label"
                  htmlFor="pos_sale_status_active"
                >
                  Active
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="pos_sale_status"
                  id="pos_sale_status_inactive"
                  checked={productInformation.pos_sale_status === "0"}
                  value="0"
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                  }}
                  disabled={productInformation.status === "0"}
                />
                <label
                  className="form-check-label"
                  htmlFor="pos_sale_status_inactive"
                >
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="form-group col-lg-8">
            <label htmlFor="reserved_pos_product">Reserved Pos Product</label>
            <input
              type="number"
              className={`form-control ${
                productFiledError.reserved_pos_product ? "is-invalid" : ""
              }`}
              placeholder="Reserved Pos Product"
              min="0"
              step="1"
              id="reserved_pos_product"
              name="reserved_pos_product"
              value={productInformation.reserved_pos_product}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
              disabled={productInformation.pos_sale_status === "0"}
            />
            {productFiledError.reserved_pos_product && (
              <div className="invalid-feedback">
                {productFiledError.reserved_pos_product}
              </div>
            )}
          </div>

          <div className="form-group col-lg-4">
            <label>Promotional Offer</label>

            <div className="text-nowrap">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="promotional_active"
                  id="promotional_active_status"
                  checked={productInformation.promotional_active === "1"}
                  value="1"
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="promotional_active_status"
                >
                  Active
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="promotional_active"
                  id="promotional_inactive_status"
                  checked={productInformation.promotional_active === "0"}
                  value="0"
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="promotional_inactive_status"
                >
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="form-group col-lg-4">
            <label htmlFor="promotional_price">Promotional Price</label>
            <input
              type="text"
              className={`form-control ${
                productFiledError.promotional_price ? "is-invalid" : ""
              }`}
              placeholder="Promotional Price"
              id="promotional_price"
              name="promotional_price"
              value={productInformation.promotional_price}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
              disabled={productInformation.promotional_active === "0"}
            />
            {productFiledError.promotional_price && (
              <div className="invalid-feedback">
                {productFiledError.promotional_price}
              </div>
            )}
          </div>

          <div className="form-group col-lg-4">
            <label htmlFor="promotional_gift_item">Gift Item</label>
            <input
              type="text"
              className={`form-control ${
                productFiledError.promotional_gift_item ? "is-invalid" : ""
              }`}
              placeholder="Gift Item"
              id="promotional_gift_item"
              name="promotional_gift_item"
              value={productInformation.promotional_gift_item}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
              disabled={productInformation.promotional_active === "0"}
            />
            {productFiledError.promotional_gift_item && (
              <div className="invalid-feedback">
                {productFiledError.promotional_gift_item}
              </div>
            )}
          </div>

          <div className="form-group col-lg-6">
            <label htmlFor="promotional_start_date">Start Date</label>
            <input
              type="date"
              //pattern="yyyy-mm-dd"
              className={`form-control ${
                productFiledError.promotional_start_date ? "is-invalid" : ""
              }`}
              id="promotional_start_date"
              name="promotional_start_date"
              value={convertedStartDate}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
              disabled={productInformation.promotional_active === "0"}
            />
            {productFiledError.promotional_start_date && (
              <div className="invalid-feedback">
                {productFiledError.promotional_start_date}
              </div>
            )}
          </div>

          <div className="form-group col-lg-6">
            <label htmlFor="promotional_end_date">End Date</label>
            <input
              type="date"
              className={`form-control ${
                productFiledError.promotional_end_date ? "is-invalid" : ""
              }`}
              id="promotional_end_date"
              name="promotional_end_date"
              value={convertedEndDate}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
              disabled={productInformation.promotional_active === "0"}
            />
            {productFiledError.promotional_end_date && (
              <div className="invalid-feedback">
                {productFiledError.promotional_end_date}
              </div>
            )}
          </div>

          <div className="form-group col-lg-6">
            <label htmlFor="low_quantity_alert">Low Quantity Alert</label>
            <input
              type="text"
              className={`form-control ${
                productFiledError.low_quantity_alert ? "is-invalid" : ""
              }`}
              placeholder="Low Quantity Alert"
              id="low_quantity_alert"
              name="low_quantity_alert"
              value={productInformation.low_quantity_alert}
              onChange={(event) => {
                event.preventDefault();
                handleChange(event.target.name, event.target.value);
              }}
            />
            {productFiledError.low_quantity_alert && (
              <div className="invalid-feedback">
                {productFiledError.low_quantity_alert}
              </div>
            )}
          </div>

          <div className="form-group col-lg-6">
            <label htmlFor="expiry_alert_before">Expiry Alert Before</label>
            <input
              type="text"
              className={`form-control ${
                productFiledError.expiry_alert_before ? "is-invalid" : ""
              }`}
              placeholder="day"
              id="expiry_alert_before"
              name="expiry_alert_before"
              value={productInformation.expiry_alert_before}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
            />
            {productFiledError.expiry_alert_before && (
              <div className="invalid-feedback">
                {productFiledError.expiry_alert_before}
              </div>
            )}
          </div>

          <div className="form-group col-lg-4">
            <label htmlFor="selling_price">
              MRP <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${
                productFiledError.selling_price ? "is-invalid" : ""
              }`}
              placeholder="MRP"
              id="selling_price"
              name="selling_price"
              value={productInformation.selling_price}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
            />
            {productFiledError.selling_price && (
              <div className="invalid-feedback">
                {productFiledError.selling_price}
              </div>
            )}
          </div>

          <div className="form-group col-lg-4">
            <label htmlFor="product_vat">Vat (Included)</label>
            <input
              type="text"
              className={`form-control ${
                productFiledError.product_vat ? "is-invalid" : ""
              }`}
              placeholder="Vat (Included)"
              id="product_vat"
              name="product_vat"
              value={productInformation.product_vat}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
            />
            {productFiledError.product_vat && (
              <div className="invalid-feedback">
                {productFiledError.product_vat}
              </div>
            )}
          </div>

          <div className="form-group col-lg-4">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              className={`form-control ${
                productFiledError.sku ? "is-invalid" : ""
              }`}
              placeholder="SKU"
              id="sku"
              name="sku"
              value={productInformation.sku}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
              }}
            />
            {productFiledError.sku && (
              <div className="invalid-feedback">{productFiledError.sku}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSettingForm;
