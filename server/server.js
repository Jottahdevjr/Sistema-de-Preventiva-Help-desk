const express = require('express');
const cors = require('cors');

const app = express()

app.use(express.json());
app.use(cors());;

let equipamentos = [];

app.get('/equipamentos', (req, res) => {
  res.json(equipamentos)
});

app.post('/equipamentos', (req, res) =>{
    const{equipamento, obra, dataVencimento, ultimaData} = req.body

const proxData = {
    id : Date.now(),
    equipamento : equipamento,
    obra: obra,
    dataVencimento : dataVencimento,
    ultimaData : ultimaData
}
    equipamentos.push(proxData)
    res.status(201).json(proxData)
});

app.delete('/equipamentos/:id', (req, res) =>{
    const idDeletar = Number(req.params.id);
    const indice = equipamentos.findIndex(item => item.id === idDeletar);
    if (indice !== -1) {
        equipamentos.splice(indice, 1);
        return res.json({ mensagem: 'Equipamento deletado com sucesso!' });
    }

    res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
})

app.put('/equipamentos/:id/revisar', (req,res) =>{
   const idAtualizar = Number(req.params.id);
   const item = equipamentos.find(e => e.id === idAtualizar)

   if (item) {
        // Atualiza a data da última revisão para a data atual
        item.ultimaData = new Date().toISOString().split('T')[0];
        return res.json({ mensagem: 'Revisão atualizada!', item });
    }

    res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
});




app.listen(3000, () =>{
    console.log('Servidor rodando na porta 3000!')
});
