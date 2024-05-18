let fileContent = '';
let csvFile = false;
let xAxisContent = yAxisContent = ''

function displayForm() {
    let form = formFunc();
    form.style.display = "flex";
}

function hideForm() {
    let form = formFunc();
    form.style.display = "none";
}

function formFunc() {
    return document.getElementById('form2');
}

function fileInputFunc() {
    return document.getElementById('fileUpload');
}

function textInputFunc() {
    return document.getElementById('fileName');
}

function xAxisFunc() {
    return document.getElementById('x-axis');
}

function yAxisFunc() {
    return document.getElementById('y-axis');
}

function triggerFileUpload() {
    document.getElementById('fileUpload').click();
}

function displayFileName() {
    var fileInput = fileInputFunc();
    var textInput = textInputFunc()
    textInput.value = fileInput.files[0].name;
    readFileContent(fileInput.files[0]);
}

function readFileContent(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const content = event.target.result;
        console.log("File content:", content);
        document.getElementById('fileContent').value = content;
    };

    if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Handle .xls and .xlsx files
        readExcelFile(file, reader);
        csvFile = false;
    } else {
        // Assume the file is .csv
        readCSVFile(file);
        csvFile = true;
    }
}

function readExcelFile(file, reader) {
    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);

    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        let csvContent = "";
        workbook.SheetNames.forEach(sheetName => {
            const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
            csvContent += csv + "\n";
        });
        fileContent = csvContent
        console.log("Converted Excel content to CSV format:", fileContent);
    };
}

function readCSVFile(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        fileContent = event.target.result;
        // console.log("File content:", fileContent);
    };
    reader.readAsText(file);
}

function formSubmit2() {
    event.preventDefault();
    let xAxisFactor = xAxisFunc();
    let yAxisFactor = yAxisFunc();
    xAxisContent = xAxisFactor.value;
    yAxisContent = yAxisFactor.value;
    let csvArray = graphicalObject()
    if (csvArray.length == 0) {
        window.alert("The File Doesnt have any data")
    } else if (csvArray.length == 1) {
        window.alert("The File Doesnt have any data only Headers are present")
    } else if (xAxisContent.length < 1) {
        window.alert("X-axis Parameter is required")
    } else if (yAxisContent.length < 1) {
        window.alert("Y-axis Parameter is required")
    } else if ((xAxisContent.toLowerCase() in csvArray[0]) != true) {
        window.alert("X-axis Parameter is not pressent in file")
    } else if ((yAxisContent.toLowerCase() in csvArray[0]) != true) {
        window.alert("Y-axis Parameter is not pressent in file")
    }
    else {
        let close = document.getElementById("close")
        close.disabled = false;
        let sharedData = { "data": csvArray, "xAxis": xAxisContent.toLowerCase(), "yAxis": yAxisContent.toLowerCase() };
        hideForm()
        let chartDiv = chartDivFunc();
        chartDiv.style.visibility = "visible";
        createBarGraph(sharedData)
    }
}

function graphicalObject() {
    let csvArray = [];
    if (csvFile === true) {
        let contentArray = fileContent.split('\r\n');
        let headers = contentArray[0].split(',');
        for (let i = 1; i < contentArray.length; i++) {
            let content = contentArray[i].split(',');
            if (content.length === headers.length) {
                let csvObject = {};
                for (let j = 0; j < headers.length; j++) {
                    if (headers[j].toLowerCase() == yAxisContent.toLowerCase()) {
                        csvObject[headers[j].toLowerCase()] = parseInt(content[j], 10);
                    } else {
                        csvObject[headers[j].toLowerCase()] = content[j];
                    }

                }
                csvArray.push(csvObject);
            } else {
                window.alert("Error in File")
            }
        }
    }
    return csvArray;
}