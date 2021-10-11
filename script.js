

const images = [
    "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=693&q=80",
    "https://images.unsplash.com/photo-1633959649938-57ff4d2f92d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1633867727259-6194abe4ac5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1633810277072-b6a09627ee97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1633696376754-308dbb62e433?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
    "https://images.unsplash.com/photo-1633876559245-141c13badbbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=626&q=80",
    "https://images.unsplash.com/photo-1633929383770-f1300f30a3ac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1633925483411-28ee8bdb37fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1633113093730-47449a1a9c6e?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1633944348847-b3b4ff52b19c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=684&q=80"

]

function displayImage(link) {
    const imageDiv = document.querySelector(".image") 
    images.forEach(image => {
        const img = document.createElement("img")
        img.src = image
        img.width = 400
        img.height = 400
        imageDiv.appendChild(img)
    })    
}
displayImage(images)
let imageState = 0;

function changeImage(direction) {
    const imageDiv = document.querySelector(".image")
    if(direction === "next") {
        imageState++
        if(imageState > images.length - 1) {imageState = 0}
    } else {
        imageState--
        if(imageState < 0) {imageState = images.length -1}
    }
    imageDiv.style.transform = `translate(-${400 * imageState}px)`

    setActiveDot()
}


function createImageStateIndicators() {
    let id = 1
    const body = document.querySelector("body")
    const dotContainer = document.createElement("div")
    dotContainer.id = "dot-container"
    images.forEach(image => {
        const dot = document.createElement("div")
        dot.classList.add("dot")
        dot.id = id
        dotContainer.appendChild(dot)
        id++
    })
    body.appendChild(dotContainer)
    

}
createImageStateIndicators()

const nextButton = document.querySelector(".next")
const previousButton = document.querySelector(".previous")

nextButton.addEventListener("click", (e) => {
    console.log(e.target.classList.value)
    changeImage("next")
    arrowAnimation(e.target)
    
     
})
previousButton.addEventListener("click", (e) => {
    changeImage("previous")
    arrowAnimation(e.target)
})

function setActiveDot() {
    let dots = document.querySelectorAll(".dot")
    let activeDot = document.getElementById(`${imageState + 1}`)
    dots.forEach(dot => {
        dot.classList.remove("active")
    })
    activeDot.classList.add("active")
}
function arrowAnimation(arrow) {
    arrow.style.transform = `scale(1.1) rotate(${arrow.classList.value === "next" ? "" : "-"}45deg)`
    setTimeout(() => {arrow.style.transform = `scale(1) rotate(${arrow.classList.value === "next" ? "" : "-"}45deg)`;}, 100 )
}

let dots = document.querySelectorAll(".dot")
dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        const imageDiv = document.querySelector(".image")
        imageState = e.target.id - 1
        console.log(e.target.id)
        imageDiv.style.transform = `translate(-${400 * imageState}px)`
        setActiveDot()
    })
})


setActiveDot()
setInterval(() => {changeImage("next")},  5000)
