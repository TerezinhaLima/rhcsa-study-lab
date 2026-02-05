#!/usr/bin/env python3
"""
RHCSA Study Lab - APLICAÇÃO COMPLETA
Todas as 22 questões + terminal funcional
"""
from flask import Flask, render_template_string, jsonify, request
import json
import os
import subprocess
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'rhcsa-study-2024-completo-v3'

# ====== TODAS AS 22 QUESTÕES COMPLETAS ======
QUESTOES = [
    # NODE 1 - Questões 1-15
    {
        'id': 1,
        'titulo': 'Configurar IP estático',
        'descricao': 'Configure um IP estático com os seguintes detalhes:<br>• IP: 192.168.76.20/24<br>• Gateway: 192.168.76.2<br>• DNS: 192.168.76.2<br>• Domain Name: Machine1.example.com<br>• Certifique-se de que a rede inicie automaticamente na inicialização',
        'topico': 'Rede',
        'dificuldade': 'Fácil',
        'node': 'Node 1',
        'passos': [
            'Usar nmtui ou editar /etc/sysconfig/network-scripts/ifcfg-eth0',
            'Configurar IP: 192.168.76.20/24',
            'Configurar Gateway: 192.168.76.2',
            'Configurar DNS: 192.168.76.2',
            'Configurar hostname: Machine1.example.com',
            'Reiniciar serviço de rede',
            'Verificar com: ping 192.168.76.2'
        ],
        'comandos': [
            'nmtui',
            'nmcli connection modify eth0 ipv4.method manual',
            'nmcli connection modify eth0 ipv4.addresses 192.168.76.20/24',
            'nmcli connection modify eth0 ipv4.gateway 192.168.76.2',
            'nmcli connection modify eth0 ipv4.dns 192.168.76.2',
            'hostnamectl set-hostname Machine1.example.com',
            'nmcli connection up eth0',
            'systemctl restart NetworkManager',
            'ping -c 4 192.168.76.2'
        ],
        'verificacao': 'ip addr show eth0 && hostnamectl',
        'dica': 'Use nmtui para interface gráfica ou nmcli para terminal'
    },
    {
        'id': 2,
        'titulo': 'Configurar YUM Repository',
        'descricao': 'Configure o YUM repo usando os links fornecidos:<br>http://content.example.com/rhel9.0/x86_64/rhcsa-practice/BaseOS<br>http://content.example.com/rhel9.0/x86_64/rhcsa-practice/AppStream',
        'topico': 'Pacotes',
        'dificuldade': 'Fácil',
        'node': 'Node 1',
        'passos': [
            'Criar arquivo .repo em /etc/yum.repos.d/',
            'Configurar [BaseOS] e [AppStream]',
            'Executar yum clean all',
            'Executar yum repolist'
        ],
        'comandos': [
            'vim /etc/yum.repos.d/exam.repo',
            '[BaseOS]',
            'name=BaseOS',
            'baseurl=http://content.example.com/rhel9.0/x86_64/rhcsa-practice/BaseOS',
            'gpgcheck=0',
            'enabled=1',
            '',
            '[AppStream]',
            'name=AppStream',
            'baseurl=http://content.example.com/rhel9.0/x86_64/rhcsa-practice/AppStream',
            'gpgcheck=0',
            'enabled=1',
            '',
            'yum clean all',
            'yum repolist all'
        ],
        'verificacao': 'cat /etc/yum.repos.d/exam.repo && yum repolist',
        'dica': 'Verifique se os repositórios estão habilitados com yum repolist'
    },
    {
        'id': 3,
        'titulo': 'Diretório com ACL',
        'descricao': 'Crie o diretório /share/dev<br>• Dê propriedade para devuser:devteam<br>• Dê permissão rwx aos membros do devteam<br>• Use ACL para que usuário john tenha somente acesso de leitura',
        'topico': 'Permissões',
        'dificuldade': 'Médio',
        'node': 'Node 1',
        'passos': [
            'mkdir -p /share/dev',
            'chown devuser:devteam /share/dev',
            'chmod g+rwx /share/dev',
            'setfacl para usuário john com permissão r--'
        ],
        'comandos': [
            'mkdir -p /share/dev',
            'useradd devuser (se não existir)',
            'groupadd devteam (se não existir)',
            'chown devuser:devteam /share/dev',
            'chmod g+rwx /share/dev',
            'setfacl -m u:john:r-- /share/dev',
            'getfacl /share/dev'
        ],
        'verificacao': 'ls -ld /share/dev && getfacl /share/dev',
        'dica': 'Use getfacl para verificar as ACLs aplicadas'
    },
    {
        'id': 4,
        'titulo': 'Criar usuário Redhat',
        'descricao': 'Crie um user chamado Redhat<br>• Redefina a senha para Redhat@123<br>• Crie grupo Time-TI e adicione Redhat ao grupo',
        'topico': 'Usuários',
        'dificuldade': 'Fácil',
        'node': 'Node 1',
        'passos': [
            'useradd Redhat',
            'passwd Redhat',
            'groupadd Time-TI',
            'usermod para adicionar ao grupo'
        ],
        'comandos': [
            'useradd Redhat',
            'echo "Redhat@123" | passwd --stdin Redhat',
            'groupadd Time-TI',
            'usermod -aG Time-TI Redhat',
            'id Redhat'
        ],
        'verificacao': 'id Redhat && grep Redhat /etc/group',
        'dica': 'Use id username para verificar grupos do usuário'
    },
    {
        'id': 5,
        'titulo': 'SSH sem senha',
        'descricao': 'Configure SSH no node 2 para que usuária Natasha faça login sem senha<br>• Use ssh-keygen e ssh-copy-id<br>• Teste a conexão SSH',
        'topico': 'Rede/Segurança',
        'dificuldade': 'Médio',
        'node': 'Node 1 → Node 2',
        'passos': [
            'ssh-keygen no node1',
            'ssh-copy-id para node2',
            'Testar conexão SSH'
        ],
        'comandos': [
            'ssh-keygen -t rsa -b 2048',
            'ssh-copy-id natasha@192.168.76.30',
            'ssh natasha@192.168.76.30 "whoami"'
        ],
        'verificacao': 'ssh natasha@192.168.76.30 date',
        'dica': 'Não digite senha ao usar ssh-copy-id para configurar chave'
    },
    {
        'id': 6,
        'titulo': 'Servidor Web na porta 82',
        'descricao': 'Servidor web na porta 82 não padrão com problemas para fornecer conteúdo<br>• Servir arquivos de /var/www/html<br>• Serviço deve iniciar automaticamente no boot',
        'topico': 'Serviços',
        'dificuldade': 'Médio',
        'node': 'Node 1',
        'passos': [
            'Instalar httpd',
            'Configurar firewall porta 82',
            'Configurar SELinux',
            'Modificar httpd.conf',
            'Iniciar e habilitar serviço'
        ],
        'comandos': [
            'dnf install httpd -y',
            'firewall-cmd --permanent --add-port=82/tcp',
            'firewall-cmd --reload',
            'semanage port -a -t http_port_t -p tcp 82',
            'vi /etc/httpd/conf/httpd.conf (mudar Listen 80 para Listen 82)',
            'systemctl enable --now httpd',
            'systemctl status httpd'
        ],
        'verificacao': 'ss -tlnp | grep :82 && curl http://localhost:82',
        'dica': 'Verifique SELinux com semanage port -l | grep http'
    },
    {
        'id': 7,
        'titulo': 'Volume Lógico LVM',
        'descricao': 'Crie volume lógico lvdata de 500MB usando /dev/sdb<br>• Formate com xfs, monte permanentemente em /mnt/data',
        'topico': 'Storage',
        'dificuldade': 'Difícil',
        'node': 'Node 1',
        'passos': [
            'Criar partição LVM',
            'pvcreate, vgcreate, lvcreate',
            'Formatar com XFS',
            'Montar em /mnt/data',
            'Configurar fstab'
        ],
        'comandos': [
            'fdisk /dev/sdb (criar partição tipo 8e)',
            'partprobe /dev/sdb',
            'pvcreate /dev/sdb1',
            'vgcreate vgdata /dev/sdb1',
            'lvcreate -L 500M -n lvdata vgdata',
            'mkfs.xfs /dev/vgdata/lvdata',
            'mkdir -p /mnt/data',
            'mount /dev/vgdata/lvdata /mnt/data',
            'echo "/dev/vgdata/lvdata /mnt/data xfs defaults 0 0" >> /etc/fstab',
            'mount -a'
        ],
        'verificacao': 'lsblk && df -h /mnt/data',
        'dica': 'Use lsblk para visualizar a estrutura de discos e partições'
    },
    {
        'id': 8,
        'titulo': 'Cronjob para devuser',
        'descricao': 'Crie cronjob para usuário devuser que execute uptime a cada 5 minutos<br>• Salve saída em /home/devuser/uptime.log',
        'topico': 'Agendamento',
        'dificuldade': 'Fácil',
        'node': 'Node 1',
        'passos': [
            'Instalar cronie',
            'Criar entrada no crontab',
            'Verificar cronjob'
        ],
        'comandos': [
            'dnf install cronie -y',
            'crontab -e -u devuser',
            'Adicionar: */5 * * * * uptime >> /home/devuser/uptime.log',
            'crontab -l -u devuser',
            'systemctl enable --now crond'
        ],
        'verificacao': 'crontab -l -u devuser && ls -la /home/devuser/uptime.log',
        'dica': 'Teste o cronjob agendando para 1 minuto no futuro primeiro'
    },
    {
        'id': 9,
        'titulo': 'Compactar diretório /etc',
        'descricao': 'Compacte o diretório /etc usando tar com gzip<br>• Salve como /root/etc_backup.tar.gz',
        'topico': 'Arquivos',
        'dificuldade': 'Fácil',
        'node': 'Node 1',
        'passos': [
            'Usar tar com opção --gzip',
            'Salvar em /root'
        ],
        'comandos': [
            'tar --gzip -cvf /root/etc_backup.tar.gz /etc',
            'ls -lh /root/etc_backup.tar.gz'
        ],
        'verificacao': 'tar -tzf /root/etc_backup.tar.gz | head -5',
        'dica': 'Use -v para verbose e veja os arquivos sendo compactados'
    },
    {
        'id': 10,
        'titulo': 'Usuário Alex e grupo Time-TI',
        'descricao': 'Crie usuário alex<br>• Torne alex um grupo secundário do Time-TI',
        'topico': 'Usuários',
        'dificuldade': 'Fácil',
        'node': 'Node 1',
        'passos': [
            'Criar usuário alex',
            'Adicionar ao grupo Time-TI'
        ],
        'comandos': [
            'useradd alex',
            'usermod -aG Time-TI alex',
            'id alex'
        ],
        'verificacao': 'id alex && grep Time-TI /etc/group',
        'dica': 'Grupos secundários são úteis para dar acesso a recursos específicos'
    },
    {
        'id': 11,
        'titulo': 'Criar usuário John com UID específico',
        'descricao': 'Crie usuário John com:<br>• UID 2245<br>• Senha redhat@123',
        'topico': 'Usuários',
        'dificuldade': 'Fácil',
        'node': 'Node 1',
        'passos': [
            'Criar usuário com UID específico',
            'Definir senha'
        ],
        'comandos': [
            'useradd -u 2245 john',
            'echo "redhat@123" | passwd --stdin john',
            'id john'
        ],
        'verificacao': 'id john && grep john /etc/passwd',
        'dica': 'UIDs abaixo de 1000 são geralmente para usuários do sistema'
    },
    {
        'id': 12,
        'titulo': 'Localizar arquivos do usuário tom',
        'descricao': 'Localize todos os arquivos pertencentes ao usuário tom<br>• Copie para /root/tomfiles',
        'topico': 'Arquivos',
        'dificuldade': 'Médio',
        'node': 'Node 1',
        'passos': [
            'Usar find com -user',
            'Executar cópia com -exec'
        ],
        'comandos': [
            'mkdir -p /root/tomfiles',
            'find / -user tom -exec cp -pvf {} /root/tomfiles/ \\; 2>/dev/null',
            'ls -la /root/tomfiles/'
        ],
        'verificacao': 'ls -la /root/tomfiles/ | wc -l',
        'dica': '2>/dev/null redireciona erros de permissão para não poluir a saída'
    },
    {
        'id': 13,
        'titulo': 'Localizar arquivos do usuário jerry',
        'descricao': 'Localize todos os arquivos e diretórios do usuário jerry<br>• Copie para /root/jerryfiles',
        'topico': 'Arquivos',
        'dificuldade': 'Médio',
        'node': 'Node 1',
        'passos': [
            'Usar find com -user e opção -r',
            'Copiar recursivamente'
        ],
        'comandos': [
            'mkdir -p /root/jerryfiles',
            'find / -user jerry -exec cp -rpvf {} /root/jerryfiles/ \\; 2>/dev/null',
            'ls -la /root/jerryfiles/'
        ],
        'verificacao': 'du -sh /root/jerryfiles/',
        'dica': '-p no cp preserva permissões, -r copia recursivamente'
    },
    {
        'id': 14,
        'titulo': 'Diretório /shared/projects com sticky bit',
        'descricao': 'Crie diretório /shared/projects no node1<br>• Propriedade para Alex<br>• Garanta sticky bit (ninguém pode excluir arquivos exceto proprietário)',
        'topico': 'Permissões',
        'dificuldade': 'Médio',
        'node': 'Node 1',
        'passos': [
            'Criar diretório',
            'Mudar propriedade',
            'Aplicar sticky bit'
        ],
        'comandos': [
            'mkdir -p /shared/projects',
            'chown -R alex /shared/projects',
            'chmod a+rwx,+t /shared/projects',
            'ls -ld /shared/projects'
        ],
        'verificacao': 'ls -ld /shared/projects | grep "......t"',
        'dica': 'Sticky bit (t) é útil em diretórios compartilhados como /tmp'
    },
    {
        'id': 15,
        'titulo': 'Script para localizar arquivos e SGID',
        'descricao': 'Crie script "script.sh" em /bin<br>• Localize arquivos em /usr/local com 3k-5k<br>• Copie para /root/d1<br>• Defina permissão SGID no diretório',
        'topico': 'Scripting/Permissões',
        'dificuldade': 'Difícil',
        'node': 'Node 1',
        'passos': [
            'Criar script',
            'Executar find',
            'Aplicar SGID'
        ],
        'comandos': [
            'vim /bin/script.sh',
            'Conteúdo:',
            '#!/bin/bash',
            'mkdir -p /root/d1',
            'find /usr/local -size +3k -size -5k -exec cp -rpvf {} /root/d1 \\;',
            'chmod g+s /root/d1',
            '',
            'chmod a+x /bin/script.sh',
            '/bin/script.sh'
        ],
        'verificacao': 'ls -ld /root/d1 && ls -la /root/d1/ | wc -l',
        'dica': 'SGID faz novos arquivos herdarem o grupo do diretório pai'
    },
    
    # NODE 2 - Questões 16-22
    {
        'id': 16,
        'titulo': 'Recuperar senha root',
        'descricao': 'Recuperar a senha root para redhat@312<br>• Durante boot, pressione "e" no GRUB<br>• Adicione rd.break<br>• Altere a senha no chroot',
        'topico': 'Segurança/Recuperação',
        'dificuldade': 'Difícil',
        'node': 'Node 2',
        'passos': [
            'Durante boot, pressione "e" no GRUB',
            'Adicionar rd.break no final da linha linux',
            'Ctrl+X para boot',
            'Remontar sysroot como rw',
            'Chroot e mudar senha',
            'Criar /.autorelabel'
        ],
        'comandos': [
            'Passo 1-3: Manual no boot',
            'mount -o remount,rw /sysroot',
            'chroot /sysroot',
            'passwd root (digitar redhat@312)',
            'touch /.autorelabel',
            'exit',
            'exit'
        ],
        'verificacao': 'Login como root com nova senha',
        'dica': 'O /.autorelabel é necessário para SELinux'
    },
    {
        'id': 17,
        'titulo': 'Criar imagem de contêiner',
        'descricao': 'Crie imagem de contêiner usando Containerfile<br>• Nome: "image32"<br>• Login em registry.lab.example.com<br>• Usuário Sophia',
        'topico': 'Contêineres',
        'dificuldade': 'Médio',
        'node': 'Node 2',
        'passos': [
            'Instalar podman',
            'Fazer login no registry',
            'Baixar Containerfile',
            'Build da imagem'
        ],
        'comandos': [
            'dnf install podman container-tools -y',
            'systemctl enable --now podman',
            'podman login registry.lab.example.com',
            'Username: admin',
            'Password: Admin@123',
            'wget http://utility.example.com/container/Containerfile',
            'podman build -t image32 -f Containerfile',
            'podman images'
        ],
        'verificacao': 'podman images | grep image32',
        'dica': 'Verifique se o Containerfile tem permissão de leitura'
    },
    {
        'id': 18,
        'titulo': 'Criar contêiner sem raiz',
        'descricao': 'Crie contêiner sem raiz com:<br>• Nome: container24<br>• Usar imagem anterior<br>• Mapear volumes<br>• Criar serviço systemd<br>• Ativar na reinicialização',
        'topico': 'Contêineres/Systemd',
        'dificuldade': 'Difícil',
        'node': 'Node 2',
        'passos': [
            'Criar diretórios',
            'Mudar propriedade para sophia',
            'Executar contêiner',
            'Criar serviço systemd',
            'Habilitar serviço'
        ],
        'comandos': [
            'mkdir -p /opt/files /opt/processed',
            'chown -R sophia:sophia /opt/files /opt/processed',
            'su - sophia',
            'podman run -d --name container24 \\',
            '  -v /opt/files:/opt/incoming:Z \\',
            '  -v /opt/processed:/opt/outgoing:Z \\',
            '  image32',
            'loginctl enable-linger',
            'mkdir -p ~/.config/systemd/user',
            'cd ~/.config/systemd/user',
            'podman generate systemd --name container24 --files --new',
            'systemctl --user daemon-reload',
            'systemctl --user enable container-container24.service',
            'systemctl --user start container-container24.service'
        ],
        'verificacao': 'podman ps && systemctl --user status container-container24',
        'dica': ':Z no volume é para contexto SELinux em containers rootless'
    },
    {
        'id': 19,
        'titulo': 'Criar partição SWAP',
        'descricao': 'Crie partição SWAP de 400MiB em /dev/sdc<br>• Não modifique swap atual<br>• Permaneça após reinicialização',
        'topico': 'Storage',
        'dificuldade': 'Médio',
        'node': 'Node 2',
        'passos': [
            'Criar partição no /dev/sdc',
            'Formatar como swap',
            'Adicionar ao fstab',
            'Ativar swap'
        ],
        'comandos': [
            'fdisk /dev/sdc (tipo 82 - Linux swap)',
            'partprobe /dev/sdc',
            'mkswap /dev/sdc1',
            'echo "/dev/sdc1 swap swap defaults 0 0" >> /etc/fstab',
            'swapon -a',
            'swapon --show'
        ],
        'verificacao': 'swapon --show && grep swap /etc/fstab',
        'dica': 'Use partprobe para atualizar a tabela de partições sem reiniciar'
    },
    {
        'id': 20,
        'titulo': 'Volume Lógico com extensões específicas',
        'descricao': 'Crie LV1 no VG1 com:<br>• Extensão física: 16M<br>• Extensões lógicas: 30<br>• Formate ext4<br>• Monte em /database',
        'topico': 'Storage/LVM',
        'dificuldade': 'Difícil',
        'node': 'Node 2',
        'passos': [
            'Calcular tamanho (30 * 16M = 480M)',
            'Criar partição LVM',
            'Criar PV, VG, LV',
            'Formatar e montar'
        ],
        'comandos': [
            'echo "30 * 16 = 480MB" | bc',
            'fdisk /dev/sde (tipo 8e)',
            'partprobe /dev/sde',
            'pvcreate /dev/sde1',
            'vgcreate VG1 -s 16M /dev/sde1',
            'lvcreate -l 30 -n LV1 VG1',
            'mkfs.ext4 /dev/VG1/LV1',
            'mkdir /database',
            'echo "/dev/VG1/LV1 /database ext4 defaults 0 0" >> /etc/fstab',
            'mount -a'
        ],
        'verificacao': 'lsblk && df -h /database',
        'dica': '-s no vgcreate define o tamanho da extensão física'
    },
    {
        'id': 21,
        'titulo': 'Configurar tuned',
        'descricao': 'Configure o tuned do sistema<br>• Instale tuned<br>• Configure perfil virtual-guest',
        'topico': 'Performance',
        'dificuldade': 'Fácil',
        'node': 'Node 2',
        'passos': [
            'Instalar tuned',
            'Iniciar serviço',
            'Recomendar perfil',
            'Aplicar perfil virtual-guest'
        ],
        'comandos': [
            'dnf install tuned -y',
            'systemctl enable --now tuned',
            'tuned-adm recommend',
            'tuned-adm profile virtual-guest',
            'tuned-adm active'
        ],
        'verificacao': 'tuned-adm active && systemctl status tuned',
        'dica': 'Perfil virtual-guest otimiza para máquinas virtuais'
    },
    {
        'id': 22,
        'titulo': 'Diretório colaborativo com SGID',
        'descricao': 'Configure diretório colaborativo em /share para grupo devops<br>• Com permissões SGID',
        'topico': 'Permissões',
        'dificuldade': 'Médio',
        'node': 'Node 2',
        'passos': [
            'Criar grupo devops',
            'Criar diretório /share',
            'Aplicar propriedade e SGID'
        ],
        'comandos': [
            'groupadd devops',
            'mkdir -p /share',
            'chown root:devops /share',
            'chmod 2775 /share',
            'ls -ld /share'
        ],
        'verificacao': 'ls -ld /share | grep "......s"',
        'dica': '2775 = rwxrwsr-x (SGID ativo)'
    }
]

