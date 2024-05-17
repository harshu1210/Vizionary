function ColumnwithRotatedLabels(){
    const insideContainer = document.getElementById('insideContainer');
    fetch('ColumnwithRotatedLabels/ColumnwithRotatedLabels.html')
        .then(response=>response.text())
        .then(data=>{
            insideContainer.innerHTML=data;
        })
}