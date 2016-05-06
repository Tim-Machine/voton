const queryString = require('query-string');
var pollId = 0;
Template.viewPoll.created = function () {
    var parsed = queryString.parse(location.search);

    if (parsed['poll'] !== undefined) {
        pollId = parsed['poll'];
    }

    var self = this;
    self.autorun(function () {
        self.subscribe("poll", pollId);
    });
}


Template.viewPoll.events(
    {
        "click #vote .btn": function (event, template) {
            data = {
                voted: event.target.id,
                userId: window.localStorage.getItem('tempId')
            },

            Meteor.call("vote", pollId, data, function (error, result) {
                if (error) {
                   sAlert.error(error.message());
                }
                if (result) {
                    sAlert.success('Thanks!');
                }
            });

        }
    });


Template.viewPoll.helpers(
    {
        question: function () {
            if (Template.instance().subscriptionsReady()) {
                var results = Polls.findOne();
                return results['question'];
            }
        },
        needsToVote: function () {

            var userId =  window.localStorage.getItem('tempId');

            var poll = Polls.findOne();
            if (poll.votes == undefined) {
                return true;
            }

            count = 0;

            for (var i = 0; i < poll.votes.length; i++) {
                if (poll.votes[i].userId == userId) {
                    count++;
                }
            }

            if (count > 0) {
                return false
            }
            else {
                return true
            }
        }
    });


var pollData = function () {
    poll = Polls.findOne();
    if (poll.votes === undefined) {
        return [];
    }
    votes = poll.votes

    data = {};
    data.total = votes.length;

    for (var i = 0; i < data.total; i++) {
        if (data[votes[i].voted] === undefined) {
            data[votes[i].voted] = 1;
        }
        else {
            data[votes[i].voted] = data[votes[i].voted] + 1;
        }
    }
    var allowed = ['green', 'amber', 'red'];
    var final = [];
    var colors = {
        'green': '#28b62c',
        'amber': '#ff851b',
        'red': '#ff4136'
    };

    for (key in data) {
        if (data.hasOwnProperty(key) && $.inArray(key, allowed) != -1) {
            percent = (data[key] / data.total) * 100;

            var tempData = {
                name : key,
                y : percent,
                color: colors[key]
            };
            final.push(tempData);
        }
    }

    return final;
};


Template.viewPoll.topGenresChart = function () {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: "Current Status"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [
            {
                type: 'pie',
                name: 'genre',
                data: pollData()
            }]
    };
};