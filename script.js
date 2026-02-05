// Dados das questões
const questoes = [
    {
        id: 1,
        node: 1,
        topico: "Rede",
        dificuldade: "Fácil",
        titulo: "Configurar IP Estático",
        descricao: "Configure um endereço IP estático para sua máquina.",
        comando: "nmcli connection modify eth0 ipv4.addresses 192.168.1.100/24",
        solucao: "Verifique com: ip addr show eth0"
    },
    {
        id: 2,
        node: 1,
        topico: "Pacotes",
        dificuldade: "Fácil",
        titulo: "Configurar YUM Repository",
        descricao: "Configure um repositório YUM local.",
        comando: "sudo vim /etc/yum.repos.d/local.repo",
        solucao: "Conteúdo: [local]\nname=Local Repo\nbaseurl=file:///mnt\nenabled=1\ngpgcheck=0"
    },
    // ... adicione as outras 20 questões seguindo o mesmo padrão
    {
        id: 22,
        node: 2,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório Colaborativo com SGID",
        descricao: "Crie um diretório onde todos os arquivos herdem o grupo.",
        comando: "mkdir /shared && chmod 2775 /shared && chown :developers /shared",
        solucao: "Verifique: ls -ld /shared deve mostrar drwxrwsr-x"
    }
];

// Carregar questões na página
function carregarQuestoes() {
    const container = document.getElementById('questoes-container');
    container.innerHTML = '';
    
    const filtroNode = document.getElementById('filtroNode').value;
    const filtroDificuldade = document.getElementById('filtroDificuldade').value;
    const filtroTopico = document.getElementById('filtroTopico').value;
    
    const questoesFiltradas = questoes.filter(q => {
        return (filtroNode === 'all' || q.node == filtroNode) &&
               (filtroDificuldade === 'all' || q.dificuldade === filtroDificuldade) &&
               (filtroTopico === 'all' || q.topico === filtroTopico);
    });
    
    if (questoesFiltradas.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> Nenhuma questão encontrada com os filtros atuais.
                </div>
            </div>
        `;
        return;
    }
    
    questoesFiltradas.forEach(questao => {
        const card = criarCardQuestao(questao);
        container.innerHTML += card;
    });
    
    // Adicionar event listeners aos botões
    adicionarEventListeners();
}

// Criar card HTML para uma questão
function criarCardQuestao(questao) {
    const dificuldadeClass = `dificuldade-${questao.dificuldade.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`;
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="questao-card" data-id="${questao.id}">
                <div class="questao-header">
                    <div>
                        <h5 class="mb-1">Questão ${questao.id}</h5>
                        <small class="questao-id">Node ${questao.node} • ${questao.topico}</small>
                    </div>
                    <span class="dificuldade ${dificuldadeClass}">${questao.dificuldade}</span>
                </div>
                
                <h6>${questao.titulo}</h6>
                <p class="text-muted">${questao.descricao}</p>
                
                <div class="mt-3">
                    <button class="btn btn-sm btn-outline-primary ver-detalhes" data-id="${questao.id}">
                        <i class="fas fa-eye"></i> Ver Detalhes
                    </button>
                    <button class="btn btn-sm btn-terminal ms-2" onclick="window.location.href='terminal.html?questao=${questao.id}'">
                        <i class="fas fa-terminal"></i> Abrir Terminal
                    </button>
                </div>
                
                <div class="progress mt-3" style="display: none;">
                    <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                </div>
            </div>
        </div>
    `;
}

// Adicionar event listeners
function adicionarEventListeners() {
    // Botões "Ver Detalhes"
    document.querySelectorAll('.ver-detalhes').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            mostrarDetalhesQuestao(id);
        });
    });
    
    // Filtros
    document.getElementById('filtroNode').addEventListener('change', carregarQuestoes);
    document.getElementById('filtroDificuldade').addEventListener('change', carregarQuestoes);
    document.getElementById('filtroTopico').addEventListener('change', carregarQuestoes);
    
    // Botão Reset
    document.getElementById('btnReset').addEventListener('click', function() {
        document.getElementById('filtroNode').value = 'all';
        document.getElementById('filtroDificuldade').value = 'all';
        document.getElementById('filtroTopico').value = 'all';
        carregarQuestoes();
    });
}

// Mostrar detalhes da questão em modal
function mostrarDetalhesQuestao(id) {
    const questao = questoes.find(q => q.id == id);
    
    const modalHTML = `
        <div class="modal fade" id="modalQuestao" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Questão ${questao.id}: ${questao.titulo}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-md-3">
                                <strong>Node:</strong> ${questao.node}
                            </div>
                            <div class="col-md-3">
                                <strong>Tópico:</strong> ${questao.topico}
                            </div>
                            <div class="col-md-3">
                                <strong>Dificuldade:</strong> ${questao.dificuldade}
                            </div>
                        </div>
                        
                        <h6>Descrição:</h6>
                        <p>${questao.descricao}</p>
                        
                        <h6 class="mt-3">Comando Sugerido:</h6>
                        <div class="bg-dark text-light p-3 rounded">
                            <code>${questao.comando}</code>
                        </div>
                        
                        <h6 class="mt-3">Solução Esperada:</h6>
                        <div class="bg-light p-3 rounded">
                            <pre>${questao.solucao}</pre>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary" onclick="marcarComoConcluida(${questao.id})">
                            <i class="fas fa-check"></i> Marcar como Concluída
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar modal ao body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('modalQuestao'));
    modal.show();
    
    // Remover modal quando fechar
    document.getElementById('modalQuestao').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Marcar questão como concluída
function marcarComoConcluida(id) {
    // Salvar no localStorage
    let progresso = JSON.parse(localStorage.getItem('rhcsa-progresso') || '{}');
    progresso[id] = true;
    localStorage.setItem('rhcsa-progresso', JSON.stringify(progresso));
    
    // Atualizar interface
    const card = document.querySelector(`.questao-card[data-id="${id}"]`);
    if (card) {
        const progressBar = card.querySelector('.progress');
        const bar = progressBar.querySelector('.progress-bar');
        
        progressBar.style.display = 'block';
        bar.style.width = '100%';
        bar.classList.add('bg-success');
        bar.textContent = 'Concluído ✓';
    }
    
    // Fechar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalQuestao'));
    modal.hide();
    
    alert('✅ Questão marcada como concluída!');
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarQuestoes();
    
    // Verificar progresso salvo
    atualizarProgressoVisual();
});

// Atualizar visual do progresso
function atualizarProgressoVisual() {
    const progresso = JSON.parse(localStorage.getItem('rhcsa-progresso') || '{}');
    
    Object.keys(progresso).forEach(id => {
        const card = document.querySelector(`.questao-card[data-id="${id}"]`);
        if (card) {
            const progressBar = card.querySelector('.progress');
            const bar = progressBar.querySelector('.progress-bar');
            
            if (progressBar && bar) {
                progressBar.style.display = 'block';
                bar.style.width = '100%';
                bar.classList.add('bg-success');
                bar.textContent = 'Concluído ✓';
            }
        }
    });
}
