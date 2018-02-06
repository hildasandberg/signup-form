import React from "react"
import "../index.css"

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: "",
      password: "",
    }
  }

  userEntry = event => {
    this.setState({
      user: event.target.value
    })
  }

  passwordEntry = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        return response.json()
          .then(json => {
            console.log("inloggning lyckades", json)
            localStorage.setItem("token", json.accessToken)
            localStorage.setItem("userId", json.userId)
            this.setState({
              user: "",
              password: ""
            })
          })
      }
    }).catch(err => {
      console.log("Login failed", err)
    })
  }

  render() {
    return (
      <div className="page">
        <div className="form-container">
          {/* {this.state.complete && <Redirect to="/" />} */}
          <h1>Log In: </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-box">User name: <input required className="input-value" type="text" placeholder="username:" value={this.state.user} onChange={this.userEntry} /></div>
            <div className="input-box">password: <input required className="input-value" type="text" placeholder="password:" value={this.state.password} onChange={this.passwordEntry} /></div>

            <div className="submit-container">
              <input required className="btn submit" type="submit" value="Log in" />
            </div>

          </form>
        </div>
      </div>
    )
  }

}

export default LoginForm
