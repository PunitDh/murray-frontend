import React, { useState } from 'react';

function SignUpForm({ onSignUp }) {
  const [state, setState] = useState({email: '', password: ''})

  function handleSubmit(event) {
    event.preventDefault();
    onSignUp(state.email, state.password);
  }

  function handleChange({target: {name, value}}) {
    setState(prevState => ({...prevState, [name]: value}));
  }

  // function handleEmailChange(event) {
  //   const value = event.target.value;
  //   setEmail(value);
  // }

  // function handlePasswordChange(event) {
  //   const value = event.target.value;
  //   setPassword(value);
  // }

    return (
      <>
        <h2>Sign Up to Murray</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>  
            <label>Email: </label>
            <input type="email" onChange={handleChange} name="email" value={state.email} />
          </fieldset>
          <fieldset>
            <label>Password: </label>
            <input type="password" name="password" value={state.password} onChange={handleChange} />
          </fieldset>
          <button type="submit">Sign Up</button>
        </form>
      </>
    );
}

export default SignUpForm;