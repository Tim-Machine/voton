Meteor.methods(
{
    vote: function(pollId, data)
    {

        Polls.update(
        {
            _id: pollId
        },
        {
            $push:
            {
                votes: data
            }
        });
        return true;
    }
});