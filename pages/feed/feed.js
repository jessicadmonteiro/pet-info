import { criarNovoPost, getPerfil, criarPerfilUsuario } from "../../scripts/api.js";
import { posts } from "../../scripts/api.js";
import { editarPost, modalPublicacao, deletarPost, abrirPost} from "../../scripts/formulario.js";
import { abirModal } from "../../scripts/modal.js";


const detalhesUsuario = await getPerfil()

async function header() {
    
    function cabecalho(imagem, email) {
        return `
        <div class="conteiner_cor_fundo">
                <div class="container_cabecalho">
                    <h3 class="titulo_header">Petinfo</h3>
                    <div class="container_bt_img">
                        <button class="bt_criarPublicacao">Criar publicação</button>
                        <div class="hover_logout">
                            <img class="imgUsuario" src="${imagem}" alt="">
                            <div class="container_logout">
                                <p class="email_usuario">${email}</p>
                                <div class="container_bt_logout">
                                    <button class="bt_seta"></button>
                                    <button class="bt_sairdaconta">Sair da conta</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container_titulo_feed">
                    <h4 class="titulo_feed">Feed</h4>
                </div>
            </div>  `
    }
    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <header>
            ${cabecalho(detalhesUsuario.avatar, detalhesUsuario.email)}
        </header>
        `
    )
    
    const botao = document.querySelector(".bt_sairdaconta")

    botao.addEventListener("click", () => {
        window.location.replace("/pages/login/login.html")
        localStorage.removeItem("usuario")
    })

    const botaoSeta = document.querySelector(".bt_seta")
    botaoSeta.addEventListener("click", () => {
        window.location.replace("/pages/login/login.html")
        localStorage.removeItem("usuario")
    })
}
header()



async function renderizarTodosPost() {
    const publicacao = await posts()

    const usuarioLogado = await criarPerfilUsuario()
    
    function listaPosts (arr) {
        let containerReceberPosts = document.querySelector(".container_posts")
        containerReceberPosts.innerHTML = ""

        let novoArray = arr.reverse()

        novoArray.forEach(element => {
    
           let imagem    = element.user.avatar
           let nome      = element.user.username
           let titulo    = element.title
           let conteudo  = element.content
           let date      = new Date (element.createdAt)
           let data      = date.toDateString()
           let id        = element.id
         
           let tagLi            = document.createElement("li")
           let tagDiv           = document.createElement("div")
           let tagDivContainer  = document.createElement("div")
           let tagImg           = document.createElement("img")
           let tagH3            = document.createElement("h3")
           let tagSpan          = document.createElement("span")
           let tagP             = document.createElement("p")
           let tagH2            = document.createElement("h2")
           let tagPConteudoPost = document.createElement("p")
           let tagPbt           = document.createElement("p")
           let tagBtAcessar     = document.createElement("button")

           tagLi.classList.add("container_card")
           tagDiv.classList.add("cabecalho_postFeed")
           tagDivContainer.classList.add("container_img_usario_data")
           tagImg.classList.add("imgUsuario_feed")
           tagH3.classList.add("nome_usuario")
           tagP.classList.add("data_post")
           tagH2.classList.add("tilulo_post")
           tagPConteudoPost.classList.add("descricao_post")
           tagPbt.classList.add("container_tagBt")
           tagBtAcessar.classList.add("acessar_publicacao")

           tagDiv.append(tagDivContainer)


           if(element.user.id === usuarioLogado.id){

            let tagDivBt         = document.createElement("div")
            let tagBtEditar      = document.createElement("button")
            let tagBtExcluir     = document.createElement("button")

            tagDivBt.classList.add("container_bt_editar_excluir")
            tagBtEditar.classList.add("bt_editar")
            tagBtExcluir.classList.add("bt_excluir")

            tagBtEditar.innerText  = "Editar"

            tagBtEditar.addEventListener("click", () =>{

                const editarPublicacao = editarPost(element)
                abirModal(editarPublicacao)

            })

            tagBtExcluir.innerText = "Excluir"

            tagBtExcluir.addEventListener("click", () => {
                const excluirPublicacao =  deletarPost(element)
                abirModal(excluirPublicacao)
            })

            tagDivBt.append(tagBtEditar, tagBtExcluir)
            tagDiv.append(tagDivBt)
          }
           

           tagImg.src             = imagem
           tagH3.innerText        = nome
           tagSpan.innerText      = "|"
           tagP.innerText         = data

        
           tagH2.innerText        = titulo
           tagPConteudoPost       = conteudo
           tagBtAcessar.innerText = "Acessar publicação"

           tagBtAcessar.addEventListener("click", () =>{

                const acessarPost = abrirPost(imagem, nome, titulo, data, conteudo)
                
                abirModal(acessarPost)
           })


           tagLi.append(tagDiv, tagH2, tagPConteudoPost, tagPbt)
           tagDivContainer.append(tagImg, tagH3, tagSpan, tagP)
           tagPbt.appendChild(tagBtAcessar)

           containerReceberPosts.append(tagLi)
       });
    }
    listaPosts(publicacao)
}

renderizarTodosPost()


function modalCriarPublicacao () {
    const BotaocriarPublicacao = document.querySelector(".bt_criarPublicacao")

    BotaocriarPublicacao.addEventListener("click", () => {
         const publicacao = modalPublicacao()
         abirModal(publicacao)
    })

}
modalCriarPublicacao ()



export {renderizarTodosPost}