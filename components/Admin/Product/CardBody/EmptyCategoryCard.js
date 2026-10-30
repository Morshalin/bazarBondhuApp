const EmptyCategoryCard = (props) => {
	return (
		<div className='card rounded-0 mb-3'>
			<div className='card-header rounded-0'>
				<div className='fbh-title  mt-2'>
					<h6>
						Category<span className='text-danger'>*</span>
					</h6>
				</div>
			</div>
			<div className='card-body'>{props.children}</div>
			{props.categoryError?.length !== 0 && (
				<div className={`card-footer ${props.categoryError?.length !== 0 ? 'is-invalid' : ''}`}>
					<span className='small text-danger'>{props.categoryError}</span>
				</div>
			)}
		</div>
	)
}

export default EmptyCategoryCard
