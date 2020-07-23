var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPaciente(form);
    var erros =  validaPaciente(paciente);

    if(erros.length > 0){
        exibeMensagensErro(erros);
        form.reset();
        return;
    }
    adicionaPacienteNaTabela(paciente);
    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";


});

function adicionaPacienteNaTabela(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function obtemPaciente(form){
  
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value,form.altura.value)
    }

    return paciente;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}

function exibeMensagensErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(erro => {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
        ul.classList.add("mensagens-erro")
    });
}

function montaTr(paciente) {
    //Cria TR
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    //Cria as TD's e a adiciona dentro da TR
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    // retorna a TR
    return pacienteTr;  
}

function validaPaciente(paciente) {
    var erros = [];
    if(paciente.nome.length ==0) erros.push( " O nome não pode ser em branco! ");
    if(paciente.gordura.length ==0) erros.push( " A gordura não pode ser em branco! ");
    if(paciente.peso.length ==0) erros.push( " O peso não pode ser em branco! ");
    if(paciente.altura.length ==0) erros.push( " A altura não pode ser em branco! ");
    if(!validaPeso(paciente.peso)) erros.push( " O peso digitado é inválido! ");
    if(!validaAltura(paciente.altura)) erros.push(" A altura digitada é inválida! ");
        
    return erros;
}