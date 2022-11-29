
function ConvertToCSV (objArray, ReportTitle, fixed_cols = null) {

    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    var header = Object.keys(objArray[0]);
    if (fixed_cols !== null) header = fixed_cols;

    let CSV = objArray.map(row => header.map(fieldName => 
    (JSON.stringify(row[fieldName], replacer)/* + '\t'*/)).join(',')
    )
    CSV.unshift(header.join(','))
    CSV = CSV.join('\r\n')
    console.log(CSV);

    //Generate a file name
    var fileName = ReportTitle;
        
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);   

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function CSVtoJSON (selectedFile, callback) {
	let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    
	fileReader.onload = (event)=>{
		let data = event.target.result;
		let workbook = XLSX.read(data,{type:"binary"});
        //console.log(workbook.Sheets);
        
		workbook.SheetNames.forEach(sheet => {
			let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet], {defval:""});
			callback(rowObject);
		});
	}
}