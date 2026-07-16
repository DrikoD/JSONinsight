# 📊 JSON Insights — Dashboard de Análise Demográfica Local

O **JSON Insights** é uma plataforma web estática, leve e de alta performance desenvolvida para analisar, processar e visualizar dados populacionais complexos a partir de arquivos JSON. 

O grande diferencial competitivo deste projeto é a sua **arquitetura 100% Client-Side**. Nenhum dado é enviado para servidores externos ou APIs de terceiros; todo o processamento, cálculo matemático e renderização visual acontecem diretamente no navegador do usuário, garantindo total privacidade e conformidade com diretrizes rígidas de segurança de dados (LGPD).

---

## 🎯 Contexto e Insights Analisados

A aplicação foi projetada para receber uma estrutura de dados brutos de usuários e transformá-los em um painel executivo limpo e acionável. O motor lógico processa o payload e extrai os seguintes insights em tempo real:

* **Total de Usuários Cadastrados:** Contador geral da população amostrada com formatação numérica regionalizada (`pt-BR`).
* **Métricas Avançadas de Idade:**
    * *Média de Idade:* Indicador do perfil geracional do grupo.
    * *Mediana de Idade:* Cálculo estatístico exato que mitiga distorções causadas por *outliers* (idades discrepantes), oferecendo uma visão mais realista do centro da massa de dados.
* **Cidade Mais Populosa:** Identificação automática do maior polo demográfico presente no arquivo e a sua representação volumétrica.
* **Distribuição Percentual por Cidade:** Uma listagem dinâmica detalhando a participação proporcional de cada localidade na base de dados.
* **Predominância de Sobrenomes por Região:** Análise de frequência que identifica os sobrenomes mais comuns de acordo com os agrupamentos geográficos.

---

## 🚀 Funcionalidades Principais

* **Leitura de Arquivos Local:** Seletor de arquivos nativo que permite carregar qualquer arquivo `.json` diretamente do seu computador com processamento instantâneo.
* **Renderização Dinâmica Condicional:** Os componentes do dashboard só ganham vida no DOM após a validação e processamento bem-sucedido dos dados.
* **Gestão de Temas (Light/Dark Mode):** Suporte completo a preferências visuais com transições suaves via variáveis CSS, melhorando a acessibilidade e o conforto visual.
* **Layout Fluido e Responsivo:** Grid estruturado para se adaptar perfeitamente a diferentes tamanhos de tela (Monitores, Notebooks e Tablets).

---

## 🛠️ Arquitetura e Decisões Técnicas

Durante o ciclo de desenvolvimento, priorizamos a máxima eficiência, a simplicidade arquitetural e a manutenibilidade do código. As principais decisões de engenharia foram:

### 1. Stack Tecnológica Pura (Vanilla Architecture)
* **HTML5 Semântico:** Estruturação limpa visando SEO técnico e acessibilidade.
* **CSS3 Avançado:** Uso extensivo de *CSS Variables* para o motor de temas, além de *CSS Grid* e *Flexbox* para resolver a distribuição dos componentes sem a necessidade de frameworks pesados (como Bootstrap ou Tailwind).
* **JavaScript Assíncrono e Manipulação de DOM:** Tratamento de arquivos com a API `FileReader`, algoritmos nativos de agrupamento (`reduce`, `map`, `sort`) e injeção segura de templates literais.

### 2. Discussão de Features e Descarte Consciente (O Caso do PDF)
Durante a fase de design de novas features, arquitetamos a implementação de um botão para exportação do relatório em formato PDF. Avaliamos duas abordagens:
1.  *Bibliotecas de Terceiros (ex: html2pdf.js):* Adicionaria um peso desnecessário ao bundle do projeto e geraria PDFs rasterizados (imagens pesadas e pixeladas).
2.  *Impressão Nativa via CSS (`window.print()`):* Solução elegante que mantém o texto vetorizado e leve. No entanto, devido à natureza interativa do dashboard (que utiliza caixas com rolagem interna/scroll para listas longas), a folha física ou digital A4 gerava cortes inestéticos nos dados brutos.

**Decisão de Engenharia:** Em favor da experiência do usuário e da integridade visual imaculada do dashboard, a funcionalidade foi descartada nesta versão, mantendo o escopo focado em uma visualização de tela impecável e de altíssima performance.

---

## 📦 Como Executar o Projeto Localmente

Por se tratar de uma aplicação puramente client-side, você não precisa instalar dependências (como Node.js ou pacotes npm).

1. Clone este repositório para a sua máquina:
   ```bash
   git clone [https://github.com/DrikoD/json-insights.git](https://github.com/DrikoD/json-insights.git) 

   Navegue até a pasta do projeto:

   cd json-insights

   Abra o arquivo index.html diretamente em qualquer navegador moderno ou utilize a extensão Live Server no seu VS Code para uma melhor experiência de desenvolvimento.

   🗺️ Roadmap de Versões
   
v1.0.0 (Versão Atual):

Leitura de JSON local via seletor de arquivos (input[type="file"]).

Motor de cálculo de Média/Mediana integrado.

Dark/Light mode concluído.

Layout Grid e responsividade finalizados.

Desenvolvido com dedicação e engenharia de software limpa. 🧠💻