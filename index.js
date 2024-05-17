
fetch('chartMenu.json')
    .then(response => response.json())
    .then(data => {
        let content = document.getElementById('chartContent')
        for (let i = 0; i < data.length; i++) {
            let link = document.createElement("a")
            link.setAttribute("href", data[i].href)
            let newDiv = document.createElement('div')
            newDiv.classList.add('chartMenuTile')
            let image = document.createElement('img')
            image.classList.add('chartMenuTileImage')
            image.setAttribute('src', data[i].image)
            let title = document.createElement('div')
            title.classList.add('chartMenuTileTitle')
            title.innerText = data[i].name
            link.appendChild(image)
            link.appendChild(title)
            newDiv.appendChild(link)
            content.appendChild(newDiv)

        }
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
