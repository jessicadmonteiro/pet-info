import { cadastro } from "../../scripts/api.js"

const eventoCadastro = () => {
    const form = document.querySelector("form")

    const elementos = [...form.elements]
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        let botao = document.querySelector(".bt_cadastrar")
        botao.innerHTML = ""
        
        const img = document.createElement("img")
        img.src = "/assets/img-login/spinner.svg"
        img.alt = "spinner"
        img.classList.add("carregando")
        botao.appendChild(img)

        const body = {}
        elementos.forEach((element) => {
            if(element.tagName == "INPUT" && element.value !== ""){
                body[element.id] = element.value
            }
        })
        
        await cadastro(body, botao)
    })
}
eventoCadastro()