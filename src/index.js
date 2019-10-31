let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
	const addBtn = document.querySelector('#new-toy-btn')
	const toyForm = document.querySelector('.container')
	const toy_container = document.querySelector("#toy-collection")

//READ TOYS
	fetch('http://localhost:3000/toys')
	.then(response => response.json())
	.then((response_object) => {
		response_object.forEach(toy => {
			create_HTML(toy)
		})
	})

	addBtn.addEventListener('click', () => {
		addToy = !addToy
		if (addToy) {
			toyForm.style.display = 'block'
		} else {
			toyForm.style.display = 'none'
		}
	})

//CREATE TOY
	toyForm.addEventListener('submit', (event) => {
		event.preventDefault()

		fetch("http://localhost:3000/toys", {
			method: "POST",
			body: JSON.stringify({
				name: event.target.name.value,
				image: event.target.image.value,
				likes: 0
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then((json_object) => {
			create_HTML(json_object)
		})
	})

//UPDATE LIKES
	function add_likes(toy_info){
		let toy_div = document.querySelector(`#toy${toy_info.id}`)
		let toy_div_p = toy_div.querySelector('p')

		toy_div.addEventListener('click', (event) => {
		event.preventDefault()
			fetch(`http://localhost:3000/toys/${toy_info.id}`, {
				method: "PATCH",
				headers:
					{
					'Content-Type': 'application/json',
					'Accept': 'application/json'
					},
				body: JSON.stringify
					({
					likes: toy_info.likes +=  1
					})
				})
			toy_div_p.innerText = `${toy_info.likes} Likes`
		})
	}

//HELPERS
	function create_HTML(toy_info){
		let toy_card = document.createElement("div")
		let toy_img = document.createElement("img")

		toy_card.id = `toy${toy_info.id}`
		toy_card.className = "card"

		toy_card.innerHTML +=
		`<h2>${toy_info.name}</h2>
	    <img src=${toy_info.image} class="toy-avatar" />
	    <p>${toy_info.likes} Likes </p>
	    <button class="like-btn">Like <3</button>`

		toy_container.append(toy_card)

		add_likes(toy_info)
	}

})
