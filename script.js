// ==================== DADOS DAS QUESTÕES ATUALIZADAS RHEL 10 ====================
const questoes = [
    {
        id: 1,
        node: 1,
        topico: "Rede",
        dificuldade: "Fácil",
        titulo: "Configurar IP Estático",
        descricao: "Configure um endereço IP estático (192.168.1.100/24) para a interface eth0 com gateway 192.168.1.1 e DNS 8.8.8.8.",
        comando: "nmcli connection modify eth0 ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1 ipv4.dns 8.8.8.8 ipv4.method manual && nmcli connection up eth0",
        solucao: "Verifique com: ip addr show eth0\nGateway: ip route show\nDNS: cat /etc/resolv.conf"
    },
    {
        id: 2,
        node: 1,
        topico: "Pacotes",
        dificuldade: "Fácil",
        titulo: "Configurar DNF Repository",
        descricao: "Configure um repositório DNF local apontando para /mnt.",
        comando: "vim /etc/yum.repos.d/local.repo",
        solucao: "[local]\nname=Local Repository\nbaseurl=file:///mnt\nenabled=1\ngpgcheck=0\n\nVerifique: dnf repolist"
    },
    {
        id: 3,
        node: 1,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório com ACL",
        descricao: "Crie o diretório /shared com ACL para usuário alex.",
        comando: "mkdir /shared && chmod 770 /shared && setfacl -m u:alex:rwx /shared",
        solucao: "Verifique com: getfacl /shared\nDeve mostrar: user:alex:rwx"
    },
    {
        id: 4,
        node: 1,
        topico: "Usuários",
        dificuldade: "Fácil",
        titulo: "Criar usuário Redhat",
        descricao: "Crie usuário 'redhat' com UID 2000 e grupo primário 'redhat'.",
        comando: "groupadd -g 2000 redhat && useradd -u 2000 -g 2000 redhat",
        solucao: "Verifique com: id redhat\nDeve mostrar: uid=2000(redhat) gid=2000(redhat)"
    },
    {
        id: 5,
        node: 1,
        topico: "Rede",
        dificuldade: "Médio",
        titulo: "SSH sem senha",
        descricao: "Configure autenticação por chave SSH para o usuário atual.",
        comando: "ssh-keygen -t rsa -N '' -f ~/.ssh/id_rsa && ssh-copy-id user@192.168.1.50",
        solucao: "Teste login: ssh user@192.168.1.50\nDeve conectar sem senha"
    },
    {
        id: 6,
        node: 1,
        topico: "Serviços",
        dificuldade: "Médio",
        titulo: "Servidor Web na porta 82",
        descricao: "Configure Apache (httpd) para escutar na porta 82.",
        comando: "sed -i 's/Listen 80/Listen 82/' /etc/httpd/conf/httpd.conf && systemctl restart httpd && firewall-cmd --add-port=82/tcp --permanent && firewall-cmd --reload",
        solucao: "Verifique: ss -tlnp | grep :82\nTeste: curl http://localhost:82"
    },
    {
        id: 7,
        node: 1,
        topico: "Storage",
        dificuldade: "Difícil",
        titulo: "Volume Lógico LVM",
        descricao: "Crie LV de 5GB em /dev/sdb1, formate com XFS e monte em /data.",
        comando: "pvcreate /dev/sdb1 && vgcreate vg01 /dev/sdb1 && lvcreate -L 5G -n lv01 vg01 && mkfs.xfs /dev/vg01/lv01 && mkdir /data && echo '/dev/vg01/lv01 /data xfs defaults 0 0' >> /etc/fstab && mount -a",
        solucao: "Verifique com: lvs\ndf -h /data\ncat /etc/fstab | grep lv01"
    },
    {
        id: 8,
        node: 1,
        topico: "Agendamento",
        dificuldade: "Fácil",
        titulo: "Cronjob para devuser",
        descricao: "Configure tarefa agendada diária para usuário devuser.",
        comando: "crontab -u devuser -e",
        solucao: "Adicione: 30 2 * * * /opt/backup.sh\nVerifique: crontab -u devuser -l"
    },
    {
        id: 9,
        node: 1,
        topico: "Arquivos",
        dificuldade: "Fácil",
        titulo: "Compactar diretório /etc",
        descricao: "Crie backup compactado do /etc com data no nome.",
        comando: "tar -czf /backup/etc-backup-$(date +%Y%m%d).tar.gz /etc",
        solucao: "Verifique: ls -lh /backup/\nDeve ter arquivo com data"
    },
    {
        id: 10,
        node: 1,
        topico: "Usuários",
        dificuldade: "Fácil",
        titulo: "Usuário Alex e grupo Time-TI",
        descricao: "Crie usuário alex no grupo time-ti com shell bash.",
        comando: "groupadd time-ti && useradd -g time-ti -s /bin/bash alex",
        solucao: "Verifique: id alex\ngroups=time-ti\nShell: grep alex /etc/passwd"
    },
    {
        id: 11,
        node: 1,
        topico: "Usuários",
        dificuldade: "Fácil",
        titulo: "Criar usuário John com UID 3000",
        descricao: "Crie usuário john com UID específico e diretório home personalizado.",
        comando: "useradd -u 3000 -d /home/johndev -m john",
        solucao: "Verifique: getent passwd john | grep ':3000:'\nDiretório: ls -ld /home/johndev"
    },
    {
        id: 12,
        node: 1,
        topico: "Arquivos",
        dificuldade: "Médio",
        titulo: "Localizar arquivos do usuário tom",
        descricao: "Encontre todos arquivos do usuário tom e salve lista.",
        comando: "find / -user tom -type f 2>/dev/null > /tmp/tom-files.txt",
        solucao: "Verifique: head -5 /tmp/tom-files.txt\nContagem: wc -l /tmp/tom-files.txt"
    },
    {
        id: 13,
        node: 1,
        topico: "Arquivos",
        dificuldade: "Médio",
        titulo: "Localizar arquivos do usuário jerry",
        descricao: "Encontre arquivos do usuário jerry modificados nos últimos 7 dias.",
        comando: "find / -user jerry -mtime -7 -type f 2>/dev/null",
        solucao: "Comando lista arquivos modificados recentemente.\nPara contar: adicione | wc -l"
    },
    {
        id: 14,
        node: 1,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório com sticky bit",
        descricao: "Crie diretório /public com sticky bit ativado.",
        comando: "mkdir /public && chmod 1777 /public",
        solucao: "Verifique: ls -ld /public\nDeve mostrar: drwxrwxrwt"
    },
    {
        id: 15,
        node: 1,
        topico: "Scripting",
        dificuldade: "Difícil",
        titulo: "Script para localizar arquivos e SGID",
        descricao: "Crie script para encontrar arquivos SGID.",
        comando: "echo '#!/bin/bash\nfind / -perm -2000 -type f 2>/dev/null\necho \"Busca completa\"' > /usr/local/bin/find-sgid.sh && chmod +x /usr/local/bin/find-sgid.sh",
        solucao: "Teste: /usr/local/bin/find-sgid.sh\nPermissões: ls -la /usr/local/bin/find-sgid.sh"
    },
    {
        id: 16,
        node: 2,
        topico: "Segurança",
        dificuldade: "Difícil",
        titulo: "Recuperar senha root",
        descricao: "Procedimento para redefinir senha root esquecida.",
        comando: "# 1. Reinicie\n# 2. No GRUB pressione 'e'\n# 3. Adicione 'rd.break' ao final da linha linux\n# 4. Ctrl+X\n# 5. mount -o remount,rw /sysroot\n# 6. chroot /sysroot\n# 7. passwd root\n# 8. touch /.autorelabel\n# 9. exit\n# 10. reboot",
        solucao: "Após reboot, login com nova senha."
    },
    {
        id: 17,
        node: 2,
        topico: "Contêineres",
        dificuldade: "Médio",
        titulo: "Criar imagem de contêiner",
        descricao: "Crie imagem Docker/Podman com Nginx personalizado.",
        comando: "echo 'FROM nginx:alpine\nCOPY index.html /usr/share/nginx/html/' > Dockerfile && podman build -t my-nginx:v1 .",
        solucao: "Verifique: podman images | grep my-nginx\nExecute: podman run -d -p 8080:80 my-nginx:v1"
    },
    {
        id: 18,
        node: 2,
        topico: "Contêineres",
        dificuldade: "Difícil",
        titulo: "Contêiner sem raiz (rootless)",
        descricao: "Configure Podman para executar contêineres sem root.",
        comando: "echo '$USER:100000:65536' | sudo tee -a /etc/subuid && echo '$USER:100000:65536' | sudo tee -a /etc/subgid",
        solucao: "Verifique: podman info | grep rootless\nTeste: podman run --rm alpine echo 'teste'"
    },
    {
        id: 19,
        node: 2,
        topico: "Storage",
        dificuldade: "Médio",
        titulo: "Criar partição SWAP",
        descricao: "Crie e ative partição SWAP de 2GB.",
        comando: "mkswap /dev/sdc1 && swapon /dev/sdc1 && echo '/dev/sdc1 swap swap defaults 0 0' >> /etc/fstab",
        solucao: "Verifique: swapon --show\nfree -h\ncat /etc/fstab | grep swap"
    },
    {
        id: 20,
        node: 2,
        topico: "Storage",
        dificuldade: "Difícil",
        titulo: "Volume Lógico com extensões específicas",
        descricao: "Crie LV usando 10 extensões físicas (~640MB).",
        comando: "lvcreate -l 10 -n lv02 vg01",
        solucao: "Verifique: lvs\ndf -h /dev/vg01/lv02"
    },
    {
        id: 21,
        node: 2,
        topico: "Performance",
        dificuldade: "Fácil",
        titulo: "Configurar tuned",
        descricao: "Configure perfil de performance no tuned.",
        comando: "dnf install tuned -y && systemctl enable --now tuned && tuned-adm profile throughput-performance",
        solucao: "Verifique: tuned-adm active\nsystemctl status tuned"
    },
    {
        id: 22,
        node: 2,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório colaborativo com SGID",
        descricao: "Crie diretório /collab com bit SGID para grupo developers.",
        comando: "mkdir /collab && chgrp developers /collab && chmod 2775 /collab",
        solucao: "Verifique: ls -ld /collab\nDeve mostrar: drwxrwsr-x"
    }
];

