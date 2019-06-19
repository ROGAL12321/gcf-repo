var email = document.querySelector('#email');
var password = document.querySelector('#password');
var loginForm = document.querySelector('#login-form')

var passwordMessage = document.querySelector('#passwordMessage')
var errorMessage = document.querySelector('#errorMessage')

function submitForm(ev) {
  ev.preventDefault();
  errorMessage.innerText = ''
  passwordMessage.innerText = ''

  var errors = false;

  if(!email.value) {
    errorMessage.innerText = 'Pole e-mail nie może być puste'
    errors = true
  }
  if(!password.value && password.value.length > 5) {
    passwordMessage.innerText = 'Pole Hasło nie może być puste i musi zawierać minimum 6 znaków' 
    errors = true
  }

  if(errors) return

  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(function() {
      window.location.replace(location.origin + "/dashboard");
    })
    .catch(function() {
      errorMessage.innerText = 'Nie ma użytkownika o tym adresie e-mail.'
    })
}

loginForm.addEventListener('submit', submitForm)