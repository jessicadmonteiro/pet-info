const body = document.querySelector("body")

function abirModal (children) {
    const fundoConteiner     = document.createElement("section")
    const containerPrincipal = document.createElement("div")
    const botaoFecharModal   = document.createElement("button")

    fundoConteiner.classList.add("fundo_modal")
    containerPrincipal.classList.add("container_modal")
    botaoFecharModal.classList.add("bt_fechar_modal")

    botaoFecharModal.innerText = "X"

    fundoConteiner.addEventListener("click", (event) => {
        const {className} = event.target
        if(className === "fundo_modal" || className === "bt_fechar_modal" || className === "bt_cancelar") {
            fundoConteiner.remove()
        }
    })

    containerPrincipal.appendChild(botaoFecharModal)
    containerPrincipal.append(children)
    fundoConteiner.appendChild(containerPrincipal)
    body.appendChild(fundoConteiner)

}

export{ abirModal}