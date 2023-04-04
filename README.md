# converter_pdf_to_img_id_folders
PDF to img with 3 different sizes, with ID folder structure for Veeva salesforce

Uma solução que pegue o .pdf, exporte cada página como uma imagem .jpg de 1024x768, outra imagem .jpg de 2048x1536 e também como imagem .jpg de 
 200x150 com estas regras:
 
Separe estas imagens em pastas com o nome nomedapasta_slideX, sendo X o número inteiro a começar por 1, desta forma:

- A imagem de 1024x768 terá o nome nomedapasta_slideX-full e a imagem de 200x150 terá o nome nomedapasta_slideX-thumb e estas ficarão na pasta criada para o respectivo slide: nomedapasta_slideX
- A imagem de 2048x1536 terá o nome slide e ficará dentro da pasta do respectivo slide nomedapasta_slideX e depois dentro de outra pasta chamada img
- Dentro de cada pasta criada nomedapasta_slideX contem um arquivo .html com o mesmo nome da pasta nomedapasta_slideX o seu conteúdo indicado por mim, uma pasta css com um arquivo .css inficado e uma pasta js com um arquivo .js indicado
