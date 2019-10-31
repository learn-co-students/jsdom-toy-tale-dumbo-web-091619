let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  // define element variables
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
    // SET CARD DATA-ID!
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
    // append like button to card
    card.appendChild(likeButton)


    // append card to container
    toyCollection.appendChild(card)
  }

  // fetch all toys
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then((newToy)=>{
    // append toys
    newToy.forEach(toy =>{
      appendToy(toy)
    })
    // add like listeners to like buttons on toy cards
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

  // add new toy to api
  function newToy(){
  // add conditional bc:
  // cannot add event listener to form if form is "add toy" button has not been clicked
  if (form){
  form.addEventListener("submit", (e)=>{
    // prevent form submission
    e.preventDefault()

    // get form values
    let newToyName = e.target.name.value
    let newToyImg = e.target.image.value

    // create formData object
    let formData = {
      name: newToyName,
      image: newToyImg,
      likes: 0
    }

    // create fetch configObj
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    // enact & parse fetch
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
    // collect all like buttons
    let likeButts = toyCollection.getElementsByClassName("like-button")
    // iterate over buttons 
    for (let button of likeButts){
      // get button id
      let id = button.parentElement.dataset.id
      // access like element
      let like = button.previousElementSibling
      // get like count and parse into integer
      let likeCount = parseInt(like.innerText)

        // attach click event handler to each like button 
         button.addEventListener("click", (event)=>{
           // if clicked, increase likeCunt by 1
          likeCount++
          // enact & parse fetch to patch likes: count in api
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
            // assign updated likeCount to innertext of like element
            button.previousElementSibling.innerText = likeCount
          })
        })
      }  
  }

})
