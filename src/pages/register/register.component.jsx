import React from "react";

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onInputChange = event => {
    const {name, value} = event.target;

    this.setState({ [name]: value });
  }

  onSubmit = event => {
    event.preventDefault();

    const {onRouteChange, onChangeUser} = this.props;
    const {name, email, password} = this.state;

    fetch('https://secret-dawn-61370.herokuapp.com/register', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then(res => {
      if(res.ok && res.status === 200) {
        return res.json();
      } else {
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
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw10 center">
        <main className="pa4 black-80">
          <form onSubmit={this.onSubmit} className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.onInputChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  required
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onInputChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
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
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign up"
              />
            </div>
          </form>
        </main>
      </article>
    )
  }
}

export default Register;
