let addToy = false;

document.addEventListener("DOMContentLoaded", ()=>{

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector('#toy-collection')
  const formT = document.querySelector('.add-toy-form')

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(newToy){
      newToy.forEach(function(newToy){
        appendToy(newToy)
      })
      addLikeListener()
    })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      formTrue()
    } else {
      toyForm.style.display = 'none'
    }
  })


  function formTrue(){
    if(formT){
    formT.addEventListener('submit', function(e){
      e.preventDefault()
      let newToyName = e.target.name.value
      let newToyImg = e.target.image.value


      let formData = {
        name: newToyName,
        image: newToyImg,
        likes: 0
      }

      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData) //parameters go here
      };

      fetch("http://localhost:3000/toys", configObj) //new obj goes here
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
          appendToy(json)
        })
    })
  }
}


  function appendToy(toy){
    let newDiv = document.createElement('div')
    newDiv.className = 'card';
    newDiv.dataset.id = toy.id

    let toyName = document.createElement('h2')
    toyName.innerText = toy.name;
    newDiv.append(toyName)
    toyCollection.append(newDiv)

    let toyImg = document.createElement('img')
    toyImg.src = toy.image
    toyImg.className = "toy-avatar"
    newDiv.append(toyImg)
    toyCollection.append(newDiv)

    let toyLikes = document.createElement('p')
    toyLikes.innerText = `${toy.likes}`
    newDiv.append(toyLikes)
    toyCollection.append(newDiv)

    let likeButton = document.createElement('button')
    likeButton.className = 'like-btn'
    likeButton.innerText = 'Like Me'
    newDiv.append(likeButton)
    toyCollection.append(newDiv)
    // addLikeListener()
  }

  function addLikeListener(){
  let likeButts = toyCollection.getElementsByClassName('like-btn')
  for(let button of likeButts){
  let id = button.parentElement.dataset.id
  let like = button.previousElementSibling
  let likeCount = parseInt(like.innerText)
    button.addEventListener('click', function(){
      likeCount++
      fetch("http://localhost:3000/toys/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": 'application/json',
          "Accept": "application/json"
        },
        body: JSON.stringify({
          'likes': likeCount
        })
      })
      .then(function(response){
        return response.json()
      }).then(function(json){
        button.previousElementSibling.innerText = likeCount
      })
    })
  }
}

})

// let num = parseInt(toy.likes)
// console.log(num+=1)
