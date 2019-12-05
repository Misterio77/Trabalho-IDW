# Trabalho-IDW
Projeto da disciplina Introdução ao Desenvolvimento Web

Nome: Gabriel Silva Fontes
N USP: 10856803

A versão live do site pode ser visualizada em [idw.misterio.me](http://idw.misterio.me/index.html)


 ## Versões:

[Stage 1: Presentation page](https://github.com/Misterio77/Trabalho-IDW/tree/presentation)

[Stage 2: Functional Mockup](https://github.com/Misterio77/Trabalho-IDW/tree/mockup)

Stage 3: Clientside only (Pulei essa entrega)

[Stage 4: Final version](https://github.com/Misterio77/Trabalho-IDW/tree/master)


## Arquivos:

##### Páginas:
  
**index.html**: Página principal, quando o usuário visita o site. Poderá ser visitada com ou sem login
    
**loja.html**:  Página onde são listados e vendidos os produtos e serviços. Poderá ser visitada com ou seu login, mas o login será requisitado para a maioria das operações
    
**conta.html**: Painel de controle do usurio, pode visualizar seu perfil, seus animais registrados (e serviços marcados), e registrar animais, além de visualizar um histrico de compras. Vai requerer login.
    
**admin.html**: Painel de controle do administrador, pode registrar outros usurios, produtos e serviços, agendar (e visualizar) serviços, alterar (e checar) estoque de produtos. Na versão final, os links para essa página só serão visíveis para administradores logados. O acesso a essa página requer um login de administrador efetuado.
    
##### Assets:
  
**imagens**: Temos diversas imagens utilizadas na interface, além de imagens para produtos, serviços, e animais (enviadas por usuários e/ou admins)

**main.css**: Css da página, utilizei para fazer pequenas mudanças no estilo do materialize, conforme nescessário

**init.js**: Arquivo simples de JS, utilizando JQuery para inicializar os componentes do materialize utilizados

## Descrições:

##### Funcionalidade
Acho que está razoávelmente auto-explicativo, mas é importante lembrar que o menu do usuário (lado direito) está da forma atual como um exemplo apenas, ele irá depender apenas do estado de login atual. Além disso, os links para páginas de administração só serão visíveis para administradores logados.

O usuário poderá adquirir produtos, serviços, editar seu registro, adicionar seus animais e visualizar horários.

O administrador poderá registrar produtos, serviços, contas, alterar inventário, e alterar horários.

##### Informações armazenadas
Ainda não sei bem como logins funcionam (cookies? chaves?), mas armazenaremos sessões, usuários, produtos, serviços, compras e horários agendados.

##### Diagrama
![Diagrama](https://raw.githubusercontent.com/Misterio77/Trabalho-IDW/master/flowchart.svg?sanitize=true)
