let insideContainer = null;
function insideContainerFunc() {
    if (document.getElementById('insideContainer')) {
        let insideContainer = document.getElementById('insideContainer')
        return insideContainer
    }
}

function home() {
    insideContainer = insideContainerFunc();
    fetch('../chartTile/chartTile.html')
        .then(response => response.text())
        .then(data => {
            if (insideContainer) {
                insideContainer.innerHTML = data;
                loadingChartTiles()
            }
        })
}

function aboutUs() {
    insideContainer = insideContainerFunc();
    fetch('../aboutUs/aboutUs.html')
        .then(response => response.text())
        .then(data => {
            if (insideContainer) {
                insideContainer.innerHTML = data;
            }
        })
}

function profile() {
    insideContainer = insideContainerFunc();
    fetch('../profile/profile.html')
        .then(response => response.text())
        .then(data => {
            if (insideContainer) {
                insideContainer.innerHTML = data;
            }
        })
}

function renderNavComponents(value) {
    if (value == 'home') {
        home();
    } else if (value == 'aboutUs') {
        aboutUs();
    } else if (value == 'profile') {
        profile();
    }
}