import { criarNovoPost, excluirPost } from "./api.js"
import { renderizarTodosPost } from "../pages/feed/feed.js"
import { atualizarPost } from "./api.js"
import { abirModal } from "./modal.js"

const modalPublicacao = () => {

     const formulario = document.createElement("form")

     formulario.insertAdjacentHTML( "beforeend", 
     `
        <h3 class="titulo_modal">Criando novo post</h3>
    
        <label for="title">Título do post</label>
        <input type="text" name="title" id="titulo_post" placeholder="Digite o título aqui..." required>
        <label for="content">Conteúdo do post</label>
        <textarea id="conteudo_post" name="content" cols="30" rows="10" maxlength="145">Desenvolva o conteúdo do post aqui...</textarea>
        <div class="container_btCancelar_btSalvaAlteracaes">
            <button class="bt_cancelar">Cancelar</button>
            <button type="submit" class="bt_salvar_alteracoes">Publicar</button>
        </div>
     `
     )

     formulario.addEventListener("submit", async (event) => {
        event.preventDefault()

        const inputs = [...event.target]

        const novoPost = {}

        inputs.forEach(({name, value}) => {

            if(name){
                novoPost[name] = value
            }
        })

        await criarNovoPost(novoPost)
        await renderizarTodosPost()

        const modal = document.querySelector(".fundo_modal")
        modal.remove()
       
     })
     return formulario
}


const editarPost = ({title, content, id}) => {

    const formulario = document.createElement("form")

     formulario.insertAdjacentHTML( "beforeend", 
     `
        <h3 class="titulo_modal">Edição</h3>

        <label for="title">Título do post</label>
        <input name="title" type="text" id="titulo_post" value="${title}" required>
        <label for="content">Conteúdo do post</label>
        <textarea name="content" id="conteudo_post" cols="30" rows="10" required>${content}</textarea>
        
         <div class="container_btCancelar_btSalvaAlteracaes">
             <button class="bt_cancelar">Cancelar</button>
             <button type="submit" class="bt_salvar_alteracoes">Salva Alterações</button>
         </div>
     `
     )

     formulario.addEventListener("submit", async (event) => {
        event.preventDefault()

        const inputs = [...event.target]

        const post = {}

        inputs.forEach(({name, value}) => {

            if(name){
                post[name] = value
            }
        })

        await atualizarPost(post, id)
        await renderizarTodosPost()

        const modal = document.querySelector(".fundo_modal")
        modal.remove()

     })
     return formulario
}


const deletarPost = ({id}) => {

    const formulario = document.createElement("form")

     formulario.insertAdjacentHTML( "beforeend", 
     `
         <h3 class="titulo_modal">Confirmação de exclusão</h3>
         <h3 class="texto_alerta">Tem certeza que deseja excluir este post?</h3>
         <p class="texto_alerta2">Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</p>
         <div class="container_btCancelar_btExcluirPost">
             <button class="bt_cancelar">Cancelar</button>
             <button id="${id}" type="submit" class="bt_excluir_post">Sim, excluir este post</button>
         </div>
     `
     )

     formulario.addEventListener("submit", async (event) => {
        event.preventDefault()

         await excluirPost(id)
         await renderizarTodosPost()

         const modal = document.querySelector(".fundo_modal")
         modal.remove()

         const toast = document.querySelector(".container")
         toast.style.display = "flex"

     })
     return formulario
}


const abrirPost = (imagem, nome, titulo, data, conteudo) => {

    const formulario = document.createElement("form")

     formulario.insertAdjacentHTML( "beforeend", 
     `   
            <div class="container_img_usario_data">
                <img class="imgUsuario_feed" src="${imagem}" alt="">
                <h3 class="nome_usuario">${nome}</h3>
                <p class="data_post">| <span>${data}</span></p>
            </div>
            <h3 class="titulo_modal_post">${titulo}</h3>
            <p class="descricao_modal_post">${conteudo}</p>
     `
     )

     return formulario
}

export {modalPublicacao, editarPost, deletarPost, abrirPost}
