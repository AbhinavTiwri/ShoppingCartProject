const express = require('express');

const router = express.Router();

const Category = require('../models/category.js');

router.get('/', function(req, res){
    // res.send('cats index ')
    Category.find(function(err, categories){
        if(err) return console.log(err);
        res.render('admin/categories',{
            categories: categories
        });
    });
});

// get add page

router.get('/add_category', function(req, res){
    var title = "";


    res.render('admin/add_category', {
        title: title
    });
});

router.post('/add_category', function(req, res){

    req.checkBody('title', 'Title must have a value.').notEmpty();

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();

    var errors = req.validationErrors();

    if(errors){
        res.render('admin/add_category', {
            errors: errors,
            title: title
        });
    } else {
        Category.findOne({slug: slug}, function(err, category){
            if(category){
                req.flash('danger', 'Page slug exists, choose another.');
                res.render('admin/add_category', {
                    title: title
                });
            }else{
                var category = new Category({
                    title: title,
                    slug : slug
                });

                category.save(function(err){
                    if(err) return console.log(err);
                    req.flash('success', 'Category added!');
                    res.redirect('/admin/categories');
                });

            }
        })

    }

});

router.get('/edit_category/:id', function(req, res){
    // res.render('index', {title: 'admin'})
    Category.findById( req.params.id,function(err, category){
        if(err)
            return console.log(err);

        res.render('admin/edit_category',{
            title: category.title,
            id: category._id
        });
    });
});

router.post('/edit-category/:id', function(req, res){
console.log("bb1");
    req.checkBody('title', 'Title must have a value.').notEmpty();

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var id = req.params.id;

    var errors = req.validationErrors();

    if(errors){
        res.render('admin/edit_category', {
            errors: errors,
            title: title,
            id: id
        });
    } else {
        Category.findOne({slug: slug, _id:{'$ne':id}}, function(err, category){
            if(category){
                req.flash('danger', 'Category slug exists, choose another.');
                res.render('admin/edit_category', {
                    title: title,
                    id: id
                });
            }else{
                Category.findById(id, function(err, category){
                    if(err)
                    return console.log(err);

                    category.title = title;
                    category.slug = slug;

                    category.save(function(err){
                        if(err) return console.log(err);
                        req.flash('success', 'Category edited!');
                        res.redirect('/admin/categories/edit_category/'+ id);
                    });

                })
            }
        })

    }

});

router.get('/delete-category/:id', function(req, res){
    // res.render('index', {title: 'admin'})
    Category.findByIdAndRemove(req.params.id, function(err){
        if(err) return console.log(err);
        req.flash('success', 'Category deleted!')
        res.redirect('/admin/categories/')
    });
});

// Express
module.exports = router;