# Aplicativo API Django REST

Este é um aplicativo Django REST que fornece um serviço de gerenciamento de cartões de crédito. Ele permite que você crie, liste, atualize e exclua cartões de crédito em um banco de dados.

## Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados em seu sistema:

- Python (3.8 ou superior)
- pip (gerenciador de pacotes Python)
- virtualenv (opcional, mas recomendado para criar um ambiente virtual)

## Configuração do Ambiente Virtual (Opcional)

Recomendamos criar um ambiente virtual para isolar as dependências do projeto. Você pode criar um ambiente virtual usando o seguinte comando:

```bash
# Crie um ambiente virtual (opcional)
python -m venv myenv
```
#### ou

```bash
python3 -m venv myenv
```
```bash
# Ative o ambiente virtual:

# No Linux/macOS
source myenv/bin/activate

# No Windows
myenv\Scripts\activate
```
## Instalação
Clone o repositório:
```bash
git clone https://github.com/sadinho/apyPythonDjangoRest.git
```
## Entre na raiz do repositorio baixado
```bash
cd apyPythonDjangoRest
```
### A Pasta do Projeto é a api!

## não é preciso configurar um banco de dados pois esse projeto usa o sqlite3 porem caso queira configurar um novo banco fique a vontade
## Instale as dependências necessárias usando o comando abaixo no terminal:
```bash
pip install -r requirements.txt  # or use "pip3" if default python is not version 2
```
## Aplique as migrações do banco de dados:
```bash
python manage.py migrate
```

## Já existe um super usuario: 'sade', senha: '123456' porém você pode adicionar mais um se quiser
```bash
python manage.py createsuperuser --username=apiToken --email=<EMAIL>
```
## Execute o servidor localmente com o seguinte comando:
```bash
python manage.py runserver localhost:8000
```
Acesse http://localhost:8000 e veja que tudo está funcionando!

Acesse http://127.0.0.1:8000/admin/ e autentique-se com usuario mencionado

## Uso
## A API oferece os seguintes endpoints:
```bash
POST /token/: Autenticação para pegar o token jwt.

GET /creditcards/: Lista todos os cartões de crédito.
POST /creditcards/: Crie um novo cartão de crédito.
GET /creditcards/{id}/: Obtenha detalhes de um cartão de crédito específico.
PUT /creditcards/{id}/: Atualize um cartão de crédito existente.
DELETE /creditcards/{id}/: Exclua um cartão de crédito existente.
```
## Testes
## Para executar os testes automatizados, use o seguinte comando:

```bash
python manage.py test
```
## Print de Telas
#### Admin Django

![Tela admin Django](https://user-images.githubusercontent.com/50503203/266842146-d165b9cf-68df-43ce-91da-3640cc987ddc.png)

#### Tela Rota Token Django Rest Framework
![Tela Rota Token Django Rest Framework](https://user-images.githubusercontent.com/50503203/266839378-78676272-faf2-4c6e-8553-06a830262a81.png)

#### Tela Rota get Creditcards Django Rest Framework
![Tela Rota get Creditcards Django Rest Framework](https://user-images.githubusercontent.com/50503203/266839687-3e0d2395-5f84-4fa5-af12-131ab8aef6c7.png)

![Tela Rota Creditcards Django Rest Framework](https://user-images.githubusercontent.com/50503203/266839875-dc29c690-9388-4e08-b86d-0c2afd1c12c3.png)

#### Payload

![Payload Rota Creditcards Django Rest Framework](https://user-images.githubusercontent.com/50503203/266839978-17b9d493-7860-48af-af2c-4960c2ef4303.png)

![Payload Rota Creditcards Django Rest Framework](https://user-images.githubusercontent.com/50503203/266840109-0f252720-e863-4e40-8447-3c5564b78e09.png)

## Observação 
### As rotas estão protegidas, sendo possível apenas passando o Bearer token na requisição, porém caso queira testar as rotas na view do python '/creditcards' comente as sequintes linhas do codigo no arquivo view.py dentro do core.

```bash
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
```
## É preciso tirar esses decorators para conseguir usar sem autenticação no ambiente de desenvolvimento.

## Para testar com ferramentas como o inmsomnia ou postman, configurar a autenticação Bearer no header da requisição.
```bash
Authorization: Bearer seu-token-jwt-aqui
```
# my-credit-card-app frontend em nextjs

# Como usar o Dockerfile

Este Dockerfile pode ser usado para construir uma imagem Docker para o projeto Next `my-credit-card-app`.

## Construindo a imagem

Para construir a imagem, execute o seguinte comando:
```bash
docker build -t my-credit-card-app .
```
Isso criará uma imagem chamada `my-credit-card-app`.

## Executando a imagem

Para executar a imagem, execute o seguinte comando:
```bash
docker run -p 3000:3000 my-credit-card-app
```
Isso iniciará o servidor Next na porta 3000.

## Acesso ao servidor

Para acessar o servidor, abra um navegador em `http://localhost:3000`.

# Como instalar e rodar o Next.js

O Next.js é uma estrutura de desenvolvimento de aplicações web frontend React que facilita a criação de aplicações web estáticas e servidoras.

## Instalando 

Para instalar , execute o seguinte comando:
```bash
npm install
ou
yarn
```
Apos isso pode rodar 
```bash
npm run dev
npm run build
npm run start
ou
yarn dev
yarn build
yarn start
```


Para acessar o servidor, abra um navegador em `http://localhost:3000`.

Para logar a api Django deve ja estar rodando na porta 8000
Logar com o usuario cadastrado 