PROGRESSO = {}

# ====== TEMPLATE HTML PRINCIPAL ======
BASE_HTML = '''
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - RHCSA Study Lab</title>
    <style>
        /* ESTILOS GLOBAIS */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
            box-shadow: 0 0 30px rgba(0,0,0,0.2);
        }
        
        /* HEADER */
        .header {
            background: #2c3e50;
            color: white;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .logo {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .logo i { font-size: 2rem; color: #3498db; }
        .logo h1 { font-size: 1.5rem; font-weight: 700; }
        .nav { display: flex; gap: 1.5rem; }
        .nav a {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .nav a:hover { background: #3498db; transform: translateY(-2px); }
        .nav a.active { background: #3498db; }
        
        /* MAIN CONTENT */
        .main-content { padding: 2rem; }
        
        /* BOTÕES */
        .btn {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn:hover { background: #2980b9; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
        .btn-success { background: #27ae60; }
        .btn-warning { background: #f39c12; }
        .btn-danger { background: #e74c3c; }
        .btn-sm { padding: 0.5rem 1rem; font-size: 0.9rem; }
        
        /* CARDS */
        .card {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 1.5rem;
            transition: transform 0.3s;
        }
        .card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
        
        /* FOOTER */
        .footer {
            background: #2c3e50;
            color: white;
            padding: 2rem;
            text-align: center;
            margin-top: 2rem;
        }
        
        /* UTILIDADES */
        .text-center { text-align: center; }
        .mt-1 { margin-top: 1rem; }
        .mt-2 { margin-top: 2rem; }
        .mb-1 { margin-bottom: 1rem; }
        .mb-2 { margin-bottom: 2rem; }
        .d-flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .align-center { align-items: center; }
        .gap-1 { gap: 1rem; }
        
        /* BADGES */
        .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        .badge-node1 { background: #3498db; color: white; }
        .badge-node2 { background: #e74c3c; color: white; }
        .badge-facil { background: #d4edda; color: #155724; }
        .badge-medio { background: #fff3cd; color: #856404; }
        .badge-dificil { background: #f8d7da; color: #721c24; }
        .badge-topico { background: #e8f4fc; color: #2980b9; }
        
        /* GRID */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        
        /* TERMINAL */
        .terminal-container {
            background: #1e1e1e;
            border-radius: 10px;
            overflow: hidden;
            margin: 2rem 0;
        }
        .terminal-header {
            background: #252526;
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .terminal-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        .terminal-dot.red { background: #ff5f56; }
        .terminal-dot.yellow { background: #ffbd2e; }
        .terminal-dot.green { background: #27ca3f; }
        .terminal-content {
            padding: 1.5rem;
            font-family: 'Courier New', monospace;
            color: #f8f8f2;
            min-height: 400px;
            max-height: 600px;
            overflow-y: auto;
        }
        .terminal-prompt {
            color: #50fa7b;
        }
        .terminal-command {
            color: #f8f8f2;
        }
        .terminal-output {
            color: #bd93f9;
            margin: 0.5rem 0 1rem 0;
            white-space: pre-wrap;
        }
        #terminal-input {
            background: transparent;
            border: none;
            color: #f8f8f2;
            font-family: 'Courier New', monospace;
            font-size: 1rem;
            width: 80%;
            outline: none;
            margin-left: 0.5rem;
        }
        
        /* TABELAS */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
        }
        tr:hover { background: #f8f9fa; }
        
        /* COMANDOS */
        .comando-box {
            background: #2c3e50;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            margin: 0.5rem 0;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            line-height: 1.5;
        }
        .comando-box .linha-numero {
            color: #7f8c8d;
            margin-right: 1rem;
            user-select: none;
        }
        
        /* RESPONSIVIDADE */
        @media (max-width: 768px) {
            .header { flex-direction: column; gap: 1rem; text-align: center; }
            .nav { flex-wrap: wrap; justify-content: center; }
            .grid { grid-template-columns: 1fr; }
        }
        
        /* ANIMAÇÕES */
        .blink { animation: blink 1s infinite; }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo">
                <i class="fas fa-terminal"></i>
                <h1>RHCSA Study Lab</h1>
            </div>
            <nav class="nav">
                <a href="/" class="active"><i class="fas fa-home"></i> Home</a>
                <a href="/dashboard"><i class="fas fa-chart-line"></i> Dashboard</a>
                <a href="/questoes"><i class="fas fa-tasks"></i> Questões</a>
                <a href="/terminal"><i class="fas fa-terminal"></i> Terminal</a>
                <a href="/progresso"><i class="fas fa-chart-bar"></i> Progresso</a>
            </nav>
        </header>
        
        <main class="main-content">
            {content}
        </main>
        
        <footer class="footer">
            <p>RHCSA Study Lab v3.0 &copy; 2024 - 22 Questões Completas do Exame RHCSA</p>
            <div class="mt-1">
                <small>Node 1: 15 questões • Node 2: 7 questões • Total: 22 questões</small>
            </div>
        </footer>
    </div>
    
    <script>{scripts}</script>
</body>
</html>
'''

