let insideContainer = null;
let chartContent = null
let content = null;
function insideContainerFunc() {
    if (document.getElementById('insideContainer')) {
        let insideContainer = document.getElementById('insideContainer')
        return insideContainer
    }

}

function chartContentFunc() {
    if (document.getElementById('chartContent')) {
        let chartContent = document.getElementById('chartContent')
        return chartContent
    }
}

function contentFunc() {
    if (document.getElementById('content')) {
        let content = document.getElementById('content')
        return content
    }
}


function home() {
    insideContainer = insideContainerFunc();
    chartContent = chartContentFunc();
    content = contentFunc();
    fetch('../chartTile/chartTile.html')
        .then(response => response.text())
        .then(data => {
            if (insideContainer) {
                if (content != null) {
                    insideContainer.removeChild(content)
                    insideContainer.innerHTML = data;
                    loadingChartTiles()
                }
            }
        })
}

function aboutUs() {
    insideContainer = insideContainerFunc();
    chartContent = chartContentFunc();
    content = contentFunc();
    fetch('../aboutUs/aboutUs.html')
        .then(response => response.text())
        .then(data => {
            if (insideContainer) {
                if (content != null) {
                    insideContainer.removeChild(content)
                    insideContainer.innerHTML = data;
                } else if (chartContent != null) {
                    insideContainer.removeChild(chartContent)
                    insideContainer.innerHTML = data;
                }
            }
        })
}

function profile() {
    insideContainer = insideContainerFunc();
    chartContent = chartContentFunc();
    content = contentFunc();
    fetch('../profile/profile.html')
        .then(response => response.text())
        .then(data => {
            if (insideContainer) {
                if (content != null) {
                    insideContainer.removeChild(content)
                    insideContainer.innerHTML = data;
                } else if (chartContent != null) {
                    insideContainer.removeChild(chartContent)
                    insideContainer.innerHTML = data;
                }
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