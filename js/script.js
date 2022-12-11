const inputsEle = document.querySelectorAll('input')
const emailEle = document.querySelector('#email')

const isEmailValid = (email) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (email.match(mailFormat)) {
    return (true)
  }
  return (false)
}

inputsEle.forEach(input => {
  input.addEventListener('focusout', (e) => {
    const iconEle = e.target.parentElement.querySelectorAll('.icon')
    const errorInfoEle = e.target.parentElement.querySelectorAll('.error-info')
    const placeholderText = e.target.placeholder

    // create img icon element
    const img = document.createElement('img')
    img.setAttribute('class', 'icon')
    img.setAttribute('src', './images/icon-error.svg')
    img.setAttribute('alt', 'icon-error')

    // create error info element
    const p = document.createElement('p')
    const pText = document.createTextNode(`${placeholderText} cannot be empty`)
    p.appendChild(pText)
    p.setAttribute('class', 'error-info')

    if (e.target.value.trim() === '') {
      e.target.classList.add('error')

      // append icon one time
      if (iconEle.length === 0) e.target.parentNode.insertBefore(img, e.target)

      // append text error
      if (errorInfoEle.length === 0) {
        e.target.classList.add('mb-0')
        e.target.parentNode.appendChild(p, e.target)
      }
    }
  })

  input.addEventListener('input', (e) => {
    const iconEle = e.target.parentElement.querySelector('.icon')
    const errorInfoEle = e.target.parentElement.querySelector('.error-info')
    const emailEle = document.querySelector('#email')

    // if element of error appear
    if (iconEle) iconEle.remove()
    if (errorInfoEle) errorInfoEle.remove()

    e.target.classList.remove('mb-0', 'error')
    
  })
})

function addInfoError(target) {
  const p = document.createElement('p')
  const pText = document.createTextNode(`email salah`)
  p.appendChild(pText)
  p.setAttribute('class', 'error-info')

  return target.parentNode.appendChild(p, target)
}

emailEle.addEventListener('change', (e) => {
  if (!isEmailValid(emailEle.value)) {
    console.log('email salah format')      
    e.target.classList.add('error')
    addInfoError(e.target)
  }
  console.log(e.target)
})
