let fetchAddress = "https://rickandmortyapi.com/api/character"
let currentNum = 1

let currentSelection = "All"
let menu = document.querySelector(".menu")

menu.addEventListener("change", () => {
    currentSelection = menu.value
    loadSite()
})

async function loadSite() {

    document.querySelector(".container").innerHTML = ""
    async function getInfo() {
        let response = await fetch(fetchAddress)
        return await response.json()
    }

    let data = await getInfo()
    let container = document.querySelector(".container")

    data.results.forEach(card => {
        let newDiv = document.createElement("div")
        newDiv.classList.add("newdiv")

        let pfp = document.createElement("img")
        pfp.src = card.image
        pfp.alt = "Profile Picture"
        pfp.style.width = "100px"
        pfp.style.height = "100px"
        pfp.style.borderRadius = "99px"

        newDiv.append(pfp)

        let midCompartment = document.createElement("div")

        let name = document.createElement("h2")
        name.innerText = card.name

        let race = document.createElement("span")
        race.innerText = card.species

        midCompartment.append(name)
        midCompartment.append(race)
        newDiv.append(midCompartment)

        let status = document.createElement("span")
        status.innerText = `Status: ${card.status}`

        newDiv.append(status)

        if (currentSelection === "Alive") {
            if (card.status === "Alive") {
                container.append(newDiv)
            }
        }
        else if (currentSelection === "Dead") {
            if (card.status === "Dead") {
                container.append(newDiv)
            }
        }
        else if (currentSelection === "Unknown") {
            if (card.status === "unknown") {
                container.append(newDiv)
            }
        }
        else if (currentSelection === "All") {
            container.append(newDiv)
        }
    })

    let previousButton = document.createElement("button")
    previousButton.innerText = "Previous"
    previousButton.classList.add("buttons")
    previousButton.id = "previous"

    let nextButton = document.createElement("button")
    nextButton.innerText = "Next"
    nextButton.classList.add("buttons")
    
    if (currentNum - 1 <= 0) {
        previousButton.setAttribute("disabled", "disabled");
    }
    else {
        previousButton.removeAttribute("disabled")
    }
    previousButton.addEventListener("click", () => {
        currentNum--
        fetchAddress = `https://rickandmortyapi.com/api/character?page=${currentNum}`
        document.querySelector(".container").innerHTML = ""
        loadSite()

    })

    nextButton.addEventListener("click", () => {
        currentNum++
        fetchAddress = `https://rickandmortyapi.com/api/character?page=${currentNum}`
        document.querySelector(".container").innerHTML = ""
        loadSite()
    })
    container.append(previousButton)
    container.append(nextButton)
}

loadSite()