# ====== COMANDOS DO TERMINAL ======
TERMINAL_COMMANDS = {
    'help': 'Comandos disponíveis: clear, ls, pwd, whoami, hostname, ip, systemctl, yum, dnf, mkdir, touch, cat, echo',
    'clear': 'clear',
    'ls': 'ls -la',
    'pwd': 'pwd',
    'whoami': 'whoami',
    'hostname': 'hostname',
    'hostnamectl': 'hostnamectl',
    'ip': 'ip addr show',
    'systemctl': 'systemctl status',
    'yum': 'yum repolist',
    'dnf': 'dnf repolist',
    'mkdir': 'mkdir -p /tmp/test',
    'touch': 'touch /tmp/test.txt',
    'cat': 'cat /etc/redhat-release',
    'echo': 'echo "Hello RHCSA"',
    'date': 'date',
    'uptime': 'uptime',
    'free': 'free -h',
    'df': 'df -h',
    'ps': 'ps aux | head -10',
    'ss': 'ss -tlnp',
    'nmcli': 'nmcli connection show',
    'firewall-cmd': 'firewall-cmd --list-all',
    'getenforce': 'getenforce',
    'sestatus': 'sestatus',
    'lsblk': 'lsblk',
    'blkid': 'blkid',
    'lvs': 'lvs',
    'vgs': 'vgs',
    'pvs': 'pvs',
    'crontab': 'crontab -l',
    'useradd': 'useradd --help | head -5',
    'groupadd': 'groupadd --help | head -5',
    'chmod': 'chmod --help | head -5',
    'chown': 'chown --help | head -5',
    'setfacl': 'setfacl --help | head -5',
    'tar': 'tar --help | head -5',
    'find': 'find --help | head -5',
    'ssh': 'ssh -V',
    'podman': 'podman --version',
    'tuned-adm': 'tuned-adm active'
}

