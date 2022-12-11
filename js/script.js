const inputsEle = document.querySelectorAll('input')
const emailEle = document.querySelector('#email')
const formEle = document.querySelector('form')

const addInfoError = (target, text) => {
  // create error info element
  const p = document.createElement('p')
  const pText = document.createTextNode(text)
  p.appendChild(pText)
  p.setAttribute('class', 'error-info')

  return target.parentNode.appendChild(p, target)
}

const addIconError = (target) => {
  // create img icon element
  const img = document.createElement('img')
  img.setAttribute('class', 'icon')
  img.setAttribute('src', './images/icon-error.svg')
  img.setAttribute('alt', 'icon-error')

  target.parentNode.insertBefore(img, target)
}

// check email valid
const isEmailValid = (email) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (email.match(mailFormat)) {
    return (true)
  }
  return (false)
}

inputsEle.forEach(input => {
  input.addEventListener('focusout', (e) => {
    const iconsEle = e.target.parentElement.querySelectorAll('.icon')
    const errorInfoEle = e.target.parentElement.querySelectorAll('.error-info')
    const placeholderText = e.target.placeholder

    if (e.target.value.trim() === '') {
      e.target.classList.add('error')

      // append icon one time
      if (iconsEle.length === 0) addIconError(e.target)

      // append text error
      if (errorInfoEle.length === 0) {
        e.target.classList.add('mb-0')
        addInfoError(e.target, `${placeholderText} cannot be empty`)
      }
    }
  })

  input.addEventListener('input', (e) => {
    const iconEle = e.target.parentElement.querySelector('.icon')
    const errorInfoEle = e.target.parentElement.querySelector('.error-info')

    // if element of error appear
    if (iconEle) iconEle.remove()
    if (errorInfoEle) errorInfoEle.remove()

    e.target.classList.remove('mb-0', 'error')

    if (e.target.value.length > 0) {
      e.target.classList.add('success')
    }
  })
})

emailEle.addEventListener('change', (e) => {
  if (!isEmailValid(emailEle.value)) {
    console.log('email salah format')      
    e.target.classList.add('error', 'mb-0')
    addInfoError(e.target, 'Looks like this is not an email')
    addIconError(e.target)
  }
})
