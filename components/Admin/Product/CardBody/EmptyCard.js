/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
const EmptyCard = (props) => {
	// icon-pencil-alt
	// icon-plus-square-regular
	const { url, title, icon } = props
	return (
		<section className='custom-card'>
			<div className='container-fluid'>
				<div className='custom-card-box'>
					<div className='custom-card-box-header'>
						<div className='fbh-title'>
							<i className={icon} />
							<h2>{title}</h2>
							<Link legacyBehavior href={url}>
								<a className='fbh-btn' title='Product List'>
									<i className='icon-list2' />
								</a>
							</Link>
						</div>
						<div className='fbh-info'>
							<p>
								Please fill in the information below. The field labels marked with * are required
								input fields.
							</p>
						</div>
					</div>

					<div className='custom-card-box-content'>{props.children}</div>
				</div>
			</div>
		</section>
	)
}

export default EmptyCard
