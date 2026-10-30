import React from 'react'
const SelectCategory = ({ category_ids, categories, handleCategoryChange }) => {
	if (!categories || !categories.length) {
		return null
	}

	return categories.map((category) => (
		// console.log(category_ids.includes(category.id.toString())),
		<React.Fragment key={category.id}>
			<div className='custom-control custom-checkbox'>
				<input
					type='checkbox'
					className='custom-control-input'
					name='category_ids[]'
					defaultChecked={category_ids.includes(category.id.toString())}
					value={category.id}
					id={category.slug}
					onChange={(event) => {
						handleCategoryChange(event.target.name, event.target.value, event.target.checked)
					}}
				/>
				<label className='custom-control-label' htmlFor={category.slug}>
					{category.name}
				</label>

				{SelectCategory({
					category_ids: category_ids,
					categories: category.child_categories,
					handleCategoryChange: handleCategoryChange,
				})}
			</div>
		</React.Fragment>
	))
}

export default SelectCategory
