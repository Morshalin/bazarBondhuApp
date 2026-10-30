import React from "react";
const CategoryContent = ({ category_ids, categories, handleProductData }) => {
  if (!categories || !categories.length) {
    return null;
  }
  return categories.map((category) => (
    <React.Fragment key={category.id}>
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          name="category_ids"
          defaultChecked={category_ids.includes(category.id.toString())}
          value={category.id}
          id={category.slug}
          onChange={handleProductData}
        />
        <label className="custom-control-label" htmlFor={category.slug}>
          {category.name}
        </label>

        {CategoryContent({
          category_ids: category_ids,
          categories: category.child_categories,
          handleProductData: handleProductData,
        })}
      </div>
    </React.Fragment>
  ));
};

export default CategoryContent;
