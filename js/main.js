const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (element) => {
  criar_elemento(element)
});

form.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const nome = e.target.elements['nome']
  const quantidade = e.target.elements['quantidade']

  const existe = itens.find( elemento => elemento.nome === nome.value)
  
  //Recebe valores do elementos
  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
  }

  if (nome.value == "" | quantidade.value == ""){
    alert("Nome ou quantidade é obrigatório.")
  } else {

  
  if (existe) {

    itemAtual.id = existe.id

    atualizaElemento(itemAtual)

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

  } else {
      
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0; 

    criar_elemento(itemAtual)
    
    //Adiciona o objeto no array
    itens.push(itemAtual)
  }  
}   
    
  // Adiciona o array no localStorage
  localStorage.setItem("itens", JSON.stringify(itens))

  nome.value = ""
  quantidade.value = ""

})

function criar_elemento (item) {
     
  const novoItem = document.createElement('li')
  novoItem.classList.add("item")
      
  const quantItem = document.createElement('strong')
  quantItem.innerHTML = item.quantidade
  quantItem.dataset.id = item.id
      
  novoItem.appendChild(quantItem)
  novoItem.innerHTML += item.nome

  novoItem.appendChild(botaoDeleta(item.id))
      
  lista.appendChild(novoItem)


} 

function atualizaElemento(item) {
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button")
  elementoBotao.innerText = "X"

  elementoBotao.addEventListener("click", function() {
    deletarElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletarElemento(elemento, id) {
  elemento.remove()

  itens.splice(itens.findIndex(elemento => elemento.id === id),1)

  localStorage.setItem("itens", JSON.stringify(itens))

}