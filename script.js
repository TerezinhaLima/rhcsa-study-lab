// Dados das 22 questões COMPLETAS
const questoes = [
    {
        id: 1,
        node: 1,
        topico: "Rede",
        dificuldade: "Fácil",
        titulo: "Configurar IP Estático",
        descricao: "Configure um endereço IP estático (192.168.1.100/24) para a interface eth0.",
        comando: "nmcli connection modify eth0 ipv4.addresses 192.168.1.100/24",
        solucao: "Verifique com: ip addr show eth0"
    },
    {
        id: 2,
        node: 1,
        topico: "Pacotes",
        dificuldade: "Fácil",
        titulo: "Configurar YUM Repository",
        descricao: "Configure um repositório YUM local apontando para /mnt.",
        comando: "sudo vim /etc/yum.repos.d/local.repo",
        solucao: "[local]\nname=Local Repository\nbaseurl=file:///mnt\nenabled=1\ngpgcheck=0"
    },
    {
        id: 3,
        node: 1,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório com ACL",
        descricao: "Crie o diretório /shared com ACL para usuário alex.",
        comando: "mkdir /shared && chmod 770 /shared && setfacl -m u:alex:rwx /shared",
        solucao: "Verifique com: getfacl /shared"
    },
    {
        id: 4,
        node: 1,
        topico: "Usuários",
        dificuldade: "Fácil",
        titulo: "Criar usuário Redhat",
        descricao: "Crie usuário 'redhat' com UID 2000.",
        comando: "useradd -u 2000 redhat",
        solucao: "Verifique com: id redhat"
    },
    {
        id: 5,
        node: 1,
        topico: "Rede",
        dificuldade: "Médio",
        titulo: "SSH sem senha",
        descricao: "Configure autenticação por chave SSH.",
        comando: "ssh-keygen && ssh-copy-id usuario@host",
        solucao: "Teste login sem senha"
    },
    {
        id: 6,
        node: 1,
        topico: "Serviços",
        dificuldade: "Médio",
        titulo: "Servidor Web na porta 82",
        descricao: "Configure Apache para porta 82.",
        comando: "vim /etc/httpd/conf/httpd.conf",
        solucao: "Altere Listen 80 para Listen 82"
    },
    {
        id: 7,
        node: 1,
        topico: "Storage",
        dificuldade: "Difícil",
        titulo: "Volume Lógico LVM",
        descricao: "Crie LV de 5GB em /dev/sdb1.",
        comando: "pvcreate /dev/sdb1 && vgcreate vg01 /dev/sdb1 && lvcreate -L 5G -n lv01 vg01",
        solucao: "Verifique com: lvs"
    },
    {
        id: 8,
        node: 1,
        topico: "Agendamento",
        dificuldade: "Fácil",
        titulo: "Cronjob para devuser",
        descricao: "Configure tarefa agendada diária.",
        comando: "crontab -u devuser -e",
        solucao: "Adicione: 30 2 * * * /opt/backup.sh"
    },
    {
        id: 9,
        node: 1,
        topico: "Arquivos",
        dificuldade: "Fácil",
        titulo: "Compactar diretório /etc",
        descricao: "Crie backup compactado do /etc.",
        comando: "tar -czf /backup/etc-backup.tar.gz /etc",
        solucao: "Verifique arquivo criado"
    },
    {
        id: 10,
        node: 1,
        topico: "Usuários",
        dificuldade: "Fácil",
        titulo: "Usuário Alex e grupo Time-TI",
        descricao: "Crie usuário no grupo específico.",
        comando: "groupadd time-ti && useradd -g time-ti alex",
        solucao: "Verifique com: id alex"
    },
    {
        id: 11,
        node: 1,
        topico: "Usuários",
        dificuldade: "Fácil",
        titulo: "Criar usuário John com UID 3000",
        descricao: "Crie usuário com UID específico.",
        comando: "useradd -u 3000 john",
        solucao: "Verifique UID: getent passwd john"
    },
    {
        id: 12,
        node: 1,
        topico: "Arquivos",
        dificuldade: "Médio",
        titulo: "Localizar arquivos do usuário tom",
        descricao: "Encontre todos arquivos do usuário tom.",
        comando: "find / -user tom -type f 2>/dev/null",
        solucao: "Salve resultado em arquivo"
    },
    {
        id: 13,
        node: 1,
        topico: "Arquivos",
        dificuldade: "Médio",
        titulo: "Localizar arquivos do usuário jerry",
        descricao: "Encontre arquivos do usuário jerry.",
        comando: "find / -user jerry -type f 2>/dev/null",
        solucao: "Filtre por data de modificação"
    },
    {
        id: 14,
        node: 1,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório com sticky bit",
        descricao: "Crie diretório com sticky bit ativado.",
        comando: "mkdir /public && chmod 1777 /public",
        solucao: "Verifique permissões: ls -ld /public"
    },
    {
        id: 15,
        node: 1,
        topico: "Scripting",
        dificuldade: "Difícil",
        titulo: "Script para localizar arquivos e SGID",
        descricao: "Crie script para encontrar arquivos SGID.",
        comando: "vim /usr/local/bin/find-sgid.sh",
        solucao: "#!/bin/bash\nfind / -perm -2000 -type f 2>/dev/null"
    },
    {
        id: 16,
        node: 2,
        topico: "Segurança",
        dificuldade: "Difícil",
        titulo: "Recuperar senha root",
        descricao: "Redefina senha root esquecida.",
        comando: "Edite linha no GRUB com rd.break",
        solucao: "Siga procedimento de recuperação"
    },
    {
        id: 17,
        node: 2,
        topico: "Contêineres",
        dificuldade: "Médio",
        titulo: "Criar imagem de contêiner",
        descricao: "Crie imagem Docker personalizada.",
        comando: "vim Dockerfile",
        solucao: "FROM nginx:alpine\nCOPY index.html /usr/share/nginx/html/"
    },
    {
        id: 18,
        node: 2,
        topico: "Contêineres",
        dificuldade: "Difícil",
        titulo: "Criar contêiner sem raiz",
        descricao: "Configure Podman rootless.",
        comando: "podman run --rm alpine",
        solucao: "Configure /etc/subuid e /etc/subgid"
    },
    {
        id: 19,
        node: 2,
        topico: "Storage",
        dificuldade: "Médio",
        titulo: "Criar partição SWAP",
        descricao: "Crie e ative partição SWAP.",
        comando: "mkswap /dev/sdc1 && swapon /dev/sdc1",
        solucao: "Adicione ao /etc/fstab"
    },
    {
        id: 20,
        node: 2,
        topico: "Storage",
        dificuldade: "Difícil",
        titulo: "Volume Lógico com extensões específicas",
        descricao: "Crie LV usando 10 extensões físicas.",
        comando: "lvcreate -l 10 -n lv02 vg01",
        solucao: "Verifique tamanho com lvs"
    },
    {
        id: 21,
        node: 2,
        topico: "Performance",
        dificuldade: "Fácil",
        titulo: "Configurar tuned",
        descricao: "Configure perfil de performance.",
        comando: "tuned-adm profile throughput-performance",
        solucao: "Ative serviço tuned"
    },
    {
        id: 22,
        node: 2,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório colaborativo com SGID",
        descricao: "Crie diretório com bit SGID.",
        comando: "mkdir /collab && chmod 2775 /collab",
        solucao: "Verifique: ls -ld /collab"
    }
];