# ====== FUNÇÕES AUXILIARES ======
def generate_questoes_html():
    html = ''
    for q in QUESTOES:
        node_class = 'badge-node1' if q['node'] == 'Node 1' else 'badge-node2'
        dificuldade_class = 'badge-' + q['dificuldade'].lower()
        status = PROGRESSO.get(str(q['id']), {}).get('status', 'pendente')
        status_icon = '✅' if status == 'concluido' else '🔄' if status == 'em_andamento' else '⏳'
        
        html += '''
        <div class="card">
            <div class="d-flex justify-between align-center mb-1">
                <div class="d-flex align-center gap-1">
                    <span class="badge ''' + node_class + '''">#''' + str(q['id']) + ''' • ''' + q['node'] + '''</span>
                    <span class="badge ''' + dificuldade_class + '''">''' + q['dificuldade'] + '''</span>
                    <span style="font-size: 1.2rem;">''' + status_icon + '''</span>
                </div>
                <span class="badge badge-topico">''' + q['topico'] + '''</span>
            </div>
            
            <h3 style="margin-bottom: 0.5rem;">''' + q['titulo'] + '''</h3>
            <p style="color: #666; margin-bottom: 1rem;">''' + q['descricao'].replace('<br>', ' ')[:120] + '''...</p>
            
            <div class="d-flex justify-between align-center">
                <div>
                    <span style="color: #7f8c8d; font-size: 0.9rem;">
                        <i class="fas fa-terminal"></i> ''' + str(len(q['comandos'])) + ''' comandos •
                        <i class="fas fa-list-ol"></i> ''' + str(len(q['passos'])) + ''' passos
                    </span>
                </div>
                <div>
                    <a href="/questao/''' + str(q['id']) + '''" class="btn btn-sm">
                        <i class="fas fa-book-open"></i> Estudar
                    </a>
                </div>
            </div>
        </div>
        '''
    return html

