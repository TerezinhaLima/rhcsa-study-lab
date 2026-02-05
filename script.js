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
// ==================== SISTEMA DE COMANDOS AVANÇADO ====================
const comandosTerminal = {
    // Comandos básicos
    'whoami': 'root',
    
    'hostnamectl': `Static hostname: rhcsa-lab
       Icon name: computer-vm
         Chassis: vm
      Machine ID: 1234567890abcdef
         Boot ID: abcdef1234567890
  Virtualization: kvm
Operating System: Red Hat Enterprise Linux 8.5 (Ootpa)
          Kernel: Linux 4.18.0-348.el8.x86_64
    Architecture: x86-64`,
    
    'hostnamectl set-hostname Machine1.example.com': 'Hostname set to: Machine1.example.com',
    
    'ip addr show': `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:12:34:56 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0
       valid_lft forever preferred_lft forever`,
    
    'nmcli connection modify eth0 ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1 ipv4.dns 8.8.8.8 ipv4.method manual': 
    'Connection modified successfully.',
    
    'nmcli connection up eth0': 'Connection successfully activated.',
    
    // Storage
    'lsblk': `NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   20G  0 disk
├─sda1   8:1    0    1G  0 part /boot
└─sda2   8:2    0   19G  0 part
  ├─rhel-root 253:0    0   17G  0 lvm  /
  └─rhel-swap 253:1    0    2G  0 lvm  [SWAP]
sdb      8:16   0   10G  0 disk
└─sdb1   8:17   0   10G  0 part`,
    
    'pvcreate /dev/sdb1': 'Physical volume "/dev/sdb1" successfully created.',
    
    'vgcreate datavg /dev/sdb1': 'Volume group "datavg" successfully created',
    
    'lvcreate -L 5G -n datalv datavg': 'Logical volume "datalv" created.',
    
    // Serviços
    'systemctl status httpd': `● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
   Active: active (running) since Mon 2024-01-01 10:00:00 UTC; 1h ago
 Main PID: 1234 (httpd)
    Tasks: 213 (limit: 11336)
   Memory: 25.3M
   CGroup: /system.slice/httpd.service
           ├─1234 /usr/sbin/httpd -DFOREGROUND
           ├─1235 /usr/sbin/httpd -DFOREGROUND
           └─1236 /usr/sbin/httpd -DFOREGROUND`,
    
    'systemctl start httpd': 'Started The Apache HTTP Server.',
    
    'systemctl enable httpd': 'Created symlink /etc/systemd/system/multi-user.target.wants/httpd.service → /usr/lib/systemd/system/httpd.service.',
    
    // Segurança
    'getenforce': 'Enforcing',
    
    'setenforce 0': 'SELinux disabled temporarily.',
    
    // Usuários e grupos
    'useradd redhat': 'User "redhat" created successfully.',
    
    'groupadd time-ti': 'Group "time-ti" created successfully.',
    
    'useradd -g time-ti alex': 'User "alex" added to group "time-ti".',
    
    // Permissões
    'mkdir /shared': '',
    
    'chmod 770 /shared': '',
    
    'setfacl -m u:alex:rwx /shared': 'ACL modified for /shared.',
    
    'getfacl /shared': `# file: shared
# owner: root
# group: root
user::rwx
user:alex:rwx
group::rwx
mask::rwx
other::---`,
    
    // Network
    'firewall-cmd --add-port=82/tcp --permanent': 'success',
    
    'firewall-cmd --reload': 'success',
    
    // Outros
    'df -h': `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        19G  5.2G   14G  28% /
/dev/sda1       976M  256M  653M  28% /boot
tmpfs           1.9G     0  1.9G   0% /dev/shm
/dev/mapper/datavg-datalv  5.0G   33M  5.0G   1% /data`,
    
    'free -h': `              total        used        free      shared  buff/cache   available
Mem:           1.9G        800M        300M         50M        800M        900M
Swap:          2.0G          0B        2.0G`,
    
    'ps aux | head -10': `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169316 13104 ?        Ss   10:00   0:01 /usr/lib/systemd/systemd
root         2  0.0  0.0      0     0 ?        S    10:00   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        I<   10:00   0:00 [rcu_gp]`,
    
    'ls': `Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos`,
    
    'pwd': '/root',
    
    'date': 'Mon Mar  1 10:30:00 UTC 2024',
    
    'uname -a': 'Linux rhcsa-lab 4.18.0-348.el8.x86_64 #1 SMP Wed Oct 13 14:25:44 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux',
    
    'help': `=== COMANDOS DISPONÍVEIS ===

🌐 REDE:
  ip addr show                    - Mostra interfaces de rede
  nmcli connection modify ...     - Configura IP estático
  hostnamectl set-hostname ...    - Altera hostname
  firewall-cmd ...                - Gerencia firewall

💾 STORAGE:
  lsblk                           - Lista dispositivos de bloco
  pvcreate /dev/sdb1              - Cria volume físico LVM
  vgcreate datavg /dev/sdb1       - Cria grupo de volumes
  lvcreate -L 5G -n datalv datavg - Cria volume lógico
  df -h                           - Espaço em disco

👥 USUÁRIOS E PERMISSÕES:
  useradd [nome]                  - Cria usuário
  groupadd [nome]                 - Cria grupo
  mkdir /shared                   - Cria diretório
  chmod 770 /shared               - Altera permissões
  setfacl -m u:[user]:rwx /shared - Configura ACL
  getfacl /shared                 - Mostra ACL

⚙️ SERVIÇOS:
  systemctl status httpd          - Status do Apache
  systemctl start httpd           - Inicia serviço
  systemctl enable httpd          - Habilita no boot

🔒 SEGURANÇA:
  getenforce                      - Status SELinux
  setenforce 0                    - Desabilita SELinux

📊 SISTEMA:
  whoami                          - Usuário atual
  hostnamectl                     - Informações do sistema
  free -h                         - Memória e swap
  ps aux                          - Processos

❓ AJUDA:
  clear                           - Limpa terminal
  help                            - Mostra esta ajuda

💡 DICA: Use TAB para auto-completar comandos!`
};

