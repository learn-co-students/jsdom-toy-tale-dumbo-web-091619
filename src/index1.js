let addToy = false
let allToys = []


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let toyDiv = document.querySelector("#toy-collection")
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
loadPage()
  //puts backend on screen during loading
function loadPage(){
  fetch(`http://localhost:3000/toys`)
.then(res => res.json())
.then(toyArr => toyArr.forEach(jsonToHtml))}

//helper method

function jsonToHtml(toy){
let div = document.createElement("div")
div.className = "card"
div.innerHTML +=
`<h2>${toy.name}</h2>
<img src=${toy.image} class="toy-avatar" />
<p id="p${toy.id}">${toy.likes} Likes </p>
<button class="like-btn">Like <3</button>`

   //adding like button in helper method
  let likeButton = div.querySelector(".like-btn")
  likeButton.addEventListener("click", function(e){
    toy.likes = toy.likes + 1
    addLikes(e, toy)
  })
  toyDiv.append(div)
  //end of helper method below
} 

function addLikes(e, toy){
 let ptag = document.querySelector(`#p${toy.id}`)
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


// add toy button
toyForm.addEventListener("submit", function(e){
  e.preventDefault()
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }), 
    headers: {
      'Content-Type': 'application/json'
    }}
    ).then(res => res.json())
    .then(obj => jsonToHtml(obj))

  }

//end of toy button listener below
)



  //ends domcontentloaded below
})
