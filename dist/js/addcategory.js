var form = document.querySelector('#category-form');
var categoryName = document.querySelector('#categoryName');
var errorMessage = document.querySelector('#errorMessage')
var isEdit = !!location.search;
var categoriesURL = firebase.firestore().collection('categories')
var id = location.search.substring(1, 200)

function submitForm(ev) {
  ev.preventDefault();

  if(!categoryName.value) {
    errorMessage.innerText = 'Pole nie może być puste'
    return;
  }

  var category = {
    value: categoryName.value
  }

  var action = isEdit 
    ? categoriesURL.doc(id).set(category)
    : categoriesURL.add(category)
  
  action.then(function() {
    window.location.replace("categories.html");
  })
}

function loadCategory() {
  categoriesURL
    .doc(id)
    .get()
    .then(function(snap) {
      categoryName.value = snap.data().value
    })
}

if(isEdit) {
  loadCategory()
}

form.addEventListener('submit', submitForm)