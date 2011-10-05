(function(){
	mymeds.ui = {
		test: "hei"
	}
	
	//lager en liste med dummy data
	mymeds.ui.createListeTable = function() {
		var tv = Ti.UI.createTableView()
		
		tv.addEventListener('click', function(e) {
			//var win = mymeds.ui.createDetailWindow(e.rowData)
			
			var win = Titanium.UI.createWindow({
				layout: 'vertical',
				title: e.rowData.name
			})
			
			var info = Ti.UI.createLabel({
				text: e.rowData.info
			})
			win.add(info)
			
			var klokke = Ti.UI.createLabel({
				text: e.rowData.klokke + '.00'
			})
			win.add(klokke)
			
			var slett = Ti.UI.createButton({
				title: 'Slett'
			})
			win.add(slett)
			
			slett.addEventListener('click', function() {
				mymeds.db.del(e.rowData.id)
				Titanium.UI.currentWindow.close()
			})
			Titanium.UI.currentTab.open(win)
		});
		
		function populateData() {
			var results = mymeds.db.list()			
			tv.setData(results)
		}
		
		populateData();
		
		Ti.App.addEventListener('databaseUpdated', function() { 
    		populateData();
		});
		
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
		
		var leggTil = Ti.UI.createButton({
			title: 'Legg til'
		})
		win.add(leggTil)
		
		var piller = [
			{name: 'sovepiller', info: 'piller som får deg til å sove', sdate: 01012011, fdate: 31122011, klokkeslett: 23, ma: 1, ti: 0, on: 1, to: 1, fr: 0, lo: 0, so: 1},
			{name: 'lykkepiller', info: 'piller som gjør deg lykkelig', sdate: 01012011, fdate: 31122011, klokkeslett: 16, ma: 1, ti: 0, on: 1, to: 1, fr: 0, lo: 0, so: 1},
			{name: 'omega 3', info: 'piller som gjør deg sunn og god', sdate: 01012011, fdate: 31122011, klokkeslett: 9, ma: 1, ti: 0, on: 1, to: 1, fr: 0, lo: 0, so: 1}
		]
		
		leggTil.addEventListener('click', function(){
			randomnumber = Math.floor(Math.random()*3)
			mymeds.db.add(
				piller[randomnumber].name, 
				piller[randomnumber].info,
				piller[randomnumber].sdate,
				piller[randomnumber].fdate,
				piller[randomnumber].klokkeslett,
				piller[randomnumber].mandag,
				piller[randomnumber].tirsdag,
				piller[randomnumber].onsdag,
				piller[randomnumber].torsdag,
				piller[randomnumber].fredag,
				piller[randomnumber].lordag,
				piller[randomnumber].sondag
			)
		})
		
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