// Sistema de auto-completar com TAB
let historicoComandos = [];
let indiceHistorico = -1;

// Função melhorada para executar comandos
function executarComando() {
    const input = document.getElementById('terminal-input');
    let comando = input.value.trim();
    
    if (!comando) return;
    
    // Adicionar ao histórico
    historicoComandos.push(comando);
    indiceHistorico = historicoComandos.length;
    
    // Mostrar comando executado
    adicionarSaidaTerminal(`<span class="terminal-command">${comando}</span>`, 'command');
    
    // Processar comandos especiais
    if (comando === 'clear') {
        limparTerminal();
        input.value = '';
        return;
    }
    
    if (comando === 'exit') {
        adicionarSaidaTerminal('Use as abas para navegar. Digite "help" para ver comandos.', 'info');
        input.value = '';
        return;
    }
    
    // Verificar se comando existe (com aproximação para erros de digitação)
    let comandoEncontrado = null;
    
    // Primeiro tentar match exato
    if (comandosTerminal[comando]) {
        comandoEncontrado = comando;
    } else {
        // Tentar encontrar comando similar (para lidar com erros de digitação)
        const comandosDisponiveis = Object.keys(comandosTerminal);
        for (let cmd of comandosDisponiveis) {
            if (cmd.startsWith(comando.split(' ')[0])) {
                // Sugerir comando correto
                if (comando.includes('hostanmectl')) {
                    comandoEncontrado = cmd.replace('hostanmectl', 'hostnamectl');
                    adicionarSaidaTerminal(`💡 Dica: O comando correto é "hostnamectl" (sem o 'n' extra)`, 'info');
                } else if (cmd.includes(comando) || levenshteinDistance(cmd, comando) < 3) {
                    comandoEncontrado = cmd;
                    adicionarSaidaTerminal(`💡 Você quis dizer: "${cmd}"?`, 'info');
                }
            }
        }
    }
    
    if (comandoEncontrado && comandosTerminal[comandoEncontrado]) {
        // Executar comando
        const resultado = comandosTerminal[comandoEncontrado];
        if (resultado) {
            adicionarSaidaTerminal(resultado, 'normal');
        }
        
        // Verificar se este comando corresponde a alguma questão
        verificarComandoQuestao(comandoEncontrado);
    } else {
        adicionarSaidaTerminal(`bash: ${comando}: comando não encontrado\nDigite 'help' para ajuda.`, 'error');
    }
    
    input.value = '';
    input.focus();
}

