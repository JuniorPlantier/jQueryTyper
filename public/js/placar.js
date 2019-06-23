$("#botao-placar").click(mostrarPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Charles Albert";
    var nroPalavras = $("#contador-palavras").text();
    
    var linha = novaLinha(usuario, nroPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate({
        scrollTop: "500px"
    }, 1000);
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

    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
}

function mostrarPlacar() {
    $(".placar").stop().slideToggle(600);
}