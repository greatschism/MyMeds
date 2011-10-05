(function(){
	mymeds.ui = {
		test: "hei"
	}
	
	//detaljevindu for hvert listeelemnt. Funksjonen tar inn data fra listeelementet som ble trykket på
	mymeds.ui.createDetailWindow = function(e) {
		var win = Ti.UI.createWindow({
			title: e.title,
			layout:'vertical'
		})
	}
	
	//lager en liste med dummy data
	mymeds.ui.createListeTable = function() {
		var tv = Ti.UI.createTableView()
		
		tv.addEventListener('click', function(e) {
			//var win = mymeds.ui.createDetailWindow(e.rowData)
			
			var win = Titanium.UI.createWindow({
			
				title:e.rowData.title
			})
			Titanium.UI.currentTab.open(win)
		});
		
		function populateData() {
			var results = [
				{title:'Sovepiller', hasChild:true},
				{title:'Lykkepiller', hasChild:true},
				{title:'Omega 3', hasChild:true}
			];
			
			tv.setData(results);
		}
		
		populateData();
		
		return tv;
	}
	
	//lager hovedvinduet
	mymeds.ui.createListWindow = function() {
		var win = Ti.UI.createWindow({
			backgroundColor: '#999'
		})
		var label= Ti.UI.createLabel({
			text: 'Du har ikke lagt til noen medisiner enda'
		})
		// HER MÅ VI LAGE EN IF-SETNING SOM SJEKKER OM LISTEN INNEHOLDER NOE win.add(label)
		
		win.add(mymeds.ui.createListeTable())
		
		return win
	}
	
	//lager scannervinduet
	mymeds.ui.createScannerWindow = function() {
		var win = Ti.UI.createWindow({
			backgroundColor: '#999'
		})
		var label= Ti.UI.createLabel({
			text: 'Dette er en tekst'
		})
		win.add(label)
		
		return win
	}
	
	//lager tabs
	mymeds.ui.createApplicationTabGroup = function() {
		var tabGroup = Titanium.UI.createTabGroup()
		
		var liste = mymeds.ui.createListWindow()
		var scanner = mymeds.ui.createScannerWindow()
		
		mymeds.listeTab = Titanium.UI.createTab({
		  title: 'Liste',
		  icon:'KS_nav_ui.png',
		  window: liste
		});
		
		mymeds.scannerTab = Titanium.UI.createTab({
		  title: 'Scanner',
		  icon:'KS_nav_views.png',
		  window: scanner
		});
		
		tabGroup.addTab(mymeds.listeTab);
		tabGroup.addTab(mymeds.scannerTab);

		return tabGroup
	}
})()