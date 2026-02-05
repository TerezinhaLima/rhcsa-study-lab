// Dados das questões (mesmo do script.js)
const questoes = [
    // ... mesmo array de questões
];

// Carregar dashboard
function carregarDashboard() {
    const progresso = JSON.parse(localStorage.getItem('rhcsa-progresso') || '{}');
    
    // Calcular estatísticas
    const total = questoes.length;
    const concluidas = Object.keys(progresso).length;
    const pendentes = total - concluidas;
    const percentual = Math.round((concluidas / total) * 100);
    
    // Atualizar cards
    document.getElementById('total-questoes').textContent = total;
    document.getElementById('concluidas').textContent = concluidas;
    document.getElementById('pendentes').textContent = pendentes;
    document.getElementById('progresso').textContent = `${percentual}%`;
    
    // Criar gráficos
    criarGraficos(progresso);
    
    // Preencher tabela
    preencherTabela(progresso);
}

// Criar gráficos
function criarGraficos(progresso) {
    // Gráfico por Node
    const ctxNode = document.getElementById('chartNode').getContext('2d');
    const nodeData = calcularPorNode(progresso);
    
    new Chart(ctxNode, {
        type: 'doughnut',
        data: {
            labels: ['Node 1', 'Node 2'],
            datasets: [{
                data: [nodeData.node1, nodeData.node2],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Concluídas por Node'
                }
            }
        }
    });
    
    // Gráfico por Dificuldade
    const ctxDiff = document.getElementById('chartDificuldade').getContext('2d');
    const diffData = calcularPorDificuldade(progresso);
    
    new Chart(ctxDiff, {
        type: 'bar',
        data: {
            labels: ['Fácil', 'Médio', 'Difícil'],
            datasets: [{
                label: 'Concluídas',
                data: [diffData.facil, diffData.medio, diffData.dificil],
                backgroundColor: ['#4BC0C0', '#FFCD56', '#FF6384']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Progresso por Dificuldade'
                }
            }
        }
    });
}

// Calcular estatísticas por node
function calcularPorNode(progresso) {
    const node1 = questoes.filter(q => q.node === 1 && progresso[q.id]).length;
    const node2 = questoes.filter(q => q.node === 2 && progresso[q.id]).length;
    return { node1, node2 };
}

// Calcular estatísticas por dificuldade
function calcularPorDificuldade(progresso) {
    const facil = questoes.filter(q => q.dificuldade === 'Fácil' && progresso[q.id]).length;
    const medio = questoes.filter(q => q.dificuldade === 'Médio' && progresso[q.id]).length;
    const dificil = questoes.filter(q => q.dificuldade === 'Difícil' && progresso[q.id]).length;
    return { facil, medio, dificil };
}

// Preencher tabela
function preencherTabela(progresso) {
    const tbody = document.getElementById('tabela-questoes');
    tbody.innerHTML = '';
    
    questoes.forEach(questao => {
        const concluida = progresso[questao.id] || false;
        const status = concluida ? 
            '<span class="badge bg-success">Concluída ✓</span>' : 
            '<span class="badge bg-secondary">Pendente</span>';
        
        const acoes = concluida ? 
            `<button class="btn btn-sm btn-warning" onclick="desmarcarQuestao(${questao.id})">
                <i class="fas fa-undo"></i> Desmarcar
            </button>` :
            `<button class="btn btn-sm btn-success" onclick="marcarQuestao(${questao.id})">
                <i class="fas fa-check"></i> Concluir
            </button>`;
        
        const linha = `
            <tr>
                <td>${questao.id}</td>
                <td>${questao.titulo}</td>
                <td>${questao.node}</td>
                <td>${questao.topico}</td>
                <td>
                    <span class="badge bg-${getCorDificuldade(questao.dificuldade)}">
                        ${questao.dificuldade}
                    </span>
                </td>
                <td>${status}</td>
                <td>
                    ${acoes}
                    <a href="index.html#questoes" class="btn btn-sm btn-primary">
                        <i class="fas fa-eye"></i> Ver
                    </a>
                </td>
            </tr>
        `;
        
        tbody.innerHTML += linha;
    });
}

// Funções auxiliares
function getCorDificuldade(dificuldade) {
    switch(dificuldade) {
        case 'Fácil': return 'success';
        case 'Médio': return 'warning';
        case 'Difícil': return 'danger';
        default: return 'secondary';
    }
}

function marcarQuestao(id) {
    let progresso = JSON.parse(localStorage.getItem('rhcsa-progresso') || '{}');
    progresso[id] = true;
    localStorage.setItem('rhcsa-progresso', JSON.stringify(progresso));
    carregarDashboard();
    alert(`Questão ${id} marcada como concluída!`);
}

function desmarcarQuestao(id) {
    let progresso = JSON.parse(localStorage.getItem('rhcsa-progresso') || '{}');
    delete progresso[id];
    localStorage.setItem('rhcsa-progresso', JSON.stringify(progresso));
    carregarDashboard();
    alert(`Questão ${id} desmarcada!`);
}

function resetarProgresso() {
    if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
        localStorage.removeItem('rhcsa-progresso');
        carregarDashboard();
        alert('Progresso resetado com sucesso!');
    }
}

// Carregar dashboard quando a página abrir
document.addEventListener('DOMContentLoaded', carregarDashboard);
