Meteor.startup(function(){
  if(!window.localStorage.getItem('tempId')){
    window.localStorage.setItem('tempId',generateUUID());
  }

    sAlert.config({
        effect: 'jelly',
        position: 'top-right',
        timeout: 1000,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        onClose: _.noop //

    });



});


function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
