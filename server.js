const DbManager = require("./db/DbManager.js");
const shell = require("shelljs");
const express = require("express");
const app=express();
const bodyParser= require("body-parser");
const Promise = require('promise');


const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');


const getBuildings = require("./services/getBuildings.js");
const getBuildingCostTypes = require("./services/getBuildingCostTypes.js");
const saveBuildingCostType = require("./services/saveBuildingCostType.js");
const saveCustomer = require("./services/saveCustomer.js");
const saveApartment = require("./services/saveApartment.js");
const saveTenancy = require("./services/saveTenancy.js");
const savePlannedPayments = require("./services/savePlannedPayments.js");
const updateBuilding = require("./services/updateBuilding.js");
const getApartmentsAndBuildingDetails = require("./services/getApartmentsAndBuildingDetails.js");
const getBuildingDetailsById = require("./services/getBuildingDetailsById.js");
const getHouseCostTypes = require("./services/getHouseCostTypes.js");
const mergeApartmentData = require("./services/mergeApartmentData.js");
const saveOwnerCommunityCosts = require("./services/saveOwnerCommunityCosts.js");
const editPlannedPayments =require("./services/editPlannedPayments.js");
const saveApartmentCost = require("./services/saveApartmentCost.js");

const db = new DbManager();

app.use("/ressources", express.static(__dirname + "/ressources"));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'pug');
app.use(bodyParser.json());

db.createDBIfNotExists();
db.connect();
shell.exec('mkdir -p documents')


app.get("/impressum", function(req, res) {
    res.render("general/impressum");
});

app.get("/datenschutzerklaerung", function(req, res) {
    res.render("general/datenschutzerklaerung");
});


/**
 * 
 * 
 * 
 * 
 * 
 * 
 * login mechanism
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 **/
 // configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'username' },
  (username, password, done) => {
    db.execute(`select id, username, password from users where username='${username}'`, (err, result)=>{
      if (err){
        //console.log(err);
        return done(err); 
      }

      if (result.rows.length==0) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }else{
        let user=result.rows[0];
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Invalid credentials.\n' });
        }
        if(bcrypt.compareSync(password, user.password)) {
          return done(null, user)
        }
      }

    });
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

 app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000000 }
  
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/login", function(req, res) {
  res.render("general/login");
});

app.post("/login", function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    req.login(user, (err) => {
      res.redirect("/buildings")
    })
  })(req, res, next);
}); 

var isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()) {
      req.session.save(function(err) {
        req.session.reload(function(err) {
        })
      })      
      next();
  } else {
    res.redirect('/login');
  }
}
 /**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 **/
 
 
// redirect to /buildings
app.get("/", isAuthenticated, function(req, res){
  res.redirect("/buildings");
});

//get index
app.get("/buildings", isAuthenticated, function(req, res){
  Promise.resolve( getBuildings(db) )
  .then(function(buildings){ 
      res.render('buildings/index', {"buildings":buildings}); 
      });
});

//get create-Formular
app.get("/buildings/create", isAuthenticated, function(req, res){
    res.render('buildings/create');
});

//Store a new building
app.post("/buildings/store", isAuthenticated, function(req, res){
    var query = "INSERT INTO v_buildings(street, street_nr, post_code, city, total_area, ground_floor_area, business_area, number_flats, year_of_completion, owner_community_id) values('"+ req.body.street +"', '"+ req.body.street_nr +"' ,"+req.body.post_code+", '"+ req.body.city+"', "+ req.body.total_area+","+ req.body.ground_floor_area +","+ req.body.business_area +","+ req.body.number_flats +","+ req.body.year_of_completion + "," + req.body.owner_community_id + ");"
    db.execute( query, function(err) {
      if (err) throw err;
    });
  res.redirect("/buildings");
});

//index all house Cost types
app.get('/buildings/cost_types', isAuthenticated, function(req, res){
  Promise.resolve( getBuildingCostTypes(db) ).then(function(costTypes) {
      res.render('buildings/cost_types', {"costTypes":costTypes});
  });
});

app.get("/buildings/cost_positions/create", isAuthenticated, function(req, res) {
   res.render("buildings/add_cost_types"); 
});


app.post("/buildings/add_cost_types", isAuthenticated, function(req, res){
  Promise.resolve( saveBuildingCostType(db, req.body.house_cost_type) ).then(function(){
    res.redirect("/buildings");
  });
});

//show detailed view
app.get("/buildings/:id", isAuthenticated, function(req, res){
  var building_id =req.params.id;
  Promise.resolve( getApartmentsAndBuildingDetails(db, building_id) )
  .then(function(data){ res.render('buildings/show', {"data":data}); })
});

//get edit-Formular
app.get("/buildings/:id/edit", isAuthenticated, function(req, res){
  var building_id =req.params.id;
  Promise.resolve( getBuildingDetailsById(db, building_id) )
  .then(function(building){ res.render('buildings/edit', {"building":building}); });
});

app.put("/buildings/:id", isAuthenticated, function(req,res){
      var building_id= req.body.id;
  updateBuilding(db, req).then(function(){
    res.redirect(303, "/buildings/" + req.params.id);
  });
});

//get delete formular
app.get("/buildings/:id/delete", isAuthenticated, function(req, res){
  var building_id =req.params.id;
  Promise.resolve( getBuildingDetailsById(db, building_id) )
  .then(function(building){ res.render('buildings/delete', {"building":building}); });
});

