var api = {};

var frases = [
	{_id: 0, texto:'Grandes metas, pequenos objetivos. Sem excesso de opções. Objetivos curtos, claros e alcançáveis.', tempo: 22 },
	{_id: 1, texto:'Debuggers não consertam erros, apenas os exibem em slow motion.',tempo: 8 },
	{_id: 2, texto:'Não mentir pra ninguém, inclusive pra mim mesmo', tempo: 15 },
	{_id: 3, texto:'Investir em conhecimento, rende os melhores juros.', tempo: 10 },
	{_id: 4, texto:'Uma mulher deve ser duas coisas: quem e o que ele quiser. Coco Chanel.', tempo: 15 },
	{_id: 5, texto:'Na minha máquina funciona.', tempo: 5 },
	{_id: 6, texto:'Hardware é o que você chuta, software é o que você xinga.', tempo: 12 },
	{_id: 7, texto:'Software em funcionamento mais que documentação abrangente.', tempo: 10 },
	{_id: 8, texto:'Iterar é humano, recursão é divino.', tempo: 7},
	{_id: 9, texto:'Existem três jeitos de desenvolver software. O jeito certo, o jeito errado e o meu jeito, que é igual o jeito errado só que mais rápido.', tempo: 20},

	];

api.lista = function(req, res) {

	setTimeout(function(){
		if(req.query.id) return res.json(frases[req.query.id]);

		res.json(frases);
	},1500);

};

module.exports = api;
