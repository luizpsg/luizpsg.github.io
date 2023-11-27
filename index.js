
window.addEventListener('DOMContentLoaded', () => {

    fetch('https://jsonserver-cidades--luizsaud.repl.co/DESTAQUES')
        .then((response) => response.json())
        .then((dstqs) => {
            ultimos = dstqs.length - 1;
            console.log(ultimos)
            const carouselHTML = 
            `<div class="carousel-item active"><a href="${dstqs[ultimos].goto}"><img class="w-100 d-block" src="${dstqs[ultimos].destaque}" width="1200px"
                            alt="Slide Image"></a></div>
                    <div class="carousel-item"><img class="w-100 d-block" src="${dstqs[ultimos-1].destaque}"
                            width="1200px" alt="Slide Image"></div>
                    <div class="carousel-item"><img class="w-100 d-block" src="${dstqs[ultimos-2].destaque}"
                            width="1200px" alt="Slide Image"></div>`
            document.getElementById('carrousellp').innerHTML = carouselHTML;
        });



    fetch('https://jsonserver-cidades--luizsaud.repl.co/ALBUNS')
        .then((response) => response.json())
        .then((dataJSON) => {
            let dados = '';
            for (let i = 0; i < dataJSON.length; i++) {
                dados += `<div class="col">
                        <div class="card text-center h-100">
                        <img src="${dataJSON[i].foto}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${dataJSON[i].data}</h5>
                            <p class="card-text"  id="Destaque">${dataJSON[i].descricao}</p>
                        </div>
                        <div class="card-footer bg-transparent">
                            <a href="album.html?id=${dataJSON[i].id}" class="btn btn-dark">Ir para o álbum</a>
                        </div>
                        </div>
                    </div>`;
            }
            document.getElementById('albuns').innerHTML = dados;

        // --------------------------------------------------
        // Cria o mapa baseado na API Mapbox e adiciona no 
        // elemento de id: map        
        // --------------------------------------------------

        // ----------------------------------------------
        // Cria o mapa e adiciona no elemento de id: map 
        const centralLatLong= [-30,15]

        // ----------------------------------------------
        // Crie uma conta no Mapbox e adicione sua accessToken 
        // na linha abaixo
        mapboxgl.accessToken = 'pk.eyJ1IjoibHVpenBzZyIsImEiOiJjbHBndnB0YmUwMjRtMmtwM3Y4Nnk0Z25tIn0.NwgpC7aL2h-Oqir7wDYMRA';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: centralLatLong,
            zoom: 1
        });


        // ----------------------------------------------
        // Adiciona marcadores para unidades da PUC Minas
        /*unidadesPUC.forEach ((uni) => {
            let popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3><a href="${uni.url}" target="_blank">${uni.descricao}</a></h3><br>
                          ${uni.endereco} <br> ${uni.cidade}`);
            const marker = new mapboxgl.Marker({ color: uni.cor })
                .setLngLat(uni.latlong)
                .setPopup(popup)
                .addTo(map);
        })*/
        dataJSON.forEach ((uni) => {
            let popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3><a href="album.html?id=${uni.id}" target="_blank">${uni.nome}</a></h3><br>
                          ${uni.data} <br> ${uni.descricao}`);
            const marker = new mapboxgl.Marker({ color: uni.cor })
                .setLngLat(uni.latlong)
                .setPopup(popup)
                .addTo(map);
        })

    });
});
        