# Contexto

Na empresa júnior temos o que chamamos de Gamificação, uma forma de promover uma competição entre os voluntários para o desenvolvimento pessoal e bonificação pelas tarefas desenvolvidas. De forma saudável, cada integrante recebe pontos a partir das tarefas que foram realizadas. A empresa é dividida em grupos e existe no final de cada gestão um grupo vencedor.

O controle dos pontos muitas vezes é feito por formulário e uma planilha, onde os pontos são validados pela diretoria responsável pela gestão da empresa e recursos humanos. A aplicação foi feita para que seja mais fácil a validação e preenchimento dos pontos, permitindo visualização das pontuações por grupo, por diretoria e até por pessoa.

# Modelagem

Entidades: Jogador, Diretoria, Grupo, Tarefa, Ponto

Board (PK: id, String name)

Team (PK: id, String name, String image)

Player (PK: id, String name, FK: board_id, FK: team_id, String image)

Task (PK: id, String name, String description, int point)

Point (PK: id, FK: player_id, FK: board_id, FK: task_id, String description, boolean approved, boolean cancelled, String date)
