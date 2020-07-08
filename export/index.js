const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
// const url = process.env.MONGO_URI;
const url =
  'mongodb+srv://taskapp:taskapp@123@cluster0-l1tts.mongodb.net/hackkernel?retryWrites=true&w=majority';
const excel = require('exceljs');

// Create a connection to the MongoDB database
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
  if (err) throw err;

  let dbo = db.db('hackkernel');
  let workbook = new excel.Workbook();

  dbo
    .collection('users')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      //console.log(result);

      //creating workbook
      let worksheet = workbook.addWorksheet('users'); //creating worksheet

      //  WorkSheet Header
      worksheet.columns = [
        { header: 'Id', key: '_id', width: 40 },
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 40 },
        { header: 'Mobile', key: 'mobile', width: 60, outlineLevel: 1 },
      ];

      // Add Array Rows
      worksheet.addRows(result);

      // Write to File
      workbook.xlsx.writeFile('users.xlsx').then(function () {
        //console.log('file saved!');
      });
    });

  dbo
    .collection('tasks')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      //console.log(result);

      let workbook = new excel.Workbook(); //creating workbook
      let worksheet = workbook.addWorksheet('tasks'); //creating worksheet

      //  WorkSheet Header
      worksheet.columns = [
        { header: 'Id', key: '_id', width: 40 },
        { header: 'User', key: 'userfdb', width: 20 },
        { header: 'TaskName', key: 'taskname', width: 40 },
        { header: 'TaskType', key: 'tasktype', width: 60, outlineLevel: 1 },
      ];

      // Add Array Rows
      worksheet.addRows(result);

      // Write to File
      workbook.xlsx.writeFile('tasks.xlsx').then(function () {
        //console.log('file saved!');
      });

      db.close();
    })

    
});
