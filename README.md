# favorite-color-test

Testando minhas habilidades com React e NestJS criando uma aplicação para os clientes escolherem suas cores favoritas

Tendo o postman configurado em sua máquina você pode colocar as devidas variáveis de ambiente conforme o arquivo de exemplo e testar o projeto local

O front ficará disponível na porta http://localhost:5173/ e o backend em http://localhost:3001

Caso não configure nenhuma senha diferente para o usuário admin você já conseguira fazer login com email admin@admin.com e senha UmaSenhaMuitoSegura2

Somente o admin tem acesso a alguns endpoints como o de listar usuários, deletar e gerenciar as cores

Caso queira rodar o projeto usando o docker roda o comando docker-compose up --build o front ficará disponível na porta http://localhost:3000 e o backend na http://localhost:3001

Deixei também uma collection do postman ai caso queira brincar com os endpoints.

Coisas que gostaria de ter feito a mais:

- O CRUD de cores para o admin
- Proteger melhor as páginas e menus por baseado na role do usuário
- Tela de recuperar senha
- Controlar melhor a sessão do usuário