// ==================== SISTEMA DE PROGRESSO ====================
let progresso = JSON.parse(localStorage.getItem('rhcsa-progresso')) || {};
let tentativas = JSON.parse(localStorage.getItem('rhcsa-tentativas')) || {};
let questaoAtual = null;

// ==================== FUNÇÕES DE QUESTÕES ====================

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
        const concluida = progresso[questao.id] || false;
        const statusIcon = concluida ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-clock text-secondary"></i>';
        
        html += `
        <div class="col-md-6 col-lg-4">
            <div class="questao-card ${concluida ? 'questao-concluida' : ''}" data-id="${questao.id}">
                <div class="questao-header">
                    <div>
                        <h5 class="mb-1">${statusIcon} Questão ${questao.id}</h5>
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
                    <button class="btn btn-sm btn-terminal ms-2" onclick="abrirTerminalParaQuestao(${questao.id})">
                        <i class="fas fa-terminal"></i> Terminal
                    </button>
                </div>
                
                ${concluida ? 
                    '<div class="progress mt-3"><div class="progress-bar bg-success" style="width: 100%">Concluído ✓</div></div>' : 
                    '<div class="progress mt-3" style="display: none;"><div class="progress-bar" style="width: 0%"></div></div>'
                }
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

function abrirTerminalParaQuestao(id) {
    // Mudar para a aba do terminal
    const terminalTab = document.getElementById('terminal-tab');
    if (terminalTab) {
        terminalTab.click();
    }
    
    // Atualizar o dropdown de verificação
    const select = document.getElementById('questao-verificar');
    if (select) {
        select.value = id;
    }
    
    // Mostrar mensagem no terminal
    const questao = questoes.find(q => q.id == id);
    if (questao) {
        setTimeout(() => {
            adicionarSaidaTerminal(`🔍 Praticando Questão ${id}: ${questao.titulo}`, 'info');
            adicionarSaidaTerminal(`📝 Objetivo: ${questao.descricao}`, 'info');
        }, 500);
    }
}

// Mostrar detalhes da questão
function mostrarDetalhesQuestao(id) {
    questaoAtual = questoes.find(q => q.id == id);
    
    if (!questaoAtual) {
        alert('Questão não encontrada!');
        return;
    }
    
    // Criar modal
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
                    <h4>Questão ${questaoAtual.id}: ${questaoAtual.titulo}</h4>
                    <button onclick="document.getElementById('modal-questao').remove()" style="
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <p><strong>Node:</strong> ${questaoAtual.node} | 
                       <strong>Tópico:</strong> ${questaoAtual.topico} | 
                       <strong>Dificuldade:</strong> ${questaoAtual.dificuldade}</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <h6>Descrição:</h6>
                    <p>${questaoAtual.descricao}</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <h6>Comando Sugerido:</h6>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace;">
                        ${questaoAtual.comando}
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h6>Solução Esperada:</h6>
                    <div style="background: #e9ecef; padding: 10px; border-radius: 5px; white-space: pre-wrap;">
                        ${questaoAtual.solucao}
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
                    
                    <div>
                        <button onclick="testarQuestaoNoTerminal()" style="
                            padding: 8px 16px;
                            background: #28a745;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            margin-right: 10px;
                        ">
                            <i class="fas fa-terminal"></i> Testar no Terminal
                        </button>
                        
                        <button onclick="marcarComoConcluida(${questaoAtual.id})" style="
                            padding: 8px 16px;
                            background: #007bff;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        ">
                            <i class="fas fa-check"></i> Marcar Concluída
                        </button>
                    </div>
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

function testarQuestaoNoTerminal() {
    if (!questaoAtual) return;
    
    // Fechar modal
    const modal = document.getElementById('modal-questao');
    if (modal) {
        modal.remove();
    }
    
    // Ir para a aba do terminal
    abrirTerminalParaQuestao(questaoAtual.id);
    
    // Limpar terminal
    setTimeout(() => {
        limparTerminal();
        
        // Mostrar instruções
        adicionarSaidaTerminal(`🧪 TESTANDO QUESTÃO ${questaoAtual.id}: ${questaoAtual.titulo}`, 'info');
        adicionarSaidaTerminal(`📋 Descrição: ${questaoAtual.descricao}`, 'info');
        adicionarSaidaTerminal(`💡 Comando sugerido: ${questaoAtual.comando}`, 'info');
        adicionarSaidaTerminal(`🚀 Execute os comandos acima para praticar.`, 'info');
        adicionarSaidaTerminal(`✅ Depois use "Verificar Solução" para testar.`, 'info');
    }, 300);
}

// Marcar questão como concluída
function marcarComoConcluida(id) {
    // Salvar no localStorage
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
    atualizarProgressoVisual();
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

// ==================== COMANDOS DO TERMINAL ATUALIZADOS RHEL 10 ====================
const comandosTerminal = {
    // Comandos básicos RHEL 10
    'whoami': 'root',
    
    'hostnamectl': `Static hostname: rhcsa10-lab
       Icon name: computer-vm
         Chassis: vm
      Machine ID: 1234567890abcdef
         Boot ID: abcdef1234567890
  Virtualization: kvm
