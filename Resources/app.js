Titanium.UI.setBackgroundColor('#ffffff');

//app namespace
var mymeds = {
	test:'test',
	test2:'jeg er en string!'
}

//include files 
Ti.include('ui.js', 'db.js')

//build the app's UI
var tabs = mymeds.ui.createApplicationTabGroup();
tabs.open();

/*
//start app
var win = Ti.UI.createWindow({ backgroundColor: '#fff' });
win.add(createQRCodeImageView('Hello, world!', '150x150'));
win.open();
*/