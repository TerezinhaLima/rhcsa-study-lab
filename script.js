// Dados das 22 questões COMPLETAS
const questoes = [
    // NODE 1 - Questões 1 a 15
    {
        id: 1,
        node: 1,
        topico: "Rede",
        dificuldade: "Fácil",
        titulo: "Configurar IP Estático",
        descricao: "Configure um endereço IP estático (192.168.1.100/24) para a interface eth0. Configure também o gateway (192.168.1.1) e DNS (8.8.8.8).",
        comando: "nmcli connection modify eth0 ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1 ipv4.dns 8.8.8.8 ipv4.method manual",
        solucao: "Verifique com: ip addr show eth0\nVerifique gateway: ip route show\nVerifique DNS: cat /etc/resolv.conf"
    },
    {
        id: 2,
        node: 1,
        topico: "Pacotes",
        dificuldade: "Fácil",
        titulo: "Configurar YUM Repository Local",
        descricao: "Configure um repositório YUM local apontando para /mnt. O repositório deve ser habilitado e sem verificação GPG.",
        comando: "sudo vim /etc/yum.repos.d/local.repo",
        solucao: "Conteúdo do arquivo:\n[local]\nname=Local Repository\nbaseurl=file:///mnt\nenabled=1\ngpgcheck=0\n\nVerifique com: yum repolist"
    },
    {
        id: 3,
        node: 1,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório com ACL",
        descricao: "Crie o diretório /shared com permissões 770. Adicione permissão de leitura e escrita para o usuário 'alex' usando ACL.",
        comando: "mkdir /shared\nchmod 770 /shared\nsetfacl -m u:alex:rwx /shared",
        solucao: "Verifique com: getfacl /shared\nDeve mostrar: user:alex:rwx"
    },
    {
        id: 4,
        node: 1,
        topico: "Usuários",
        dificuldade: "Fácil",
        titulo: "Criar Usuário Redhat",
        descricao: "Crie um usuário chamado 'redhat' com UID 2000 e GID 2000. A senha deve ser 'redhat123'.",
        comando: "groupadd -g 2000 redhat\nuseradd -u 2000 -g 2000 redhat\necho 'redhat123' | passwd --stdin redhat",
        solucao: "Verifique com: id redhat\nDeve mostrar: uid=2000(redhat) gid=2000(redhat)"
    },
    {
        id: 5,
        node: 1,
        topico: "Rede",
        dificuldade: "Médio",
        titulo: "SSH sem Senha",
        descricao: "Configure SSH para permitir login sem senha do usuário atual para o usuário 'admin' no host remoto (192.168.1.50).",
        comando: "ssh-keygen -t rsa\nssh-copy-id admin@192.168.1.50",
        solucao: "Teste com: ssh admin@192.168.1.50 'whoami'\nDeve conectar sem pedir senha"
    },
    {
        id: 6,
        node: 1,
        topico: "Serviços",
        dificuldade: "Médio",
        titulo: "Servidor Web na Porta 82",
        descricao: "Configure o Apache para escutar na porta 82. Adicione regra no firewall e faça o serviço iniciar no boot.",
        comando: "vim /etc/httpd/conf/httpd.conf\n# Mude Listen 80 para Listen 82\nsystemctl enable --now httpd\nfirewall-cmd --add-port=82/tcp --permanent\nfirewall-cmd --reload",
        solucao: "Verifique com: ss -tlnp | grep :82\nTeste: curl http://localhost:82"
    },
    {
        id: 7,
        node: 1,
        topico: "Storage",
        dificuldade: "Difícil",
        titulo: "Volume Lógico LVM",
        descricao: "Crie um volume físico em /dev/sdb1, grupo de volume 'datavg', e volume lógico 'datalv' de 5GB. Formate com XFS e monte em /data.",
        comando: "pvcreate /dev/sdb1\nvgcreate datavg /dev/sdb1\nlvcreate -L 5G -n datalv datavg\nmkfs.xfs /dev/datavg/datalv\nmkdir /data\necho '/dev/datavg/datalv /data xfs defaults 0 0' >> /etc/fstab\nmount -a",
        solucao: "Verifique com: lvs\nVerifique montagem: df -h /data"
    },
    {
        id: 8,
        node: 1,
        topico: "Agendamento",
        dificuldade: "Fácil",
        titulo: "Cronjob para devuser",
        descricao: "Configure um cronjob para o usuário 'devuser' que execute '/opt/backup.sh' todos os dias às 2:30 AM.",
        comando: "crontab -u devuser -e",
        solucao: "Adicione esta linha:\n30 2 * * * /opt/backup.sh\n\nVerifique com: crontab -u devuser -l"
    },
    {
        id: 9,
        node: 1,
        topico: "Arquivos",
        dificuldade: "Fácil",
        titulo: "Compactar Diretório /etc",
        descricao: "Crie um arquivo tar.gz compactado de /etc e salve em /backup com nome 'etc-backup-$(date +%Y%m%d).tar.gz'.",
        comando: "tar -czf /backup/etc-backup-$(date +%Y%m%d).tar.gz /etc",
        solucao: "Verifique com: ls -lh /backup/\nDeve mostrar o arquivo criado"
    },
    {
        id: 10,
        node: 1,
        topico: "Usuários",
        dificuldade: "Fácil",
        titulo: "Usuário Alex e Grupo Time-TI",
        descricao: "Crie o grupo 'time-ti' e o usuário 'alex' como membro deste grupo. Defina o shell como /bin/bash.",
        comando: "groupadd time-ti\nuseradd -g time-ti -s /bin/bash alex",
        solucao: "Verifique com: id alex\nDeve mostrar: groups=time-ti"
    },
    {
        id: 11,
        node: 1,
        topico: "Usuários",
        dificuldade: "Fácil",
        titulo: "Criar Usuário John com UID 3000",
        descricao: "Crie o usuário 'john' com UID 3000, comentário 'John Developer' e diretório home /home/johndev.",
        comando: "useradd -u 3000 -c 'John Developer' -d /home/johndev -m john",
        solucao: "Verifique com: getent passwd john\nDeve mostrar: john:x:3000:3000:John Developer:/home/johndev:/bin/bash"
    },
    {
        id: 12,
        node: 1,
        topico: "Arquivos",
        dificuldade: "Médio",
        titulo: "Localizar Arquivos do Usuário tom",
        descricao: "Encontre todos os arquivos no sistema pertencentes ao usuário 'tom' e copie a lista para /tmp/tom-files.txt.",
        comando: "find / -user tom -type f 2>/dev/null > /tmp/tom-files.txt",
        solucao: "Verifique com: head -5 /tmp/tom-files.txt\nO arquivo deve conter a lista"
    },
    {
        id: 13,
        node: 1,
        topico: "Arquivos",
        dificuldade: "Médio",
        titulo: "Localizar Arquivos do Usuário jerry",
        descricao: "Encontre todos os arquivos modificados nos últimos 7 dias pertencentes ao usuário 'jerry'.",
        comando: "find / -user jerry -mtime -7 -type f 2>/dev/null",
        solucao: "O comando listará todos os arquivos modificados nos últimos 7 dias"
    },
    {
        id: 14,
        node: 1,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório com Sticky Bit",
        descricao: "Crie o diretório /public com permissão 1777 (sticky bit). Qualquer usuário pode criar arquivos, mas só o dono pode apagá-los.",
        comando: "mkdir /public\nchmod 1777 /public",
        solucao: "Verifique com: ls -ld /public\nDeve mostrar: drwxrwxrwt"
    },
    {
        id: 15,
        node: 1,
        topico: "Scripting",
        dificuldade: "Difícil",
        titulo: "Script para Localizar Arquivos e SGID",
        descricao: "Crie um script que encontre todos os arquivos com permissão SGID no sistema e salve em /tmp/sgid-files.txt.",
        comando: "vim /usr/local/bin/find-sgid.sh",
        solucao: "Conteúdo do script:\n#!/bin/bash\nfind / -perm -2000 -type f 2>/dev/null > /tmp/sgid-files.txt\necho 'Lista salva em /tmp/sgid-files.txt'\n\nDê permissão: chmod +x /usr/local/bin/find-sgid.sh"
    },

    // NODE 2 - Questões 16 a 22
    {
        id: 16,
        node: 2,
        topico: "Segurança",
        dificuldade: "Difícil",
        titulo: "Recuperar Senha Root",
        descricao: "Recupere o acesso ao sistema redefinindo a senha do root sem conhecer a senha atual.",
        comando: "1. Reinicie o sistema\n2. No GRUB, pressione 'e' para editar\n3. Adicione 'rd.break' no final da linha linux\n4. Pressione Ctrl+X\n5. Execute: mount -o remount,rw /sysroot\n6. chroot /sysroot\n7. passwd root\n8. touch /.autorelabel\n9. exit\n10. reboot",
        solucao: "Após reboot, faça login como root com a nova senha"
    },
    {
        id: 17,
        node: 2,
        topico: "Contêineres",
        dificuldade: "Médio",
        titulo: "Criar Imagem de Contêiner",
        descricao: "Crie uma imagem Docker/Podman com Nginx e uma página HTML personalizada. A imagem deve ser taggeada como 'my-nginx:v1'.",
        comando: "vim Dockerfile\n# Conteúdo:\nFROM nginx:alpine\nCOPY index.html /usr/share/nginx/html/\n\npodman build -t my-nginx:v1 .",
        solucao: "Verifique com: podman images\nExecute: podman run -d -p 8080:80 my-nginx:v1"
    },
    {
        id: 18,
        node: 2,
        topico: "Contêineres",
        dificuldade: "Difícil",
        titulo: "Criar Contêiner sem Raiz",
        descricao: "Configure o Podman para rodar contêineres sem privilégios de root (rootless). Crie e execute um contêiner Alpine.",
        comando: "echo 'seu_usuario:100000:65536' >> /etc/subuid\necho 'seu_usuario:100000:65536' >> /etc/subgid\n\npodman run --rm -it alpine sh",
        solucao: "Verifique com: podman info | grep -A5 rootless\nDeve mostrar 'rootless: true'"
    },
    {
        id: 19,
        node: 2,
        topico: "Storage",
        dificuldade: "Médio",
        titulo: "Criar Partição SWAP",
        descricao: "Crie uma partição SWAP de 2GB em /dev/sdc1, ative-a e configure para montar automaticamente na inicialização.",
        comando: "mkswap /dev/sdc1\nswapon /dev/sdc1\necho '/dev/sdc1 swap swap defaults 0 0' >> /etc/fstab",
        solucao: "Verifique com: swapon --show\nfree -h deve mostrar a swap ativa"
    },
    {
        id: 20,
        node: 2,
        topico: "Storage",
        dificuldade: "Difícil",
        titulo: "Volume Lógico com Extensões Específicas",
        descricao: "Crie um volume lógico usando 10 extensões físicas de 64MB cada (total 640MB) no grupo de volumes 'appvg'.",
        comando: "lvcreate -l 10 -n applv appvg\n# Ou especificando tamanho: lvcreate -L 640M -n applv appvg",
        solucao: "Verifique com: lvs\nDeve mostrar o LV com ~640MB"
    },
    {
        id: 21,
        node: 2,
        topico: "Performance",
        dificuldade: "Fácil",
        titulo: "Configurar Tuned",
        descricao: "Instale o pacote tuned, configure o perfil 'throughput-performance' e ative o serviço tuned.",
        comando: "yum install tuned -y\ntuned-adm profile throughput-performance\nsystemctl enable --now tuned",
        solucao: "Verifique com: tuned-adm active\nDeve mostrar: throughput-performance"
    },
    {
        id: 22,
        node: 2,
        topico: "Permissões",
        dificuldade: "Médio",
        titulo: "Diretório Colaborativo com SGID",
        descricao: "Crie o diretório /collab com SGID. Todos os arquivos criados devem herdar o grupo 'developers'.",
        comando: "mkdir /collab\nchgrp developers /collab\nchmod 2775 /collab",
        solucao: "Verifique com: ls -ld /collab\nDeve mostrar: drwxrwsr-x\nTeste criando arquivo e veja o grupo"
    }
];
// Atualizar badge com total de questões
document.addEventListener('DOMContentLoaded', function() {
    carregarQuestoes();
    atualizarProgressoVisual();
    
    // Atualizar badge
    const badge = document.getElementById('total-questoes-badge');
    if (badge) {
        badge.textContent = `${questoes.length} Questões`;
    }
});
