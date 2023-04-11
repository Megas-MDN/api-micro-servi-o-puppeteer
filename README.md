# Api microsserviço puppeteer

Essa API utiliza a biblioteca Puppeteer para automatizar a navegação no site da Bolsa de Valores B3. Ela tem como objetivo verificar se houve atualização nas séries autorizadas e, caso haja, enviar uma requisição POST com a URL atualizada e uma chave de autorização no cabeçalho da requisição para a [API séries autorizadas](https://github.com/Megas-MDN/Api-Series-Autorizadas-B3)

<hr>

## Fluxo da aplicação

A API entra no site da bolsa pelo link público e procura a tag que contém a URL de download das séries autorizadas. Em seguida, faz uma requisição para a [API-series-autorizadas/source](https://api-series-autorizadas-b3.up.railway.app/source) e obtem a última URL de atualização. Essa URL é então comparada com a URL encontrada no site da bolsa. Se houver diferença, a API dispara uma requisição POST para a 🔒️[API-series-autorizadas/data](https://api-series-autorizadas-b3.up.railway.app/data), incluindo a URL atualizada no body e a chave de autorização no cabeçalho da requisição.

![ScreenShot](https://i.imgur.com/55Eiens.png)

<hr>

## 🧐 Features

Funcionalidades implementadas na API:

- **Nevegação no site da bolsa b3 com a url específica**;

- **Localização do elemento HTML que possui a informação de interesse**;

- **Requisição de informações externas (outra API)**;

- **Envio da requisição de update da base caso necessário**

- **Disponibilização do endpoint / para requisição manual com interface** &

- **Disponibilização do endpoint /check para requisição automática**.

<hr>

## 🛠️ Instalando o projeto

1. Clonar o repositório

```bash
git clone https://github.com/Megas-MDN/api-micro-servi-o-puppeteer.git
```

2. Entre na pasta clonada

```bash
cd api-micro-servi-o-puppeteer
```

3. Instalar as dependências

```bash
npm install
```

4. Para rodar em modo de produção

```bash
npm start
```

5. Para rodar em modo de desenvolvimento

```bash
npm run dev
```

<hr>

## 📦 Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`HASH_ATT`=hash_para_atualizar_os_dados

`URL_BASE_DADOS`=url_get_link_da_base

`URL_SOURCE`=url_b3_link_direto

🌟 Pronto para usar!

<hr>

## 📚 Documentação da API

```http
  GET /check
```

<details>
  <summary><strong>📝 Exemplo de resposta 01</strong></summary><br />

```json
{
  "message": "Base already updated!",
  "src": "Link direto da última atualização."
}
```

</details>
Quando é disparado o envio de atualização da base.
<details>
  <summary><strong>📝 Exemplo de resposta 02</strong></summary><br />

```json
{
  "message": "The base has been updated successfully!!!",
  "srcOld": "Link antigo",
  "src": "Link atualizado",
  "response": {
    // Resposta da API Séries Autorizadas no caso de sucesso
    "message": "Updated!",
    "total": 41732, // Número total de arquivos incluidos na base
    "header": "01|20230410|20230411|00:01:08",
    "randomOption": {
      "tipoDaSerie": 2,
      "ativPrincipal": "MAGAZ LUIZA",
      "tipoAtivoPrincipal": "ON NM",
      "labelDerivativo": "OPCOES COMPRA",
      "ticket": "MGLUE15",
      "tipoDerivativo": "Americano",
      "strike": 15,
      "vencimento": "05/19/2023"
    }
  }
}
```

</details>

<hr>

## 🐋 Dockerfile

Para realizar o deploy da aplicação, existem diversas formas, e uma delas é a conteinerização da aplicação, utilizando o Docker. Na raiz do projeto, foi criado um [Dockerfile](https://github.com/Megas-MDN/api-micro-servi-o-puppeteer/blob/main/Dockerfile) que permite o funcionamento correto do Puppeteer em produção.

Sendo necessário também acrescentar as variáveis de ambiente do arquivo Dockerfile nas configurações de `environment` do ambiente de produção.

<hr>

## 💻 Construído com:

- [Node Js](https://nodejs.org/en): Engine;
- [Express](https://expressjs.com/pt-br/): Framework api;
- [Puppeteer](https://pptr.dev/): Para navegação &
- [Docker](https://hub.docker.com/): Dockerização.
- [Railway](https://railway.app/): Deploy.

<hr>
<p align="center">
Developed with ❤️ by Megas
</p>
