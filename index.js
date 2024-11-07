import express from 'express';
const app = express();

import { buscarHistoricoIPCA, dadosPorAno, dadosPorId, calcularReajuste } from './servico/servico.js';

app.get('/historicoIPCA', (req, res) => {
    const ano = req.query.ano;

    if(ano < 2015 || ano > 2023) {
        res.status(404).send("Nenhum histórico encontrado para o ano especificado")
    } else {
        const dados = ano ? dadosPorAno(ano) : buscarHistoricoIPCA();
        
        res.json(dados);
    }
});

app.get('/historicoIPCA/:idIpca', (req, res) => {
    const id = dadosPorId(req.params.idIpca);

    if(id) {
        res.json(id);
    } else if(isNaN(parseInt(req.params.idIpca))) {
        res.status(404).send("Requisição inválida");
    } else {
        res.status(404).send("Elemento não encontrado");
    }
});

app.get('/historicoIPCA/calculo', (req, res) => {
    const valor = parseInt(req.query.valor);
    const mesInicial = parseInt(req.query.mesInicial);
    const mesFinal = parseInt(req.query.mesFinal);
    const anoInicial = parseInt(req.query.anoInicial);
    const anoFinal = parseInt(req.query.anoFinal);

    if(mesInicial > mesFinal && anoInicial > anoFinal) {
        res.status(400).send("Parâmetro inválido");
    } else {
        const resultado = calcularReajuste(valor, mesInicial, mesFinal, anoInicial, anoFinal);
        console.log(resultado);
        res.json({resultado: resultado});
    }
});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080')
});