# Roteiro de apresentação: Marketplace Local

## 1. Abertura

Bom dia/boa tarde. O projeto que eu desenvolvi se chama **Marketplace Local**. Ele é uma plataforma simples para pessoas anunciarem produtos ou serviços dentro de uma comunidade, bairro, escola ou cidade.

A ideia principal foi criar uma aplicação que qualquer pessoa consiga abrir no navegador, sem precisar configurar banco de dados ou instalar várias dependências.

## 2. Problema escolhido

Muitos pequenos vendedores e prestadores de serviço divulgam seus trabalhos de forma espalhada: por mensagem, redes sociais ou indicação. Isso dificulta buscar, comparar, salvar favoritos e conversar com o vendedor.

O Marketplace Local centraliza essas informações em uma vitrine única.

## 3. Objetivo do sistema

O objetivo foi criar um sistema funcional com:

- cadastro de vendedores;
- anúncios com imagem;
- busca e filtros;
- favoritos;
- mensagens;
- avaliações.

## 4. Tecnologias utilizadas

Eu usei:

- **HTML5**, para a estrutura da aplicação;
- **CSS3**, para o layout, responsividade e identidade visual;
- **JavaScript puro**, para toda a lógica de funcionamento;
- **localStorage**, para salvar os dados no navegador;
- **Node.js**, para rodar testes automatizados e um servidor local opcional;
- **Git**, para versionar o projeto com commits semânticos.

## 5. Como eu fiz o passo a passo

Primeiro eu criei a estrutura principal do projeto, separando interface, estilos, lógica e testes.

Depois implementei o cadastro de vendedores, porque os anúncios precisam estar ligados a alguém.

Em seguida desenvolvi a criação dos anúncios, incluindo upload de imagem. A imagem é reduzida no navegador e salva junto com o anúncio.

Depois fiz a vitrine com busca, filtros e ordenação. A busca procura no título, descrição, categoria, tipo, vendedor e cidade.

Com a vitrine pronta, adicionei favoritos, mensagens e avaliações.

Por fim, criei o README, o roteiro de apresentação, testes automatizados e a apresentação em PowerPoint.

## 6. Principais funcionalidades para demonstrar

1. Abrir a vitrine inicial.
2. Mostrar os anúncios de exemplo.
3. Cadastrar um vendedor novo.
4. Criar um anúncio com imagem.
5. Usar busca e filtros.
6. Favoritar um anúncio.
7. Abrir detalhes do anúncio.
8. Enviar uma mensagem.
9. Responder a mensagem.
10. Criar uma avaliação.
11. Exportar os dados em JSON.

## 7. Como os dados funcionam

O projeto usa `localStorage`, que é um armazenamento do próprio navegador. Isso permitiu deixar a aplicação funcional sem backend.

Para levar dados para outro computador, o sistema tem botões de exportar e importar JSON.

## 8. Testes e qualidade

Eu criei testes com o módulo nativo de testes do Node.js. Os testes validam a parte de regra de negócio, como:

- filtro dos anúncios;
- busca sem diferenciar acentos;
- média de avaliações;
- validação dos formulários.

O comando usado é:

```bash
npm test
```

## 9. Conclusão

O Marketplace Local é um projeto acadêmico funcional, responsivo e portátil. Ele mostra como uma solução simples pode organizar anúncios locais e melhorar a comunicação entre vendedores e compradores.

Como evolução futura, ele poderia receber login, backend, banco de dados real, painel administrativo e integração com mapas ou WhatsApp.