def generate_questao_detail(q):
    node_class = 'badge-node1' if q['node'] == 'Node 1' else 'badge-node2'
    dificuldade_class = 'badge-' + q['dificuldade'].lower()
    
    # Passos
    passos_html = ''
    for i, passo in enumerate(q['passos'], 1):
        passos_html += '<li style="margin: 0.75rem 0; padding-left: 0.5rem;">' + passo + '</li>'
    
    # Comandos
    comandos_html = ''
    for i, comando in enumerate(q['comandos'], 1):
        if isinstance(comando, list):
            comando_text = '\n'.join(comando)
        else:
            comando_text = str(comando)
        comandos_html += '''
        <div class="comando-box">
            <span class="linha-numero">''' + str(i) + '''</span>''' + comando_text + '''
        </div>
        '''
    
    # Navegação
    nav_html = '<div class="d-flex justify-between mt-2">'
    if q['id'] > 1:
        nav_html += '<a href="/questao/' + str(q['id'] - 1) + '" class="btn"><i class="fas fa-arrow-left"></i> Anterior</a>'
    else:
        nav_html += '<div></div>'
    
    nav_html += '''
    <div>
        <button class="btn btn-success" onclick="marcarProgresso('em_andamento')">
            <i class="fas fa-play"></i> Em Andamento
        </button>
        <button class="btn btn-warning" onclick="marcarProgresso('concluido')" style="margin-left: 0.5rem;">
            <i class="fas fa-check"></i> Concluir
        </button>
    </div>
    '''
    
    if q['id'] < len(QUESTOES):
        nav_html += '<a href="/questao/' + str(q['id'] + 1) + '" class="btn">Próxima <i class="fas fa-arrow-right"></i></a>'
    else:
        nav_html += '<div></div>'
    nav_html += '</div>'
    
    return '''
    <div style="margin-bottom: 2rem;">
        <a href="/questoes" class="btn" style="margin-bottom: 1rem;">
            <i class="fas fa-arrow-left"></i> Voltar para Questões
        </a>
        
        <div class="card">
            <div class="d-flex justify-between align-center mb-2">
                <h1 style="margin: 0;">Questão #''' + str(q['id']) + ''': ''' + q['titulo'] + '''</h1>
                <div class="d-flex gap-1">
                    <span class="badge ''' + node_class + '''">''' + q['node'] + '''</span>
                    <span class="badge ''' + dificuldade_class + '''">''' + q['dificuldade'] + '''</span>
                    <span class="badge badge-topico">''' + q['topico'] + '''</span>
                </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
                <h3><i class="fas fa-info-circle"></i> Descrição</h3>
                <p>''' + q['descricao'].replace('<br>', '<br>') + '''</p>
            </div>
            
            <div style="margin: 1.5rem 0;">
                <h3><i class="fas fa-list-ol"></i> Passos para Resolução</h3>
                <ol style="margin: 1rem 0; padding-left: 1.5rem;">
                    ''' + passos_html + '''
                </ol>
            </div>
            
            <div style="margin: 1.5rem 0;">
                <h3><i class="fas fa-terminal"></i> Comandos Recomendados</h3>
                <p><small>Copie e cole no terminal para praticar:</small></p>
                ''' + comandos_html + '''
            </div>
            
            <div style="background: #e8f4fc; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
                <h3><i class="fas fa-check-circle"></i> Verificação</h3>
                <div style="background: white; padding: 1rem; border-radius: 5px; margin-top: 0.5rem; font-family: monospace;">
                    ''' + q['verificacao'] + '''
                </div>
            </div>
            
            <div style="background: #fff8e1; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
                <h3><i class="fas fa-lightbulb"></i> Dica</h3>
                <p>''' + q.get('dica', 'Pratique os comandos no terminal para fixar o aprendizado.') + '''</p>
            </div>
            
            ''' + nav_html + '''
        </div>
    </div>
    
    <script>
    function marcarProgresso(status) {
        fetch('/api/progresso/salvar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({questao_id: ''' + str(q['id']) + ''', status: status})
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Progresso salvo: ' + (status === 'concluido' ? '✅ Concluída' : '🔄 Em andamento'));
            }
        });
    }
    </script>
    '''

# ====== ROTAS PRINCIPAIS ======

@app.route('/')
def index():
    concluidas = sum(1 for q in PROGRESSO.values() if q.get('status') == 'concluido')
    em_andamento = sum(1 for q in PROGRESSO.values() if q.get('status') == 'em_andamento')
    percentual = (concluidas / len(QUESTOES) * 100) if QUESTOES else 0
    
    content = '''
    <div class="hero-section" style="background: linear-gradient(135deg, #2c3e50, #3498db); color: white; padding: 4rem 2rem; border-radius: 10px; text-align: center; margin-bottom: 3rem;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">🎯 RHCSA Study Lab</h1>
        <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">Laboratório virtual completo com todas as 22 questões do exame RHCSA</p>
        
        <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem;">
            <div style="background: rgba(255,255,255,0.1); padding: 1rem 2rem; border-radius: 8px;">
                <div style="font-size: 2.5rem; font-weight: bold;">''' + str(len(QUESTOES)) + '''</div>
                <div>Questões</div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem 2rem; border-radius: 8px;">
                <div style="font-size: 2.5rem; font-weight: bold;">''' + str(concluidas) + '''</div>
                <div>Concluídas</div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem 2rem; border-radius: 8px;">
                <div style="font-size: 2.5rem; font-weight: bold;">''' + f"{percentual:.1f}" + '''%</div>
                <div>Progresso</div>
            </div>
        </div>
        
        <div style="margin-top: 2rem;">
            <a href="/questoes" class="btn" style="margin-right: 1rem;">
                <i class="fas fa-tasks"></i> Começar a Estudar
            </a>
            <a href="/terminal" class="btn btn-success">
                <i class="fas fa-terminal"></i> Praticar no Terminal
            </a>
        </div>
    </div>
    
    <div class="grid">
        <div class="card text-center">
            <div style="width: 60px; height: 60px; background: #3498db; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-terminal" style="font-size: 1.5rem; color: white;"></i>
            </div>
            <h3>Terminal Interativo</h3>
            <p>Execute comandos Linux reais em ambiente simulado</p>
            <a href="/terminal" class="btn mt-1">Abrir Terminal</a>
        </div>
        
        <div class="card text-center">
            <div style="width: 60px; height: 60px; background: #27ae60; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-tasks" style="font-size: 1.5rem; color: white;"></i>
            </div>
            <h3>22 Questões Completas</h3>
            <p>Todas as questões do exame com soluções detalhadas</p>
            <a href="/questoes" class="btn btn-success mt-1">Ver Questões</a>
        </div>
        
        <div class="card text-center">
            <div style="width: 60px; height: 60px; background: #f39c12; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-chart-line" style="font-size: 1.5rem; color: white;"></i>
            </div>
            <h3>Acompanhamento Inteligente</h3>
            <p>Dashboard com seu progresso de estudo</p>
            <a href="/dashboard" class="btn btn-warning mt-1">Ver Dashboard</a>
        </div>
    </div>
    
    <div class="card mt-2">
        <h2 style="margin-bottom: 1rem;"><i class="fas fa-bolt"></i> Questões Recomendadas</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <a href="/questao/1" style="text-decoration: none; color: inherit;">
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid #3498db;">
                    <div class="d-flex justify-between align-center">
                        <span class="badge badge-node1">#1</span>
                        <span class="badge badge-facil">Fácil</span>
                    </div>
                    <h4 style="margin: 0.5rem 0;">Configurar IP estático</h4>
                    <small><i class="fas fa-network-wired"></i> Rede • Node 1</small>
                </div>
            </a>
            
            <a href="/questao/6" style="text-decoration: none; color: inherit;">
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid #3498db;">
                    <div class="d-flex justify-between align-center">
                        <span class="badge badge-node1">#6</span>
                        <span class="badge badge-medio">Médio</span>
                    </div>
                    <h4 style="margin: 0.5rem 0;">Servidor Web na porta 82</h4>
                    <small><i class="fas fa-server"></i> Serviços • Node 1</small>
                </div>
            </a>
            
            <a href="/questao/16" style="text-decoration: none; color: inherit;">
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid #e74c3c;">
                    <div class="d-flex justify-between align-center">
                        <span class="badge badge-node2">#16</span>
                        <span class="badge badge-dificil">Difícil</span>
                    </div>
                    <h4 style="margin: 0.5rem 0;">Recuperar senha root</h4>
                    <small><i class="fas fa-key"></i> Segurança • Node 2</small>
                </div>
            </a>
        </div>
    </div>
    '''
    
    html = BASE_HTML.replace('{title}', 'Home').replace('{content}', content).replace('{scripts}', '')
    return render_template_string(html)

