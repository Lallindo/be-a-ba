export const jogo = {
    letras: [],
    palavra: '',
    erro: false,
    sequencia: 0,
    palavrasUsadas: [],

    iniciarJogo: function () {
        this.letras = [];
        this.palavrasUsadas = [];

        const alfabeto = 'abcdefghijklmnopqrstuvwxyz'
        this.letras = new Array(3).fill().map(function(letras) {  
            const randomIndex = Math.floor(Math.random() * alfabeto.length)
            return alfabeto[randomIndex].toUpperCase();
            // Funciona como um While que para apenas quando o tamanho do array é igual ao valor inserido como parâmetro após o array; 
        })

        this.palavra = '';
        this.error = false;
        this.sequencia = 0;
        console.log(this.letras)
    },

    validarPalavra: async function (palavra) {
        const palavraParaValidar = palavra.toUpperCase();
        
        if (this.palavrasUsadas.includes(palavraParaValidar)) {
            return false;
        }

        const rawData = await fetch(`https://api.dicionario-aberto.net/word/${palavraParaValidar}`);
        const data = await rawData.json()
        console.log("JSON: ",rawData);

        for (let i = 0; i < Math.max(this.letras.length, 3); i++) {
            if (!palavraParaValidar.includes(this.letras[i])) {
                this.error = true;
                return false;
            }

            this.sequencia++;
            this.palavrasUsadas.push(palavraParaValidar);
            //console.log(this.palavrasUsadas);
            return true;
        }
    }
}
