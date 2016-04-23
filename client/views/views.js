const queryString = require('query-string');


Template.views.helpers(
{
    currentTemplate: function()
    {
        if (location.search)
        {
            var parsed = queryString.parse(location.search);
            if (parsed['poll'] !== undefined)
            {
                pollId = parsed['poll'];
                Session.set("pollId", pollId);
                return 'viewPoll';
            }
        }

        return 'hello'
    }
});