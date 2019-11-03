let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const allToys = document.querySelector("#toy-collection")

// DELIVERABLES


// Fetch and render all toys (READ)
  fetch(`http://localhost:3000/toys`)
  // Turn into json obj
  .then((r) => r.json())
  // Add objects to DOM
  .then((toysArray) => {
    // console.log(toysArray)
    toysArray.forEach(toy => {
      // debugger
      renderToy(toy)
    });
  })


// Create a new toy (CREATE)
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener("submit", event => {
        event.preventDefault()
        console.log(event)
        createToy(event.target)
        // debugger
      })
    } else {
      toyForm.style.display = 'none'
    }
  })


// HELPER FUNCTIONS

  // Helper function to render toy objects
  function renderToy(toy){
    // h2 element
    let h2Tag = document.createElement("h2")
    h2Tag.innerText = toy.name

    // img element
    let img = document.createElement("img")
    img.setAttribute("src", toy.image)
    img.setAttribute("class", "toy-avatar")

    // p element
    let p = document.createElement("p")
    p.innerText = `${toy.likes} likes`

    // button element
    let button = document.createElement("button")
    button.setAttribute("class", "like-btn")
    button.setAttribute("id", toy.id)
    button.innerText = `like`
    // add an event listener to the like button
    button.addEventListener("click", (event) => {
      console.log(event)
      // debugger
      // call likeToy helper function on liked attr
      likeToy(event)
    })

    //  divCard element
    let divCard = document.createElement("div")
    divCard.setAttribute("class", "card")

    // append individual elements to an individual divCard
    divCard.append(h2Tag, img, p, button)

    // append individual divCards to allToys
    allToys.append(divCard)
  }



    // CreateToy helper function
  function createToy(newToyInfo) { 
    // debugger
    // Do a fetch "POST" to toys index to create toy
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": newToyInfo.name.value,
        "image": newToyInfo[1].value,
        "likes": 0
      })
    })
    
    // Pessimistcally manipulate DOM to render created obj
    .then(r => r.json())
    .then((createdToy) => {
      // console.log(createdToy)
      renderToy(createdToy)
      // debugger
    })

  }


    // likeToy helper function
    function likeToy(event) {

      let newLikecount = parseInt(event.target.previousElementSibling.innerText) + 1

      fetch(`http://localhost:3000/toys/${event.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": newLikecount
        })
      })
      .then(r => r.json())
      .then((newLikesObj) => {
        console.log(newLikesObj)
        event.target.previousElementSibling.innerText = `${newLikecount} likes`        
      })


    }
  })
  
  
  
  
  
  
  

