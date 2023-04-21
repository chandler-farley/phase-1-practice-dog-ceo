console.log('%c HI', 'color: firebrick')
// handle images
fetch('https://dog.ceo/api/breeds/image/random/4')
.then(res => res.json())
.then(obj => {
    // console.log(obj.message)
    let imgList = document.getElementById("dog-image-container")
    obj.message.forEach(element => {
        let pic = document.createElement("img")
        pic.src = element
        let lineBr = document.createElement('br')
        imgList.appendChild(pic)
        pic.after(lineBr)
    });
})

// handle dog breed list
let dogLis = []
let breedList = document.getElementById("dog-breeds")

async function fetchDogBreeds() {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const json = await res.json();
    Object.entries(json.message).forEach(([key, value]) => {
        let breed = document.createElement("li");
        breed.textContent = key
        breedList.appendChild(breed)
        if (value.length > 0) {
            let subBreedList = document.createElement("ul")
            breed.appendChild(subBreedList)
            value.forEach(e => {
                let subBreed = document.createElement("li")
                subBreed.textContent = e
                subBreedList.appendChild(subBreed)
            })
        }
        dogLis.push(breed)
    })
}

async function init() {
    await fetchDogBreeds();
}
init()

// handle dropdown
let dropdown = document.getElementById("breed-dropdown")

dropdown.addEventListener('change', e => {
    dogLis.forEach(dog => dog.style.display = "none")
    let result = dogLis.filter(dog => dog.textContent.startsWith(e.target.value))
    result.forEach(dogOut => dogOut.style.display = "list-item")
})

let rstBtn = document.createElement("button")
rstBtn.textContent = "reset filter"
rstBtn.style.margin = "0px 10px"
dropdown.after(rstBtn)

rstBtn.addEventListener('click', function() {
    dogLis.forEach(dog => dog.style.display = "list-item")
})

// change color of breed text
document.getElementById("dog-breeds").addEventListener('click', e => {
    if (e.target.style.color === "") {
        e.target.style.color = "green"
    }
    else {
        e.target.style.color = ""
    }
})
