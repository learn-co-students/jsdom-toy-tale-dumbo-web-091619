let addToy = false

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector('#new-toy-btn')
    const toyForm = document.querySelector('.container')
    const toyCollection = document.querySelector("#toy-collection")
    const createToy = document.querySelector(".add-toy-form")
    const likeButton = document.querySelector(".like-btn")

    function initiateToy(toy) {
        let toyCard = document.createElement("div")
        toyCard.className = "card"

        let toyHeader = document.createElement("h2")
        toyHeader.innerText = toy.name
        toyCard.append(toyHeader)

        let toyImage = document.createElement("img")
        toyImage.src = toy.image
        toyImage.className = "toy-avatar"
        toyCard.append(toyImage)

        let toyLikes = document.createElement("p")
        toyLikes.innerText = `${toy.likes} Likes`
        toyCard.append(toyLikes)

        let likeButton = document.createElement("button")
        likeButton.dataset.id = toy.id
        likeButton.className = "like-btn"
        likeButton.innerText = "Like <3"
        toyCard.append(likeButton)

        let deleteButton = document.createElement("button")
        deleteButton.dataset.id = toy.id
        deleteButton.className = "delete-btn"
        deleteButton.innerText = "Delete"
        toyCard.append(deleteButton)
        
        toyCollection.append(toyCard)
    }

    addBtn.addEventListener('click', () => {
        // hide & seek with the form
        addToy = !addToy
        if (addToy) {
            toyForm.style.display = 'block'
        } else {
            toyForm.style.display = 'none'
        }
    })

    fetch("http://localhost:3000/toys")
        .then(r => r.json())
        .then(resObj => {
            resObj.forEach(toy => {
                initiateToy(toy)
            })
        })

    createToy.addEventListener("submit", event => {
        event.preventDefault()
        let toyName = event.target.name.value
        let toyImage = event.target.image.value
        // debugger

        fetch("http://localhost:3000/toys", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                "name": toyName,
                "image": toyImage,
                "likes": 0
            })

        })
            .then(r => r.json())
            .then(toy => {
                initiateToy(toy)
                createToy.reset()

            })
    })

    toyCollection.addEventListener("click", event => {
        // debugger
        let toyId = event.target.dataset.id
        if (event.target.className === "like-btn") {
            // debugge
            let toyLikes = event.target.previousElementSibling.innerText
            let newLike = parseInt(event.target.previousElementSibling.innerText) + 1
            fetch(`http://localhost:3000/toys/${toyId}`, {
                method: "PATCH",
                headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "likes": newLike
                })
            })
                .then(r => r.json())
                .then(data => {
                    // toyLikes = newLike
                    event.target.previousElementSibling.innerText = (parseInt(event.target.previousElementSibling.innerText) + 1) + " Likes"
                })

        }

        if (event.target.className === "delete-btn") {
            // debugger
            // let id
            let toyDiv = event.target.parentElement
            fetch(`http://localhost:3000/toys/${toyId}`, {
                method: "DELETE",
            })
                .then(r => r.json())
                .then(r => {
                    toyDiv.remove()
                })




        }
    })




})
