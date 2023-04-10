require('dotenv').config();
const express = require('express');
const connection = require('../connection');
const router = express.Router();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', (req, res) => {
    console.log("product", req.body);
    let product = req.body;
    console.log("product", product);
    var query1 = "insert into product (name,categoryId,description,price,status) values(?,?,?,?,?);";
    console.log(product.name, product.categoryId, product.description, product.price, product.status);
    connection.query(query1, [product.name, product.categoryId, product.description, product.price, product.status], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Product added successfully" + result });
        }
        else {
            console.log("error-", err);
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res, next) => {
    var query2 = "select p.id,p.name,p.description,p.price,p.status,c.id as categoryId,c.name as categoryName from product as p INNER JOIN category as c where p.categoryId =c.id"
    connection.query(query2, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            console.log(err);
            return res.status(500).json(err);
        }
    })
})

router.get('/getByCategory/:id', (req, res, next) => {
    const id = req.params.id;
    var query3 = "select id, name from product where categoryId=? and status='true'";
    connection.query(query3, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            return res.status(500).json(err)
        }
    })
})

router.get('/getById/:id', (req, res, next) => {
    const id = req.params.id;
    var query4 = "select id, name,description,price from product where id=?";
    connection.query(query4, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        }
        else {
            return res.status(500).json(err)
        }
    })
})

router.patch('/update', /*checkRole.checkRole,*/(req, res, next) => {
    let product = req.body;
    var query5 = "update product set name=?,categoryId=?,description=?,price=? where id=?";
    connection.query(query5, [product.name, product.categoryId, product.description, product.price, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" })
            }
            return res.status(200).json({ message: "Product updated successfully" });
        }
        else {
            return res.status(500).json(err)
        }
    })
})


router.delete('/delete/:id', /*checkRole.checkRole,*/(req, res, next) => {
    const id = req.params.id;
    var query6 = "delete from product where id=?";
    connection.query(query6, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" });
            }
            return res.status(200).json({ message: "Product deleted successfuly" });
        }
        else {
            return res.status(500).json(err)
        }
    })
})

router.patch('/updateStatus', /*checkRole.checkRole,*/(req, res, next) => {
    let user = req.body;
    var query7 = "update product set status=? where id=?";
    connection.query(query7, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" })
            }
            return res.status(200).json({ message: "Product status updated successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;