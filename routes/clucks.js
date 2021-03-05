const express = require("express")
const knex = require("../db/queries")


const router = express.Router()


router.get("/", (req, res) => {
     
    
      knex 
        .index() 
        .then(data => {
            
          res.render("index", {clucks:data})
        })
    })
    

router.get("/new", (req, res) => {
      // const username = req.cookies.username
    const { username } = req.cookies
    if ( username ) {
        res.render("new")
    } else {
        res.redirect("/sign_in")
    }
 })




router.post("/", (req, res) => {
    
      req.body.username = req.cookies.username
      
      knex 
        .create(req.body) 
        .then(data => { 
          
          res.redirect("/clucks/")
        })
      
    })
    

module.exports = router