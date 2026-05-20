# Marketplace Local

Um projeto acadêmico de marketplace local, feito para simular uma plataforma onde pessoas da mesma comunidade podem cadastrar vendedores, publicar produtos ou serviços, buscar anúncios, favoritar itens, enviar mensagens e avaliar atendimentos.

A proposta é ser simples de abrir, fácil de explicar em sala e funcional sem depender de backend, banco de dados externo ou instalação de bibliotecas. Tudo foi feito com HTML, CSS e JavaScript puro.

## Para que serve

O Marketplace Local resolve um problema bem comum: pequenos vendedores, prestadores de serviço e moradores de uma região precisam de um lugar simples para divulgar o que oferecem.

Na aplicação, é possível:

- cadastrar vendedores com cidade, segmento, contato e bio;
- criar anúncios de produtos ou serviços;
- adicionar imagem ao anúncio por upload;
- buscar por termo, tipo, categoria, cidade e preço máximo;
- favoritar anúncios;
- enviar mensagens para o vendedor;
- responder mensagens recebidas;
- avaliar anúncios com nota e comentário;
- exportar e importar os dados em JSON;
- restaurar uma base de demonstração.

## Como abrir em outra máquina

Este projeto foi pensado para ser portátil.

Opção mais simples:

1. Baixe ou clone a pasta do projeto.
2. Abra o arquivo `index.html` no navegador.
3. A aplicação já funciona.

Opção com servidor local:

```bash
npm start
```

Depois acesse:

```text
http://localhost:4173
```

Não há dependências externas para instalar. O `npm start` usa apenas o Node.js e o servidor local que está dentro do próprio projeto, em `scripts/serve.js`.

## Como os dados são salvos

Os dados ficam no `localStorage` do navegador. Isso significa que o projeto funciona sem banco de dados, mas os dados ficam salvos no navegador usado.

Para levar os dados para outra máquina:

1. Clique em `Exportar`.
2. Salve o arquivo `marketplace-local-dados.json`.
3. Na outra máquina, abra o projeto e clique em `Importar`.
4. Selecione o JSON exportado.

Esse recurso ajuda a demonstrar o projeto em sala com dados reais cadastrados durante o uso.

## Tecnologias usadas

- **HTML5**: estrutura da página e formulários.
- **CSS3**: layout responsivo, cards, painéis, botões e adaptação para celular.
- **JavaScript puro**: regras de negócio, filtros, cadastro, favoritos, mensagens, avaliações e persistência local.
- **Node.js**: execução dos testes e servidor local opcional.
- **Git**: versionamento com commits semânticos.

## Estrutura do projeto

```text
Marketplace/
├── assets/                 # Imagens locais dos anúncios de demonstração
├── docs/                   # Material de apoio e roteiro da apresentação
├── presentation/           # Apresentação final em PowerPoint
├── scripts/
│   └── serve.js            # Servidor local simples
├── src/
│   ├── app.js              # Interface, eventos e persistência
│   └── marketplace-core.js # Funções testáveis da regra de negócio
├── tests/
│   └── marketplace-core.test.js
├── index.html              # Tela principal do app
├── styles.css              # Estilos visuais e responsividade
├── package.json            # Scripts do projeto
└── README.md
```

## Funcionalidades implementadas

### Cadastro de vendedores

Cada vendedor tem nome, cidade, segmento, contato e uma pequena bio. Depois de cadastrado, ele aparece no formulário de criação de anúncios.

### Anúncios com imagens

O anúncio exige título, vendedor, tipo, categoria, preço, descrição e imagem. A imagem enviada é reduzida no navegador e salva junto com os dados locais.

### Busca e filtros

A vitrine permite filtrar por:

- texto livre;
- produto ou serviço;
- categoria;
- cidade;
- preço máximo;
- ordenação por data, nota ou preço.

### Favoritos

Qualquer anúncio pode ser salvo como favorito. A lista aparece no painel inferior e também atualiza o contador do topo.

### Mensagens

Ao abrir um anúncio, o visitante pode enviar uma mensagem ao vendedor. As mensagens ficam listadas na área de atividades, onde também é possível salvar uma resposta.

### Avaliações

Cada anúncio pode receber avaliações com nota de 1 a 5 estrelas e comentário. A média aparece nos cards da vitrine e ajuda na ordenação por melhor avaliação.

## Testes

O projeto inclui testes automatizados para as principais funções de regra de negócio:

- normalização de texto para busca;
- filtro de anúncios;
- ordenação por avaliação;
- cálculo de média;
- validação de vendedor;
- validação de anúncio com imagem obrigatória.

Para rodar:

```bash
npm test
```

## Padrão de commits

O projeto usa commits semânticos. Exemplos:

```text
feat: cria marketplace local funcional
docs: adiciona readme detalhado
docs: adiciona apresentacao academica
fix: corrige atualizacao do modal de avaliacao
```

Fluxo ideal com GitHub:

```bash
git remote add origin URL_DO_REPOSITORIO
git push -u origin master
```

Depois que o remoto estiver configurado, cada nova subtarefa pode seguir o padrão:

```bash
npm test
git add .
git commit -m "tipo: descricao curta"
git push
```

## Observação sobre banco de dados

Este projeto não usa banco externo de propósito. Para uma entrega acadêmica inicial, o `localStorage` deixa a aplicação mais fácil de abrir em qualquer computador e evita etapas de configuração.

Em uma evolução futura, a mesma ideia poderia virar uma aplicação com backend, autenticação e banco de dados, usando tecnologias como Node.js + Express + SQLite/PostgreSQL.

## Roteiro rápido para demonstrar

1. Abrir a vitrine e mostrar os anúncios de exemplo.
2. Cadastrar um novo vendedor.
3. Publicar um novo anúncio com imagem.
4. Usar busca e filtros.
5. Favoritar um anúncio.
6. Abrir detalhes e enviar uma mensagem.
7. Responder a mensagem no painel inferior.
8. Criar uma avaliação e mostrar a média atualizada.
9. Exportar os dados para JSON.

## Status

Projeto funcional, responsivo e com dados de demonstração locais.

## Feito por
**Gabrielly Rodrigues**
