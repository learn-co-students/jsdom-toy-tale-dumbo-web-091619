let addToy = false
let toyCollectionDiv = document.querySelector('#toy-collection')
// let addNewToyForm = document.querySelector('.add-toy-form')

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        // console.log(e)
        postToy(e.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })
  
})


function getToys(){

  return fetch(`http://localhost:3000/toys`)
  .then(res => res.json())
}


function renderToys(toy){
  let toyDiv = document.createElement('div')
  let toyName = document.createElement('h2')
  let toyImage = document.createElement('img')
  let toyLikes = document.createElement('p')
  let toyLikebutton = document.createElement('button')

  toyDiv.className = "card"

  toyName.innerText = toy.name

  toyImage.src = toy.image 
  toyImage.className = "toy-avatar"

  toyLikes.innerText = `${toy.likes} likes` 

  toyLikebutton.className = "like-btn"
  toyLikebutton.innerText = "Like"
  toyLikebutton.id = toy.id

  toyDiv.append(toyName,toyImage,toyLikes,toyLikebutton)

  toyCollectionDiv.append(toyDiv)

  toyLikebutton.addEventListener('click',(evt) => {
  //  console.log(evt.target)
  //  toyLikes.innerText = parseInt(evt.target.previousElementSibling.innerText)+1 
   likeToy(evt)
  })
}



function postToy(evt){
  
  let userToyName = evt["name"].value
  let userToyImage = evt["image"].value
 
  fetch(`http://localhost:3000/toys`, {
    method:'POST',
   headers: { 
       'Content-type': 'application/json'
   },
   body: JSON.stringify({
     name:userToyName,
     image:userToyImage,
     likes: 0
    })
  })
  .then(res => res.json())
  .then((toy) => {
    renderToys(toy)
  })
  
}

function likeToy(evt){
  //  console.log(evt.target)
    let likeIncrease = parseInt(evt.target.previousElementSibling.innerText)+1
    // let likeIncrease = parseInt(evt.target.previousElementSibling.innerText)
    // console.log(likeIncrease)
   fetch(`http://localhost:3000/toys/${evt.target.id}`, {
     method:'PATCH',
    headers: { 
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
      likes:likeIncrease
     })
   })
   .then(res => res.json())
   .then((toy) => {

    evt.target.previousElementSibling.innerText = `${toy.likes} likes`

  })
}




getToys().then((toyArr) => {
  toyArr.forEach(renderToys)
})

