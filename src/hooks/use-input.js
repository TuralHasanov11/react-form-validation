import { useReducer } from "react"
import { messages as validationMessages } from "../data/validation-messages"

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, touched: state.touched }
    case "BLUR":
      return { value: state.value, touched: true }
    case "RESET":
      return { value: "", touched: false }
    default:
      break;
  }

  return {
    value: "",
    touched: false
  }
}

export const validations = {
  required: value => { return value && value !== '' },
  nullable: value => { return !value || value.trim().length >= 0 },
  email: value => { return value && value.includes('@') },
  sameAs: (value, value2) => { return value === value2 },
  minLength: (value, value2) => { return value && (value.length >= value2) },
  isArray: value => Array.isArray(value),
  isInteger: value => !Number.isNaN(value),
  min: (value, value2) => !Number.isNaN(value) && Number.parseInt(value) >= value2,
  max: (value, value2) => !Number.isNaN(value) && Number.parseInt(value) <= value2,
  between: (value, [value1, value2]) => !Number.isNaN(value) && Number.parseInt(value) >= value1 && Number.parseInt(value) <= value2,
  boolean: value => value === true || value === false,
}


export const useInput = ({ rules, initialState }) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, { value: initialState ? initialState : '' })

  let messages = []

  function validateValue(value, rules) {
    if (value === undefined) {
      return false
    }

    let isValid = true

    for (const index in rules) {
      if (validations[index](value, rules[index])) {
        messages = messages.filter(el => el.type !== index) && []
      } else {
        messages.push({ type: index, text: validationMessages[index](rules[index]) })
        isValid = false
      }
    }

    return isValid
  }

  const inputIsValid = validateValue(inputState.value, rules)

  const hasError = !inputIsValid && inputState.touched

  const isDirty = inputState.touched

  function inputChange(event) {
    if (event.target.type === "checkbox") {
      dispatch({ type: "INPUT", value: event.target.checked })
    } else {
      dispatch({ type: "INPUT", value: event.target.value })
    }
  }

  function inputBlur() {
    dispatch({ type: "BLUR" })
  }

  function inputReset() {
    dispatch({ type: "RESET" })
  }

  return {
    value: inputState.value,
    isValid: inputIsValid,
    hasError,
    isDirty,
    inputChange,
    inputBlur,
    inputReset,
    messages
  }
}