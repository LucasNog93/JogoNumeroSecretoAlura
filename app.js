//let titulo = document.querySelector("h1");
//titulo.innerHTML = "Jogo do numero secreto!";

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um numero entre 1 a 10";


// A forma de programar acima, não é incorreta, porém a formatação abaixo ajuda em uma melhor boa prática.
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, `Brazilian Portuguese Female`, {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela ("h1", "Jogo do numero secreto!");
    exibirTextoNaTela ("p", "Escolha um numero entre 1 a 10");
}

exibirMensagemInicial()

function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        exibirTextoNaTela ("h1", "ACERTOU!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagem = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela ("p", mensagem);
        document.getElementById("reiniciar").removeAttribute("disabled");
   } else {
    if(chute > numeroSecreto){
        exibirTextoNaTela ("h1", "O numero secreto é menor");
        exibirTextoNaTela ("p", "TENTE NOVAMENTE.");
    } else {
        exibirTextoNaTela ("h1", "O numero secreto é maior");
        exibirTextoNaTela ("p", "TENTE NOVAMENTE.");
    }
   } tentativas++;
    limparCampo()
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosLista = listaDeNumerosSorteados.length;

   if(quantidadeDeElementosLista == numeroLimite){
    listaDeNumerosSorteados = [];
   }

   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector ("input");
    chute.value  = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo()
    let tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}