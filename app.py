#!/usr/bin/env python3
"""
RHCSA Study Lab - Servidor Flask
Serve arquivos HTML estáticos da versão online
"""
from flask import Flask, render_template, send_from_directory, jsonify, request
import json
import os
from datetime import datetime

app = Flask(__name__, 
            static_folder='.',
            static_url_path='',
            template_folder='.')

app.secret_key = 'rhcsa-study-2024-v3'

# Diretório para salvar progresso
DATA_DIR = 'data'
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# Carregar progresso salvo
PROGRESSO = {}
if os.path.exists(os.path.join(DATA_DIR, 'progresso.json')):
    try:
        with open(os.path.join(DATA_DIR, 'progresso.json'), 'r') as f:
            PROGRESSO = json.load(f)
    except:
        PROGRESSO = {}

# ====== ROTAS ======

@app.route('/')
def index():
    """Serve index.html (página principal estática)"""
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """Serve dashboard.html"""
    return render_template('dashboard.html')

@app.route('/terminal')
def terminal():
    """Serve terminal.html"""
    return render_template('terminal.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve arquivos estáticos (CSS, JS, etc)"""
    if os.path.exists(filename):
        if filename.endswith('.html'):
            return render_template(filename)
        return send_from_directory('.', filename)
    return "Arquivo não encontrado", 404

# ====== APIS DE PROGRESSO ======

@app.route('/api/progresso/salvar', methods=['POST'])
def salvar_progresso():
    """Salva o progresso da questão"""
    try:
        data = request.json
        questao_id = str(data.get('questao_id'))
        status = data.get('status', 'pendente')
        
        PROGRESSO[questao_id] = {
            'status': status,
            'data': datetime.now().isoformat(),
            'questao_id': questao_id
        }
        
        # Salvar em arquivo
        with open(os.path.join(DATA_DIR, 'progresso.json'), 'w') as f:
            json.dump(PROGRESSO, f, indent=2)
        
        return jsonify({
            'success': True, 
            'message': 'Progresso salvo!',
            'data': PROGRESSO[questao_id]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/progresso/obter', methods=['GET'])
def obter_progresso():
    """Obtém o progresso salvo"""
    return jsonify(PROGRESSO)

@app.route('/api/progresso/limpar', methods=['POST'])
def limpar_progresso():
    """Limpa todo o progresso"""
    global PROGRESSO
    PROGRESSO = {}
    try:
        with open(os.path.join(DATA_DIR, 'progresso.json'), 'w') as f:
            json.dump({}, f)
        return jsonify({'success': True, 'message': 'Progresso limpo!'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# ====== TRATAMENTO DE ERROS ======

@app.errorhandler(404)
def page_not_found(e):
    """Retorna index.html para rotas não encontradas (suporta routing do frontend)"""
    return render_template('index.html'), 200

if __name__ == '__main__':
    print("""
    ╔══════════════════════════════════════════════╗
    ║       RHCSA STUDY LAB - VERSÃO ONLINE      ║
    ╠══════════════════════════════════════════════╣
    ║  22 Questões RHCSA - Interface Estática    ║
    ║  + Backend Python para progresso           ║
    ╠══════════════════════════════════════════════╣
    ║  🌐 URL: http://localhost:5000             ║
    ║  📚 Questões: 22 (Node 1 + Node 2)         ║
    ║  💾 Progresso salvo em: data/progresso.json║
    ╠══════════════════════════════════════════════╣
    ║  ✅ Interface frontend estática            ║
    ║  ✅ API de progresso funcional             ║
    ║  ✅ Persiste dados de estudo               ║
    ╚══════════════════════════════════════════════╝
    
    🚀 Servidor iniciado!
    """)
    
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000,
        threaded=True
    )
