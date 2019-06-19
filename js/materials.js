var tbody = document.querySelector('#tbody');
var materialsURL = firebase.firestore().collection('/materials')

function deleteItem(event) {
  event.preventDefault();
  
  if(event.target.id === 'deleteBtn') {
    var id = event.target.dataset.id;
    materialsURL
      .doc(id)
      .delete()
      .then(function() {
        event.target.parentElement.parentElement.remove();
      });
  }
}

function loadData(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    var materialName = doc.data().name
    var category = doc.data().category
    tbody.innerHTML += `
      <tr>
        <td>${materialName}</td>
        <td>${category}</td>
        <td>
          <a href="addmaterials?${doc.id}"><button class="tableBtn"> Edytuj </button> </a>
          <button class="tableBtn" data-id=${doc.id} id="deleteBtn"> Usuń </button> 
        </td>
      </tr>`
  });
}

console.log(location)

materialsURL.get().then(loadData);
tbody.addEventListener('click', deleteItem)