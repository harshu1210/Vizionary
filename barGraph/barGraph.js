function barGraph(){
    const insideContainer = document.getElementById('insideContainer');
    fetch('barGraph.html')
        .then(response=>response.text())
        .then(data=>{
            insideContainer.innerHTML=data;
        })
}