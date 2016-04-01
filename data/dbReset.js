var mongoose = require( 'mongoose' ),
    // _ = require( 'lodash' ),
    projectsData = require( './projects.json' ),
    imagesData = require( './images.json' ),
    projImgMapperData = require( './projImgMapper.json' );

exports.reset = function( req, res ) {
    // get refs to the models we defined above
    var Project = mongoose.model( 'Projects' );
    var Image = mongoose.model( 'Images' );
    var ProjImgMap = mongoose.model( 'ProjImgMapper' );

    // clear all existing documents from the collections
    Projects.find().remove();
    Images.find().remove();
    ProjImgMapper.find().remove();

    // populate the Projects collection from json data (which do not reference anything else)
    for( var i = 0; i < projectsData.length; i++ ) {
        new Project( projectsData[ i ] ).save();
    }
    
    // populate the Images collection from json data (which do not reference anything else)
    for( var i = 0; i < imagesData.length; i++ ) {
        new Image( imagesData[ i ] ).save();
    }
    
    
    
Story.findOne({ title: 'Once upon a timex.' }, function(error, story) {
  if (error) {
    return handleError(error);
  }
  story._creator = aaron;
  console.log(story._creator.name); // prints "Aaron"
});

    // now that the collections are populated, we can iterate over it
    Food.find( function( err, foods ) {
        var foodMap = {};

        // store _ids of Food documents that Mongo generated upon insert
        for( var i = 0; i < foods.length; i++ ) {
            var food = foods[i];
            // I am mapping the ids to the food names because the LogEntry
            // JSON data contained this field thanks to the original source
            // data's structure (a spreadsheet).
            // You could utilize a more sophisticated lookup here if necessary.
            foodMap[ food.name ] = food._id;
        }

        // populate the LogEntries collection from json data
        for( i = 0; i < logData.length; i++ ) {
            var logEntry = logData[ i ];
            // we find and store food._id on LogEntry for reference
            logEntry._food = foodMap[ logEntry.food_name ];

            // note that only the fields defined in the schema will be
            // persisted to Mongo, so the foodName field we used for
            // lookup will not be unnecessarily added to the db
            new LogEntry( logEntry ).save();
        }
    } );

    res.redirect( "/" );
}