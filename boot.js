window.mcwidget = {
appId: '532160876956612',
pageId: '1469861003272007',
widgets: []};

(function(d, s, id){
var host = 'manychat.com/104395';

var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) { return; }
js = d.createElement(s); js.id = id;
js.src = '//' + host + '/assets/js/widget.js?' + (Math.round(+new Date/1000*600));
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'mcwidget-core'));
