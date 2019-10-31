let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const form = document.querySelector(".add-toy-form")
  const toyCollection = document.querySelector('#toy-collection')

  // * `h2` tag with the toy's name
  // * `img` tag with the `src` of the toy's image attribute and the class name "toy-avatar"
  // * `p` tag with how many likes that toy has
  // * `button` tag with a class "like-btn"


  function appendToy(toy){
    // create card div
    let card = document.createElement("div")
    card.className = 'card'
    card.dataset.id=toy.id

    // create name header
    let toyName = document.createElement("h2")
    toyName.innerText = toy.name
    // append header to card
    card.appendChild(toyName)

    // create image
    let toyImg = document.createElement("img")
    toyImg.className = "toy-avatar"
    toyImg.src = toy.image
    //append image to card
    card.appendChild(toyImg)
    
    // create likes string
    let toyLikes = document.createElement("p")
    let likes = toy.likes
    toyLikes.innerText = `${likes}`
    // append likes to card
    card.appendChild(toyLikes)

    // create like button
    let likeButton = document.createElement("button")
    likeButton.className = 'like-button'
    likeButton.innerText = "Like Me!"
    card.appendChild(likeButton)


    // append card to container
    toyCollection.appendChild(card)
  }



  
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then((newToy)=>{
    console.log(newToy)
    newToy.forEach(toy =>{
      appendToy(toy)
    })
    addLikeListeners()
  })

  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      newToy()
    } else {
      toyForm.style.display = 'none'
    }
  })

  function newToy(){
  if (form){
  form.addEventListener("submit", (e)=>{
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
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/toys', configObj)
    .then(response => response.json())
    .then((json)=>{
      (json)
    })
  })}
  }

  // * Conditional increase to the toy's like count
  // * A patch request sent to the server at `http://localhost:3000/toys/:id` updating the number of likes that the specific toy has
  // * Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)
  
  function addLikeListeners(){
    let likeButts = toyCollection.getElementsByClassName("like-button")
    for (let button of likeButts){
      let id = button.parentElement.dataset.id
      let like = button.previousElementSibling
      let likeCount = parseInt(like.innerText)

         button.addEventListener("click", (event)=>{
          likeCount++
          // console.log(likeCount)
          fetch('http://localhost:3000/toys/' + id,{ 
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
        "likes": likeCount
      })
    })
          .then(response => response.json())
          .then(updatedCard =>{
            button.previousElementSibling.innerText = likeCount
            console.log(updatedCard)
          })
        })
      }
    
}


})
