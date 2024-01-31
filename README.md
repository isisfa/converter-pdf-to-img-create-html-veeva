## Documentação do Projeto - Conversor de PDF para Imagens
Este projeto é um script em Node.js conversor páginas de PDF em imagens e padronizador para IDetails de Veeva.
Ele utiliza as bibliotecas pdf-lib para carregar e ler o PDF e pdf-img-convert para converter páginas específicas do PDF em imagens JPEG. Além disso, o script gera arquivos HTML para criar slideshows a partir das imagens convertidas.

## Pré-requisitos
Node.js e NPM devem estar instalados em seu sistema.

## Instalação
Clone este repositório ou copie o script para a pasta do seu projeto.
Instale as dependências necessárias executando o seguinte comando na pasta do projeto:
npm install pdf-lib pdf-img-convert

## Uso
Para utilizar o Conversor de PDF para Imagens, você deve chamar a função exportPDFPagesAsImages com o caminho do arquivo PDF e o prefixo dos slides como parâmetros. O script irá converter cada página do PDF em várias imagens de tamanhos diferentes e criar um arquivo HTML com um slideshow.
```exportPDFPagesAsImages('./xxx.pdf', 'Nome')``
Certifique-se de substituir './xxx.pdf' pelo caminho do seu arquivo PDF e 'Nome' pelo prefixo desejado para os slides.

## Converter cada página do PDF para imagens
cd converter_pdfToImg
bash
node converter.js

## Converter em tamanhos e pastas padrões de IDetail VEEVA
cd converter_veevaID
bash
node converter.js

## Estrutura
HTML do slideshow inclui estilos CSS para o layout dos slides e dos botões de navegação.
O Script também usa alguns valores codificados, como as posições e tamanhos dos botões de navegação, que podem precisar ser personalizados com base nos seus requisitos.

## Tamanhos das Imagens
A função converte cada página do PDF em três imagens de tamanhos diferentes, caso queira outros tamanhos, modificar:
Imagem de tamanho completo: 1024x768 pixels (sufixo: 'full')
Imagem de slide: 2048x1536 pixels (sufixo: 'slide', pasta: 'img')
Miniatura: 200x150 pixels (sufixo: 'thumb')

## Reconhecimentos
Este projeto utiliza as bibliotecas pdf-lib e pdf-img-convert para lidar com a conversão de PDF e imagens.
