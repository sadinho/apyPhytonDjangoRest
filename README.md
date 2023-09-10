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
## Instale as dependências necessárias usando o comando abaixo no terminal:
```bash
pip install -r requirements.txt  # or use "pip3" if default python is not version 2
```
## Aplique as migrações do banco de dados:
```bash
python manage.py migrate
```

## Já existe um super usuario 'sade' senha: '123456' porem você pode adicionar mais um se quiser
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

## POST /token/: Autenticação para pegar o token jwt.

## GET /creditcards/: Lista todos os cartões de crédito.
## POST /creditcards/: Crie um novo cartão de crédito.
## GET /creditcards/{id}/: Obtenha detalhes de um cartão de crédito específico.
## PUT /creditcards/{id}/: Atualize um cartão de crédito existente.
## DELETE /creditcards/{id}/: Exclua um cartão de crédito existente.

## Testes
## Para executar os testes automatizados, use o seguinte comando:

```bash
python manage.py test
```

## Observação 
## As rotas estão protegidas sendo possivel apenas passando o Bearer token na requisição, porem caso queira testar as rotas na view do python /creditcards comente as sequintes linha do codigo no arquivo view.py dentro do core.

```bash
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
```
## É preciso tirar esses decorators para conseguir usar sem autenticação no ambiente de desenvolvimento

## para testar com ferramentas como o insomnia ou postman, configurar a autinticação Beares no header da requisição.
```bash
Authorization: Bearer seu-token-jwt-aqui
```