@app.route('/dashboard')
def dashboard():
    concluidas = sum(1 for q in PROGRESSO.values() if q.get('status') == 'concluido')
    em_andamento = sum(1 for q in PROGRESSO.values() if q.get('status') == 'em_andamento')
    total = len(QUESTOES)
    pendentes = total - concluidas - em_andamento
    percentual = (concluidas / total * 100) if total > 0 else 0
    
    # Estatísticas por node
    node1_total = len([q for q in QUESTOES if q['node'] == 'Node 1'])
    node1_concluidas = len([q for q in QUESTOES if q['node'] == 'Node 1' and str(q['id']) in PROGRESSO and PROGRESSO[str(q['id'])].get('status') == 'concluido'])
    node2_total = len([q for q in QUESTOES if q['node'] == 'Node 2'])
    node2_concluidas = len([q for q in QUESTOES if q['node'] == 'Node 2' and str(q['id']) in PROGRESSO and PROGRESSO[str(q['id'])].get('status') == 'concluido'])
    
    content = '''
    <div style="margin-bottom: 2rem;">
        <h1><i class="fas fa-chart-line"></i> Dashboard de Progresso</h1>
        <p>Acompanhe seu desempenho no estudo para o RHCSA</p>
    </div>
    
    <div class="grid">
        <div class="card text-center">
            <div style="font-size: 3rem; font-weight: bold; color: #2c3e50;">''' + str(total) + '''</div>
            <h3>Total de Questões</h3>
            <p>Todas as questões disponíveis</p>
        </div>
        
        <div class="card text-center">
            <div style="font-size: 3rem; font-weight: bold; color: #27ae60;">''' + str(concluidas) + '''</div>
            <h3>Concluídas</h3>
            <p>Questões finalizadas</p>
        </div>
        
        <div class="card text-center">
            <div style="font-size: 3rem; font-weight: bold; color: #f39c12;">''' + str(em_andamento) + '''</div>
            <h3>Em Andamento</h3>
            <p>Questões sendo estudadas</p>
        </div>
        
        <div class="card text-center">
            <div style="font-size: 3rem; font-weight: bold; color: #e74c3c;">''' + str(pendentes) + '''</div>
            <h3>Pendentes</h3>
            <p>Questões para estudar</p>
        </div>
    </div>
    
    <div class="card">
        <h2><i class="fas fa-chart-bar"></i> Progresso Geral</h2>
        <div style="margin: 1.5rem 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Progresso: ''' + f"{percentual:.1f}" + '''%</span>
                <span>''' + str(concluidas) + '''/''' + str(total) + ''' questões</span>
            </div>
            <div style="background: #ecf0f1; height: 20px; border-radius: 10px; overflow: hidden;">
                <div style="background: linear-gradient(90deg, #27ae60, #2ecc71); height: 100%; width: ''' + str(percentual) + '''%;"></div>
            </div>
        </div>
    </div>
    
    <div class="grid">
        <div class="card">
            <h3><i class="fas fa-server"></i> Progresso por Node</h3>
            <div style="margin: 1rem 0;">
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;">
                    <span>Node 1</span>
                    <span>''' + str(node1_concluidas) + '''/''' + str(node1_total) + ''' (''' + f"{(node1_concluidas/node1_total*100):.1f}" + '''%)</span>
                </div>
                <div style="background: #ecf0f1; height: 10px; border-radius: 5px; overflow: hidden;">
                    <div style="background: #3498db; height: 100%; width: ''' + str((node1_concluidas/node1_total*100) if node1_total > 0 else 0) + '''%;"></div>
                </div>
                
                <div style="display: flex; justify-content: space-between; margin: 1rem 0 0.5rem;">
                    <span>Node 2</span>
                    <span>''' + str(node2_concluidas) + '''/''' + str(node2_total) + ''' (''' + f"{(node2_concluidas/node2_total*100):.1f}" + '''%)</span>
                </div>
                <div style="background: #ecf0f1; height: 10px; border-radius: 5px; overflow: hidden;">
                    <div style="background: #e74c3c; height: 100%; width: ''' + str((node2_concluidas/node2_total*100) if node2_total > 0 else 0) + '''%;"></div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3><i class="fas fa-signal"></i> Distribuição por Dificuldade</h3>
            <div style="margin: 1rem 0;">
                <div style="display: flex; align-items: center; margin: 0.5rem 0;">
                    <div style="width: 12px; height: 12px; background: #d4edda; border-radius: 50%; margin-right: 0.5rem;"></div>
                    <span style="flex: 1;">Fácil</span>
                    <span>''' + str(len([q for q in QUESTOES if q['dificuldade'] == 'Fácil'])) + ''' questões</span>
                </div>
                
                <div style="display: flex; align-items: center; margin: 0.5rem 0;">
                    <div style="width: 12px; height: 12px; background: #fff3cd; border-radius: 50%; margin-right: 0.5rem;"></div>
                    <span style="flex: 1;">Médio</span>
                    <span>''' + str(len([q for q in QUESTOES if q['dificuldade'] == 'Médio'])) + ''' questões</span>
                </div>
                
                <div style="display: flex; align-items: center; margin: 0.5rem 0;">
                    <div style="width: 12px; height: 12px; background: #f8d7da; border-radius: 50%; margin-right: 0.5rem;"></div>
                    <span style="flex: 1;">Difícil</span>
                    <span>''' + str(len([q for q in QUESTOES if q['dificuldade'] == 'Difícil'])) + ''' questões</span>
                </div>
            </div>
        </div>
    </div>
    '''
    
    html = BASE_HTML.replace('{title}', 'Dashboard').replace('{content}', content).replace('{scripts}', '')
    return render_template_string(html)

@app.route('/questoes')
def questoes():
    content = '''
    <div style="margin-bottom: 2rem;">
        <h1><i class="fas fa-tasks"></i> Todas as Questões RHCSA</h1>
        <p>Selecione uma questão para estudar. Total: ''' + str(len(QUESTOES)) + ''' questões</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;"><i class="fas fa-filter"></i> Filtros</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="/questoes" class="btn">Todas (''' + str(len(QUESTOES)) + ''')</a>
            <button class="btn btn-success" onclick="filtrarPorNode('Node 1')">Node 1 (15)</button>
            <button class="btn btn-danger" onclick="filtrarPorNode('Node 2')">Node 2 (7)</button>
            <button class="btn" style="background: #d4edda; color: #155724;" onclick="filtrarPorDificuldade('Fácil')">Fácil (8)</button>
            <button class="btn" style="background: #fff3cd; color: #856404;" onclick="filtrarPorDificuldade('Médio')">Médio (9)</button>
            <button class="btn" style="background: #f8d7da; color: #721c24;" onclick="filtrarPorDificuldade('Difícil')">Difícil (5)</button>
        </div>
    </div>
    
    <div class="grid" id="questoes-grid">
        ''' + generate_questoes_html() + '''
    </div>
    
    <script>
    function filtrarPorNode(node) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const badge = card.querySelector('.badge-node1, .badge-node2');
            if (badge && badge.textContent.includes(node)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function filtrarPorDificuldade(dificuldade) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const badges = card.querySelectorAll('.badge-facil, .badge-medio, .badge-dificil');
            let mostrar = false;
            badges.forEach(badge => {
                if (badge.textContent === dificuldade) {
                    mostrar = true;
                }
            });
            card.style.display = mostrar ? 'block' : 'none';
        });
    }
    
    // Mostrar todas as questões por padrão
    document.addEventListener('DOMContentLoaded', function() {
        // Adiciona cores diferentes para os nodes
        document.querySelectorAll('.badge-node1').forEach(badge => {
            badge.style.backgroundColor = '#3498db';
        });
        document.querySelectorAll('.badge-node2').forEach(badge => {
            badge.style.backgroundColor = '#e74c3c';
        });
    });
    </script>
    '''
    
    html = BASE_HTML.replace('{title}', 'Questões').replace('{content}', content).replace('{scripts}', '')
    return render_template_string(html)