Operating System: Red Hat Enterprise Linux 10.0 (Plow)
          Kernel: Linux 6.6.0-0.rc5.20231003git4f4e6a1.el10.x86_64
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
    
    // DNF (RHEL 10)
    'dnf repolist': `repo id                            repo name
rhel-10-baseos                  Red Hat Enterprise Linux 10 - BaseOS
rhel-10-appstream               Red Hat Enterprise Linux 10 - AppStream
local                           Local Repository`,
    
    'dnf install httpd': `Last metadata expiration check: 0:01:23 ago
Dependencies resolved.
Package          Arch   Version          Repository      Size
Installing:
 httpd           x86_64 2.4.57-10.el10   rhel-10-appstream 1.5 M
Complete!`,
    
    // Storage - RHEL 10
    'lsblk': `NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   20G  0 disk
├─sda1   8:1    0    1G  0 part /boot
└─sda2   8:2    0   19G  0 part
  ├─rhel-root 253:0    0   17G  0 lvm  /
  └─rhel-swap 253:1    0    2G  0 lvm  [SWAP]
sdb      8:16   0   10G  0 disk
└─sdb1   8:17   0   10G  0 part
sdc      8:32   0    5G  0 disk
└─sdc1   8:33   0    5G  0 part`,
    
    'pvcreate /dev/sdb1': 'Physical volume "/dev/sdb1" successfully created.',
    
    'vgcreate vg01 /dev/sdb1': 'Volume group "vg01" successfully created',
    
    'lvcreate -L 5G -n lv01 vg01': 'Logical volume "lv01" created.',
    
    'lvcreate -l 10 -n lv02 vg01': 'Logical volume "lv02" created.',
    
    // Serviços RHEL 10
    'systemctl status httpd': `● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; preset: disabled)
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
    
    // Segurança RHEL 10
    'getenforce': 'Enforcing',
    
    'setenforce 0': 'SELinux disabled temporarily.',
    
    // Usuários e grupos
    'useradd redhat': 'User "redhat" created successfully.',
    
    'groupadd time-ti': 'Group "time-ti" created successfully.',
    
    'useradd -g time-ti alex': 'User "alex" added to group "time-ti".',
    
    'useradd -u 3000 john': 'User "john" created with UID 3000.',
    
    // Permissões RHEL 10
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
    
    'mkdir /public': '',
    
    'chmod 1777 /public': '',
    
    'ls -ld /public': 'drwxrwxrwt. 2 root root 4096 Jan  1 10:00 /public',
    
    'mkdir /collab': '',
    
    'chgrp developers /collab': '',
    
    'chmod 2775 /collab': '',
    
    'ls -ld /collab': 'drwxrwsr-x. 2 root developers 4096 Jan  1 10:00 /collab',
    
    // Network - RHEL 10
    'firewall-cmd --add-port=82/tcp --permanent': 'success',
    
    'firewall-cmd --reload': 'success',
    
    // Comandos de busca
    'find / -user tom -type f 2>/dev/null': `/home/tom/file1.txt
