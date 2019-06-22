var tempoInicial = $("#tempo-digitacao").text();
var campo = $('.campo-digitacao');
var frase = $(".frase").text();

//$(document).ready(function)
$( function() {
        atualizaTamanhoFrase();
        inicializaContadores();
        inicializaCronometro();
        $("#botao-reiniciar").click(reiniciarJogo);
        inicializaMarcadores();
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var nroPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase").text(nroPalavras);
}



function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();
    
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras); 
    
        var qtdCaracteres = conteudo.length;
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var cronometroId = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    //campo.addClass("campo-desativado");
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function reiniciarJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    //campo.removeClass("campo-desativado");
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}

function inicializaMarcadores() {
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        //console.log("Comparavel: " + comparavel);
        //console.log("Digitado: "+digitado);
    
        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Charles Albert";
    var nroPalavras = $("#contador-palavras").text();
    
    var linha = novaLinha(usuario, nroPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
}

function novaLinha(usuario, nroPalavras)  {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(nroPalavras);
    var colunaRemover = $("<td>");
    var link = $("<a>");
    link.addClass("botao-remover").attr("href", "#");
    var icone = $("<i>");
    icone.addClass("small").addClass("material-icons").text("delete");
    
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    $(this).parent().parent().remove();
}