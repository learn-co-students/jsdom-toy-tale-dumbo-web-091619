let addToy = false

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const addToyForm = document.querySelector('.add-toy-form')

  fetch('http://localhost:3000/toys') //eslint-disable-line
    .then(response => response.json())
    .then(renderToys)

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  addToyForm.addEventListener('submit', event => {
    const toyCollectionDiv = document.querySelector('#toy-collection')
    event.preventDefault()
    submitPostForForm(event.target)
      .then(toy => insertToyIn(toyCollectionDiv, toy))
  })
})
/* ------------------------------ helper functions ------------------------------  */
function renderToys (toys) {
  const toyCollectionDiv = document.querySelector('#toy-collection')
  for (const toy of toys) {
    insertToyIn(toyCollectionDiv, toy)
  }
}

function insertToyIn (container, toy) {
  const cardDiv = createAndAppendElementIn('div', container, element => { element.className = 'card' })
  createAndAppendElementIn('h2', cardDiv, element => { element.innerText = toy.name })
  createAndAppendElementIn('img', cardDiv, element => { imgConfig(element, toy) })
  createAndAppendElementIn('p', cardDiv, element => { likeParagraphConfig(element, toy) })
  createAndAppendElementIn('button', cardDiv, element => { likeButtonConfig(element, toy) })
}

function createAndAppendElementIn (tagName, parent, callback) {
  const element = document.createElement(tagName)
  parent.append(element)
  if (callback !== undefined) { callback(element) }
  return element
}

function imgConfig (element, toy) {
  element.src = toy.image
  element.className = 'toy-avatar'
}

function likeParagraphConfig (element, toy) {
  element.innerText = toy.likes
  element.id = `like-for-${toy.id}`
}

function likeButtonConfig (element, toy) {
  element.innerText = 'Like'
  element.className = 'like-btn'
  element.dataset.toyId = toy.id
  element.dataset.likeCount = toy.likes
  addListenerToButton(element)
}

function submitPostForForm (form) {
  const name = form.name.value
  const imageURL = form.image.value
  const config = newToyConfig(name, imageURL)
  return fetch ('http://localhost:3000/toys', config) // eslint-disable-line
    .then((response) => response.json())
}

function newToyConfig (name, image) {
  return {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json' // eslint-disable-line
    },
    body: JSON.stringify({
      likes: 0,
      name: name,
      image: image
    })
  }
}

function addListenerToButton (button) {
  button.addEventListener('click', e => {
    const toyId = e.target.dataset.toyId
    const likeCount = parseInt(e.target.dataset.likeCount)
    updateCountForToyWithId(toyId, likeCount).then(json => { updateDOMCountFor(json.id, json.likes, button) })
  })
}

function updateCountForToyWithId (id, count) {
  const config = updateLikeConfig(count + 1)
  return fetch(`http://localhost:3000/toys/${id}`, config) // eslint-disable-line
    .then(respone => respone.json())
}

function updateLikeConfig (count) {
  return {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: count + 1
    })
  }
}

function updateDOMCountFor (id, likes, button) {
  const paragraph = document.querySelector(`#like-for-${id}`)
  paragraph.innerText = likes
  button.dataset.likeCount = likes
}
