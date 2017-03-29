var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var db = require("../db/index.js");

// for Home Component - from searchRecipes function 
/** ORIGINAL **
exports.searchRecipes = function(req, res) {
  var searchTerm = req.body.searchTerm;
 
  // regex -> allows the search to contain string instead of === string
  // options i -> allows search to be case insensitive
  db.Recipe.find({name:{'$regex' : searchTerm, '$options' : 'i'}})
    .exec(function (err, recipe) {
      if (err) 
      	{
      	  return err;
      	} else {
      	res.json(recipe);
      }
	});
};
** ORIGINAL **/

exports.searchRecipes = function(req, res) {
  var searchTerm = req.body.searchTerm;
 
  // regex -> allows the search to contain string instead of === string
  // options i -> allows search to be case insensitive
  // queues for the most forked recipe
  db.Recipe.find({name:{'$regex' : searchTerm, '$options' : 'i'}})
    .sort({'forks': -1}).limit(1).populate('forks').exec()
      .then(recipe => {
        console.log('exports.searchRecipes', recipe);
        res.json(recipe);
      })
      .catch(err => {
        console.log('exports.searchRecipes err:', err);
        res.status(500);
      });
};


/*
recipes with the top forks and creators recipe

1. use current search for recipes
2. sub-query 


*/

// for Nav Component - from getUsername function
exports.getUsername = function(req, res) {
  if (req.user) {
    res.json(req.user.name);  
  } else {
    res.json(null);
  }
};

// for viewRecipes Component - get all recipes for user
exports.getUserRecipes = function(req, res) {
  if (req.user) {
    db.User.findById(req.user._id)
    .populate('recipes')
    .exec(function(err, user) {
      res.send(user.recipes);
    });
  } else {
    res.end();
  }
}

/** ORIGINAL **
exports.addRecipe = function(req, res) {
  if (req.user) {
    req.body._creator = req.user._id;

    // create recipe in database
    let recipeId;
    db.Recipe.create(req.body).then((recipe) => {
      // push recipe into user's recipes array
      recipeId = recipe.id;
      db.User.findByIdAndUpdate(req.user._id, {$push: {recipes: recipe.id}})
      .then(() => {
        res.json(recipeId);
      })
    });
  } else {
    res.end();
  }
};
** ORIGINAL **/

exports.addRecipe = function(req, res) {
  if (req.user) {
    req.body._creator = req.user._id;

    // create recipe in database
    let recipeId;
    db.Recipe.create(req.body).then((recipe) => {
      // push recipe into user's recipes array
      recipeId = recipe.id;
      db.User.findByIdAndUpdate(req.user._id, {$push: {recipes: recipe.id}})
      .then(() => {
        res.json(recipeId);
      })
    });
  } else {
    res.end();
  }
};


exports.getRecipeById = function(req, res) {
  db.Recipe.findById(req.body.id)
  .then((recipe) => {
    res.json(recipe);
  })
};