/home/tom/document.pdf
/var/log/tom-app.log`,
    
    'find / -user jerry -mtime -7 -type f 2>/dev/null': `/home/jerry/recent-file.txt
/home/jerry/.bash_history`,
    
    'find / -perm -2000 -type f 2>/dev/null': `/usr/bin/passwd
/usr/bin/chsh
/usr/bin/chfn`,
    
    // Outros comandos RHEL 10
    'df -h': `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        19G  5.2G   14G  28% /
/dev/sda1       976M  256M  653M  28% /boot
tmpfs           1.9G     0  1.9G   0% /dev/shm
/dev/mapper/vg01-lv01  5.0G   33M  5.0G   1% /data`,
    
    'free -h': `              total        used        free      shared  buff/cache   available
Mem:           3.9G        1.2G        1.5G         50M        1.2G        2.3G
Swap:          2.0G          0B        2.0G`,
    
    'ps aux | head -10': `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169316 13104 ?        Ss   10:00   0:01 /usr/lib/systemd/systemd
root         2  0.0  0.0      0     0 ?        S    10:00   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        I<   10:00   0:00 [rcu_gp]`,
    
    'ls': `Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos`,
    
    'pwd': '/root',
    
    'date': 'Mon Mar  1 10:30:00 UTC 2024',
    
    'uname -a': 'Linux rhcsa10-lab 6.6.0-0.rc5.20231003git4f4e6a1.el10.x86_64 #1 SMP PREEMPT_DYNAMIC Wed Oct 4 15:00:00 EDT 2023 x86_64 x86_64 x86_64 GNU/Linux',
    
    'tar -czf /backup/etc-backup.tar.gz /etc': '',
    
    'crontab -u devuser -e': 'Opening crontab for user devuser...',
    
    'crontab -u devuser -l': '30 2 * * * /opt/backup.sh',
    
    'vim /etc/yum.repos.d/local.repo': 'Opening file...',
    
    'vim /etc/httpd/conf/httpd.conf': 'Opening file...',
    
    'vim /usr/local/bin/find-sgid.sh': 'Opening file...',
    
    'vim Dockerfile': 'Opening file...',
    
    'mkdir /collab && chgrp developers /collab && chmod 2775 /collab': 'Diretório criado, grupo alterado, permissões configuradas.',
    
    'mkdir /public && chmod 1777 /public': 'Diretório criado com sticky bit ativado.',
    
    'pvcreate /dev/sdb1 && vgcreate vg01 /dev/sdb1 && lvcreate -L 5G -n lv01 vg01': 'Volume físico, grupo de volumes e volume lógico criados com sucesso.',
    
    'mkswap /dev/sdc1 && swapon /dev/sdc1': 'Partição SWAP criada e ativada.',
    
    'ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa && ssh-copy-id user@192.168.1.50': 'Chave SSH gerada e copiada para o host remoto.',
    
    'sed -i "s/Listen 80/Listen 82/" /etc/httpd/conf/httpd.conf && systemctl restart httpd': 'Apache configurado para porta 82 e reiniciado.',
    
    'echo "FROM nginx:alpine\nCOPY index.html /usr/share/nginx/html/" > Dockerfile && podman build -t my-nginx:v1 .': 'Dockerfile criado e imagem construída.',
    
    'dnf install tuned -y && systemctl enable --now tuned && tuned-adm profile throughput-performance': 'Tuned instalado, ativado e perfil configurado.',
    
    'echo "$USER:100000:65536" | sudo tee -a /etc/subuid && echo "$USER:100000:65536" | sudo tee -a /etc/subgid': 'Configuração de rootless Podman atualizada.',
    
    'groupadd -g 2000 redhat && useradd -u 2000 -g 2000 redhat': 'Grupo e usuário criados com UID/GID 2000.',
    
    'groupadd time-ti && useradd -g time-ti -s /bin/bash alex': 'Grupo time-ti e usuário alex criados.',
    
    'useradd -u 3000 -d /home/johndev -m john': 'Usuário john criado com UID 3000 e home directory.',
    
    'find / -user tom -type f 2>/dev/null > /tmp/tom-files.txt': 'Arquivos do usuário tom listados em /tmp/tom-files.txt',
    
    'find / -user jerry -mtime -7 -type f 2>/dev/null': 'Arquivos do usuário jerry modificados nos últimos 7 dias listados.',
    
    'echo "#!/bin/bash\nfind / -perm -2000 -type f 2>/dev/null\necho \"Busca completa\"" > /usr/local/bin/find-sgid.sh && chmod +x /usr/local/bin/find-sgid.sh': 'Script find-sgid.sh criado e com permissão de execução.',
    
    'tar -czf /backup/etc-backup-$(date +%Y%m%d).tar.gz /etc': 'Backup do diretório /etc criado com data no nome.',
    
    'help': `=== COMANDOS RHEL 10 DISPONÍVEIS ===

