import React, { useEffect, useState } from "react";
import axios from "axios";
import Error from "../../Notification/Error";
import Success from "../../Notification/Success";
import Link from "next/link";

const AddPage = () => {
  let initialPostData = {
    post_type:'Post',
    name: "",
    slug:'',
    content: "",
    meta_keyword:'',
    meta_description:'',
    sort_order: "",
    status: 1,
  };

  let initialValidationErrors = {
    post_type:'',
    name: "",
    slug:'',
    content: "",
    meta_keyword:'',
    meta_description:'',
    sort_order: "",
    status: "",
  };

  let initialMessage = { success: "", error: "" };

  const [itemData, setItemData] = useState(initialPostData);

  const [itemValidation, setItemValidation] = useState(
      initialValidationErrors
  );

  const [message, setMessage] = useState(initialMessage);

  const [loading, setLoading] = useState(false);

  // slugify helper function
  const slugify = (toConvertText) => {
    toConvertText = toConvertText.replace(/^\s+|\s+$/g, "");

    // Make the string lowercase
    toConvertText = toConvertText.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from =
        "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
        "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      toConvertText = toConvertText.replace(
          new RegExp(from.charAt(i), "g"),
          to.charAt(i)
      );
    }

    // Remove invalid chars
    toConvertText = toConvertText
        .replace(/[^a-z0-9 -]/g, "")
        // Collapse whitespace and replace by -
        .replace(/\s+/g, "-")
        // Collapse dashes
        .replace(/-+/g, "-");

    return toConvertText;
  };

  const handleMenuData = (event) => {
    setLoading(false);
    let name = event.target.name;
    let value =
        event.target.type == "checkbox"
            ? event.target.checked
            : event.target.value;

    if (event.target.name === "name") {
      itemData.slug = slugify(event.target.value);
    } else if (event.target.name === "slug") {
      value = slugify(event.target.value);
    }

    setItemData({ ...itemData, [name]: value });
    setItemValidation({ ...itemValidation, [name]: "" });
    setMessage(initialMessage);
  };

  const saveMenuData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postFormData = new FormData();
    postFormData.append("name", itemData.name);
    postFormData.append("slug", itemData.slug);
    postFormData.append("post_type", itemData.post_type);
    postFormData.append("meta_keyword", itemData.meta_keyword);
    postFormData.append("meta_description", itemData.meta_description);
    postFormData.append("content", itemData.content);
    postFormData.append("sort_order", itemData.sort_order);
    postFormData.append("status", itemData.status);
    const config = {
      headers: {
        "content-type": "multipart/form-data;",
      },
    };

    let response = await axios
        .post(`/backend/posts`, postFormData, config)
        .then((result) => result.data)
        .catch((errors) => errors);
    if (response.success) {
      // Need to redirect list page
      await resetMenuData(e);
      setMessage({ ...message, success: response.message });
    } else {
      setLoading(false);
      setMessage({ ...message, error: response.message });
      setItemValidation(response.errors);
    }

    setTimeout(() => {
      setMessage(initialMessage);
    }, 1000);
  };

  const resetMenuData = async (e) => {
    e.preventDefault();
    setItemData(initialPostData);
    setItemValidation(initialValidationErrors);
    setLoading(false);
  };

  return (
      <>
        {message.success && <Success message={message.success} />}
        {message.error && <Error message={message.error} />}

        <section className="custom-card">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="custom-card-box">
                  <div className="custom-card-box-header">
                    <div className="fbh-title">
                      <i className="far fa-plus-square" />
                      <h2>Add New Page</h2>
                    </div>
                    <div className="fbh-info">
                      <p>
                        Please fill in the information below. The field labels
                        marked with
                        <span className="text-danger"> * </span>
                        are required input fields.
                      </p>
                    </div>
                  </div>
                  <div className="custom-card-box-content">
                    <div className="row">
                      <div className="col-lg-12">
                        <form>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label htmlFor="name">
                                      Name
                                      <span className="text-danger"> * </span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            itemValidation.name
                                                ? `is-invalid`
                                                : ``
                                        }`}
                                        id="name"
                                        name="name"
                                        value={itemData.name}
                                        onChange={handleMenuData}
                                        placeholder="Item Name"
                                        required
                                    />

                                    <div
                                        className={
                                          itemValidation.name
                                              ? `invalid-feedback`
                                              : `d-none`
                                        }
                                    >
                                      {itemValidation.name}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label htmlFor="post_type">
                                      Item Type
                                      <span className="text-danger"> * </span>
                                    </label>
                                    <div
                                        className={`input-group ${
                                            itemValidation.post_type
                                                ? `is-invalid`
                                                : ``
                                        }`}
                                    >
                                      <select
                                          className="custom-select"
                                          id="post_type"
                                          name="post_type"
                                          onChange={handleMenuData}
                                          aria-label="post_type Select"
                                      >
                                        <option value="post">Post</option>
                                        <option value="page">Page</option>
                                        <option value="help">help</option>
                                      </select>
                                    </div>

                                    <div
                                        className={
                                          itemValidation.post_type
                                              ? `invalid-feedback`
                                              : `d-none`
                                        }
                                    >
                                      {itemValidation.post_type}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-group">
                                    <label htmlFor="meta_keyword">
                                      Meta Keyword
                                    </label>
                                    <input type="text"
                                           className={`form-control ${
                                               itemValidation.meta_keyword
                                                   ? `is-invalid`
                                                   : ``
                                           }`}
                                           id="meta_keyword"
                                           name="meta_keyword"
                                           value={itemData.meta_keyword}
                                           onChange={handleMenuData}
                                           placeholder="Meta Keyword"
                                    />
                                    <div
                                        className={
                                          itemValidation.meta_keyword
                                              ? `invalid-feedback`
                                              : `d-none`
                                        }
                                    >
                                      {itemValidation.meta_keyword}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-group">
                                    <label htmlFor="meta_description">
                                      Meta Description
                                    </label>
                                    <textarea
                                        className={`form-control ${
                                            itemValidation.meta_description
                                                ? `is-invalid`
                                                : ``
                                        }`}
                                        id="meta_description"
                                        name="meta_description"
                                        value={itemData.meta_description}
                                        onChange={handleMenuData}
                                        placeholder="Meta Description"
                                    />
                                    <div
                                        className={
                                          itemValidation.meta_description
                                              ? `invalid-feedback`
                                              : `d-none`
                                        }
                                    >
                                      {itemValidation.meta_description}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label htmlFor="sort_order">Slug</label>
                                    <span className="text-danger"> * </span>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            itemValidation.slug
                                                ? `is-invalid`
                                                : ``
                                        }`}
                                        id="slug"
                                        name="slug"
                                        value={itemData.slug}
                                        onChange={handleMenuData}
                                        placeholder="slug"
                                        required
                                    />
                                    <div
                                        className={
                                          itemValidation.slug
                                              ? `invalid-feedback`
                                              : `d-none`
                                        }
                                    >
                                      {itemValidation.slug}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label htmlFor="sort_order">Sort Order</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            itemValidation.sort_order
                                                ? `is-invalid`
                                                : ``
                                        }`}
                                        id="sort_order"
                                        name="sort_order"
                                        value={itemData.sort_order}
                                        onChange={handleMenuData}
                                        placeholder="1"
                                        required
                                    />
                                    <div
                                        className={
                                          itemValidation.sort_order
                                              ? `invalid-feedback`
                                              : `d-none`
                                        }
                                    >
                                      {itemValidation.sort_order}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label htmlFor="status">
                                      Status
                                      <span className="text-danger"> * </span>
                                    </label>
                                    <div
                                        className={`input-group ${
                                            itemValidation.status
                                                ? `is-invalid`
                                                : ``
                                        }`}
                                    >
                                      <select
                                          className="custom-select"
                                          id="status"
                                          name="status"
                                          onChange={handleMenuData}
                                          aria-label="status Select"
                                      >
                                        <option value="1">Enable</option>
                                        <option value="0">Disable</option>
                                      </select>
                                    </div>

                                    <div
                                        className={
                                          itemValidation.status
                                              ? `invalid-feedback`
                                              : `d-none`
                                        }
                                    >
                                      {itemValidation.status}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="content">
                                  Content
                                </label>
                                <textarea
                                    className={`form-control ${
                                        itemValidation.content
                                            ? `is-invalid`
                                            : ``
                                    }`}
                                    id="description"
                                    name="content"
                                    value={itemData.content}
                                    onChange={handleMenuData}
                                    placeholder="content"
                                />
                                <div
                                    className={
                                      itemValidation.content
                                          ? `invalid-feedback`
                                          : `d-none`
                                    }
                                >
                                  {itemValidation.content}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12 text-right">
                              <div className="form-group">
                                <Link legacyBehavior href={"/admin/pages"}>
                                  <a className="btn btn-info mr-2">
                                    <i className="icon-arrow-left-solid mr-1 mr-1" />
                                    Back
                                  </a>
                                </Link>

                                <button
                                    type="submit"
                                    onClick={resetMenuData}
                                    className="btn btn-danger mr-2"
                                >
                                  <i className="icon-reset mr-1" />
                                  Reset
                                </button>

                                <button
                                    type="submit"
                                    onClick={saveMenuData}
                                    className={`btn btn-success ${
                                        loading ? "disabled" : ""
                                    }`}
                                >
                                  <i
                                      className={
                                        loading
                                            ? `spinner-border spinner-border-sm mr-1`
                                            : `icon-save-regular mr-1`
                                      }
                                  />
                                  {loading ? `Saving..` : `Save`}
                                </button>
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
      </>
  );
};

export default AddPage;
