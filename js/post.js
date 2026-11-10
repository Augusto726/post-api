const form = document.querySelector("#form-jogo");
const resposta = document.querySelector("#resposta");

const apiKey = "cv_r6Ib9rckORw3N9y4CrofyVSayRJED3oFiydGE4tq0Coqvr0Map14iVjyhaqGvJRx";
const apiUrl = "https://api-ds.codeverse.dev.br/api/jogos";

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    
  
    const dados = new FormData(form);


    const jogo = {
        title: dados.get("titulo"),
        genero: dados.get("genero"),
        desenvolvedora: dados.get("desenvolvedora"),
        plataforma: dados.get("plataforma"),
        ano_lancamento: (dados.get("ano_lancamento")), 
        imageUrl: dados.get("imagem") || null
    };

    resposta.textContent = "Enviando jogo para a API...";

    try {
        const respostaApi = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey
            },
            body: JSON.stringify(jogo)
        });

     
        const texto = await respostaApi.text();
        let resultado = {};
        
        try {
            resultado = texto ? JSON.parse(texto) : {};
        } catch (e) {
            resultado = { message: texto };
        }

    
        if (respostaApi.ok) {
            resposta.textContent = `"${jogo.title}" foi cadastrado com sucesso!`;
            form.reset();
        } else {
            console.error("Erro retornado pela API:", resultado);
            resposta.textContent = resultado.message || `Erro ${respostaApi.status}: Não foi possível cadastrar.`;
        }

    } catch (error) {
        console.error("Erro na comunicação com a API:", error);
        resposta.textContent = "Erro de conexão ao tentar enviar os dados.";
    }
});