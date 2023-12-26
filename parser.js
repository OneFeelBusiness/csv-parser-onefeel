

function csvJSON(data) {

  var lines = data.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }

  //return result; //JavaScript object
  return result; //JSON
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const csv = document.querySelector('#file').files[0];
  let reader = new FileReader();
  reader.readAsText(csv);

  reader.onload = function () {
    console.log(reader.result)
    let jsonData = csvJSON(reader.result)
    let jsonOutput = jsonData.map((item, i) => {
      return {
        "Handle": item.upc,
        "Title": item.title,
        "Body (HTML)": item.description,
        "Vendor": item.brand,
        "Product Category": "",
        "Type": item.category,
        "Tags": "",
        "Published": "FALSE",
        "Variant Grams": item.weight ? parseFloat(item.weight) * 453.592 : "",
        "Variant Fulfillment Service": "manual",
        "Variant Price": parseFloat(item.wholesale_price) * 2,
        "Variant Compare At Price": parseFloat(item.wholesale_price) * 4,
        "Variant Requires Shipping": "TRUE",
        "Variant Taxable": "TRUE",
        "Image Src": item.image_url,
        "Variant Weight Unit": "g",
        "Status": "draft"
      }
    })
    console.log(jsonOutput);
    console.log(jsonData);
  };
}

//     let csvContent = jsonToCsv(json)

//     window.URL = window.webkitURL || window.URL;

//     var contentType = 'text/csv';

//     var csvFile = new Blob([CSV], { type: contentType });

//     var a = document.createElement('a');
//     a.download = 'my.csv';
//     a.href = window.URL.createObjectURL(csvFile);
//     a.textContent = 'Download CSV';

//     a.dataset.downloadurl = [contentType, a.download, a.href].join(':');

//     document.body.appendChild(a);
//   })

function jsonToCsv(items) {
  const header = Object.keys(items[0]);
  const headerString = header.join(',');
  // handle null or undefined values here
  const replacer = (key, value) => value ?? '';
  const rowItems = items.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  );
  // join header and body, and break into separate lines
  const csv = [headerString, ...rowItems].join('\r\n');
  return csv;

}

// let csvContent = jsonToCsv(json)
// console.log(csvContent)