@app.route('/questao/<int:questao_id>')
def questao(questao_id):
    q = next((item for item in QUESTOES if item['id'] == questao_id), None)
    if not q:
        return "Questão não encontrada", 404
    
    content = generate_questao_detail(q)
    html = BASE_HTML.replace('{title}', 'Questão ' + str(questao_id)).replace('{content}', content).replace('{scripts}', '')
    return render_template_string(html)

@app.route('/terminal')
def terminal():
    terminal_script = '''
    let commandHistory = [];
    let historyIndex = -1;
    
    function executeCommand() {
        const input = document.getElementById('terminal-input');
        const command = input.value.trim();
        
        if (command === '') return;
        
        // Adicionar ao histórico
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        
        // Mostrar comando executado
        const output = document.getElementById('terminal-output');
        output.innerHTML += '<div class="terminal-prompt">root@rhcsa-lab:~# <span class="terminal-command">' + command + '</span></div>';
        
        // Processar comando
        let result = processCommand(command);
        output.innerHTML += '<div class="terminal-output">' + result + '</div>';
        
        // Limpar input e scroll para baixo
        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
    
    function processCommand(cmd) {
        const parts = cmd.split(' ');
        const baseCmd = parts[0].toLowerCase();
        
        if (cmd === 'clear') {
            document.getElementById('terminal-output').innerHTML = '';
            return '';
        }
        
        if (cmd === 'help') {
            return `Comandos disponíveis:\\n` +
                   `• clear - Limpar terminal\\n` +
                   `• ls, pwd, whoami - Comandos básicos\\n` +
                   `• hostname, hostnamectl - Informações do sistema\\n` +
                   `• ip, systemctl - Rede e serviços\\n` +
                   `• yum, dnf - Gerenciamento de pacotes\\n` +
                   `• mkdir, touch, cat, echo - Manipulação de arquivos\\n` +
                   `• date, uptime, free, df - Sistema\\n` +
                   `• ps, ss - Processos e rede\\n` +
                   `• nmcli, firewall-cmd - Rede e firewall\\n` +
                   `• getenforce, sestatus - SELinux\\n` +
                   `• lsblk, blkid - Discos\\n` +
                   `• lvs, vgs, pvs - LVM\\n` +
                   `• crontab - Agendamento\\n` +
                   `• useradd, groupadd - Usuários\\n` +
                   `• chmod, chown, setfacl - Permissões\\n` +
                   `• tar, find - Arquivos\\n` +
                   `• ssh, podman - Rede e containers\\n` +
                   `• tuned-adm - Performance`;
        }
        
        const commands = ''' + json.dumps(TERMINAL_COMMANDS) + ''';
        
        if (commands[baseCmd]) {
            return commands[baseCmd];
        }
        
        return `Comando não reconhecido: ${cmd}\\nDigite "help" para ver comandos disponíveis.`;
    }
    
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                if (historyIndex > 0) historyIndex--;
                const input = document.getElementById('terminal-input');
                input.value = commandHistory[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const input = document.getElementById('terminal-input');
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    }
    
    // Focar no input quando a página carregar
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('terminal-input').focus();
    });
    '''
    
    content = '''
    <div style="margin-bottom: 2rem;">
        <h1><i class="fas fa-terminal"></i> Terminal Interativo</h1>
        <p>Pratique comandos Linux em ambiente simulado. Digite "help" para ver comandos disponíveis.</p>
    </div>
    
    <div class="terminal-container">
        <div class="terminal-header">
            <div class="terminal-dot red"></div>
            <div class="terminal-dot yellow"></div>
            <div class="terminal-dot green"></div>
            <span style="color: #ccc; margin-left: 1rem;">Terminal RHCSA Study Lab</span>
        </div>
        
        <div class="terminal-content" id="terminal-output">
            <div class="terminal-output">
    ╔══════════════════════════════════════════════╗
    ║        TERMINAL INTERATIVO RHCSA           ║
    ╠══════════════════════════════════════════════╣
    ║  Bem-vindo ao terminal de prática!          ║
    ║  Digite "help" para ver comandos disponíveis ║
    ║  Use as setas ↑↓ para navegar no histórico   ║
    ╚══════════════════════════════════════════════╝
    
    Comandos populares para prática:
    • hostnamectl - Ver informações do sistema
    • ip addr show - Configuração de rede
    • systemctl status httpd - Status do Apache
    • lsblk - Listar discos e partições
    • getenforce - Status do SELinux
            </div>
        </div>
        
        <div style="background: #252526; padding: 1rem; border-top: 1px solid #333;">
            <span class="terminal-prompt">root@rhcsa-lab:~# </span>
            <input type="text" id="terminal-input" 
                   style="background: transparent; border: none; color: #f8f8f2; 
                          font-family: 'Courier New', monospace; font-size: 1rem; 
                          width: calc(100% - 200px); outline: none;"
                   placeholder="Digite um comando..."
                   onkeypress="handleKeyPress(event)">
        </div>
    </div>
    
    <div class="grid mt-2">
        <div class="card">
            <h3><i class="fas fa-lightbulb"></i> Dicas para o Terminal</h3>
            <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                <li>Use <code>Tab</code> para auto-completar (simulado)</li>
                <li>Use <code>Ctrl+C</code> para cancelar operações</li>
                <li>Use <code>clear</code> para limpar o terminal</li>
                <li>Pratique comandos das questões aqui</li>
            </ul>
        </div>
        
        <div class="card">
            <h3><i class="fas fa-bolt"></i> Comandos Rápidos</h3>
            <div style="margin: 1rem 0;">
                <button class="btn btn-sm" onclick="document.getElementById('terminal-input').value='hostnamectl'; document.getElementById('terminal-input').focus();" style="margin: 0.25rem;">hostnamectl</button>
                <button class="btn btn-sm" onclick="document.getElementById('terminal-input').value='ip addr show'; document.getElementById('terminal-input').focus();" style="margin: 0.25rem;">ip addr</button>
                <button class="btn btn-sm" onclick="document.getElementById('terminal-input').value='systemctl status'; document.getElementById('terminal-input').focus();" style="margin: 0.25rem;">systemctl</button>
                <button class="btn btn-sm" onclick="document.getElementById('terminal-input').value='lsblk'; document.getElementById('terminal-input').focus();" style="margin: 0.25rem;">lsblk</button>
                <button class="btn btn-sm" onclick="document.getElementById('terminal-input').value='yum repolist'; document.getElementById('terminal-input').focus();" style="margin: 0.25rem;">yum</button>
            </div>
        </div>
    </div>
    
    <div class="card mt-2">
        <h3><i class="fas fa-book"></i> Comandos por Tópico</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div>
                <h4>Rede</h4>
                <code>nmcli</code><br>
                <code>ip</code><br>
                <code>ss</code><br>
                <code>firewall-cmd</code>
            </div>
            <div>
                <h4>Storage</h4>
                <code>lsblk</code><br>
                <code>lvs</code><br>
                <code>vgs</code><br>
                <code>pvs</code>
            </div>
            <div>
                <h4>Serviços</h4>
                <code>systemctl</code><br>
                <code>crontab</code><br>
                <code>podman</code><br>
                <code>tuned-adm</code>
            </div>
            <div>
                <h4>Segurança</h4>
                <code>getenforce</code><br>
                <code>sestatus</code><br>
                <code>chmod</code><br>
                <code>setfacl</code>
            </div>
        </div>
    </div>
    '''
    
    html = BASE_HTML.replace('{title}', 'Terminal').replace('{content}', content).replace('{scripts}', terminal_script)
    return render_template_string(html)

