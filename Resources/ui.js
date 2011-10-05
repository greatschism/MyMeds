(function(){
	mymeds.ui = {
		test: "hei"
	}
	
	mymeds.ui.createApplicationWindow = function() {
		var win = Ti.UI.createWindow({
			backgroundColor: '#fff'
		})
		var label= Ti.UI.createLabel({
			text: mymeds.test
		})
		win.add(label)
		return win
	}
})()
