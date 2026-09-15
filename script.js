const equipamento = document.getElementById('equipamento')
const obra = document.getElementById('obra')
const ultimaData = document.getElementById('ultimaData')
const dataVencimento = document.getElementById('dataVencimento')
const btnSalvar = document.getElementById('btnSalvar')
const listaEquipamentos = document.getElementById('listaEquipamentos');
const formEquipamento = document.getElementById('formEquipamento');



const carregarEquipamentos = () => {
    fetch('http://localhost:3000/equipamentos')
        .then(res => res.json())
        .then(dados =>{
        listaEquipamentos.innerHTML = ''
        dados.forEach(item => {

        const hoje = new Date();
        const vencimento = new Date(item.dataVencimento);
        const diferencaDias = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 *24));

         let statusTexto = '';
         let statusClasse = '';

           if (diferencaDias < 0) {
                    statusTexto = 'Atrasado ';
                    statusClasse = 'status-atrasado';
            } else if (diferencaDias <= 7) {
                    statusTexto = 'Próximo do vencimento ';
                    statusClasse = 'status-atencao';
                } else {
                    statusTexto = 'Em dia ';
                    statusClasse = 'status-ok';
                }
        const li = document.createElement('li')
        li.classList.add('card-item');
        li.innerHTML = `<strong>Equipamentos: </strong>${item.equipamento} <br>
            <strong>Obra: </strong> ${item.obra} <br>        
            <strong>Ultimo manutenção: </strong> ${item.ultimaData}<br>
            <strong>Vencimento: </strong>${item.dataVencimento}                       
            <button class ="btn-revisar" onclick="revisarEquipamento(${item.id})">Concluir Revisão</button>
            <button class ="btn-excluir" onclick="deletarEquipamento(${item.id})">Excluir</button>
            <p class="badge-status ${statusClasse}">${statusTexto}</p>`
                            
            listaEquipamentos.appendChild(li)                
        })
    })
}

const salvarEquipamento = (e) =>{
    e.preventDefault()
    const inputEqui = equipamento.value
    const inputObra = obra.value
    const inputUltfeito = ultimaData.value
    const inputVenci = dataVencimento.value

    fetch('http://localhost:3000/equipamentos',{
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json' 
      },  
        body: JSON.stringify ({
            equipamento: inputEqui,
            obra: inputObra,
            ultimaData: inputUltfeito,
            dataVencimento: inputVenci
        })  
    })
    .then(res => res.json())
        .then (dados =>{
            equipamento.value = '';
            obra.value = '';
            ultimaData.value = '';
            dataVencimento.value = '';

             alert('Tarefa agendada com sucesso!')
            carregarEquipamentos()
        })
}

const revisarEquipamento = (id) =>{
    fetch(`http://localhost:3000/equipamentos/${id}/revisar`,{
        method : 'PUT'
    })
        .then(res => res.json())
        .then(dados =>{
            carregarEquipamentos()
        });
}
 const deletarEquipamento = (id) =>{
    fetch(`http://localhost:3000/equipamentos/${id}`,
        {
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(dados =>{
            carregarEquipamentos()
        })
 }

carregarEquipamentos()
formEquipamento.addEventListener('submit', salvarEquipamento);