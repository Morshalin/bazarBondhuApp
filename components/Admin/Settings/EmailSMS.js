import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'


const EmailSMS = (props) => {
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const { id } = router.query

	return (
		<>
			<section className='custom-card'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='custom-card-box'>
								<div className='custom-card-box-header'>
									<div className='fbh-title'>
										<i className='fas fa-envelope'></i>
										<h2>Email & SMS</h2>
									</div>
									<div className='fbh-info'>
										<p>
											Please fill in the information below. The field labels
											marked with
											<span className='text-danger'> * </span>
											are required input fields.
										</p>
									</div>
								</div>

								<div className='custom-card-box-content'>
									<div className='row'>
										<div className='col-lg-12'>
											<section className='custom-card'>
												<div className='container-fluid'>
													<div className='row'>
														<div className='col-md-12'>
															<div className='row'>
																<div className='col-md-6'>
																	<form style={{ display: 'inlineBlock' }}>
																		<div className='custom-card-box'>
																			<div className='custom-card-box-header'>
																				<div className='fbh-title'>
																					<div className='col-lg-12'>
																						<div className='row'>
																							<div className='col-lg-2'>
																								<h2
																									style={{ borderLeft: 'none' }}
																								>
																									Email
																								</h2>
																							</div>
																							<div className='col-lg-6'>
																								<div className='form-group mt-2'>
																									<div className='custom-control custom-switch'>
																										<input
																											type='checkbox'
																											className='custom-control-input'
																											id='customSwitch1'
																										/>
																										<label
																											className='custom-control-label'
																											htmlFor='customSwitch1'
																										/>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>

																			<div className='custom-card-box-content'>
																				<div className='row'>
																					<div className='col-lg-12'>
																						<fieldset disabled={loading}>
																							<div className='row'>
																								<div className='col-md-5'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											Mail Driver (Mailer)
																											<span className='text-danger'>
																												{' '}
																												*{' '}
																											</span>
																										</label>
																										<div className='form-group'>
																											<select
																												className='form-control'
																												id=''
																											>
																												<option> SMTP </option>
																												<option>
																													{' '}
																													Send Mail{' '}
																												</option>
																											</select>
																										</div>
																									</div>
																								</div>

																								<div className='col-md-10'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											Mail Host
																											<span className='text-danger'>
																												{' '}
																												*{' '}
																											</span>
																										</label>

																										<input
																											autoComplete='off'
																											type='phone'
																											className={`form-control`}
																											id='phone'
																											name='phone'
																											value=''
																											placeholder='Mail Host'
																										/>
																									</div>
																								</div>

																								<div className='col-md-10'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											Mail Port
																											<span className='text-danger'>
																												{' '}
																												*{' '}
																											</span>
																										</label>

																										<input
																											autoComplete='off'
																											type='phone'
																											className={`form-control`}
																											id='phone'
																											name='phone'
																											value=''
																											placeholder='Mail Port'
																										/>
																									</div>
																								</div>

																								<div className='col-md-10'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											Mail Username
																											<span className='text-danger'>
																												{' '}
																												*{' '}
																											</span>
																										</label>

																										<input
																											autoComplete='off'
																											type='phone'
																											className={`form-control`}
																											id='phone'
																											name='phone'
																											value=''
																											placeholder='Mail Username'
																										/>
																									</div>
																								</div>

																								<div className='col-md-10'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											Mail Password
																											<span className='text-danger'>
																												{' '}
																												*{' '}
																											</span>
																										</label>

																										<input
																											autoComplete='off'
																											type='phone'
																											className={`form-control`}
																											id='phone'
																											name='phone'
																											value=''
																											placeholder='Mail Password'
																										/>
																									</div>
																								</div>

																								<div className='col-md-5'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											Mail Encryption
																											<span className='text-danger'>
																												{' '}
																												*{' '}
																											</span>
																										</label>
																										<div className='form-group'>
																											<select
																												className='form-control'
																												id=''
																											>
																												<option> None </option>
																												<option> TLS </option>
																												<option> SSL </option>
																											</select>
																										</div>
																									</div>
																								</div>

																								<div className='col-md-10'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											Mail From Address
																										</label>

																										<input
																											autoComplete='off'
																											type='phone'
																											className={`form-control`}
																											id='phone'
																											name='phone'
																											value=''
																											placeholder='Mail From Address'
																										/>
																									</div>
																								</div>

																								<div className='col-md-10'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											Mail From Name
																										</label>

																										<input
																											autoComplete='off'
																											type='phone'
																											className={`form-control`}
																											id='phone'
																											name='phone'
																											value=''
																											placeholder='Mail From Name'
																										/>
																									</div>
																								</div>
																							</div>
																						</fieldset>
																					</div>
																				</div>
																				<div className='col-lg-10 offset-lg-2 mt-4 text-right'>
																					<div className='form-group'>
																						<Link legacyBehavior href={'/admin/settings'}>
																							<a className='btn btn-info mr-2'>
																								<i className='icon-arrow-left-solid mr-1 mr-1' />
																								Back
																							</a>
																						</Link>

																						<button
																							type='submit'
																							onClick={(e) => {
																								e.preventDefault()
																							}}
																							className='btn btn-danger mr-2'
																						>
																							<i className='icon-reset mr-1' />
																							Reset
																						</button>

																						<button
																							type='submit'
																							className={`btn btn-success ${
																								loading ? 'disabled' : ''
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
																		</div>
																	</form>
																</div>

																<div className='col-md-6'>
																	<form>
																		<div className='custom-card-box'>
																			<div className='custom-card-box-header'>
																				<div className='fbh-title'>
																					<div className='col-lg-12'>
																						<div className='row'>
																							<div className='col-lg-2'>
																								<h2
																									style={{ borderLeft: 'none' }}
																								>
																									SMS
																								</h2>
																							</div>
																							<div className='col-lg-6'>
																								<div className='form-group mt-2'>
																									<div className='custom-control custom-switch'>
																										<input
																											type='checkbox'
																											className='custom-control-input'
																											id='customSwitch2'
																										/>
																										<label
																											className='custom-control-label'
																											htmlFor='customSwitch2'
																										/>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>

																			<div className='custom-card-box-content'>
																				<div className='row'>
																					<div className='col-lg-10'>
																						<fieldset disabled={loading}>
																							<div className='row'>
																								<div className='col-md-10'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											API URL
																											<span className='text-danger'>
																												{' '}
																												*{' '}
																											</span>
																										</label>

																										<input
																											autoComplete='off'
																											type='phone'
																											className={`form-control`}
																											id='phone'
																											name='phone'
																											value=''
																											placeholder='API URL'
																										/>
																									</div>
																								</div>

																								<div className='col-md-10'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											SID
																											<span className='text-danger'>
																												{' '}
																												*{' '}
																											</span>
																										</label>

																										<input
																											autoComplete='off'
																											type='phone'
																											className={`form-control`}
																											id='phone'
																											name='phone'
																											value=''
																											placeholder='SID'
																										/>
																									</div>
																								</div>

																								<div className='col-md-10'>
																									<div className='form-group'>
																										<label htmlFor='phone'>
																											API Token
																											<span className='text-danger'>
																												{' '}
																												*{' '}
																											</span>
																										</label>

																										<input
																											autoComplete='off'
																											type='phone'
																											className={`form-control`}
																											id='phone'
																											name='phone'
																											value=''
																											placeholder='API Token'
																										/>
																									</div>
																								</div>
																							</div>
																						</fieldset>
																					</div>
																				</div>
																				<div className='col-lg-10 offset-lg-2 mt-4 text-right'>
																					<div className='form-group'>
																						<Link legacyBehavior href={'/admin/settings'}>
																							<a className='btn btn-info mr-2'>
																								<i className='icon-arrow-left-solid mr-1 mr-1' />
																								Back
																							</a>
																						</Link>

																						<button
																							type='submit'
																							onClick={(e) => {
																								e.preventDefault()
																							}}
																							className='btn btn-danger mr-2'
																						>
																							<i className='icon-reset mr-1' />
																							Reset
																						</button>

																						<button
																							type='submit'
																							className={`btn btn-success ${
																								loading ? 'disabled' : ''
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
																		</div>
																	</form>
																</div>
															</div>
														</div>
													</div>
												</div>
											</section>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default EmailSMS
