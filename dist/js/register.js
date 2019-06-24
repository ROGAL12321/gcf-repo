var email = document.querySelector('#email');
var password = document.querySelector('#password');
var secondpassword = document.querySelector('#secondpassword');
var form = document.querySelector('#form')

var dataaccess = document.querySelector('#dataaccess')
var dataprocessing = document.querySelector('#dataprocessing')
var termsofuse = document.querySelector('#termsofuse')

var checkboxMessage = document.querySelector('#checkboxMessage') 
var passwordMessage = document.querySelector('#passwordMessage')
var errorMessage = document.querySelector('#errorMessage')

function submitForm(ev) {
  ev.preventDefault();

  errorMessage.innerText = ''
  passwordMessage.innerText = ''
  checkboxMessage.innerText = ''

  var errors = false;

  if(!email.value) {
    errorMessage.innerText = 'Pole e-mail nie może być puste'
    errors = true
  }
  if(password.value === '' || password.value !== secondpassword.value && password.length > 5) {
    passwordMessage.innerText = 'Hasła nie są identyczne. Dodatkowo pole Hasło nie może być puste i musi zawierać minimum 6 znaków'
    errors = true
  }
  if(!dataaccess.checked ||  !dataprocessing.checked || !termsofuse.checked) {
    checkboxMessage.innerText = 'Wypełnienie zgód jest wymagane'
    errors = true
  } 

  if(errors) return

  emailjs.send('default_service', 'template_rqlqseLC', { sendTo: email.value })

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(function() {
      window.location.replace("dashboard.html");
    })
    .catch(function() {
      errorMessage.innerText = 'Wystąpił błąd przy rejestracji'
    })
}

form.addEventListener('submit', submitForm)