🌐 REDE (RHEL 10):
  ip addr show                    - Mostra interfaces de rede
  nmcli connection modify ...     - Configura IP estático
  hostnamectl set-hostname ...    - Altera hostname
  firewall-cmd ...                - Gerencia firewall (nftables backend)

📦 PACOTES (RHEL 10 usa DNF):
  dnf repolist                    - Lista repositórios
  dnf install [pacote]           - Instala pacotes
  dnf remove [pacote]            - Remove pacotes
  dnf update                     - Atualiza sistema

💾 STORAGE:
  lsblk                           - Lista dispositivos de bloco
  pvcreate /dev/sdX              - Cria volume físico LVM
  vgcreate [nome] /dev/sdX       - Cria grupo de volumes
  lvcreate -L [tamanho] -n [nome] [vg] - Cria volume lógico
  mkfs.xfs /dev/[vg]/[lv]        - Formata com XFS
  df -h                           - Espaço em disco

👥 USUÁRIOS E PERMISSÕES:
  useradd [opções] [nome]        - Cria usuário
  groupadd [nome]                - Cria grupo
  usermod -aG [grupo] [user]    - Adiciona usuário a grupo
  mkdir [diretório]              - Cria diretório
  chmod [permissões] [arquivo]   - Altera permissões
  chown [user]:[grupo] [arquivo] - Altera dono/grupo
  setfacl -m u:[user]:[perms] [arquivo] - Configura ACL
  getfacl [arquivo]              - Mostra ACL

⚙️ SERVIÇOS (systemd):
  systemctl status [serviço]     - Status do serviço
  systemctl start [serviço]      - Inicia serviço
  systemctl stop [serviço]       - Para serviço
  systemctl restart [serviço]    - Reinicia serviço
  systemctl enable [serviço]     - Habilita no boot
  systemctl disable [serviço]    - Desabilita do boot

🔒 SEGURANÇA RHEL 10:
  getenforce                     - Status SELinux
  setenforce 0|1                 - Altera modo SELinux
  semanage port -a -t http_port_t -p tcp 82 - Adiciona porta SELinux
  restorecon -Rv [diretório]     - Restaura contexto SELinux

🐳 CONTÊINERES (Podman padrão):
  podman images                  - Lista imagens
  podman ps                      - Lista contêineres ativos
  podman build -t [tag] .        - Constrói imagem
  podman run [opções] [imagem]   - Executa contêiner

📊 SISTEMA:
  whoami                         - Usuário atual
  hostnamectl                    - Informações do sistema
  free -h                        - Memória e swap
  ps aux                         - Processos
  top                            - Monitor de processos
  journalctl -xe                 - Logs do sistema

🔍 BUSCA E ARQUIVOS:
  find [diretório] [critérios]   - Encontra arquivos
  grep [padrão] [arquivo]        - Busca texto
  locate [arquivo]               - Encontra rapidamente
  tar -czf [arquivo.tar.gz] [dir] - Compacta
  tar -xzf [arquivo.tar.gz]      - Descompacta

❓ AJUDA:
  [comando] --help              - Ajuda do comando
  man [comando]                 - Manual completo
  clear                         - Limpa terminal
  help                          - Mostra esta ajuda

