#!/bin/bash

# Script de execução do RHCSA Study Lab
# Autor: CyberLab
# Versão: 3.0

echo "========================================"
echo "🐧 RHCSA Study Lab - Inicializando"
echo "========================================"
echo

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado!"
    echo "Instale com: sudo dnf install python3 (Red Hat)"
    exit 1
fi

# Verificar se pip está instalado
if ! command -v pip3 &> /dev/null; then
    echo "⚠️ pip3 não encontrado, instalando..."
    sudo dnf install python3-pip -y
fi

# Criar diretório data se não existir
mkdir -p data

# Verificar se requirements.txt existe
if [ ! -f "requirements.txt" ]; then
    echo "❌ Arquivo requirements.txt não encontrado!"
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
pip3 install -r requirements.txt

# Verificar instalação do Flask
if ! python3 -c "import flask" 2>/dev/null; then
    echo "❌ Flask não instalado corretamente!"
    exit 1
fi

# Limpar tela
clear

# Mostrar banner
echo "========================================"
echo "🚀 RHCSA Study Lab - Pronto!"
echo "========================================"
echo "📚 22 Questões RHCSA"
echo "💻 Terminal Interativo"
echo "📊 Dashboard de Progresso"
echo "🌐 Servidor: http://localhost:5000"
echo "========================================"
echo

# Perguntar se quer executar
read -p "Deseja iniciar o servidor? (s/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo "✅ Iniciando servidor..."
    echo "📢 Acesse: http://localhost:5000"
    echo "🔄 Pressione Ctrl+C para parar"
    echo
    python3 app.py
else
    echo "ℹ️  Para executar manualmente: python3 app.py"
fi