// Carregar questões na página - VERSÃO SIMPLIFICADA E FUNCIONAL
function carregarQuestoes() {
    console.log('Função carregarQuestoes() executada');
    console.log('Total de questões:', questoes.length);
    
    const container = document.getElementById('questoes-container');
    
    if (!container) {
        console.error('Elemento #questoes-container não encontrado!');
        return;
    }
    
    console.log('Container encontrado:', container);
    
    // Limpar container
    container.innerHTML = '';
    
    // Verificar filtros
    const filtroNode = document.getElementById('filtroNode') ? document.getElementById('filtroNode').value : 'all';
    const filtroDificuldade = document.getElementById('filtroDificuldade') ? document.getElementById('filtroDificuldade').value : 'all';
    const filtroTopico = document.getElementById('filtroTopico') ? document.getElementById('filtroTopico').value : 'all';
    
    console.log('Filtros:', { filtroNode, filtroDificuldade, filtroTopico });
    
    // Filtrar questões
    const questoesFiltradas = questoes.filter(q => {
        const passaNode = filtroNode === 'all' || q.node == filtroNode;
        const passaDificuldade = filtroDificuldade === 'all' || q.dificuldade === filtroDificuldade;
        const passaTopico = filtroTopico === 'all' || q.topico === filtroTopico;
        
        return passaNode && passaDificuldade && passaTopico;
    });
    
    console.log('Questões filtradas:', questoesFiltradas.length);
    
    if (questoesFiltradas.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i> 
                    Nenhuma questão encontrada com os filtros atuais.
                </div>
            </div>
        `;
        return;
    }
    
    // Criar HTML para cada questão
    let html = '';
    
    questoesFiltradas.forEach(questao => {
        const dificuldadeClass = `dificuldade-${questao.dificuldade.toLowerCase().replace('á', 'a').replace('í', 'i')}`;
        
        html += `
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
                    <a href="terminal.html?questao=${questao.id}" class="btn btn-sm btn-terminal ms-2">
                        <i class="fas fa-terminal"></i> Abrir Terminal
                    </a>
                </div>
                
                <div class="progress mt-3" style="display: none;">
                    <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Adicionar event listeners aos botões
    document.querySelectorAll('.ver-detalhes').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            mostrarDetalhesQuestao(id);
        });
    });
    
    console.log('Questões carregadas com sucesso!');
}

