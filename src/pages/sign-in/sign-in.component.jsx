import React from "react";

class SignIn extends React.Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  onInputChange = event => {
    const {type, value} = event.target;
    this.setState({ [type]: value});
  }

  onSubmit = event => {
    event.preventDefault();
    
    const {email, password} = this.state;
    const {onChangeUser, onRouteChange} = this.props;

    fetch('http://localhost:3001/signin', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => {
      if(res.ok && res.status === 200) {
        return res.json();
      } else {
        this.setState({error: res.status});
        throw Error();
      }
    })
    .then(user => {
      onChangeUser(user)
      onRouteChange('home');
    })
    .catch(err => console.log(err));
  }

  render() {
    const { onRouteChange } = this.props;
    const { error } = this.state;

    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw10 center">
        <main className="pa4 black-80">
          <form onSubmit={this.onSubmit} className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onInputChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onInputChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                />
              </div>
            </fieldset>
            {
              error ? <p style={{color: 'red'}}>email or password is incorrect.</p> : null
            }
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                href="#0"
                className="f6 pointer link dim black db"
              >
                Register
              </p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;
