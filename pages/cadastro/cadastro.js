import { cadastro } from "../../scripts/api.js"

const eventoCadastro = () => {
    const form = document.querySelector("form")

    const elementos = [...form.elements]
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const body = {}
        elementos.forEach((element) => {
            if(element.tagName == "INPUT" && element.value !== ""){
                body[element.id] = element.value
            }
        })
        
        await cadastro(body)
    })
}
eventoCadastro()