@app.route('/progresso')
def progresso():
    # Organizar questões por status
    questoes_com_status = []
    for q in QUESTOES:
        status_info = PROGRESSO.get(str(q['id']), {'status': 'pendente', 'data': None})
        questoes_com_status.append({
            'id': q['id'],
            'titulo': q['titulo'],
            'node': q['node'],
            'topico': q['topico'],
            'dificuldade': q['dificuldade'],
            'status': status_info['status'],
            'data': status_info.get('data')
        })
    
    # Ordenar: concluídas → em andamento → pendentes
    ordem_status = {'concluido': 0, 'em_andamento': 1, 'pendente': 2}
    questoes_com_status.sort(key=lambda x: (ordem_status[x['status']], x['id']))
    
    # Gerar HTML da tabela
    linhas_html = ''
    for q in questoes_com_status:
        status_icon = '✅' if q['status'] == 'concluido' else '🔄' if q['status'] == 'em_andamento' else '⏳'
        status_color = '#27ae60' if q['status'] == 'concluido' else '#f39c12' if q['status'] == 'em_andamento' else '#95a5a6'
        node_class = 'badge-node1' if q['node'] == 'Node 1' else 'badge-node2'
        dificuldade_class = 'badge-' + q['dificuldade'].lower()
        
        data_formatada = ''
        if q['data']:
            try:
                dt = datetime.fromisoformat(q['data'].replace('Z', '+00:00'))
                data_formatada = dt.strftime('%d/%m %H:%M')
            except:
                data_formatada = q['data'][:16]
        
        linhas_html += '''
        <tr>
            <td><strong>#''' + str(q['id']) + '''</strong></td>
            <td>''' + q['titulo'] + '''</td>
            <td><span class="badge ''' + node_class + '''">''' + q['node'] + '''</span></td>
            <td><span class="badge badge-topico">''' + q['topico'] + '''</span></td>
            <td><span class="badge ''' + dificuldade_class + '''">''' + q['dificuldade'] + '''</span></td>
            <td style="color: ''' + status_color + '''; font-weight: bold;">''' + status_icon + ''' ''' + q['status'].replace('_', ' ').title() + '''</td>
            <td>''' + data_formatada + '''</td>
            <td>
                <a href="/questao/''' + str(q['id']) + '''" class="btn btn-sm">
                    <i class="fas fa-book-open"></i>
                </a>
            </td>
        </tr>
        '''
    
    concluidas = sum(1 for q in PROGRESSO.values() if q.get('status') == 'concluido')
    em_andamento = sum(1 for q in PROGRESSO.values() if q.get('status') == 'em_andamento')
    total = len(QUESTOES)
    
    content = '''
    <div style="margin-bottom: 2rem;">
        <h1><i class="fas fa-chart-bar"></i> Progresso de Estudo</h1>
        <p>Acompanhe seu progresso em todas as 22 questões do RHCSA</p>
    </div>
    
    <div class="grid">
        <div class="card text-center">
            <div style="font-size: 2.5rem; font-weight: bold; color: #27ae60;">''' + str(concluidas) + '''</div>
            <h3>Concluídas</h3>
            <div style="height: 10px; background: #ecf0f1; border-radius: 5px; margin-top: 0.5rem; overflow: hidden;">
                <div style="height: 100%; background: #27ae60; width: ''' + str((concluidas/total*100) if total > 0 else 0) + '''%;"></div>
            </div>
        </div>
        
        <div class="card text-center">
            <div style="font-size: 2.5rem; font-weight: bold; color: #f39c12;">''' + str(em_andamento) + '''</div>
            <h3>Em Andamento</h3>
            <div style="height: 10px; background: #ecf0f1; border-radius: 5px; margin-top: 0.5rem; overflow: hidden;">
                <div style="height: 100%; background: #f39c12; width: ''' + str((em_andamento/total*100) if total > 0 else 0) + '''%;"></div>
            </div>
        </div>
        
        <div class="card text-center">
            <div style="font-size: 2.5rem; font-weight: bold; color: #e74c3c;">''' + str(total - concluidas - em_andamento) + '''</div>
            <h3>Pendentes</h3>
            <div style="height: 10px; background: #ecf0f1; border-radius: 5px; margin-top: 0.5rem; overflow: hidden;">
                <div style="height: 100%; background: #e74c3c; width: ''' + str(((total - concluidas - em_andamento)/total*100) if total > 0 else 0) + '''%;"></div>
            </div>
        </div>
    </div>
    
    <div class="card">
        <h2><i class="fas fa-list-check"></i> Status de Todas as Questões</h2>
        <div style="overflow-x: auto; margin-top: 1rem;">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Questão</th>
                        <th>Node</th>
                        <th>Tópico</th>
                        <th>Dificuldade</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    ''' + linhas_html + '''
                </tbody>
            </table>
        </div>
    </div>
    
    <div class="card mt-2">
        <h3><i class="fas fa-trophy"></i> Próximos Passos</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: #e8f4fc; padding: 1rem; border-radius: 8px;">
                <h4><i class="fas fa-calendar"></i> Plano de Estudo</h4>
                <p>Conclua 3 questões por dia para terminar em 1 semana.</p>
            </div>
            
            <div style="background: #f0f8e8; padding: 1rem; border-radius: 8px;">
                <h4><i class="fas fa-check-double"></i> Revisão</h4>
                <p>Revise 2 questões antigas a cada novo dia de estudo.</p>
            </div>
            
            <div style="background: #fff8e1; padding: 1rem; border-radius: 8px;">
                <h4><i class="fas fa-terminal"></i> Prática</h4>
                <p>Use o terminal para executar todos os comandos das questões.</p>
            </div>
        </div>
    </div>
    '''
    
    html = BASE_HTML.replace('{title}', 'Progresso').replace('{content}', content).replace('{scripts}', '')
    return render_template_string(html)

@app.route('/api/progresso/salvar', methods=['POST'])
def salvar_progresso():
    try:
        data = request.json
        questao_id = str(data.get('questao_id'))
        status = data.get('status', 'pendente')
        
        PROGRESSO[questao_id] = {
            'status': status,
            'data': datetime.now().isoformat(),
            'questao_id': questao_id
        }
        
        os.makedirs('data', exist_ok=True)
        with open('data/progresso.json', 'w') as f:
            json.dump(PROGRESSO, f, indent=2)
        
        return jsonify({
            'success': True, 
            'message': 'Progresso salvo!',
            'data': PROGRESSO[questao_id]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/estatisticas')
def api_estatisticas():
    concluidas = len([q for q in PROGRESSO.values() if q.get('status') == 'concluido'])
    em_andamento = len([q for q in PROGRESSO.values() if q.get('status') == 'em_andamento'])
    
    return jsonify({
        'total': len(QUESTOES),
        'concluidas': concluidas,
        'em_andamento': em_andamento,
        'pendentes': len(QUESTOES) - (concluidas + em_andamento),
        'percentual': (concluidas / len(QUESTOES)) * 100 if QUESTOES else 0
    })

if __name__ == '__main__':
    # Carregar progresso salvo
    if os.path.exists('data/progresso.json'):
        try:
            with open('data/progresso.json', 'r') as f:
                PROGRESSO = json.load(f)
        except:
            PROGRESSO = {}
    
    print("""
    ╔══════════════════════════════════════════════╗
    ║       RHCSA STUDY LAB - VERSÃO COMPLETA    ║
    ╠══════════════════════════════════════════════╣
    ║  TODAS AS 22 QUESTÕES DO RHCSA             ║
    ║  • Node 1: 15 questões                     ║
    ║  • Node 2: 7 questões                      ║
    ║  • Total: 22 questões                      ║
    ╠══════════════════════════════════════════════╣
    ║  🌐 URL Principal: http://localhost:5000    ║
    ║  📊 Dashboard:     /dashboard               ║
    ║  📚 Questões:      /questoes                ║
    ║  💻 Terminal:      /terminal                ║
    ║  📈 Progresso:     /progresso               ║
    ╠══════════════════════════════════════════════╣
    ║  ✅ Terminal interativo funcional           ║
    ║  ✅ Progresso automático                    ║
    ║  ✅ Filtros por node/dificuldade            ║
    ║  ✅ Interface moderna e responsiva          ║
    ╚══════════════════════════════════════════════╝
    
    🚀 Pronto para estudo intensivo do RHCSA!
    """)
    
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000,
        threaded=True
    )