//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-jogos");
const modelo = document.querySelector("#modelo-jogo");

const apiKey="cv_r6Ib9rckORw3N9y4CrofyVSayRJED3oFiydGE4tq0Coqvr0Map14iVjyhaqGvJRx";
const apiUrl="https://api-ds.codeverse.dev.br/api/jogos";

async function buscarJogos() {

  resposta.textContent = "Carregando jogos..."
  try {

    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os jogos")
    }

  
    const resultado = await retorno.json();

    for (const jogos of resultado.data) {
      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = jogos.title;
      card.querySelector(".genero").textContent = jogos.genero;
      card.querySelector(".plataforma").textContent = jogos.plataforma;
      card.querySelector(".ano_lancamento").textContent = jogos.ano_lancamento;
      card.querySelector(".desenvolvedora").textContent = jogos.desenvolvedora;

      const imagem = card.querySelector("img");

      if(jogos.imageUrl){
        imagem.src = jogos.imageUrl;
        imagem.alt =  jogos.title;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os jogos. Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarJogos();