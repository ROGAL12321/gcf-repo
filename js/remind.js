var email = document.querySelector('#email');
var remindForm = document.querySelector('#remind-form')
var errorMessage = document.querySelector('#errorMessage')

function submitForm(ev) {
  ev.preventDefault();
  errorMessage.innerText = ''
  
  if(!email.value) {
    errorMessage.innerText = 'Pole e-mail nie może być puste'
    return;
  }

  firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .catch(function() {
      errorMessage.innerText = 'Wystąpił błąd'
    })
}

remindForm.addEventListener('submit', submitForm)

