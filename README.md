# Configuração do ambiente de desenvolvimento:

## Instalar o Node.js e npm:

```
sudo apt update && sudo apt install -y nodejs npm
node -v && npm -v
```
## Clone o repositório e crie uma branch de dev

```
git clone https://github.com/mdsreq-fga-unb/2025.1-T01-SeuPontoDigital.git
cd 2025.1-T01-SeuPontoDigital/
git checkout -b dev origin/dev
```
obs: siga a política de [Branches da Equipe](https://mdsreq-fga-unb.github.io/2025.1-T01-SeuPontoDigital/guias/branches/)

## Por fim:

Crie um arquivo .env conforme enviado no Whatsapp da equipe e insiras as variáveis de ambiente e em seguida instale as dependencias:

```
cd mobile && npm install && cd ../frontend && npm install && cd ../backend && npm install && cd ..

```
