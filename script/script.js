// Fonction générique permettant de récupérer les films par catégorie souhaité.
async function getCategoriesMovies(countMovies, genre){
    let number = countMovies
    let resultsData = []
    let url = "http://localhost:8000/api/v1/titles/?genre=" + genre
    let authorize = true 
    do{
        let response = await fetch(url)
        let data = await response.json()
        url = data.next
        for (let dataMovie of data.results){
            if(resultsData.length >= number){
                authorize = false
                break;
            }
            resultsData.push(dataMovie)
        }
    }while(authorize)
    return resultsData
}

// test appel fonction async pour données brutes des catégories
async function getImdbScore(countMovie, maxImdbScore){
    let number = countMovie
    let url = "http://localhost:8000/api/v1/titles/?" + new URLSearchParams({imdb_score_min:maxImdbScore})
    let bestResults = []
    let authorize = true
    do{
        let response = await fetch(url)
        let bestData = await response.json()
        url = bestData.next
        for (let bestMovie of bestData.results){
            bestResults.push(bestMovie)
            if(bestResults.length >= number){
                authorize = false
                break;
            }
        }
    }while(authorize)
    bestResults.sort(function(a,b){return a.imdb_score - b.imdb_score})
    return bestResults
}

await getCategoriesMovies(4, "Action")
await getCategoriesMovies(4, "Animation")
await getCategoriesMovies(4, "Crime")
const actionMovies = await getCategoriesMovies(7, "Action")
const animationMovies = await getCategoriesMovies(7, "Animation")
const crimeMovies = await getCategoriesMovies(7, "Crime")

// récupération des score imdb par films

async function displayBestMovie(){
    catContainer.innerHTML = ""
    const bestMovies = await getImdbScore(7, 9.4)
    for (let bestCat of bestMovies){
        let elementLi = document.createElement("li")
        let imageAnchor = document.createElement("img")
        imageAnchor.src = bestCat.image_url
        catContainer.appendChild(elementLi)
        elementLi.appendChild(imageAnchor)
    }
}
await displayBestMovie()

async function displayActionMovie(){
    catContainer.innerHTML = ""
    const actionMovies = await getCategoriesMovies(7, "Action")
    for (let actionCat of actionMovies){
        let elementLi = document.createElement("li")
        let imageAnchor = document.createElement("img")
        imageAnchor.src = actionCat.image_url
        catContainer.appendChild(elementLi)
        elementLi.appendChild(imageAnchor)
    }
}
await displayActionMovie()

async function displayAnimationMovie(){
    const animationMovies = await getCategoriesMovies(7, "Animation")
    catContainer2.innerHTML = ""
    for (let animationCat of animationMovies){
        let elementLi = document.createElement("li")
        let imageAnchor = document.createElement("img")
        imageAnchor.src = animationCat.image_url
        catContainer2.appendChild(elementLi)
        elementLi.appendChild(imageAnchor)
    }
}
await displayAnimationMovie()

async function displayCrimeMovie(){
    catContainer3.innerHTML = ""
    const crimeMovies = await getCategoriesMovies(4, "Crime")
    for (let crimeCat of crimeMovies){
        let elementLi = document.createElement("li")
        let imageAnchor = document.createElement("img")
        imageAnchor.src = crimeCat.image_url
        catContainer3.appendChild(elementLi)
        elementLi.appendChild(imageAnchor)
    }
}
await displayCrimeMovie()