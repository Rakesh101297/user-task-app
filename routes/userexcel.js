const express = require('express');
const router = new express.Router();
const csv = require('csv-express');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
// const url = process.env.MONGO_URI;
const url = process.env.MONGO_URI;
const excel = require('exceljs');

router.get('/', (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;

    let dbo = db.db('hackkernel');
    let workbook = new excel.Workbook();

    dbo
      .collection('users')
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;

        let worksheet = workbook.addWorksheet('users'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
          { header: 'Id', key: '_id', width: 100 },
          { header: 'Name', key: 'name', width: 100 },
          { header: 'Email', key: 'email', width: 100 },
          { header: 'Mobile', key: 'mobile', width: 100 },
        ];

        // Add Array Rows
        worksheet.addRows(result);
        //userresult=result
        // Write to File
        workbook.xlsx.writeFile('users.xlsx').then(function () {
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'users.csv'
          );
          res.csv(result, true);
        });
      });
  });
});

module.exports = router;
