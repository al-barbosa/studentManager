# BackEnd
Neste diretório, estão os arquivos responsáveis por montar o banco de dados que ira receber solicitações e enviar respostas com base em dados armazenados.
O mesmo foi desenvolvido usando MySQL, de maneira que é necessário te-lo instalado para o correto funcionamento.
## Instalação
Antes de iniciar a criação do banco de dados, é importante editar o arquivo .env.example. Nele estão contidas as referências ao banco de dados, como a porta em que está sendo rodado e a senha para acessa-lo.
Configure-o com base na tabela abaixo:
| Variável  | Descrição |
| ------------- | ------------- |
| MYSQL_USER | Nome do usuário no banco de dados  |
| MYSQL_PASSWORD | Senha de acesso ao banco de dados  |
| MYSQL_DATABASE | Nome do banco de dados a ser criado  |
| MYSQL_HOST | Hostname do banco de dados  |
| MYSQL_PORT | Porta de acesso ao banco de dados  |
| APP_PORT | Porta de acesso à API |
É importante frisar que a variável APP_PORT irá oferecer a porta de acesso à API. O Frontend foi configurado, no package.json para usar como proxy a porta 3070. Se este valor for alterado no .env, é importante que a mesma alteraçãos seja feita no package.json localizado na raiz do FrontEnd.
Feitas as alterações, renomeie o arquivo para .env

### 1 - Instalando pacotes
Os pacotes a serem usados incluem MySQL2, Sequelize e TypeScript, entre outros. Para realizar a instalação, basta rodar o comando na raiz do backend:

`npm install`

### 2 - Iniciando o banco de dados
Com o MySQL rodando e os pacotes instalados, é necessário criar o banco de dados e povoa-lo com usuários criados para o teste da aplicação. Ainda na raiz do backend, rode o comando:

`npm run db:reset`

O comando primeiro ira apagar o banco de dados, caso exista, e depois cria-lo. Assim, caso durante o uso da aplicação seja necessário retornar ao estado original, basta rodar novamente este comando.

### 3 - Iniciando a API
Com o banco de dados criado, o comando abaixo ira iniciar a API:

`npm run dev`

Por se tratar do modo de desenvolvimento, qualquer alteração no código do backend irá reiniciar novamente a API, mas não o banco de dados.

Caso tudo tenha sido feito corretamente, a seguinte mensagem será mostrada no console (caso o componente APP_PORT tenha sido alterado no .env, a mudança ira refletir na mensagem):

`Server is runnint at 3070`
