let addToy = false
let allToys = []


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector("#toy-collection")

  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

   

pageLoad()

function pageLoad(){
fetch(`http://localhost:3000/toys`)
.then(res => res.json())
.then(toyArr => toyArr.forEach(objToHtml))
//end of pageload  
}

function objToHtml(toy){
  let div = document.createElement("div")
  div.className = "card"
  div.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p id="p${toy.id}">${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
  
  
  let likeButton = div.querySelector(".like-btn")
  
      likeButton.addEventListener("click", function(e){
        toy.likes = toy.likes + 1
      
       addLikes(e, toy)
        
      }
       //endof like listener
      )
      toyCollection.append(div)
//end of objhtml
}

function addLikes(e, toy){
  ptag = document.querySelector(`#p${toy.id}`)
  ptag.innerText = `${toy.likes} Likes `
  fetch(`http://localhost:3000/toys/${toy.id}`, {
   method: 'PATCH', 
   body: JSON.stringify({
     likes: toy.likes
 
   }),
   headers: {
     'Content-Type': 'application/json'
   }
 } 
 
  //end of patch fetch
  )
  
 
  //end of addlikes
 }



toyForm.addEventListener("submit", function(e){
  let name = e.target.name.value
  let image = e.target.image.value
    e.preventDefault()
    fetch(`http://localhost:3000/toys`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        image,
        likes: 0

      }), 
      headers: {
        'Content-Type': 'application/json'
      }


    }).then(res => res.json())
    .then(obj => objToHtml(obj))
  
}
//end of toyform eventlistner
)
//end of domcontenloaed
})
