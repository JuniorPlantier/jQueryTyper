var tempoInicial = $("#tempo-digitacao").text();
var campo = $('.campo-digitacao');


//$(document).ready(function)
$( function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciarJogo);
    inicializaMarcadores();
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
    $(".tooltip").tooltipster({
        trigger: "custom"
    });
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
    
    campo.one("focus", function() {
        var tempoRestante = $("#tempo-digitacao").text();
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
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}