💡 DICAS RHEL 10:
  • Use DNF em vez de YUM
  • Podman é o padrão para contêineres
  • nftables é o backend do firewall
  • XFS é o sistema de arquivos padrão`
};

// ==================== SISTEMA DE AUTO-COMPLETE E HISTÓRICO ====================
let historicoComandos = [];
let indiceHistorico = -1;

// ==================== FUNÇÕES AUXILIARES ====================

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

// ==================== SUGESTÃO DE CORREÇÃO DE COMANDOS RHEL 10 ====================
function sugerirCorrecao(comandoErrado) {
    const correcoesComuns = {
        'hostanmectl': 'hostnamectl',
        'hostnameclt': 'hostnamectl',
        'ifconfig': 'ip addr show',
        'service httpd start': 'systemctl start httpd',
        'chkconfig httpd on': 'systemctl enable httpd',
        'iptables': 'firewall-cmd',
        'user add': 'useradd',
        'group add': 'groupadd',
        'yum': 'dnf',
        'yum install': 'dnf install',
        'yum update': 'dnf update',
        'yum repolist': 'dnf repolist',
        'docker': 'podman',
        'docker build': 'podman build',
        'docker run': 'podman run',
        'systemctl stop NetworkManager': 'systemctl stop NetworkManager.service',
        'systemctl start NetworkManager': 'systemctl start NetworkManager.service',
        'nano': 'vim',
        'netstat': 'ss',
        'ifconfig -a': 'ip addr show',
        'route -n': 'ip route show',
        'service network restart': 'systemctl restart network'
    };
    
    // Verificar por palavra-chave
    for (let [erro, correcao] of Object.entries(correcoesComuns)) {
        if (comandoErrado.toLowerCase().includes(erro.toLowerCase())) {
            return `💡 Você quis dizer: "${correcao}"? (Em RHEL 10, use "${correcao}" no lugar de "${erro}")`;
        }
    }
    
    return null;
}

// ==================== FUNÇÃO PARA ANALISAR COMANDOS MÚLTIPLOS ====================
function analisarComandoMultiplo(comando) {
    // Divide comandos múltiplos por && ou ;
    const partes = comando.split(/&&|;/).map(cmd => cmd.trim());
    const resultados = [];
    
    for (let parte of partes) {
        if (comandosTerminal[parte]) {
            resultados.push({ comando: parte, valido: true, saida: comandosTerminal[parte] });
        } else {
            resultados.push({ comando: parte, valido: false, saida: `bash: ${parte}: comando não encontrado` });
        }
    }
    
    return resultados;
}

// ==================== FUNÇÃO PRINCIPAL DO TERMINAL ====================
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
    
    // Verificar se é comando múltiplo (contém && ou ;)
    if (comando.includes('&&') || comando.includes(';')) {
        const resultados = analisarComandoMultiplo(comando);
        let todosValidos = true;
        
        resultados.forEach(resultado => {
            if (resultado.valido) {
                if (resultado.saida) {
                    adicionarSaidaTerminal(resultado.saida, 'normal');
                }
            } else {
                todosValidos = false;
                adicionarSaidaTerminal(resultado.saida, 'error');
            }
        });
        
        if (todosValidos) {
            verificarComandoQuestao(comando);
        }
    } else {
        // Comando único
        let comandoEncontrado = null;
        let sugestaoCorrecao = null;
        
        // Primeiro tentar match exato
        if (comandosTerminal[comando]) {
            comandoEncontrado = comando;
        } else {
            // Verificar se há sugestão de correção para comandos comuns errados
            sugestaoCorrecao = sugerirCorrecao(comando);
            
            // Tentar encontrar comando similar (para lidar com erros de digitação)
            const comandosDisponiveis = Object.keys(comandosTerminal);
            for (let cmd of comandosDisponiveis) {
                if (cmd.startsWith(comando.split(' ')[0])) {
                    // Sugerir comando correto baseado em similaridade
                    if (levenshteinDistance(cmd, comando) < 3) {
                        comandoEncontrado = cmd;
                        adicionarSaidaTerminal(`💡 Você quis dizer: "${cmd}"?`, 'info');
                        break;
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
            // Mostrar sugestão de correção se houver
            if (sugestaoCorrecao) {
                adicionarSaidaTerminal(sugestaoCorrecao, 'hint');
            }
            adicionarSaidaTerminal(`bash: ${comando}: comando não encontrado\nDigite 'help' para ajuda.`, 'error');
        }
    }
    
    input.value = '';
    input.focus();
}

// ==================== SISTEMA DE VERIFICAÇÃO INTELIGENTE MELHORADO ====================
const solucoesQuestoes = {
    1: {
        comandos: ['nmcli connection modify eth0', '192.168.1.100', 'nmcli connection up', 'ip addr show'],
        verificar: ['192.168.1.100', 'eth0', 'manual'],
        pontosNecessarios: 3
    },
    2: {
        comandos: ['vim /etc/yum.repos.d/local.repo', 'dnf repolist', 'baseurl=file:///mnt'],
        verificar: ['local.repo', 'baseurl', 'mnt'],
        pontosNecessarios: 2
    },
    3: {
        comandos: ['mkdir /shared', 'chmod 770', 'setfacl -m u:alex:rwx', 'getfacl /shared'],
        verificar: ['/shared', 'alex:rwx', 'getfacl'],
        pontosNecessarios: 3
    },
    4: {
        comandos: ['groupadd -g 2000 redhat', 'useradd -u 2000 -g 2000 redhat', 'id redhat'],
        verificar: ['uid=2000', 'gid=2000', 'redhat'],
        pontosNecessarios: 2
    },
    5: {
        comandos: ['ssh-keygen', 'ssh-copy-id', '~/.ssh/id_rsa'],
        verificar: ['ssh-keygen', 'id_rsa', 'ssh-copy-id'],
        pontosNecessarios: 2
    },
    6: {
        comandos: ['sed -i', 'Listen 82', 'systemctl restart httpd', 'firewall-cmd --add-port=82/tcp'],
        verificar: ['82', 'httpd', 'firewall-cmd'],
        pontosNecessarios: 3
    },
    7: {
        comandos: ['pvcreate', 'vgcreate vg01', 'lvcreate -L 5G', 'mkfs.xfs', 'mkdir /data', '/etc/fstab'],
        verificar: ['pvcreate', 'vg01', 'lv01', 'xfs', '/data'],
        pontosNecessarios: 4
    },
    8: {
        comandos: ['crontab -u devuser', '30 2', '/opt/backup.sh'],
        verificar: ['crontab', '30 2', 'backup.sh'],
        pontosNecessarios: 2
    },
    9: {
        comandos: ['tar -czf', '/backup/', '/etc', '$(date +%Y%m%d)'],
        verificar: ['tar', 'backup', 'etc', 'tar.gz'],
        pontosNecessarios: 2
    },
    10: {
        comandos: ['groupadd time-ti', 'useradd -g time-ti', '-s /bin/bash'],
        verificar: ['time-ti', 'alex', '/bin/bash'],
        pontosNecessarios: 2
    },
    11: {
        comandos: ['useradd -u 3000', '-d /home/johndev', '-m john'],
        verificar: ['3000', 'johndev', 'john'],
        pontosNecessarios: 2
    },
    12: {
        comandos: ['find / -user tom', '-type f', '>/tmp/tom-files.txt'],
        verificar: ['find', 'tom', '/tmp/tom-files.txt'],
        pontosNecessarios: 2
    },
    13: {
        comandos: ['find / -user jerry', '-mtime -7', '-type f'],
        verificar: ['find', 'jerry', '-mtime -7'],
        pontosNecessarios: 2
    },
    14: {
        comandos: ['mkdir /public', 'chmod 1777', 'ls -ld /public'],
        verificar: ['/public', '1777', 'drwxrwxrwt'],
        pontosNecessarios: 2
    },
    15: {
        comandos: ['echo', '#!/bin/bash', 'find / -perm -2000', 'chmod +x', '/usr/local/bin/find-sgid.sh'],
        verificar: ['#!/bin/bash', 'find -perm -2000', '/usr/local/bin/'],
        pontosNecessarios: 3
    },
    16: {
        comandos: ['rd.break', 'mount -o remount,rw /sysroot', 'chroot /sysroot', 'passwd root', 'touch /.autorelabel'],
        verificar: ['rd.break', 'passwd root', 'autorelabel'],
        pontosNecessarios: 3
    },
    17: {
        comandos: ['echo', 'FROM nginx:alpine', 'podman build -t', 'Dockerfile'],
        verificar: ['Dockerfile', 'nginx:alpine', 'podman build'],
        pontosNecessarios: 2
    },
    18: {
        comandos: ['echo', '/etc/subuid', '/etc/subgid', 'podman info'],
        verificar: ['subuid', 'subgid', 'rootless'],
        pontosNecessarios: 2
    },
    19: {
        comandos: ['mkswap /dev/sdc1', 'swapon /dev/sdc1', 'echo /dev/sdc1 swap >> /etc/fstab'],
        verificar: ['mkswap', 'swapon', '/etc/fstab'],
        pontosNecessarios: 2
    },
    20: {
        comandos: ['lvcreate -l 10', '-n lv02 vg01', 'lvs'],
        verificar: ['lvcreate -l 10', 'lv02', 'vg01'],
        pontosNecessarios: 2
    },
    21: {
        comandos: ['dnf install tuned', 'systemctl enable tuned', 'tuned-adm profile throughput-performance'],
        verificar: ['tuned', 'throughput-performance', 'tuned-adm'],
        pontosNecessarios: 2
    },
    22: {
        comandos: ['mkdir /collab', 'chgrp developers /collab', 'chmod 2775 /collab', 'ls -ld /collab'],
        verificar: ['/collab', 'developers', '2775', 'drwxrwsr-x'],
        pontosNecessarios: 3
    }
};

let comandosExecutados = [];

function verificarComandoQuestao(comando) {
    comandosExecutados.push(comando);
    
    // Verificar cada questão
    for (let id in solucoesQuestoes) {
        const questaoData = solucoesQuestoes[id];
        const comandosEsperados = questaoData.comandos;
        
        // Verificar se algum comando esperado está no comando executado
        const correspondencias = comandosEsperados.filter(cmdEsperado => 
            comando.toLowerCase().includes(cmdEsperado.toLowerCase())
        ).length;
        
        if (correspondencias >= 2) {
            setTimeout(() => {
                const questao = questoes.find(q => q.id == id);
                if (questao && !progresso[id]) {
                    adicionarSaidaTerminal(`🔍 Detectei que você está trabalhando na Questão ${id}: ${questao.titulo}`, 'info');
                    adicionarSaidaTerminal(`💡 Dica: ${questao.descricao.substring(0, 100)}...`, 'info');
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

// ==================== FUNÇÃO DE VERIFICAÇÃO MELHORADA ====================
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
    
    // Obter dados da questão
    const questaoData = solucoesQuestoes[id];
    if (!questaoData) {
        adicionarSaidaTerminal(`❌ Dados de verificação não encontrados para questão ${id}`, 'error');
        return;
    }
    
    const comandosEsperados = questaoData.comandos;
    const verificacoes = questaoData.verificar;
    const pontosNecessarios = questaoData.pontosNecessarios || 2;
    
    // Verificar comandos executados recentemente
    let pontuacao = 0;
    let feedback = [];
    
    // Pegar últimos 10 comandos para análise
    const comandosRelevantes = comandosExecutados.slice(-10);
    
    comandosRelevantes.forEach(comando => {
        comandosEsperados.forEach(cmdEsperado => {
            if (comando.toLowerCase().includes(cmdEsperado.toLowerCase())) {
                pontuacao += 1;
                feedback.push(`✓ Executou: ${comando}`);
            }
        });
    });
    
    // Verificação adicional com palavras-chave
    let verificacaoExtra = 0;
    comandosRelevantes.forEach(comando => {
        verificacoes.forEach(verif => {
            if (comando.toLowerCase().includes(verif.toLowerCase())) {
                verificacaoExtra += 0.5;
            }
        });
    });
    
    // Pontuação total
    const pontuacaoTotal = pontuacao + verificacaoExtra;
    
    // Determinar aprovação (baseado em pontos necessários)
    const aprovado = pontuacaoTotal >= pontosNecessarios;
    const porcentagem = Math.min(100, (pontuacaoTotal / pontosNecessarios) * 100);
    
    if (aprovado) {
        progresso[questao.id] = true;
        localStorage.setItem('rhcsa-progresso', JSON.stringify(progresso));
        
        adicionarSaidaTerminal(`✅ Questão ${id} VERIFICADA com SUCESSO! (${Math.round(pontuacaoTotal)}/${pontosNecessarios} pontos)`, 'success');
        
        // Mostrar feedback se tiver
        if (feedback.length > 0) {
            adicionarSaidaTerminal(`📋 Comandos corretos executados:`, 'info');
            feedback.slice(0, 3).forEach(msg => {
                adicionarSaidaTerminal(`   ${msg}`, 'info');
            });
        }
        
        if (pontuacaoTotal < pontosNecessarios) {
            adicionarSaidaTerminal(`💡 Bom trabalho! Você completou ${Math.round(pontuacaoTotal)} de ${pontosNecessarios} pontos necessários.`, 'info');
        } else {
            adicionarSaidaTerminal(`🎉 PERFEITO! Todos os pontos necessários completados!`, 'success');
        }
    } else {
        adicionarSaidaTerminal(`❌ Questão ${id} precisa de ajustes. (${Math.round(pontuacaoTotal)}/${pontosNecessarios} pontos)`, 'error');
        
        // Mostrar o que falta
        const comandosFaltantes = comandosEsperados.filter(cmdEsperado => 
            !comandosRelevantes.some(cmd => cmd.toLowerCase().includes(cmdEsperado.toLowerCase()))
        );
        
        if (comandosFaltantes.length > 0) {
            adicionarSaidaTerminal(`📝 Comandos que faltaram:`, 'info');
            comandosFaltantes.slice(0, 3).forEach(cmd => {
                adicionarSaidaTerminal(`   • ${cmd}`, 'info');
            });
        }
        
        adicionarSaidaTerminal(`💡 Solução completa: ${questao.comando}`, 'info');
    }
    
    // Atualizar interface
    carregarQuestoes();
}

// ==================== FUNÇÕES AUXILIARES DO TERMINAL ====================
function adicionarSaidaTerminal(texto, tipo = 'normal') {
    const container = document.getElementById('terminal-output');
    if (!container) return;
    
    const div = document.createElement('div');
    div.className = 'terminal-output';
    
    let conteudo = `<span class="terminal-prompt">[root@rhcsa-lab ~]# </span>`;
    
    if (tipo === 'error') {
        conteudo += `<span class="terminal-error">${texto}</span>`;
    } else if (tipo === 'success') {
        conteudo += `<span class="terminal-success">${texto}</span>`;
    } else if (tipo === 'info') {
        conteudo += `<span class="terminal-info">${texto}</span>`;
    } else if (tipo === 'hint') {
        conteudo += `<span class="terminal-hint">${texto}</span>`;
    } else if (tipo === 'command') {
        conteudo += `<span class="terminal-command">${texto}</span>`;
    } else {
        conteudo += `<span>${texto}</span>`;
    }
    
    div.innerHTML = conteudo;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function inserirComando(comando) {
    const input = document.getElementById('terminal-input');
    if (input) {
        input.value = comando;
        input.focus();
    }
}

