var tbody = document.querySelector('#tbody');
var categoriesURL = firebase.firestore().collection('/categories')

function deleteItem(event) {
  event.preventDefault();
  
  if(event.target.id === 'deleteBtn') {
    var id = event.target.dataset.id;
    categoriesURL
      .doc(id)
      .delete()
      .then(function() {
        event.target.parentElement.parentElement.remove();
      });
  }
}

function loadData(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    var value = doc.data().value
    tbody.innerHTML += `
      <tr>
        <td>${value}</td>
        <td>
          <a href="addcategory?${doc.id}"><button class="tableBtn"> Edytuj </button> </a>
          <button class="tableBtn" data-id=${doc.id} id="deleteBtn"> Usuń </button> 
        </td>
      </tr>`
  });
}

categoriesURL.get().then(loadData);
tbody.addEventListener('click', deleteItem)