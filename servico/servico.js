import historicoInflacao from "../data/dados.js";

export const buscarHistoricoIPCA = () => {
    return historicoInflacao;
};

export const dadosPorAno = (ano) => {
    const anoHistorico = parseInt(ano);    
        return historicoInflacao.filter((historico) => {
            return historico.ano === anoHistorico;
        });    
};

export const dadosPorId = (idipca) => {
    const idHistorico = parseInt(idipca);    
        return historicoInflacao.find((historico) => historico.id === idHistorico);    
};

export const calcularReajuste = (valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno) => {

        const historicoFiltrado = historicoInflacao.filter(historico => {
        if (dataInicialAno === dataFinalAno) {
            return historico.ano === dataInicialAno && historico.mes >= dataInicialMes && historico.mes <= dataFinalMes;
        } else {
            return (
                (historico.ano === dataInicialAno && historico.mes >= dataInicialMes) ||
                (historico.ano > dataInicialAno && historico.ano < dataFinalAno) ||
                (historico.ano === dataFinalAno && historico.mes <= dataFinalMes)
            );
        }
    });

    let taxasMensais = 1; for (const taxa of historicoFiltrado) { taxasMensais *= 1 + (taxa.ipca / 100); }

    let resultado = valor * taxasMensais;

    return resultado;
 };    