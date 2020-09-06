
// email: {
//   value: '',
//       type: 'email',
//       label: 'Email',
//       errorMessage: 'Введите корректный e-mail',
//       valid: false,
//       touched: false,
//       validation: {
//     required: true,
//         email: true
//   }

export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


export function validate(value, validation) {

  if (!validation) {
    return true
  }

  let isValid = true

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.email) {
    isValid =  validateEmail(value)
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid
  }

  return isValid
}

export  function validateForm(formControls) {

  let isFormValid = true
  for(let control in formControls) {
    if(formControls.hasOwnProperty(control))
      isFormValid = formControls[control].valid && isFormValid
  }

  return isFormValid;
}