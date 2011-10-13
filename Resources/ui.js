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
			
			var info = Titanium.UI.createTextArea({
			    value: 'Produktinfo: \n' + e.rowData.info,
			    editable: false,
			    color: '#fff',
			    font:{fontSize:15},
				width: '100%',
			    backgroundColor	: '#4d4d4d',
			    borderWidth: 20,
			    borderColor:'#4d4d4d'
			});
			
			win.add(info)
			
			var border = Titanium.UI.createLabel({
			    text:' ',
			    height: 1,
				width: '100%',
			    backgroundColor	: '#fff'
			});
			
			win.add(border)
			
			var datoer = dato(e.rowData)
			
			var klokke = Titanium.UI.createTextArea({
			    value: 'Medisinen skal tas klokken ' + e.rowData.klokke + '.00 ' + 'på ' + datoer,
			    editable: false,
			    color: '#fff',
			    font:{fontSize:15},
				width: '100%',
			    backgroundColor	: '#4d4d4d'
			});
	
			win.add(klokke)
	
			var alarmView = Ti.UI.createView({
	   			layout: 'horizontal',
	   			backgroundColor	: '#4d4d4d',
			})
	
			var alarm = Titanium.UI.createTextArea({
			    value: 'Alarm:',
			    editable: false,
			    color: '#fff',
			    font:{fontSize:15},
			    backgroundColor	: '#4d4d4d'
			});
			
			alarmView.add(alarm)
			
			var basicSwitch = Titanium.UI.createSwitch({
			    value:false,
			    top: 3
			});
			basicSwitch.addEventListener('change',function(e)
			{
			    Titanium.API.info('Basic Switch value = ' + e.value + ' act val ' + basicSwitch.value);
			});
			
			alarmView.add(basicSwitch)
			
			var border3 = Titanium.UI.createLabel({
			    text:' ',
			    height: 1,
				width: '100%',
			    backgroundColor	: '#fff'
			});
			
			win.add(border3)
			
			win.add(alarmView)
	
			var border2 = Titanium.UI.createLabel({
			    text:' ',
			    height: 1,
				width: '100%',
			    backgroundColor	: '#fff'
			});
			win.add(border2)
			
			var resept = Titanium.UI.createTextArea({
			    value: 'Resepten må fornyes ' + e.rowData.sluttdato,
			    editable: false,
			    color: '#fff',
			    font:{fontSize:15},
				width: '100%',
			    backgroundColor	: '#4d4d4d'
			});

			win.add(resept)
		
			var border5 = Titanium.UI.createLabel({
			    text:' ',
			    height: 1,
				width: '100%',
			    backgroundColor	: '#fff'
			});
			win.add(border5)
		
			var buttonGroupView = Ti.UI.createView({
   			layout: 'horizontal',
   			top: 25
			})
			
			var ok = Ti.UI.createButton({
				title: '  OK  ',
				left: '31%'
			})
			
			ok.addEventListener('click', function() {
				Titanium.UI.currentWindow.close()
			})
			
			var slett = Ti.UI.createButton({
				title: ' Slett '
			})
			
			
			slett.addEventListener('click', function() {
				Titanium.UI.currentWindow.close()
				mymeds.db.del(e.rowData.id)
			})
			
			buttonGroupView.add(ok)
			buttonGroupView.add(slett)
			
			win.add(buttonGroupView)
			
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
			randomnumber = Math.floor(Math.random()*5)
			win.remove(scan)
			win.remove(image)
			win.add(qr)
			var pille = piller[randomnumber].name
			pillenavn.text = 'Du har scannet: ' + pille
			win.add(buttonGroupView)
		})
		
		var piller = [
			{name: 'Sovepiller', info: 'Piller som får deg til å sove', sdate: 01012011, fdate: 31122011, klokkeslett: 23, mandag: 1, tirsdag: 0, onsdag: 1, torsdag: 1, fredag: 0, lordag: 0, sondag: 1},
			{name: 'Lykkepiller', info: 'Piller som gjør deg lykkelig', sdate: 01012011, fdate: 31122011, klokkeslett: 16, mandag: 0, tirsdag: 1, onsdag: 0, torsdag: 0, fredag: 1, lordag: 1, sondag: 0},
			{name: 'Omega 3', info: 'Piller som gjør deg sunn og god', sdate: 01012011, fdate: 31122011, klokkeslett: 9, mandag: 1, tirsdag: 1, onsdag: 1, torsdag: 1, fredag: 1, lordag: 1, sondag: 1},
			{name: 'ASPIRIN TAB 500MG', info: 'Bruksområde \nSmertestillende og febernedsettende effekt og motvirker betennelsestilstander i kroppen.\n\nBruksmåte/Dosering\nSkal ikke brukes over lengre perioder uten å konsultere lege. \nDen vanlige dosen er: Voksne: 1-2 tabletter inntil 3 ganger daglig med 4-8 timers intervall. Maksimal daglig dose er 4 g (tilsvarer 8 tabletter). \nBarn: \n10-15 kg: ca. 1/3 tablett (150 mg). \n15-25 kg: 1/2 tablett (250 mg). \n25-40 kg: 1/2 - 1 tablett (250-500 mg). \nBarn over 12 år: 1 tablett (500 mg). \nHvis nødvendig kan dosen tas inntil 3 ganger daglig med 4-8 timers intervall. \nTablettene skal tas med rikelig væske og bør ikke tas på tom mage.\n\nForsiktighetsregler\nBruk ikke Aspirin hvis du er overfølsom (allergisk) overfor acetylsalisylsyre og salisylater eller et av de andre innholdsstoffene i Aspirin. \nEller dersom du har sår i mage-/tarmkanalen eller dersom du har økt blødningstendens. \nHeller ikke hvis du er mer enn 6 måneder gravid. \nDu bør kontakte lege før bruk av Aspirin hvis du: \nbehandles med blodfortynnende midler eller har astma, og har mage-/tarmproblemer eller tidligere har hatt magesår. Eller har nedsatt nyrefunksjon og har en alvorlig nedsatt leverfunksjon. \nEller er gravid eller ammer eller ved tidligere bruk av acetylsalicylsyre eller andre midler mot smerte/reumatiske lidelser har fått symptomer på astma, snue eller utslett. \nLes pakningsvedlegget nøye.\n\nSammensetning\nVirkestoff er acetylsalisylsyre. 1 tablett inneholder 500 mg acetylsalisylsyre. \nHjelpestoffer er cellulosepulver og maisstivelse.\n\nVarenummer\n196774', sdate: 01012011, fdate: 31122011, klokkeslett: 9, mandag: 1, tirsdag: 1, onsdag: 1, torsdag: 1, fredag: 1, lordag: 1, sondag: 1},
			{name: 'Zyrtec 10mg tabletter', info: 'Zyrtec 10mg filmdrasjerte tabletter. Brukes til behandling av allergi.\n\nZyrtec 10mg filmdrasjerte tabletter inneholder cetirizindihydroklorid og er et reseptfritt legemiddel. Til voksne og barn fra og med 6 år: for å lindre symptomer i nesen og øynene på grunn av sesongbetont allergi eller helårsallergi og for å lindre kronisk elveblest (kronisk idiopatisk urtikaria). Les pakningsvedlegget før bruk.', sdate: 01012011, fdate: 31122011, klokkeslett: 9, mandag: 1, tirsdag: 1, onsdag: 1, torsdag: 1, fredag: 1, lordag: 1, sondag: 1},
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