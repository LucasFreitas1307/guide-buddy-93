# Documentação do Projeto: Chatbot de Dúvidas - FANUT/UFG

## 1. Visão Geral do Projeto
Este projeto consiste em um chatbot inteligente desenvolvido para a Faculdade de Nutrição (FANUT) da UFG. O objetivo principal é automatizar e otimizar o atendimento aos alunos, servidores e à comunidade em geral, respondendo a dúvidas frequentes de forma interativa e imediata. 

A aplicação é baseada em uma interface web que apresenta um menu rápido de opções e é integrada à inteligência artificial do Grok, que atua como o motor de respostas, oferecendo um atendimento contextualizado e dinâmico.

---

## 2. Arquitetura e Tecnologias Utilizadas
A arquitetura atual foi pensada para ser ágil, com foco na entrega rápida da interface e da integração com a IA.

* **Inteligência Artificial (Grok):** Responsável pelo processamento de linguagem natural e geração das respostas. Atualmente, seu contexto e regras de negócio estão definidos através de um `SYSTEM_PROMPT` no código.
* **Frontend e UI:** O projeto conta com um *Design System* robusto (localizado na pasta `components/ui`), garantindo uma interface padronizada e acessível.
* **Gerenciamento de Formulários e Validação:** As bibliotecas `react-hook-form` e `zod` já estão instaladas e configuradas no ecosistema do projeto, prontas para serem utilizadas na expansão de formulários.
* **Estado da Aplicação:** O modelo atual opera de forma 100% *stateless* (sem estado) no lado do cliente. Não há armazenamento em banco de dados das conversas nesta versão inicial.

---

## 3. Pré-requisitos
Para configurar e rodar este projeto em seu ambiente local, você precisará ter instalado:

* **Node.js** (versão 18 ou superior recomendada).
* **Gerenciador de pacotes** (`npm`, `yarn` ou `pnpm`).
* **Git** para clonar e versionar o repositório.
* **Chave de API (API Key)** válida para o modelo Grok.

---

## 4. Como Rodar o Projeto (Ambiente de Desenvolvimento)
Siga o passo a passo abaixo para iniciar a aplicação na sua máquina:

1. **Clone o repositório:**
   ```bash
   git clone <INSERIR_URL_DO_REPOSITORIO_AQUI>
   cd <NOME_DA_PASTA_DO_PROJETO>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou yarn install / pnpm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo chamado `.env` ou `.env.local` na raiz do projeto (use o `.env.example` como base, se houver). Adicione a sua chave de integração com a IA:
   ```env
   GROK_API_KEY=sua_chave_de_api_aqui
   ```

4. **Inicie o servidor local:**
   ```bash
   npm run dev
   # ou yarn dev
   ```

5. **Acesse a aplicação:** 
   Abra o seu navegador e acesse `http://localhost:3000` (ou a porta indicada no seu terminal).

---

## 5. Roadmap e Funcionalidades Futuras
Para os próximos ciclos de desenvolvimento e para novos estagiários que ingressarem na equipe, as seguintes melhorias arquiteturais e de produto estão mapeadas:

### 5.1. Persistência de Histórico de Conversas
* **Cenário Atual:** O chat é *stateless* e o histórico se perde ao recarregar a página.
* **Objetivo:** Implementar um banco de dados relacional (ex: PostgreSQL ou SQLite) para salvar as sessões de chat. Isso permitirá que o usuário retome conversas anteriores e viabilizará a geração de métricas valiosas de uso e qualidade de atendimento para a gestão da FANUT.

### 5.2. Formulário Estruturado de Contato (Atendimento Humano)
* **Cenário Atual:** A opção "8 · Atendimento humano" exibe apenas um texto estático.
* **Objetivo:** Utilizar as bibliotecas `react-hook-form` e `zod` (já presentes no projeto) para criar um formulário interativo de triagem. Este formulário coletará nome, e-mail e assunto de forma estruturada antes de repassar a demanda para a secretaria.

### 5.3. Base de Conhecimento Dinâmica (Arquitetura RAG)
* **Cenário Atual:** As informações institucionais, links e horários estão fixos (*hardcoded*) no `SYSTEM_PROMPT`.
* **Objetivo:** Migrar para uma arquitetura RAG (*Retrieval-Augmented Generation*). Utilizando *embeddings* e um banco de dados vetorial (ou CMS simples), o bot consultará os dados dinamicamente. Isso facilitará a atualização de regras e horários sem a necessidade de um novo *deploy* da aplicação.

### 5.4. Painel Administrativo Autenticado
* **Objetivo:** Criar um ambiente restrito com autenticação para a equipe da secretaria da FANUT. Através deste painel, os servidores poderão editar as opções do menu do chat, atualizar a base de conhecimento e alterar links, eliminando a dependência de desenvolvedores para edições de conteúdo rotineiras.

### 5.5. Internacionalização e Múltiplos Canais (Omnichannel)
* **Objetivo:** Expandir o alcance do chatbot. Planeja-se criar um painel de *analytics* para acompanhamento de perguntas frequentes (aproveitando o robusto diretório `components/ui`). A longo prazo, a lógica de *backend* do chat será desacoplada para permitir integração com outros canais de mensageria utilizados pelos alunos, como WhatsApp e Telegram.
