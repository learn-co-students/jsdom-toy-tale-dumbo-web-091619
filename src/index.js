// let addToy = false
// let toyCollectionDiv = document.querySelector('#toy-collection')
// // let addNewToyForm = document.querySelector('.add-toy-form')

// document.addEventListener("DOMContentLoaded", ()=>{
//   const addBtn = document.querySelector('#new-toy-btn')
//   const toyForm = document.querySelector('.container')
//   addBtn.addEventListener('click', () => {
//     // hide & seek with the form
//     addToy = !addToy
//     if (addToy) {
//       toyForm.style.display = 'block'
//       toyForm.addEventListener('submit',(e)=>{
//         e.preventDefault();
//         // console.log(e)
//         postToy(e.target)
//       })
//     } else {
//       toyForm.style.display = 'none'
//     }
//   })
  
// })


// function getToys(){
//   return fetch(`http://localhost:3000/toys`)
//   .then(res => res.json())
// }


// function renderToys(toy){
//   let toyDiv = document.createElement('div')
//   let toyName = document.createElement('h2')
//   let toyImage = document.createElement('img')
//   let toyLikes = document.createElement('p')
//   let toyLikebutton = document.createElement('button')

//   toyDiv.className = "card"

//   toyName.innerText = toy.name

//   toyImage.src = toy.image 
//   toyImage.className = "toy-avatar"

//   toyLikes.innerText = `${toy.likes} likes` 

//   toyLikebutton.className = "like-btn"
//   toyLikebutton.innerText = "Like"
//   toyLikebutton.id = toy.id

//   toyDiv.append(toyName,toyImage,toyLikes,toyLikebutton)

//   toyCollectionDiv.append(toyDiv)

//   toyLikebutton.addEventListener('click',(evt) => {
//   //  console.log(evt.target)
//   //  toyLikes.innerText = parseInt(evt.target.previousElementSibling.innerText)+1 
//    likeToy(evt)
//   })
// }



// function postToy(evt){
  
//   let userToyName = evt["name"].value
//   let userToyImage = evt["image"].value
 
//   fetch(`http://localhost:3000/toys`, {
//     method:'POST',
//    headers: { 
//        'Content-type': 'application/json'
//    },
//    body: JSON.stringify({
//      name:userToyName,
//      image:userToyImage,
//      likes: 0
//     })
//   })
//   .then(res => res.json())
//   .then((toy) => {
//     renderToys(toy)
//   })
  
// }

// function likeToy(evt){
//    console.log(evt.target)
//     let likeIncrease = parseInt(evt.target.previousElementSibling.innerText)+1
//     // let likeIncrease = parseInt(evt.target.previousElementSibling.innerText)
//     // console.log(likeIncrease)
//    fetch(`http://localhost:3000/toys/${evt.target.id}`, {
//      method:'PATCH',
//     headers: { 
//         'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       likes:likeIncrease
//      })
//    })
//    .then(res => res.json())
//    .then((toy) => {

//     evt.target.previousElementSibling.innerText = `${toy.likes} likes`

//   })
// }




// getToys().then((toyArr) => {
//   toyArr.forEach(renderToys)
// })















// ==================2nd try==========Less dry =============================================

let addToy = false
let toyCollectionDiv = document.querySelector('#toy-collection')
let addToyButton = document.querySelector('.add-toy-form')

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})


fetch(`http://localhost:3000/toys`)
.then(r => r.json())
.then((toyArr) => {
  toyArr.forEach(toy => {
    
    renderToy(toy)

  });

})


function renderToy(toy){
    let toyDiv = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let pTag = document.createElement('p')  
    let likeButton = document.createElement('button')

    toyDiv.className = 'card'
    h2.innerText = toy.name 
    img.src = toy.image 
    img.className = "toy-avatar"
    pTag.innerText = `${toy.likes} likes`
    likeButton.className = 'like-btn'
    likeButton.innerText = "like"
    likeButton.id = `toy-like-btn${toy.id}`

    toyDiv.append(h2,img,pTag,likeButton)
    toyCollectionDiv.append(toyDiv)

    likeButton.addEventListener('click',(evt) => {

      let newLike = `${parseInt(pTag.innerText)+1}`
      // let newLike = `${parseInt(pTag.innerText)+1}`

      console.log(newLike)

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method:'PATCH',
       headers: { 
           'Content-type': 'application/json'
       },
       body: JSON.stringify({
         likes: newLike
        })
      })
      .then(r => r.json()) 
      .then((patchedToy) => {
        // console.log(toy)
        
        pTag.innerText = `${newLike} likes`

      })

    })
}


addToyButton.addEventListener('submit',(evt) => {
  evt.preventDefault()
  
  let newToyName = evt.target["name"].value
  let newToyimg = evt.target["image"].value 

  fetch(`http://localhost:3000/toys`, {
    method:'POST',
   headers: { 
       'Content-type': 'application/json'
   },
   body: JSON.stringify({
     name: newToyName,
     image: newToyimg,
     likes: 0
     
    })
  })
  .then(r => r.json())  
  .then((toy) => {
    renderToy(toy)
  })
  
})

// ========================================2nd try============================================

































