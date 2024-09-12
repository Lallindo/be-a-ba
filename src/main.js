import {jogo} from './jogo';

console.log(jogo);

const letrasDica = document.querySelectorAll('.square');
const btnIniciar = document.getElementById('new-game');
const palavraResp = document.getElementById('word');
const msgErro = document.getElementById('error');
const msgSeq = document.getElementById('streak')

btnIniciar.addEventListener('click', function () {
    jogo.iniciarJogo();
    for (let i = 0; i < 3; i++) {
        letrasDica[i].innerHTML = jogo.letras[i];
    }
    palavraResp.disabled = false;
    palavraResp.value = '';
    palavraResp.focus();
    msgErro.style.visibility = 'hidden';
    msgSeq.innerHTML = '';
});

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const palavra = formData.get('word');
    const palavraValidada = await jogo.validarPalavra(palavra);
    console.log(palavraValidada);
    if (palavraValidada) {
        msgSeq.innerHTML = jogo.sequencia;
        msgErro.style.visibility = 'hidden';
        palavraResp.value = '';
    } else {
        msgErro.style.visibility = 'visible';
    }
})