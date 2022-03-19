// External variables
const express = require("express");


//App variables
const app = express();
const port = process.env.PORT || "8000";





app.get('/validate/:idnumber',(req, res)=> {
  var ID=req.params.idnumber;
  if((ID.length<14)||(ID.length>14)){
    res.status(400).json('Error: ' + "Invalid ID number");  }
  else{
    var resp=[];
    var gen=parseInt(ID.substr(0,1)); //gets the generation of the person
    var year=parseInt(ID.substr(1,2)); //gets the birth year
    var month=parseInt(ID.substr(3,2)); //gets birth month
    var day= parseInt(ID.substr(5,2)); //gets birth day
    var code=ID.substr(7,2); //gets the city code
    var gender=parseInt(ID.substr(12,1)); //gets the gender
    if(gender%2==0){
      resp.push("Gender: Female");
    }else{
      resp.push("Gender: Male");
    }
    resp.push("City code:"+ code);


    if((year>6)&&(gen==3)){
      res.status(400).json( "Invalid ID number: Incorrect Birth Year");  }
    else{
      resp.push("Birth Year:"+ year);
    }
    var dof;
    if((month<1)||(month>12)){
      res.status(400).json( "Invalid ID number: Incorrect Birth Month");  }
      else{
        resp.push("Birth Month:"+ month);
      }

    
    switch(month){
      case 2:
        dof=28;
        break;
      case 4: 
      case 6:
      case 9: 
      case 11:
        dof=30;
        break;
      default:
        dof=31;
        break;


    }
    if(day>dof){
      res.status(400).json( "Invalid ID number: Incorrect Birth Day");  
    }
    else{
      resp.push("Birth Day:"+ day);
    }


    res.status(200).send(resp);

  }

  
});


// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
