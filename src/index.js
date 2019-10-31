// let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toysArray =>{
    toysArray.forEach( toy => { addToy(toy) })
  })


  addBtn.addEventListener('click', addToy)

})

function addToy(toy){

  let parentDiv = document.querySelector("#collection")
  let div = document.createElement("div")
  // div.classList("card")
  div.className = "card"
  let h2 = document.createElement("h2")
  h2.innerText = toy.name
  let img = document.createElement("img")
  img.src = `${toy.image}`
  img.className = "toy-avatar"
  let p = document.createElement("p")
  p.innerText= "Likes"
  let button = document.createElement("button")
  button.innerText = toy.likes
  button.className = "like-btn";
   parentDiv.append(div)
  div.append(h2)
  div.append(img)
  div.append(p)
  div.append(button)
  
  // <div class="card">
  //   <h2>(title from json) = Woody</h2>
  //   <img src=toy_image_url =(image source)json class="toy-avatar" />
  //   <p>4 Likes (likes from json)</p>
  //   <button class="like-btn">Like <3</button>
  // </div>
}