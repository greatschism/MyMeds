(function(){
	mymeds.ui = {
		test: "hei"
	}
	
	mymeds.ui.createListeTable = function() {
		var tv = Ti.UI.createTableView()
		
		tv.addEventListener('click', function(e) {
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
				Titanium.UI.currentWindow.close()
				mymeds.db.del(e.rowData.id)
			})
			Titanium.UI.currentTab.open(win)
		});
		
		function populateData() {
			var results = mymeds.db.list()	
			tv.setData(results)
			Ti.fireEvent('remove')
		}
		
		populateData();
		
		Ti.App.addEventListener('databaseUpdated', function() { 
    		populateData();
    		Ti.App.fireEvent("oppdaterVindu");
		});
		
		return tv
	}
	
	//lager hovedvinduet
	mymeds.ui.createListWindow = function() {
		var win = Ti.UI.createWindow({
			backgroundColor: '#999',
			activity : {
				onCreateOptionsMenu : function(e) {
					var menu = e.menu;
					var m1 = menu.add({ title : 'Slett alle' });
					m1.addEventListener('click', function(e) {
						mymeds.db.delAll()
					});
				}
			}
		})
	
		var liste = mymeds.ui.createListeTable()
		var label = Ti.UI.createLabel({
				text: 'Listen er tom. Trykk på "Scanner" for å legge til medisiner.',
				color: '#fff',
				left: 10,
				right: 10
			})
		
		function oppdatereVindu(){
				if (mymeds.db.list() == 0){
				win.remove(liste)
				win.add(label)
			}
			else {
				win.remove(label)
				win.add(liste)
			}
		}
		
		oppdatereVindu()
	
		Ti.App.addEventListener('oppdaterVindu', function() { 
    		oppdatereVindu()
		});
	
		return win
	}
	
	//lager scannervinduet
	mymeds.ui.createScannerWindow = function() {
		var win = Ti.UI.createWindow({
			backgroundColor: '#000',
			layout: 'vertical'
		})
		
		var pillenavn = Ti.UI.createLabel({
			text: ' ',
			top: 25
		})
		win.add(pillenavn)
		
		var image = Titanium.UI.createImageView({
			url:'scannerbg.jpg',
			width: 250,
			top: 25
		})
		win.add(image)
		
		var scan = Ti.UI.createButton({
			title: 'Scan',
			top: 25
		})
		win.add(scan)
		
		var buttonGroupView = Ti.UI.createView({
   			layout: 'horizontal',
   			top: 25
		})
		
		var leggTil = Ti.UI.createButton({
			title: 'Legg til',
			left: '31%'
		})
		
		var avbryt = Ti.UI.createButton({
			title: 'Avbryt',
		})
		
		buttonGroupView.add(leggTil)
		buttonGroupView.add(avbryt)
		
		var qr = Ti.UI.createImageView({
			url:'qrscan.jpg',
			width: 250,
			top: 25
		})
		
		var randomnumber = 0
		
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'camera.wav');

		var sound = Titanium.Media.createSound({sound:file, volume: '10'})
		
		scan.addEventListener('click',function(){
			sound.play()
			randomnumber = Math.floor(Math.random()*3)
			win.remove(scan)
			win.remove(image)
			win.add(qr)
			var pille = piller[randomnumber].name
			pillenavn.text = 'Du har scannet: ' + pille
			win.add(buttonGroupView)
		})
		
		var piller = [
			{name: 'sovepiller', info: 'piller som får deg til å sove', sdate: 01012011, fdate: 31122011, klokkeslett: 23, ma: 1, ti: 0, on: 1, to: 1, fr: 0, lo: 0, so: 1},
			{name: 'lykkepiller', info: 'piller som gjør deg lykkelig', sdate: 01012011, fdate: 31122011, klokkeslett: 16, ma: 1, ti: 0, on: 1, to: 1, fr: 0, lo: 0, so: 1},
			{name: 'omega 3', info: 'piller som gjør deg sunn og god', sdate: 01012011, fdate: 31122011, klokkeslett: 9, ma: 1, ti: 0, on: 1, to: 1, fr: 0, lo: 0, so: 1}
		]
		
		leggTil.addEventListener('click', function(){
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
			win.remove(buttonGroupView)
			tabs.setActiveTab(0)
			win.remove(qr)
			win.add(image)
			pillenavn.text = ''
			win.add(scan)
		})
		
		avbryt.addEventListener('click', function(){
			win.remove(buttonGroupView)
			win.remove(qr)
			win.add(image)
			pillenavn.text = ''
			win.add(scan)
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