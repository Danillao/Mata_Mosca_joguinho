
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search // atribui a nivel a url que contem o value do nivel selecionado
nivel = nivel.replace ('?','') // replace substitui uma string selecionada ex ? por outra escolhida ex ''

// Verificacao e atualizacao do tempo baseado no nivel escolhido
if (nivel === 'normal') {
    criaMosquitoTempo = 1500
} else if (nivel === 'foda') {
    criaMosquitoTempo = 990
}else{
    criaMosquitoTempo = 750
}

//Recuperando altura e largura da pagina do jogo 
function ajustaTamanhoJogo () {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(altura,largura)
}

ajustaTamanhoJogo()

// Cronometro e verificação de vitoria
var cronometro = setInterval(function(){
    tempo --
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
    document.getElementById('cronometro').innerHTML = tempo
    }
},1000)

// Esta funcao é responsavel por verificar pontos de vida e controlar o game over
// gerar valorres randomicos , criar e injetar um elemento html (mosquito) no body
// controlar a remoção desse elemento caso seja clicado
// alterar a posicao e espelhamento no css desse elemento com valores randomicos em suas posicoes left e top
function posicaoRandomica () {

    // remover mosquito anterior (caso exista), controlar pontos de vida, e encaminhar para game over caso as vidas acabem
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
        //console.log('v' + vidas)
        if(vidas > 3){
            window.location.href = 'game_over.html'
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"

            vidas ++
        }
        
    }
    
    // Gera valores aleatorios e multiplica pela altura e largura para termos width e height aleatorios;
    // depois arredonda para baixo com o metodo floor
    var posicaoX = Math.floor( Math.random() * largura)  - 90 //decrementa 90px para que nao ultrapasse o limite da tela
    var posicaoY = Math.floor(Math.random() * altura) - 90 //decrementa 90px para que nao ultrapasse o limite da tela

    // Verifica se o valor é < 0, se for ele recebe o proprio 0 senao recebe o proprio valor
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    // Criar o elemento html
    var mosquito = document.createElement('img') // Cria um elemento do tipo img e encapsula na var mosquito
    mosquito.src = 'imagens/mosquito.png' // Faz a var recuperar a imagem mosquito com o metodo source

    mosquito.className = tamanhoAleatorio() +' '+ladoAleatorio() // Recupera a class que altera o tamanho da imagem, 
                                                                 // concatena com um espaço e depois 
                                                                 // recupera a class que define o perfil da mosca

    mosquito.style.position = 'absolute' // Deixa a posicao absoluta  
    mosquito.style.left = posicaoX + 'px' // Adiciona ao style left o valor de posicao X concatenado a px(pixel)
    mosquito.style.top = posicaoY + 'px' // Adiciona ao style top o valor de posicao Y concatenado a px(pixel)
    mosquito.id = 'mosquito' // add um id para verificação de existencia e controle de pontos de vida
    mosquito.onclick = function(){ // funcao que remove o id do mosquito caso seja clicado
        this.remove()
    }

    document.body.appendChild(mosquito) // Add ao body um Child, um filho que é a var mosquito
}

// Esta funcao gera um valor random 0, 1 ou 2 e partir desse resultado retorna uma classe css
// que possui tamanhos diferentes 
function tamanhoAleatorio () {
    var classe = Math.floor(Math.random() * 3)

    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'       
    }
}

// Esta funcao gera um valor random 0 ou 1 e partir desse resultado retorna uma classe css
// que possui lados(perfil espelhado) diferentes
function ladoAleatorio () {
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'     
    }
}




