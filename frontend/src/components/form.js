import React from "react"
import "../index.css"

class Form extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: "",
      email: "",
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
    }).then(response => {
      this.setState({
        user: "",
        email: "",
        password: ""
      })
    })
  }

  // .then(response => response.json())
  // this.setState({
  //   user: "",
  //   email: "",
  //   password: ""
  // })

  render() {
    return (
      <div className="page">
        <div className="form-container">
          {/* {this.state.complete && <Redirect to="/" />} */}
          <h1>Sign up: </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-box">User name: <input required className="input-value" type="text" placeholder="username:" value={this.state.user} onChange={this.newUser} /></div>
            <div className="input-box">Email : <input required className="input-value" type="text" placeholder="email:" value={this.state.email} onChange={this.newEmail} /></div>
            <div className="input-box">password: <input required className="input-value" type="text" placeholder="password:" value={this.state.password} onChange={this.newPassword} /></div>

            <div className="submit-container">
              <input className="btn submit" type="submit" value="Register" />
            </div>

          </form>
        </div>
      </div>
    )
  }

}

export default Form
