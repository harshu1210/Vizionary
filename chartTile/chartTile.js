
document.addEventListener('DOMContentLoaded', function() {
    loadingChartTiles();
});

function loadingChartTiles(){
    fetch('chartMenu.json')
    .then(response => response.json())
    .then(data => {
        let content = document.getElementById('chartContent')
        for (let i = 0; i < data.length; i++) {
            let newDiv = document.createElement('div')
            newDiv.classList.add('chartMenuTile')
            newDiv.setAttribute('id',data[i].href)
            let functionName=data[i].href.split("/")[0]
            console.log(functionName)
            newDiv.onclick = function() {
                window[functionName]();
            };
            let image = document.createElement('img')
            image.classList.add('chartMenuTileImage')
            image.setAttribute('src', data[i].image)
            let title = document.createElement('div')
            title.classList.add('chartMenuTileTitle')
            title.innerText = data[i].name
            newDiv.appendChild(image)
            newDiv.appendChild(title)
            content.appendChild(newDiv)
        }
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
}
