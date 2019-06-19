var form = document.querySelector('#material-form')
var select = document.querySelector('#categoriesSelect')
var materialName = document.querySelector('#materialName')
var materialURL = document.querySelector('#materialURL')
var materialFile = document.querySelector('#materialFile')
var errorMessage = document.querySelector('#errorMessage');

var categoriesURL = firebase.firestore().collection('/categories')
var FBmaterialsURL = firebase.firestore().collection('/materials')

function loadData(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    var value = doc.data().value
    select.innerHTML += `
      <option value=${value}> ${value} </option>
    `
  });
}

function saveMaterial(material) {
  return FBmaterialsURL
    .add(material)
    .then(function() {
      window.location.replace(location.origin + "/materials");
    })
}

function sendForm(ev) {
  ev.preventDefault();
  errorMessage.innerText = ''

  if(!materialName.value) {
    errorMessage.innerText = 'Nazwa materiału nie może być pusta'
    return;
  }

  var material = {
    name: materialName.value,
    category: categoriesSelect.value 
  };

  if(materialURL.value) {
    material.url = materialURL.value
  }

  var file = materialFile.files[0]

  if(file && file.name) {
    return firebase
      .storage()
      .ref()
      .child(file.name)
      .put(file)
      .then(function(res) {
        return res.ref.getDownloadURL()
      })
      .then(function(fileURL) {
        material.fileURL = fileURL
        return saveMaterial(material)
      })

  }
  saveMaterial(material)
}

categoriesURL.get().then(loadData);
form.addEventListener('submit', sendForm);