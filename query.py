import json
import requests

# CONFIGURAÇÃO DE ANOS PARA COMPILAR
ANOS_ALVO = [2023, 2024, 2025]

def obter_clima_e_eventos():
    """
    Consome a API de Mudanças Climáticas do Open-Meteo.
    Retorna array vazio se não conseguir dados.
    """
    clima_ano = []
    eventos_climaticos = []
    
    id_clima = 121221
    id_evento = 13131313
    
    for ano in ANOS_ALVO:
        try:
            # URL CORRIGIDA - com https:// e parâmetros corretos
            url = f"https://archive-api.open-meteo.com/v1/archive?latitude=0&longitude=0&start_date={ano}-01-01&end_date={ano}-12-31&daily=temperature_2m_mean"
            
            print(f"Buscando dados para {ano}...")
            response = requests.get(url, timeout=10)
            
            # Verifica se a requisição foi bem-sucedida
            if response.status_code == 200:
                dados = response.json()
                temperaturas = dados.get("daily", {}).get("temperature_2m_mean", [])
                
                # Calcula a média anual se houver dados
                if temperaturas and len(temperaturas) > 0:
                    media_anual = round(sum(temperaturas) / len(temperaturas), 2)
                    print(f"  ✓ Temperatura média de {ano}: {media_anual}°C")
                else:
                    media_anual = None
                    print(f"  ⚠ Sem dados para {ano}")
                
                # Só adiciona se conseguiu obter a média
                if media_anual is not None:
                    clima_ano.append({
                        "id": id_clima,
                        "ano": ano,
                        "temperatura_do_globo": media_anual
                    })
                    id_clima += 1
            else:
                print(f"  ✗ Erro na requisição: status {response.status_code}")
                
        except Exception as e:
            print(f"  ✗ Erro ao buscar temperatura para o ano {ano}: {e}")
        
        # Mapeamento histórico conhecido de grandes anomalias (El Niño / La Niña)
        if ano == 2023 or ano == 2024:
            eventos_climaticos.append({
                "id": id_evento,
                "ano": ano,
                "nome": "El Niño / Anomalia de Aquecimento Pacífico",
                "continente": "América do Sul"
            })
            id_evento += 1

    # Retorna arrays vazios se não conseguir dados
    return clima_ano if clima_ano else [], eventos_climaticos if eventos_climaticos else []

def obter_incidentes_s2id():
    """
    Estrutura simulada com registros reais extraídos do S2ID (Defesa Civil).
    Retorna array vazio se não houver dados.
    """
    # Amostra de dados extraídos do S2ID/Defesa Civil Nacional
    dados_reais_s2id = [
        {"ano": 2024, "tipo": "Inundação / Enchente", "cidade": "Porto Alegre", "estado": "RS", "pais": "Brasil", "continente": "América do Sul"},
        {"ano": 2024, "tipo": "Incêndio Florestal", "cidade": "Corumbá", "estado": "MS", "pais": "Brasil", "continente": "América do Sul"},
        {"ano": 2023, "tipo": "Ciclone Extratropical", "cidade": "Muçum", "estado": "RS", "pais": "Brasil", "continente": "América do Sul"},
        {"ano": 2024, "tipo": "Seca Extrema", "cidade": "Manaus", "estado": "AM", "pais": "Brasil", "continente": "América do Sul"}
    ]
    
    incidentes = []
    id_incidente = 31313
    
    for item in dados_reais_s2id:
        item["id"] = id_incidente
        incidentes.append(item)
        id_incidente += 1
    
    # Retorna array vazio se não houver dados
    return incidentes if incidentes else []

# --- EXECUÇÃO PRINCIPAL ---
if __name__ == "__main__":
    print("Iniciando coleta e estruturação dos dados climáticos...\n")
    
    lista_clima, lista_eventos = obter_clima_e_eventos()
    lista_incidentes = obter_incidentes_s2id()
    
    print(f"\nClima coletado: {len(lista_clima)} registros")
    print(f"Eventos coletados: {len(lista_eventos)} registros")
    print(f"Incidentes coletados: {len(lista_incidentes)} registros\n")
    
    # Montagem do esquema final solicitado
    meu_banco_local = {
        "Clima_ano": lista_clima,
        "Eventos_climatico": lista_eventos,
        "Incidentes": lista_incidentes
    }
    
    # Exporta para um arquivo JSON local
    nome_arquivo = "meu_banco_climatico.json"
    with open(nome_arquivo, "w", encoding="utf-8") as f:
        json.dump(meu_banco_local, f, indent=2, ensure_ascii=False)
        
    print(f"✓ Sucesso! Arquivo '{nome_arquivo}' gerado com as três tabelas.")
