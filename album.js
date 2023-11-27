// Função para obter o ID do álbum da URL
function getAlbumId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

window.addEventListener('DOMContentLoaded', () => {
    fetch('https://jsonserver-cidades--luizsaud.repl.co/ALBUNS')
        .then((response) => response.json())
        .then((albums) => {
            const albumId = getAlbumId();
            const album = albums.find((album) => album.id == albumId);
            console.log(album);
            if (album) {
                let albumHTML =
                `<h3 class="border-bottom border-black mt-4 mb-2">${album.nome}</h3>

                <!--Album XPTO-->
                <div class="row g-5 p-3">
                    <!--coluna imagem-->
                    <div class="col-lg-4 col-12 col-md-6 h-100">
                        <img class="w-100" src="${album.foto}" alt="">
                    </div>
                    <!--fim coluna imagem-->
      
                    <!--coluna de descricao loc e data-->
                    <div class="col-lg-8 col-12 col-md-6 mt-3 mt-md-5">
                        <!--Linha da Descricao-->
                        <div class="row h-50">
                            <div class="col">
                                <h5>Descrição</h5>
                                <p>${album.descricao}</p>
                            </div>
                            <div class="col">
                                <h5>Adicionar Álbum Aos Destaques</h5>
                                <button type="button" id="butao" class="btn btn-primary btn-lg" onclick="addAlbumToHighlights()">Clique Aqui</button>
                            </div>
                        </div>
                        <!--Fim Linha da Descricao-->
      
                        <!--Linha Loc e Data / 2 colunas-->
                        <div class="row h-50 h-50 mt-md-0">
      
                            <div class="col d-flex">
                                <div class="align-self-end">
                                    <h5>Localização</h5>
                                    <p>${album.latlong}</p>
                                </div>
                            </div>
                            
                            <div class="col d-flex">
                                <div class="align-self-end">
                                    <h5>Data do Registro</h5>
                                    <p>${album.data}</p>
                                </div>
                            </div>
      
                        </div> 
                        <!--Fim Linha Loc e Data / 2 colunas-->
                    </div>
                    <!--fim coluna de descricao loc e data-->
                </div> 
                <!--FIM ALBUM XPTO-->
      
      
                <!--LISTA DE FOTOS-->
                <h3 class="border-bottom border-black mt-4 mb-2">Lista de Fotos</h3>
                <p>Clique nas fotos para expandir</p>
      
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4" id="fotos">
      
                </div>`
                document.getElementById('campo').innerHTML = albumHTML;


                fetch(`https://jsonserver-cidades--luizsaud.repl.co/FOTOS`)
                    .then((response) => response.json())
                    .then((dataJSON) => {
                        let photos = '';
                        let j = 0;
                        for (let i = 0; i < dataJSON.length; i++) {
                            if (dataJSON[i].albumId == albumId) {
                                j++;
                            }
                        }
                        for (let i = 0; i < dataJSON.length; i++) {
                            if (dataJSON[i].albumId == albumId) {
                                let anterior = dataJSON[i].id - 1;
                                let proximo = dataJSON[i].id + 1;
                                
                                photos += `
                                    <div class="col">
                                        <div class="card text-center h-100">
                                            <img type="button" data-bs-toggle="modal" data-bs-target="#photoModal${dataJSON[i].id}" src="${dataJSON[i].foto}" class="card-img-top object-fit-cover" alt="..." height="300px">
                                            <div class="card-body">
                                                <h5 class="card-title">${dataJSON[i].data}</h5>
                                                <p class="card-text"></p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!--MODAL-->
                                    <div class="modal fade" id="photoModal${dataJSON[i].id}" aria-hidden="true" aria-labelledby="staticBackdropLabel1" tabindex="-1">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="staticBackdropLabel1"></h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="card text-center" style="width: 100%;">
                                                        <img src="${dataJSON[i].foto}" class="card-img-top" alt="...">
                                                        <div class="card-body">
                                                            <h5 class="card-title">${dataJSON[i].data}</h5>
                                                            <p class="card-text">${dataJSON[i].descricao}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button class="btn btn-primary" data-bs-target="#photoModal${anterior}" data-bs-toggle="modal">Anterior</button>
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                                    <button class="btn btn-primary" data-bs-target="#photoModal${proximo}" data-bs-toggle="modal">Próxima</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                            }
                        }
                        document.getElementById('fotos').innerHTML = photos;
                    });
            } else {
                console.log('Album not found');
            }
        });
});

function addAlbumToHighlights() {

    alert('Album adicionado ao primeiro de 3 fotos dos destaques! \n Para ver, clique em "Home" no menu superior.');

    fetch('https://jsonserver-cidades--luizsaud.repl.co/ALBUNS')
        .then((response) => response.json())
        .then((albums) => {
            const albumId = getAlbumId();
            const album = albums.find((album) => album.id == albumId);
            if (album) {
                const data = {
                    nome: album.nome,
                    destaque: album.destaque,
                    goto: album.goto
                };
                fetch('https://jsonserver-cidades--luizsaud.repl.co/DESTAQUES', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Album added to highlights:', result);
                })
                .catch((error) => {
                    console.error('Error adding album to highlights:', error);
                });
            } else {
                console.log('Album not found');
            }
        });
}
