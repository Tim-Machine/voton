Meteor.methods(
{
    createPoll: function(question, userToken)
    {
        check(question, String);
        check(userToken, String);
        var id = Polls.insert(
        {
            question: question,
            createdBy: userToken
        })

        return id;
    }
});