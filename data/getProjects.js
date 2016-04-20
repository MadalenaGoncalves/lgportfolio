var mongoose = require( 'mongoose' );
require( './../models/projects.js' );
var Project = mongoose.model( 'Projects' );

 var prj = 
[    {
        "name": "proj1",
        "shortTitle": "",
        "shortDesc": "",
        "title": "KONZEPT FÜR DEN UMBAU EINER BÜROETAGE BEI BAYER",
        "city": "Berlin",
        "grossArea": 1446,
        "floorArea": 1298,
        "company": "Weberwürschinger Architekten",
        "companyUrl": "http://www.weberwuerschinger.com/",
        "participation": "Konzept | Vorentwurfsplanung | Skizze, Pläne, Perspektive | Präsentationen | Modell"
    },
    {
        "name": "proj2",
        "shortTitle": "",
        "shortDesc": "",
        "title": "MODERNISIERUNG UND ERWEITERUNG VON EINEM MEHRFAMILIENHAUS",
        "country": "",
        "city": "Berlin",
        "grossArea": 313,
        "floorArea": 1925,
        "company": "A3 Architekten Berlin-Düsseldorf",
        "companyUrl": "http://www.a3architekten.eu/",
        "participation": "Konzept| Bestandsaufnahme| Entwurfsplanung - Skizze, Pläne, Perspektive| Vorbereitung der Baugenhemigung| Ausführungsplanung | Baustellenbesichtigung"
    }];


exports.getProjects = function(req,resp){
    console.log("b4 find");
    resp.json(prj);
    // Project.find({}, "_id name title city")
    //     .exec(function(err,arr){
    //     if(err) console.error("error on getprojects");
    //     console.log("returning projects from db");
    //     resp.json(arr);
    // });
}