// Função de distância Levenshtein para correção de erros de digitação
function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

// ==================== SISTEMA DE VERIFICAÇÃO INTELIGENTE ====================
const solucoesQuestoes = {
    1: ['nmcli connection modify eth0', '192.168.1.100', 'ip addr show'],
    2: ['vim /etc/yum.repos.d/local.repo', 'baseurl=file:///mnt', 'yum repolist'],
    3: ['mkdir /shared', 'chmod 770', 'setfacl', 'getfacl'],
    4: ['useradd redhat', 'groupadd', 'uid=2000'],
    5: ['ssh-keygen', 'ssh-copy-id'],
    6: ['Listen 82', 'firewall-cmd', 'systemctl'],
    7: ['pvcreate', 'vgcreate', 'lvcreate', 'mkfs.xfs'],
    8: ['crontab', '30 2'],
    9: ['tar -czf', '/etc'],
    10: ['groupadd time-ti', 'useradd -g time-ti'],
    11: ['useradd -u 3000'],
    12: ['find / -user tom'],
    13: ['find / -user jerry', '-mtime -7'],
    14: ['mkdir /public', 'chmod 1777'],
    15: ['vim /usr/local/bin/find-sgid.sh', 'find / -perm -2000'],
    16: ['rd.break', 'passwd root'],
    17: ['Dockerfile', 'FROM nginx', 'podman build'],
    18: ['podman', 'rootless', '/etc/subuid'],
    19: ['mkswap', 'swapon', '/etc/fstab'],
    20: ['lvcreate -l 10'],
    21: ['tuned-adm profile', 'throughput-performance'],
    22: ['mkdir /collab', 'chmod 2775', 'SGID']
};

let comandosExecutados = [];

function verificarComandoQuestao(comando) {
    comandosExecutados.push(comando);
    
    // Verificar cada questão
    for (let id in solucoesQuestoes) {
        const palavrasChave = solucoesQuestoes[id];
        const correspondencias = palavrasChave.filter(palavra => 
            comando.toLowerCase().includes(palavra.toLowerCase())
        ).length;
        
        if (correspondencias >= 2) {
            // Encontrou correspondência com uma questão
            setTimeout(() => {
                const questao = questoes.find(q => q.id == id);
                if (questao && !progresso[id]) {
                    adicionarSaidaTerminal(`🔍 Detectei que você está trabalhando na Questão ${id}: ${questao.titulo}`, 'info');
                    adicionarSaidaTerminal(`💡 Dica: ${questao.solucao.substring(0, 100)}...`, 'info');
                }
            }, 500);
            break;
        }
    }
    
    // Limitar histórico de comandos
    if (comandosExecutados.length > 50) {
        comandosExecutados = comandosExecutados.slice(-50);
    }
}