// Mostrar detalhes da questão
function mostrarDetalhesQuestao(id) {
    const questao = questoes.find(q => q.id == id);
    
    if (!questao) {
        alert('Questão não encontrada!');
        return;
    }
    
    // Criar modal simples (sem Bootstrap para evitar dependências)
    const modalHTML = `
        <div id="modal-questao" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        ">
            <div style="
                background: white;
                padding: 20px;
                border-radius: 10px;
                max-width: 800px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h4>Questão ${questao.id}: ${questao.titulo}</h4>
                    <button onclick="document.getElementById('modal-questao').remove()" style="
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <p><strong>Node:</strong> ${questao.node} | 
                       <strong>Tópico:</strong> ${questao.topico} | 
                       <strong>Dificuldade:</strong> ${questao.dificuldade}</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <h6>Descrição:</h6>
                    <p>${questao.descricao}</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <h6>Comando Sugerido:</h6>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace;">
                        ${questao.comando}
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h6>Solução Esperada:</h6>
                    <div style="background: #e9ecef; padding: 10px; border-radius: 5px; white-space: pre-wrap;">
                        ${questao.solucao}
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between;">
                    <button onclick="document.getElementById('modal-questao').remove()" style="
                        padding: 8px 16px;
                        background: #6c757d;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Fechar</button>
                    
                    <button onclick="marcarComoConcluida(${questao.id})" style="
                        padding: 8px 16px;
                        background: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    ">
                        <i class="fas fa-check"></i> Marcar como Concluída
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente
    const modalExistente = document.getElementById('modal-questao');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    // Adicionar novo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Marcar questão como concluída
function marcarComoConcluida(id) {
    // Salvar no localStorage
    let progresso = JSON.parse(localStorage.getItem('rhcsa-progresso') || '{}');
    progresso[id] = true;
    localStorage.setItem('rhcsa-progresso', JSON.stringify(progresso));
    
    // Fechar modal
    const modal = document.getElementById('modal-questao');
    if (modal) {
        modal.remove();
    }
    
    // Mostrar mensagem
    alert(`✅ Questão ${id} marcada como concluída!`);
    
    // Recarregar questões para atualizar progresso
    carregarQuestoes();
}

// Atualizar progresso visual
function atualizarProgressoVisual() {
    const progresso = JSON.parse(localStorage.getItem('rhcsa-progresso') || '{}');
    
    // Atualizar cada questão concluída
    Object.keys(progresso).forEach(id => {
        const card = document.querySelector(`.questao-card[data-id="${id}"]`);
        if (card) {
            const progressBar = card.querySelector('.progress');
            const bar = progressBar ? progressBar.querySelector('.progress-bar') : null;
            
            if (progressBar && bar) {
                progressBar.style.display = 'block';
                bar.style.width = '100%';
                bar.style.backgroundColor = '#28a745';
                bar.textContent = 'Concluído ✓';
            }
        }
    });
}

// Adicionar event listeners aos filtros
function configurarFiltros() {
    const filtroNode = document.getElementById('filtroNode');
    const filtroDificuldade = document.getElementById('filtroDificuldade');
    const filtroTopico = document.getElementById('filtroTopico');
    const btnReset = document.getElementById('btnReset');
    
    if (filtroNode) {
        filtroNode.addEventListener('change', carregarQuestoes);
    }
    
    if (filtroDificuldade) {
        filtroDificuldade.addEventListener('change', carregarQuestoes);
    }
    
    if (filtroTopico) {
        filtroTopico.addEventListener('change', carregarQuestoes);
    }
    
    if (btnReset) {
        btnReset.addEventListener('click', function() {
            if (filtroNode) filtroNode.value = 'all';
            if (filtroDificuldade) filtroDificuldade.value = 'all';
            if (filtroTopico) filtroTopico.value = 'all';
            carregarQuestoes();
        });
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada - iniciando RHCSA Study Lab');
    
    // Carregar questões
    carregarQuestoes();
    
    // Configurar filtros
    configurarFiltros();
    
    // Atualizar progresso visual
    atualizarProgressoVisual();
    
    // Log de inicialização
    console.log('RHCSA Study Lab inicializado com sucesso!');
    console.log('Total de questões disponíveis:', questoes.length);
});
