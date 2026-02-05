// Simulação de comandos Linux
const comandos = {
    'whoami': 'user',
    'hostnamectl': `Static hostname: rhcsa-lab
       Icon name: computer-vm
         Chassis: vm
      Machine ID: 1234567890abcdef
         Boot ID: abcdef1234567890
  Virtualization: kvm
Operating System: Red Hat Enterprise Linux 8.5 (Ootpa)
          Kernel: Linux 4.18.0-348.el8.x86_64
    Architecture: x86-64`,
    
    'ip addr show': `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:12:34:56 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0
       valid_lft forever preferred_lft forever`,
    
    'lsblk': `NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   20G  0 disk
├─sda1   8:1    0    1G  0 part /boot
└─sda2   8:2    0   19G  0 part
  ├─rhel-root 253:0    0   17G  0 lvm  /
  └─rhel-swap 253:1    0    2G  0 lvm  [SWAP]`,
    
    'systemctl status': `● rhcsa-lab
    State: running
    Jobs: 0 queued
    Failed: 0 units
    Since: Mon 2024-01-01 10:00:00 UTC; 1h ago`,
    
    'getenforce': 'Enforcing',
    
    'df -h': `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        19G  5.2G   14G  28% /
/dev/sda1       976M  256M  653M  28% /boot
tmpfs           1.9G     0  1.9G   0% /dev/shm`,
    
    'free -h': `              total        used        free      shared  buff/cache   available
Mem:           1.9G        800M        300M         50M        800M        900M
Swap:          2.0G          0B        2.0G`,
    
    'ps aux | head -10': `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169316 13104 ?        Ss   10:00   0:01 /usr/lib/systemd/systemd
root         2  0.0  0.0      0     0 ?        S    10:00   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        I<   10:00   0:00 [rcu_gp]`,
    
    'ls': `Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos`,
    
    'pwd': '/home/user',
    
    'date': 'Mon Mar  1 10:30:00 UTC 2024',
    
    'uname -a': 'Linux rhcsa-lab 4.18.0-348.el8.x86_64 #1 SMP Wed Oct 13 14:25:44 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux',
    
    'help': `Comandos disponíveis:
  whoami        - Mostra o usuário atual
  hostnamectl   - Informações do sistema
  ip addr show  - Configuração de rede
  lsblk         - Dispositivos de armazenamento
  systemctl     - Gerenciamento de serviços
  getenforce    - Status do SELinux
  df -h         - Espaço em disco
  free -h       - Memória e swap
  ps aux        - Processos em execução
  ls, pwd, date - Comandos básicos
  clear        