// Função de verificação melhorada
function verificarQuestao() {
    const select = document.getElementById('questao-verificar');
    const id = parseInt(select.value);
    
    if (!id) {
        alert('Selecione uma questão primeiro!');
        return;
    }
    
    const questao = questoes.find(q => q.id == id);
    if (!questao) return;
    
    // Registrar tentativa
    tentativas[questao.id] = (tentativas[questao.id] || 0) + 1;
    localStorage.setItem('rhcsa-tentativas', JSON.stringify(tentativas));
    
    // Verificação inteligente baseada nos comandos executados
    const palavrasChave = solucoesQuestoes[id];
    let pontuacao = 0;
    let feedback = [];
    
    comandosExecutados.forEach(comando => {
        palavrasChave.forEach(palavra => {
            if (comando.toLowerCase().includes(palavra.toLowerCase())) {
                pontuacao += 1;
                feedback.push(`✓ Executou: ${comando}`);
            }
        });
    });
    
    // Determinar se passou (mínimo 60% das palavras-chave)
    const porcentagem = (pontuacao / palavrasChave.length) * 100;
    const aprovado = porcentagem >= 60;
    
    if (aprovado) {
        progresso[questao.id] = true;
        localStorage.setItem('rhcsa-progresso', JSON.stringify(progresso));
        
        adicionarSaidaTerminal(`✅ Questão ${id} VERIFICADA com SUCESSO! (${Math.round(porcentagem)}% correto)`, 'success');
        
        // Feedback detalhado
        feedback.forEach(msg => {
            adicionarSaidaTerminal(msg, 'info');
        });
        
        if (porcentagem < 100) {
            adicionarSaidaTerminal(`💡 Você acertou ${pontuacao} de ${palavrasChave.length} passos. Continue praticando!`, 'info');
        } else {
            adicionarSaidaTerminal(`🎉 PERFEITO! Você completou todos os passos corretamente!`, 'success');
        }
    } else {
        adicionarSaidaTerminal(`❌ Questão ${id} precisa de ajustes. (${Math.round(porcentagem)}% correto)`, 'error');
        
        // Mostrar o que falta
        const palavrasFaltantes = palavrasChave.filter(palavra => 
            !comandosExecutados.some(cmd => cmd.toLowerCase().includes(palavra.toLowerCase()))
        );
        
        if (palavrasFaltantes.length > 0) {
            adicionarSaidaTerminal(`📝 Faltou executar estes passos:`, 'info');
            palavrasFaltantes.forEach(palavra => {
                adicionarSaidaTerminal(`   • ${palavra}`, 'info');
            });
        }
        
        adicionarSaidaTerminal(`💡 Dica: ${questao.solucao.substring(0, 150)}`, 'info');
    }
    
    // Atualizar interface
    atualizarProgresso();
    carregarQuestoes();
}

// ==================== FUNÇÃO PARA AUTO-COMPLETAR ====================
function configurarAutoComplete() {
    const input = document.getElementById('terminal-input');
    
    input.addEventListener('keydown', function(e) {
        // TAB para auto-completar
        if (e.key === 'Tab') {
            e.preventDefault();
            const texto = this.value.trim();
            const comandos = Object.keys(comandosTerminal);
            
            // Encontrar comando que começa com o texto digitado
            const match = comandos.find(cmd => cmd.startsWith(texto));
            if (match) {
                this.value = match;
            }
        }
        
        // Setas para navegar no histórico
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (indiceHistorico > 0) {
                indiceHistorico--;
                this.value = historicoComandos[indiceHistorico];
            }
        }
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (indiceHistorico < historicoComandos.length - 1) {
                indiceHistorico++;
                this.value = historicoComandos[indiceHistorico];
            } else {
                indiceHistorico = historicoComandos.length;
                this.value = '';
            }
        }
    });
}

// ==================== BOTÕES DE COMANDOS RÁPIDOS MELHORADOS ====================
function atualizarBotoesComandos() {
    // Esta função pode ser usada para atualizar dinamicamente os botões
    // com base na questão selecionada
}

// ==================== INICIALIZAÇÃO MELHORADA ====================
document.addEventListener('DOMContentLoaded', function() {
    // ... código anterior ...
    
    // Configurar auto-complete
    configurarAutoComplete();
    
    // Mensagem de boas-vindas no terminal
    setTimeout(() => {
        adicionarSaidaTerminal('💡 Dica: Digite "help" para ver todos os comandos disponíveis.', 'info');
        adicionarSaidaTerminal('💡 Use TAB para auto-completar comandos.', 'info');
        adicionarSaidaTerminal('💡 Use setas ↑↓ para navegar no histórico.', 'info');
    }, 1000);
});
