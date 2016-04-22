Polls = new Mongo.Collection("Polls");
Polls.allow(
{
    insert: function()
    {
        return true;
    },
    update: function()
    {
        return true;
    },
    remove: function()
    {
        return true;
    }
});




var Schema = {};

Schema.vote = new SimpleSchema(
{
    voted:
    {
        type: String
    },
    userId:
    {
        type: String,
    }
});


Schema.Poll = new SimpleSchema(
{

    projectID:
    {
        type: String,
        max: 200,
        optional: true
    },
    createdBy:
    {
        type: String,
        optional: true
    },
    question:
    {
        type: String
    },
    votes:
    {
        type: [Schema.vote],
        optional: true
    }


});

Polls.attachSchema(Schema.Poll);