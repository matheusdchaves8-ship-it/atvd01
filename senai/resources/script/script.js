async function loadData(cepUsuario) {
    const RESPONSE = await fetch(`https://viacep.com.br/ws/${cepUsuario}/json/`);

    if (!RESPONSE.ok) {
        throw new Error("Erro na requisição");

    }

    return RESPONSE.json();
}


let form = document.querySelector("form")
let cep = document.querySelector("#cep")

cep.addEventListener("input", () => {
     if (cep.value.length > 8) {
        cep.value = cep.value.slice(0, 8);
    }
})



form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let cepValidado = Number(cep.value)
    let dados = await loadData(cepValidado);
    console.log(dados)
    let body = document.querySelector("body");

    if (!dados || dados.erro) {
        body.innerHTML = `
        <h1>CEP inválido!</h1>
        <p>O CEP digitado não foi encontrado. Verifique e tente novamente.</p>
    `;
    } else {
        body.innerHTML = `
        <h1>Dados da pesquisa</h1>
        <ul>
            <li>${dados.cep}</li>
            <li>${dados.logradouro}</li>
            <li>${dados.bairro}</li>
            <li>${dados.localidade}</li>
            <li>${dados.uf}</li>
            <li>${dados.estado}</li>
            <li>${dados.regiao}</li>
            <li>${dados.ddd}</li>
        </ul>
    `;
    }


})













