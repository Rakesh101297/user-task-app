const express = require('express');
const router = new express.Router();
const csv = require('csv-express');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
// const url = process.env.MONGO_URI;
const url =
  process.env.MONGO_URI;
const excel = require('exceljs');

router.get('/', (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;

    let dbo = db.db('hackkernel');
    let workbook = new excel.Workbook();

    

    dbo
      .collection('tasks')
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);

        // let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('tasks'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
          { header: 'Id', key: '_id', width: 100 },
          { header: 'User', key: 'userfdb', width: 100 },
          { header: 'TaskName', key: 'taskname', width: 100 },
          { header: 'TaskType', key: 'tasktype', width: 100 },
        ];

        // Add Array Rows
        worksheet.addRows(result);

        // Write to File
        workbook.xlsx.writeFile('tasks.xlsx').then(function () {
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'tasks.csv'
          );
          res.csv(result, true);
        });

        db.close();
      });
  });
});

module.exports = router;
