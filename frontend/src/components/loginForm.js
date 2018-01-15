import React from "react"
import "../index.css"

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: "",
      password: ""
    }
  }

  newUser = event => {
    this.setState({
      user: event.target.value
    })
  }

  newEmail = event => {
    this.setState({
      email: event.target.value
    })
  }

  newPassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => response.json())
    this.setState({
      user: "",
      password: ""
    })
  }

  render() {
    return (
      <div className="page">
        <div className="form-container">
          {/* {this.state.complete && <Redirect to="/" />} */}
          <h1>Log In: </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-box">User name: <input className="input-value" type="text" placeholder="Namn:" value={this.state.user} onChange={this.newUser} /></div>
            <div className="input-box">password: <input className="input-value" type="text" placeholder="Typ:" value={this.state.password} onChange={this.newPassword} /></div>

            <div className="submit-container">
              <input className="btn submit" type="submit" value="Log in" />
            </div>

          </form>
        </div>
      </div>
    )
  }

}

export default LoginForm