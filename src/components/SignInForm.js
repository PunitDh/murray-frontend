import React from 'react';

function SignInForm({ onSignIn }) {

    function handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const elements = form.elements;
      const { value: email } = elements.email;
      const { value: password } = elements.password;
      onSignIn({email, password})
    }

    return (
        <form onSubmit={handleSubmit}>
          <fieldset>  
            <label>Email: </label>
            <input type="email" name="email" />
          </fieldset>
          <fieldset>
            <label>Password: </label>
            <input type="password" name="password" />
          </fieldset>
          <button type="submit">Sign In</button>
        </form>
    );
}

export default SignInForm;