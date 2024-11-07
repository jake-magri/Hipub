// import './index.css';

const SignUp = () => {
    return (
        <>
            <div className='form-container'>
                <form className='form login-form'>
                    <h1>Sign Up</h1>
                    {/* name input field */}
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            className="form-input"
                            type='text'
                            name='username'
                        />
                    </div>
                    {/* Username input field */}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-input"
                            type='text'
                            name='email'
                        />
                    </div>
                    {/* Password input field */}
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-input"
                            type='password'
                            name='password'
                        />
                    </div>
                    {/* Submit button for the login form */}
                    <div className="form-group">
                        <button className="btn btn-primary" type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;