//Delete a Building
app.delete("/buildings/:id", isAuthenticated, function(req, res){
  var query = "DELETE FROM v_buildings where id=" + req.params.id + ";";
  db.execute( query, function(err, result) {
    if (err) throw err;
    res.send("deleted");
  });
});

//create an apartment
app.get("/apartments/create", isAuthenticated, function(req, res) {
  res.render('apartments/create', {"building_id":req.query.building_id});
});

//store an apartment
app.post("/apartments/store", isAuthenticated, function(req, res){
  var building_id = req.body.building_id;
  var is_rented = req.body.is_rented;
  var apartment_indication= req.body.apartment_indication;
  var apartment_size= req.body.apartment_size;
  var floor= req.body.apartment_floor;
  var heating_area= req.body.heating_area;
  var first_name= req.body.first_name;
  var last_name= req.body.last_name;
  var care_of =req.body.care_of;
  var street= req.body.street;
  var street_nr= req.body.street_nr;
  var post_code= req.body.post_code;
  var city= req.body.city;
  var beginning_rental_period =req.body.beginning_rental_period;
  var end_rental_period =null;
  var current_tenant=1;
  var net_cold_rent=req.body.net_cold_rent;
  var operation_costs=req.body.operation_costs;
  var pkeys={};
  Promise.resolve( saveApartment(db, building_id, apartment_indication, apartment_size, heating_area, floor) ).then(function(apartment_id) {
    pkeys.apartment_id=apartment_id;
    if(is_rented==1){
    Promise.resolve( saveCustomer(db, first_name, last_name, care_of, street, street_nr, post_code, city) ).then(function(customer_id) {
      pkeys.customer_id=customer_id;
      
      
      Promise.resolve( saveTenancy(db, pkeys.apartment_id, pkeys.customer_id, current_tenant, beginning_rental_period, end_rental_period) ).then(function(rented_id) {
        pkeys.rented_id=rented_id;
        
        Promise.resolve( savePlannedPayments(db, pkeys.rented_id, operation_costs, beginning_rental_period, null, 'monthly', 'operation_costs') ).then(function(PlannedPaymentsID) {
          pkeys.PlannedPaymentsID=PlannedPaymentsID;
          
          Promise.resolve( savePlannedPayments(db, pkeys.rented_id, net_cold_rent, beginning_rental_period, null, 'monthly', 'net_cold_rent') ).then(function(PlannedPaymentsID) {
            pkeys.PlannedPaymentsID=PlannedPaymentsID;
            
            res.redirect("/buildings/" + building_id);  
          
          });
        });
      });
    });
    }else{res.redirect("/buildings/" + building_id);  }
  });
});

const getCurrentTenancyByApartmentId = require("./services/getCurrentTenancyByApartmentId.js");

app.post("/apartments/:id/editPlannedPayments", isAuthenticated, function(req, res) {
  let date= req.body.date;
  let amount =req.body.amount;
  let payment_type =req.body.payment_type;
  Promise.resolve(getCurrentTenancyByApartmentId(db, req.params.id)).then(function(tenancy){
    editPlannedPayments(db, tenancy.rented_id, amount, date, 'monthly', payment_type).then( ()=>{
      res.redirect("/apartments/"+req.params.id)
    })
  })
});


//get detailed view for an apartment
app.get("/apartments/:id/", isAuthenticated, function(req, res) {
  Promise.resolve(mergeApartmentData(db, req.params.id)).then((data)=>{
    var building=data.building;
    var apartment=data.apartment;
    var tenancy=data.tenancy;
    var tenant = data.customer;
    res.render("apartments/show", {"tenant":tenant,"building":building, "apartment":apartment, "tenancy":tenancy});
  });
});

//CREATE HOUSE COSTS
app.get("/buildings/:id/add_costs", isAuthenticated, function(req, res) {
  var building_id = req.query.building_id;
    Promise.resolve( getHouseCostTypes(db) ).then(function(costTypes) {
      //res.json(costTypes)
     res.render("buildings/add_costs", {"house_cost_types":costTypes,"building_id":building_id});
  });
});

//Store house_costs
app.post("/buildings/:id/add_costs", isAuthenticated, function(req, res){
  let titles = req.body.cost_positions.titles;
  let year = req.body.year;
  let building_id = req.body.building_id;
  let costs = req.body.cost_positions.costs;
  let allocatable = req.body.cost_positions.allocatable;
  let distributor_key = req.body.cost_positions.distributor_key;
  saveOwnerCommunityCosts(db, building_id, year, costs, titles, allocatable, distributor_key, function(){
    res.redirect("/buildings/"+ building_id);
  });
});

app.post("/apartments/:id/add_costs", isAuthenticated, function(req, res) {
    let apartment_id = req.params.id;
    let designation= req.body.designation;
    let costs= req.body.costs;
    let beginning_date = req.body.date;
    let period= req.body.period;
    Promise.resolve(saveApartmentCost(db, apartment_id, designation, costs, period, beginning_date)).then(function() {
        res.redirect("/apartments/"+apartment_id);
    })
});

const createAccountingLetter = require("./services/createAccountingLetter.js");



app.post("/tenancy/:id/create_accounting_letter", isAuthenticated, (req, res)=>{
  createAccountingLetter(db, req, res);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
