const form = document.querySelector("form")
const search = document.querySelector("input")
const paragraphOne = document.querySelector("#message-1")
const paragraphTwo = document.querySelector("#message-2")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    paragraphOne.textContent="Loading..."
    paragraphTwo.textContent=""
    fetch("/weather?address="+search.value).then((response) => {
    response.json().then((data) => {
        paragraphOne.textContent=""
        if(data.error){
            console.log(data.error);
            paragraphOne.textContent=data.error
        } else{
            console.log(data.location);
            console.log(data.forecast);
            paragraphOne.textContent=data.location
            paragraphTwo.textContent=data.forecast
        }
    })
})
})