function limparTerminal() {
    const container = document.getElementById('terminal-output');
    if (container) {
        container.innerHTML = `
            <div class="terminal-output">
                <span class="terminal-prompt">[root@rhcsa-lab ~]# </span>
                <span class="terminal-success">Terminal limpo. Digite 'help' para ajuda.</span>
            </div>
        `;
    }
}

function mostrarAjuda() {
    adicionarSaidaTerminal(comandosTerminal.help, 'info');
}

// ==================== CONFIGURAÇÃO DE AUTO-COMPLETE ====================
function configurarAutoComplete() {
    const input = document.getElementById('terminal-input');
    if (!input) return;
    
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

// ==================== ATUALIZAR DROPDOWN DE VERIFICAÇÃO ====================
function atualizarDropdownVerificacao() {
    const select = document.getElementById('questao-verificar');
    if (!select) return;
    
    select.innerHTML = '<option value="">Selecione uma questão...</option>';
    
    questoes.forEach(q => {
        const option = document.createElement('option');
        option.value = q.id;
        option.textContent = `Questão ${q.id}: ${q.titulo}`;
        select.appendChild(option);
    });
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada - iniciando RHCSA Study Lab RHEL 10');
    
    // Carregar questões
    carregarQuestoes();
    
    // Configurar filtros
    configurarFiltros();
    
    // Atualizar progresso visual
    atualizarProgressoVisual();
    
    // Atualizar dropdown de verificação
    atualizarDropdownVerificacao();
    
    // Configurar auto-complete do terminal
    configurarAutoComplete();
    
    // Configurar evento do botão executar
    const btnExecutar = document.querySelector('button[onclick="executarComando()"]');
    if (btnExecutar) {
        btnExecutar.addEventListener('click', executarComando);
    }
    
    // Configurar evento Enter no input do terminal
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
        terminalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                executarComando();
            }
        });
    }
    
    // Configurar evento do botão de verificação
    const btnVerificar = document.querySelector('button[onclick="verificarQuestao()"]');
    if (btnVerificar) {
        btnVerificar.addEventListener('click', verificarQuestao);
    }
    
    // Mensagem de boas-vindas no terminal
    setTimeout(() => {
        adicionarSaidaTerminal('🐧 Bem-vindo ao RHCSA Study Lab RHEL 10!', 'info');
        adicionarSaidaTerminal('💡 Digite "help" para ver todos os comandos disponíveis.', 'info');
        adicionarSaidaTerminal('💡 Use TAB para auto-completar comandos.', 'info');
        adicionarSaidaTerminal('💡 Use setas ↑↓ para navegar no histórico.', 'info');
        adicionarSaidaTerminal('💡 O sistema detecta erros comuns e sugere correções!', 'info');
        adicionarSaidaTerminal('⚠️ IMPORTANTE: Comandos múltiplos devem usar && (ex: mkdir /collab && chmod 2775 /collab)', 'warning');
    }, 1000);
    
    // Log de inicialização
    console.log('RHCSA Study Lab RHEL 10 inicializado com sucesso!');
    console.log('Total de questões disponíveis:', questoes.length);
});
