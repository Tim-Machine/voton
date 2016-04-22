var Projects = new Mongo.Collection('Projects');
var Schema = {};
Schema.Project = new SimpleSchema({

    title: {
        type: String,
        label: "Title",
        max: 200
    },
    createdBy :{
      type: String,
      optional:true
    }

});
