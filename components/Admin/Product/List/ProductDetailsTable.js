import BarcodeGenerator from "../../Barcode/Generate/BarcodeGenerator";
const ProductDetailsTable = (props) => {
  let currentDateTime = "";
  let promotionalStartDateTime = "";
  let promotionalEndDateTime = "";
  if (+props.productDetails.promotional_active === 1) {
    currentDateTime = new Date().getTime();
    promotionalStartDateTime = new Date(
      props.productDetails.promotional_start_date
    ).getTime();
    promotionalEndDateTime = new Date(
      props.productDetails.promotional_end_date
    ).getTime();
  }
  const serverPermissions = props.serverPermissions;
  const hasMenuPermission = (module, permission_type) => {
    let isExists = false;
    serverPermissions &&
      serverPermissions.map((perm, index) => {
        if (
          perm.module === module &&
          perm.permission_type === permission_type
        ) {
          isExists = true;
        }
      });

    return isExists;
  };

  const dateFormate = (date) => {
    let d = new Date(date);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da} ${mo}, ${ye}`;
  };

  return (
    <>
      <div className="row mb-1">
        <div className="col-lg-4">
          <img
            src={props.productDetails.feature_image}
            alt={props.productDetails.name}
            className="border w-100"
          />
        </div>
        <div className="col-lg-8">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <tbody>
                <tr className="text-center">
                  <td colSpan="2">
                    <h4>Product Barcode</h4>
                  </td>
                </tr>
                <tr>
                  <td className="w-50 text-right">Barcode</td>
                  <td>
                    {props.productDetails.barcode && (
                      <BarcodeGenerator
                        barcode={props.productDetails.barcode}
                      />
                    )}
                    <div className="mt-1">{props.productDetails.barcode}</div>
                  </td>
                </tr>

                {hasMenuPermission("product", "product-settings-view") && (
                  <>
                    <tr className="text-center">
                      <td colSpan="2">
                        <h4>Product Settings</h4>
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Product Status</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.status === "1"
                          ? "active"
                          : "inactive"}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">E-commerce Sale</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.ecommerce_sale_status === "1"
                          ? "active"
                          : "inactive"}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">
                        Reserved E-commerce Product
                      </td>
                      <td className="font-weight-bolder">
                        {props.productDetails.reserved_ecommerce_product}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Cash on Delivery</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.cash_on_delivery === "1"
                          ? "active"
                          : "inactive"}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Pos Sale</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.pos_sale_status === "1"
                          ? "active"
                          : "inactive"}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Reserved Pos Product</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.reserved_pos_product}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Promotional Offer</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.promotional_active}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Promotional Price</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.promotional_price}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Gift Item</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.promotional_gift_item}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Start Date</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.promotional_start_date}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">End Date</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.promotional_end_date}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Low Quantity Alert</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.low_quantity_alert}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Expiry Alert Before</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.expiry_alert_before}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">MRP</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.selling_price}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">Vat (Included)</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.product_vat}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-right w-50">SKU</td>
                      <td className="font-weight-bolder">
                        {props.productDetails.sku}
                      </td>
                    </tr>
                  </>
                )}

                <tr className="text-center">
                  <td colSpan="2">
                    <h4>Product Basic Information</h4>
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Product Name</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.name}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Item Name</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.item_name}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Product brand</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.brand}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Net Content</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.net_content}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Unit</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.unit}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Model</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.model}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Part Number</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.part_number}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Company/Brand Short Name</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.company_brand_sn}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">
                    Company/Brand Elaborate Name
                  </td>
                  <td className="font-weight-bolder">
                    {props.productDetails.company_brand_en}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Prices</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.selling_price}
                  </td>
                </tr>

                {+props.productDetails.promotional_active === 1 &&
                currentDateTime >= promotionalStartDateTime &&
                currentDateTime <= promotionalEndDateTime ? (
                  <tr>
                    <td className="text-right w-50">Promotional Offer</td>
                    <td>
                      <span className="font-weight-bolder">Price:</span>{" "}
                      {props.productDetails.promotional_price}
                      {", "}
                      <span className="font-weight-bolder"> (Date : </span>
                      {dateFormate(
                        props.productDetails.promotional_start_date
                      )}{" "}
                      <span className="font-weight-bolder">To</span>{" "}
                      {dateFormate(props.productDetails.promotional_end_date)})
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                <tr className="text-center">
                  <td colSpan="2">
                    <h4>Product Specification</h4>
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Size</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.size}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Length</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.length}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Width</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.width}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Height</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.height}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Weight</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.weight}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Color</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.color}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Flavor</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.flavor}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Ingredients</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.ingredients}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Country of Origin</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.country_of_origin}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Made In (Country name)</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.made_in}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Assemble By</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.assemble_by}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">
                    Manufactured By (Company Name)
                  </td>
                  <td className="font-weight-bolder">
                    {props.productDetails.manufactured_by}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">
                    Marketed By (Company Name)
                  </td>
                  <td className="font-weight-bolder">
                    {props.productDetails.marketed_by}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Variant</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.variant}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Warranty/Guarantee</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.warranty}
                  </td>
                </tr>

                <tr>
                  <td className="text-right w-50">Web Link</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.web_link}
                  </td>
                </tr>

                <tr className="text-center">
                  <td colSpan="2">
                    <h4>Additional Product Information</h4>
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Description</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.description}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Product Slug</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.slug}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Product Sort Order</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.sort_order}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Shelf/Rack Number</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.shelf_number}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Meta Keywords</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.meta_keywords}
                  </td>
                </tr>
                <tr>
                  <td className="text-right w-50">Meta Description</td>
                  <td className="font-weight-bolder">
                    {props.productDetails.meta_description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsTable;
