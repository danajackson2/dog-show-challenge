getDogs()
let selDog = {}

//Fetches
function getDogs(){
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => renderDogs(data))
}

function editDog(e){
    e.preventDefault()
    fetch(`http://localhost:3000/dogs/${selDog.id}`, {
        method: 'PATCH',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({
            name: e.target.querySelectorAll('input')[0].value,
            breed: e.target.querySelectorAll('input')[1].value,
            sex: e.target.querySelectorAll('input')[2].value
        })
    })
    .then(() => getDogs())
}

//DOM Changes
function renderDogs(dogs){
    let table = document.querySelector('table')
    document.querySelectorAll('table tr.dog-row').forEach(row => row.remove())
    dogs.forEach(dog => {
        let name = document.createElement('td')
        name.textContent = dog.name
        let breed = document.createElement('td')
        breed.textContent = dog.breed
        let sex = document.createElement('td')
        sex.textContent = dog.sex
        let edit = document.createElement('td')
        let btn = document.createElement('button')
        btn.textContent = 'edit'
        btn.addEventListener('click', () => populateForm(dog))
        edit.appendChild(btn)
        let row = document.createElement('tr')
        row.className = "dog-row"
        row.append(name, breed, sex, edit)
        table.appendChild(row)
    })
}

//Event Handlers
function populateForm(dog){
    selDog = dog
    let form = document.querySelector('form')
    form.querySelectorAll('input')[0].value = dog.name
    form.querySelectorAll('input')[1].value = dog.breed
    form.querySelectorAll('input')[2].value = dog.sex
}

//EventListeners
document.querySelector('form').addEventListener('submit', editDog)