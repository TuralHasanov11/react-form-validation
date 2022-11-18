import React from 'react'
import { useInput } from "../hooks/use-input"

export default function Form() {

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    inputChange: onUsernameChange,
    inputBlur: onUsernameBlur,
    inputReset: onUsernameReset,
    messages: usernameMessages
  } = useInput({ initialState: '', rules: { required: true } })

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChange: onEmailChange,
    inputBlur: onEmailBlur,
    inputReset: onEmailReset,
    messages: emailMessages
  } = useInput({ initialState: '', rules: { required: true, email: true } })

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChange: onPasswordChange,
    inputBlur: onPasswordBlur,
    inputReset: onPasswordReset,
    messages: passwordMessages
  } = useInput({ initialState: '', rules: { required: true } })

  const {
    value: passwordConfirm,
    isValid: passwordConfirmIsValid,
    hasError: passwordConfirmHasError,
    inputChange: onPasswordConfirmChange,
    inputBlur: onPasswordConfirmBlur,
    inputReset: onPasswordConfirmReset,
    isDirty: passwordConfirmIsDirty,
    messages: passwordConfirmMessages
  } = useInput({ initialState: '', rules: { required: true, sameAs: password } })

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    inputChange: onDescriptionChange,
    inputBlur: onDescriptionBlur,
    inputReset: onDescriptionReset,
    isDirty: descriptionIsDirty,
    messages: descriptionMessages
  } = useInput({ initialState: '', rules: { nullable: true } })

  const {
    value: choices,
    isValid: choicesIsValid,
    hasError: choicesHasError,
    inputChange: onChoicesChange,
    inputBlur: onChoicesBlur,
    inputReset: onChoicesReset,
    isDirty: choicesIsDirty,
    messages: choicesMessages
  } = useInput({ initialState: '', rules: { required: true } })

  const {
    value: accepted,
    isValid: acceptedIsValid,
    hasError: acceptedHasError,
    inputChange: onAcceptedChange,
    inputReset: onAcceptedReset,
    messages: acceptedMessages
  } = useInput({ initialState: false, rules: { required: true } })

  let formIsValid = (
    usernameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    passwordConfirmIsValid &&
    descriptionIsValid &&
    choicesIsValid &&
    acceptedIsValid
  )

  function onSubmitForm(event) {
    event.preventDefault()

    if (formIsValid) {
      const data = {
        username,
        email,
        password,
        passwordConfirm,
        choices,
        description,
        accepted
      }

      console.log(data)

      // api call
      return
    } else {
      alert("Form is not valid!")
      return
    }
  }

  return (
    <div className='container p-5'>
      <div className="card card-body">
        <h4 className='text-center'>React Form</h4>
        <form onSubmit={onSubmitForm}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={onUsernameChange}
              onBlur={onUsernameBlur}
              value={username}
              onReset={onUsernameReset}
              className={`form-control ${usernameHasError && 'is-invalid'} ${usernameIsValid && 'is-valid'}`}
              autoComplete="off"
              id='name'
            />
            {usernameHasError && usernameMessages.map((msg, key) => (<div key={key} className="invalid-feedback">{msg.text}</div>))}
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id='email'
              onChange={onEmailChange}
              onBlur={onEmailBlur}
              value={email}
              onReset={onEmailReset}
              autoComplete="off"
              className={`form-control ${emailHasError && 'is-invalid'} ${emailIsValid && 'is-valid'}`}
            />
            {emailHasError && emailMessages && emailMessages.map((msg, key) => (<div key={key} className="invalid-feedback">{msg.text}</div>))}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id='password'
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              value={password}
              onReset={onPasswordReset}
              autoComplete="off"
              className={`form-control ${passwordHasError && 'is-invalid'} ${passwordIsValid && 'is-valid'}`}
            />
            {passwordHasError && passwordMessages && passwordMessages.map((msg, key) => (<div key={key} className="invalid-feedback">{msg.text}</div>))}
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id='confirm_password'
              onChange={onPasswordConfirmChange}
              onBlur={onPasswordConfirmBlur}
              value={passwordConfirm}
              onReset={onPasswordConfirmReset}
              autoComplete="off"
              className={`form-control ${passwordConfirmHasError && 'is-invalid'} ${passwordConfirmIsDirty && passwordConfirmIsValid && 'is-valid'}`}
            />
            {passwordConfirmHasError && passwordConfirmMessages && passwordConfirmMessages.map((msg, key) => (<div key={key} className="invalid-feedback">{msg.text}</div>))}
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              cols="30" rows="10"
              onChange={onDescriptionChange}
              onBlur={onDescriptionBlur}
              value={description}
              onReset={onDescriptionReset}
              autoComplete="off"
              className={`form-control ${descriptionHasError && 'is-invalid'} ${descriptionIsDirty && descriptionIsValid && 'is-valid'}`}
            ></textarea>
            {descriptionHasError && descriptionMessages && descriptionMessages.map((msg, key) => (<div key={key} className="invalid-feedback">{msg.text}</div>))}
          </div>
          <div className="mb-3">
            <select
              onChange={onChoicesChange}
              onBlur={onChoicesBlur}
              defaultValue={choices}
              onReset={onChoicesReset}
              autoComplete="off"
              className={`form-select ${choicesHasError && 'is-invalid'} ${choicesIsDirty && choicesIsValid && 'is-valid'}`}
            >
              <option value=''>Select</option>
              <option value="value1">One</option>
              <option value="value2">Two</option>
              <option value="value3">Three</option>
            </select>
            {choicesHasError && choicesMessages && choicesMessages.map((msg, key) => (<div key={key} className="invalid-feedback">{msg.text}</div>))}
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="confirm"
              onChange={onAcceptedChange}
              value={accepted}
              onReset={onAcceptedReset}
              autoComplete="off"
              className={`form-check-input ${acceptedHasError && 'is-invalid'} ${acceptedIsValid && 'is-valid'}`}
            />
            <label className="form-check-label" htmlFor="confirm">
              Accept terms
            </label>
            {acceptedHasError && acceptedMessages && acceptedMessages.map((msg, key) => (<div key={key} className="invalid-feedback">{msg.text}</div>))}
          </div>
          <button disabled={!formIsValid} type="submit" className={`btn btn-primary btn-lg ${!formIsValid && 'btn-not-allowed'}`}>Save</button>
        </form>
      </div>
    </div>
  )
}
