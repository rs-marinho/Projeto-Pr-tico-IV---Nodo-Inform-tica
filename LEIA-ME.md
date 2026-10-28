# Nodo Informática, app para Android e iOS (Projeto Prático IV)

Aplicativo web instalável (PWA) da loja Nodo, a mesma empresa dos Projetos Práticos I, II e III.
Funciona em Android e iOS pelo navegador e pode ser instalado na tela inicial do celular.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura das telas: Início, Catálogo, Pedido e Conta |
| `style.css` | Visual do app (tema claro e escuro) |
| `app.js` | Lógica: catálogo, busca, favoritos, pedido, histórico |
| `manifest.webmanifest` | Nome, cores e ícones do app instalado |
| `sw.js` | Service worker: abre o app sem internet |
| `icons/` | Ícones PNG do aplicativo |

## Como testar no computador

O service worker só funciona em `localhost` ou em `https`. Na pasta do projeto:

```
python3 -m http.server 8080
```

Abra `http://localhost:8080` no navegador.

## Como publicar (gerar o link)

Qualquer hospedagem estática serve. Duas opções gratuitas:

- **GitHub Pages**: envie a pasta para um repositório e ative Pages em Settings.
- **Netlify Drop**: arraste a pasta em app.netlify.com/drop.

O endereço gerado é o link a enviar para avaliação. Ele já vem com `https`, que o celular exige para instalar o app.

## Como instalar no celular

- **Android (Chrome)**: menu ⋮, Instalar app.
- **iPhone/iPad (Safari)**: Compartilhar, Adicionar à Tela de Início.

## Sobre "compilar"

O projeto é um aplicativo web (HTML, CSS e JavaScript). O navegador executa o código-fonte
diretamente, então não há etapa de compilação para binário. Se o tutor exigir um arquivo
Android (.apk), dá para empacotar este mesmo app com o PWABuilder (pwabuilder.com) a partir do link publicado.

## Observação

Produtos, preços, telefone e e-mail são exemplos. O pedido fica salvo no aparelho (localStorage)
e o cliente copia a mensagem para enviar à loja. O app não tem servidor.
