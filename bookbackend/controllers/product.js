const Product = require('../models/product');
// Handle photo upload
const formidable = require('formidable');
const _ = require("lodash");
const fs = require('fs');

/*-------MIDDLEWARE FOR PRODUCT ID --------*/
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
};

/*-------READ PRODUCT --------*/
exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product);
};

/*------- ADMIN CREATE PRODUCT --------*/
exports.create= (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        // Check for all fields
        const { name, description, price, category, quantity, shipping } = fields
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let product = new Product(fields);

        //1kb = 1000
        //1mb = 1000000

        // Photo same name as specified in schema
        if (files.photo) {
            console.log('FILES PHOTO: ', files.photo)
            //Add some validation for the size of the photo
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb"
                });
            }
            // Access the file System and
            // Populate the content type
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
         });
    })
};

/*------- ADMIN UPDATE PRODUCT --------*/
exports.update= (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        // Check for all fields
        const { name, description, price, category, quantity, shipping } = fields
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let product = req.product
        // Provided by lodash
        product = _.extend(product, fields)

        //1kb = 1000
        //1mb = 1000000

        // Photo same name as specified in schema
        if (files.photo) {
            console.log('FILES PHOTO: ', files.photo)
            //Add some validation for the size of the photo
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb"
                });
            }
            // Access the file System and
            // Populate the content type
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
         });
    })
};


/*-------ADMIN DELETE PRODUCT --------*/
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        } 
        res.json({
            "message": "Product successfully deleted!"
        })
    })
}

/*-------SORTING PRODUCT BY SELL OR NEW --------*/
/**
    * sort by sell = /products ? sortBy=sold & order=desc & limit=6
    *  sort by arrival = /products ? sortBy=created & order=desc & limit=6
    * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json(products);
        });
};


/*-------- SHOW RELATED PRODUCT OF THE CURRENT PRODUCT DISPLAYED ------*/
/**
 * it will find the products based on the req product category
 * other products
 */
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    // find the product based on id not included the current product
    Product.find({_id: {$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json(products);
        });
};


/*-------- LIST CATEGORIES RELATED USED FOR A PRODUCT ------*/
exports.listCategories = (req, res) => {
    // distinct() get all the categories that are used in the category model
    Product.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(categories);
    })
};



/*-------- SEARCH BASED ON PRICE OR CATEGOGY ------*/
/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
     
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    // If user want to see more products (button add more - load more)
    let skip = parseInt(req.body.skip);
    // Based on the request, findArgs will be populated
    let findArgs = {};
    
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
    
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            // Check if it's price
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    // Grab the index
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


/*-------- MIDDLEWARE TO RETURN THE PHOTO ------*/
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        // view any type of photo
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}




