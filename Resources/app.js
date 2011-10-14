Titanium.UI.setBackgroundColor('#ffffff');

//app namespace
var mymeds = {
	test:'test',
	test2:'jeg er en string!'
}

//include files 
Ti.include('ui.js', 'db.js', 'dato.js', 'ui_info.js')

//build the app's UI
var tabs = mymeds.ui.createApplicationTabGroup();
tabs.open();

/*if (mymeds.db.list() == 0){
	alert('Listen er tom. Trykk på "scanner" for å legge til medisiner')
}*/