import React from "react"
import Form from "./form.js"
import LoginForm from "./loginForm.js"

class App extends React.Component {

  render() {
    return (
      <div className="user-form">
        <Form />
        <LoginForm />
      </div>
    )
  }

}

export default App
