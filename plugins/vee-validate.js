import {extend, setInteractionMode} from 'vee-validate'
import {required, email, min, numeric} from 'vee-validate/dist/rules'

setInteractionMode('lazy')

// export default ({ i18n }, inject) => {
extend('required', {
  ...required,
  message: () => {
    return 'Ce champ est requis'
  }
})

extend('min', {
  ...min,
  params: ['length'],
  message: (value, length) => {
    return 'errors.min'
  }
})

extend('email', {
  ...email,
  message: () => {
    return 'adresse mail incorret'
  }
})


extend('password', {
  params: ['pass1'],
  validate (value, pass1) {
    if (value === pass1.pass1) {
      return true
    }
    return false
  },
  message: () => {
    return 'Ce champ est requis'
  }
})
extend('numeric', {
  ...numeric,
  message: () => {
    return 'errors.numeric'
  }
})
// }
