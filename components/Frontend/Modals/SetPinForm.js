<div className='row'>
    <div className='col-sm-12'>
        <div className='mb-3'>
            <label className='form-label' htmlFor='password'>
                Password
            </label>
            <input
                type='password'
                className='form-control'
                placeholder='Please enter 4-digit PIN'
                name='password'
                value={loginCredential.otp}
                onChange={handleLoginData}
            />
        </div>
    </div>
    <div className='col-sm-12'>
        <div className='mb-3'>
            <label className='form-label' htmlFor='password'>
                Confirm Password
            </label>
            <input
                type='password'
                className='form-control'
                placeholder='Please enter 4-digit PIN'
                name='confirm_password'
                value={loginCredential.otp}
                onChange={handleLoginData}
            />
        </div>
    </div>
</div>