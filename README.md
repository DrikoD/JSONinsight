# 📊 JSONinsight - Motor de Análise Demográfica

O **JSONinsight** é um sistema inteligente de processamento, análise e exibição de dados demográficos. Ele recebe uma base de dados de usuários e gera, de forma automática e otimizada, todas as métricas necessárias para alimentar um dashboard executivo interativo.

---

## 🚀 As 4 Grandes Entregas (Issues Resolvidas nesta Branch)

Nesta etapa de consolidação do projeto, foram fechadas **4 issues críticas** de lógica de negócios, formatação de dados e comportamento da interface:

### 1. 🗺️ Ordenação do Ranking de Cidades
* **O Desafio:** A lista de cidades e suas respectivas porcentagens populacionais era exibida sem um critério de ordenação, dificultando a leitura dos dados mais relevantes.
* **A Solução:** Implementamos uma lógica de ordenação decrescente baseada na porcentagem de moradores de cada cidade.
* **Impacto:** O dashboard agora exibe um ranking geográfico limpo, priorizando as cidades mais populosas no topo da lista.

### 🔢 2. Formatação de Milhar nos Números do Painel
* **O Desafio:** Números que atingiam a casa dos milhares (ex: 1000, 2500) eram exibidos de forma "crua", sem a pontuação de milhar padrão da língua portuguesa.
* **A Solução:** Aplicamos a formatação de localização nativa para que os números grandes recebam a pontuação correta automaticamente.
* **Impacto:** Exibição profissional e legível dos dados de população no dashboard (ex: exibindo `1.500` em vez de `1500`).

### 🛠️ 3. Correção do Alvo de Injeção do DOM (Preservando o Widget "How It Works")
* **O Desafio:** Ao renderizar o dashboard, todo o conteúdo contido dentro da tag `<main>` era sobrescrito. Esse comportamento destruía elementos irmãos essenciais que deveriam coexistir na tela, como a seção "How It Works" (Como Funciona) e a área de upload/formulário.
* **A Solução:** Ajustamos o alvo de injeção (target) do JavaScript. Em vez de injetar o dashboard substituindo o `<main>` por inteiro, passamos a injetar a renderização estritamente dentro da `<section>` correspondente ao conteúdo dinâmico (onde ficava o formulário).
* **Impacto:** O ciclo de vida e a estrutura do HTML original foram preservados, mantendo o card "How It Works" intacto, visível e 100% interativo após a exibição dos dados.

### 🧠 4. Extração Inteligente de Sobrenomes (Agrupamento por Família)
* **O Desafio:** O sistema antigo capturava preposições de nomes compostos (como o "da" em "da Silva" ou "de" em "de Souza") como sobrenomes válidos, fragmentando os dados do gráfico.
* **A Solução:** Desenvolvemos um algoritmo de higienização usando Expressões Regulares (`/\s+/`) que remove espaços extras e isola apenas o **sobrenome raiz** final do usuário (Abordagem B).
* **Impacto:** Famílias inteiras são agrupadas corretamente na mesma categoria (ex: todos os "Silva" somam juntos), entregando dados consolidados e fáceis de analisar.

---

## 🛠️ Tecnologias Utilizadas

* **JavaScript (ES6+):** Manipulação avançada de Arrays (`map`, `reduce`, `sort`, `forEach`), Regex e manipulação dinâmica do DOM.
* **Git & GitHub:** Versionamento de código através de ramificações (Branches) e fluxo profissional de Pull Requests.
* **Markdown:** Para documentação técnica de alta qualidade.

---

## 🛠️ Processo de Desenvolvimento e Engenharia de Prompt

Este projeto foi desenvolvido utilizando práticas modernas de engenharia de software, onde utilizei ferramentas de Inteligência Artificial como **Pair Programmer (parceiro de programação)**. 

Minha abordagem no uso da tecnologia envolveu:
* **Validação de Cenários:** Utilização da IA para debater e validar decisões de modelagem de dados (como a escolha estratégica entre a consolidação de sobrenomes e a distribuição de idades por mediana).
* **Code Review:** Revisão ativa de algoritmos de alta performance (como manipulação de strings com Regex) para garantir segurança e robustez no motor de dados.
* **Estudo Ativo:** Investigação aprofundada de métodos nativos do JavaScript aplicados no projeto (como o comportamento do `.trim()`, `.split(/\s+/)` e indexação de arrays).

Essa dinâmica acelerou o ciclo de desenvolvimento, permitindo focar na arquitetura de negócios e na experiência final do usuário do dashboard.