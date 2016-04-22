Meteor.publish("poll", function(id)
{
    var data = Polls.find(
    {
        _id: id
    });

    return data;
});