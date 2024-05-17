
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

let fileContent = '';
let csvFile = false;
let xAxisContent = yAxisContent = ''

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
    } else {
        let sharedData = { "fileContent": csvArray, "xAxisContent": xAxisContent, "yAxisContent": yAxisContent };
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
                    if (headers[j] == yAxisContent) {
                        csvObject[headers[j]] = parseInt(content[j], 10);
                    } else {
                        csvObject[headers[j]] = content[j];
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