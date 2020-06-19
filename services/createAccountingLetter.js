  var PDFDocument = require('pdfkit');
// var shell = require('shelljs');
var fs = require('fs');
var path = require('path');

const mergeAllAccountingLetterInformation = require("./mergeAllAccountingLetterInformation.js");
const saveDocumentInformation = require("./saveDocumentInformation.js");
const wirteAccountingLetter = require("./wirteAccountingLetter.js");

module.exports = function(db, req, res){
  
let rented_id= req.params.id;
let year = req.body.year;
let doc = new PDFDocument();
let data={}

mergeAllAccountingLetterInformation(db, rented_id, year).then(function(dataObject){
  data=dataObject;
  Promise.resolve(saveDocumentInformation(db, rented_id, year)).then( (revision)=> {
    let fileName = rented_id + "_" + year + "_" + revision + ".pdf";
    let directory=path.resolve( __dirname+"/../documents");
    let writeStream;
    writeStream = fs.createWriteStream( directory + '/' + fileName );
    doc.pipe(writeStream);
    wirteAccountingLetter(doc, data, year);
    writeStream.on('finish', ()=> {res.sendFile(directory+"/"+fileName); });    
  })
})
  
}