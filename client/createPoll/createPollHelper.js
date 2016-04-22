Template.createPoll.events(
{
    "submit #createPoll": function(event, template)
    {
        event.preventDefault();
        var question = event.target.pollQuestion.value;
        var token = window.localStorage.getItem('tempId');

        Meteor.call("createPoll", question, token, function(error, result)
        {
            if (error)
            {
                console.log("error", error);
            }
            if (result)
            {
                var url = window.location.href;
                newUrl = url.replace(location.search, "?poll=" + result);
                window.location.href = newUrl;
            }
        });
    },
    'focus #pollQuestion': function(event, template)
    {
        var maxSize = '400px';
        var currentWidth = $(event.target).width();
        Session.set("currentWidth", currentWidth);

        $(event.target).animate(
        {
            width: maxSize
        }, 'fast');
    },
    'focusout #pollQuestion': function(event, template)
    {
        $(event.target).animate(
        {
            width: Session.get("currentWidth")
        }, 'slow');
    }
});