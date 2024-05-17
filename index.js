document.addEventListener('DOMContentLoaded', function () {
    const insideContainer = document.getElementById('insideContainer');
    const navbarContainer = document.getElementById('navbarContainer');

    fetch('navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data
        })
        .catch(error => console.log("Error fetching navbar", error));
    fetch('chartTile/chartTile.html')
        .then(response => response.text())
        .then(data => {
            insideContainer.innerHTML = data;
        })
        .catch(error => console.error('Error fetching navbar:', error));
});