//app namespace
var mymeds = {
	test:'test',
	test2:'jeg er en string!'
}

//include files 
Ti.include('ui.js', 'qr.js')

mymeds.mainWin = mymeds.ui.createApplicationWindow();
mymeds.mainWin.open()

/*
//start app
var win = Ti.UI.createWindow({ backgroundColor: '#fff' });
win.add(createQRCodeImageView('Hello, world!', '150x150'));
win.open();
*/