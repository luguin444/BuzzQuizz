DESCRIÇÃO DO PROJETO:
 O projeto consiste de um ADMIN de criação de QUuzzes. Nesse website, o usuário terá uma conta individual e pode criar seus próprios quizzes, formulando perguntas de múltipla escolha com links de imagem associados às respostas a fim de deixar o jogo mais lúdico. Além disso, pode criar níveis em que os jogadores serão posicionados ao final, de acordo com a pontuação feita no jogo. Por último, os quizzes do usuário estarão salvos, podendo jogá-los quando quiser. O número de quizzes, perguntas por quizz e níveis por quizz é ilimitado.

REQUISITOS:
GERAL:
[ ]  Todas as telas devem ser implementadas em um único arquivo HTML. Se preferir, por organização pode dividir seu JavaScript/CSS em múltiplos arquivos
- [ ]  Para manipular o HTML, sugerimos utilizar o pattern de Render Function
- [ ]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub
- [ ]  Para isso, comece criando um repositório público na sua conta do GitHub, inicializando com um primeiro commit contendo somente o [README.md](http://readme.md)

LAYOUT:
- [ ]  Aplicar layout para desktop, seguindo imagens fornecidas
- [ ]  Aplicar layout para mobile, seguindo imagens fornecidas
- [ ]  Fonte usada deve ser a **Roboto** nas fontes sem serifa e **Merriweather** para as fontes serifadas

TELA LOGIN:
- [ ]  Ao clicar em entrar, caso algum dos campos esteja vazio, deverá aparecer um aviso solicitando o preenchimento dos campos
- [ ]  Ao clicar em entrar, caso os campos estejam preenchidos, deverá ser enviado um request para o servidor, seguindo documentação
- [ ]  Caso o servidor retorne uma falha (status 401), deverá ser lançado um alert para o usuário de email/senha incorretos
- [ ]  Caso o servidor retorne sucesso (status 200 ou 201), a tela deve sumir e a próxima tela (da listagem de quizzes) deve ser exibida
- [ ]  Em caso de sucesso, o servidor retornará na resposta também um código identificador do usuário que você deve guardar para usar nos próximos requests pro servidor
- [ ]  Ao clicar em entrar, o botão deve ser desabilitado até o servidor responder, evitando que o usuário clique no botão várias vezes

LISTA DE QUIZZES:

- [ ]  Ao entrar na tela, deve ser carregado do servidor a lista de quizzes do usuário que foi autenticado
- [ ]  Para isso, no request enviado ao servidor deve ser adicionado um **header** de nome `User-Token`, contendo o valor retornado pelo servidor no request de autenticação (que você guardou nos requisitos anteriores)
- [ ]  Ao clicar em "Novo Quiz" essa tela deve sumir, dando lugar à próxima tela, de criação de quiz

CRIAÇÃO DE QUIZ:
- [ ]  Um quiz tem 3 tipos de informação: seu título, suas perguntas e seus níveis
- [ ]  Uma pergunta é composta por: um enunciado, 1 resposta correta e 3 respostas erradas. Cada resposta tem também uma URL para uma imagem que vai ser usada no quiz.
- [ ]  Um nível é um possível resultado do quiz, e é composto por: uma % de início e de final que corresponde àquele nível, um título, uma descrição e uma URL para a imagem que será exibida ao final
- [ ]  O usuário poderá adicionar quantas perguntas e níveis quanto desejar
- [ ]  Ao publicar um quiz, o mesmo deverá ser enviado para o servidor. O request deve enviar um header com o token do usuário
- [ ]  Ao publicar um quiz, o usuário deve voltar pra tela de lista de quizzes

VALIDAÇÃO DE FORMULARIO:
- [ ]  Antes de enviar pro servidor, usando JavaScript, garanta que o primeiro caractere do título do quiz e das perguntas/respostas esteja em maíusculo (ex: converta "título" para "Título")
- [ ]  Antes de enviar pro servidor, usando JavaScript, remova possíveis espaços em branco que o usuário deixou no início/final dos inputs
- [ ]  Valide que só existe 1 interrogação na pergunta e está ao final da mesma. Caso contrário, deve aparecer um alert solicitando que o usuário corrija os dados.

 INTERFACE QUIZ:

- [ ]  Cada pergunta do quiz deve ser exibida a cada vez
- [ ]  As respostas de cada pergunta devem ser exibidas organizadas aleatoriamente
- [ ]  Ao clicar em uma resposta, as respostas erradas devem ganhar fundo vermelho. A correta deve ganhar fundo verde.
- [ ]  Após 2 segundos de respondida, deve-se avançar para a próxima pergunta

FIM DO QUIZZ
- [ ]  Ao final, deve ser exibida a quantidade de acertos no quiz
- [ ]  O score deve ser arredondado de forma a não ter casas decimais
- [ ]  Para exibir o título/descrição/imagem do nível alcançado, você deve calcular em qual nível o usuário ficou baseado na quantidade de acertos e nos níveis configurados no quiz
