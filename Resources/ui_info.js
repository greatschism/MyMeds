function ui_info () {
	
	var tv = Ti.UI.createTableView()
		
		tv.addEventListener('click', function(e) {
			var win = Titanium.UI.createWindow({
				layout: 'vertical',
				title: e.rowData.name
			})
			
			var scrollView = Titanium.UI.createScrollView({
			    contentHeight:'auto',
			    layout: 'vertical'
			});
			
			var view = Ti.UI.createView({
				height: 'auto'
			});
			
			scrollView.add(view);

			var info = Titanium.UI.createTextArea({
			    value: 'Produktinfo: \n' + e.rowData.info,
			    editable: false,
			    color: '#fff',
			    font:{fontSize:15},
				width: '100%',
			    backgroundColor	: '#4d4d4d',
			    borderWidth: 20,
			    borderColor:'#4d4d4d',
			    borderRadius: 6,
			    top: 4,
			});
			
			view.add(info)
			
			var border = Titanium.UI.createLabel({
			    text:' ',
			    height: 4,
				width: '100%',
			    backgroundColor	: '#000'
			});
			
			var view6 = Ti.UI.createView({
				height: 'auto'
			});
			
			view6.add(border)
			
			scrollView.add(view6);
									
			var datoer = dato(e.rowData)
			
			var klokke = Titanium.UI.createTextArea({
			    value: 'Medisinen skal tas klokken ' + e.rowData.klokke + '.00 ' + 'på ' + datoer,
			    editable: false,
			    color: '#fff',
			    font:{fontSize:15},
				width: '100%',
			    backgroundColor	: '#4d4d4d',
			    borderRadius: 6,
			    
			});
			
			var view2 = Ti.UI.createView({
				height: 'auto'
			});
			
			view2.add(klokke)
			
			scrollView.add(view2);
	
			var alarmView = Ti.UI.createView({
	   			layout: 'horizontal',
	   			backgroundColor	: '#4d4d4d',
	   			borderRadius: 6,
			})
	
			var alarmArea = Titanium.UI.createTextArea({
			    value: 'Alarm:',
			    editable: false,
			    color: '#fff',
			    font:{fontSize:15},
			    backgroundColor	: '#4d4d4d',
			    borderRadius: 6,
			  
			});
			
			alarmView.add(alarmArea)
			
			var alarmBoolean
			if (e.rowData.alarms == 0){
				alarmBoolean = false
			}
			else{
				alarmBoolean = true
			}
			
			var basicSwitch = Titanium.UI.createSwitch({
			    value:alarmBoolean,
			    top: 3
			});
			
			basicSwitch.addEventListener('change',function()
			{
			    if (alarmBoolean == false){
					mymeds.db.changeAlarm(1, e.rowData.id)
				}
				else{
					mymeds.db.changeAlarm(0, e.rowData.id)
				}
			});
			
			alarmView.add(basicSwitch)
			scrollView.add(view6);
			
			var border2= Titanium.UI.createLabel({
			    text:' ',
			    height: 4,
				width: '100%',
			    backgroundColor	: '#000'
			});
			var view7 = Ti.UI.createView({
				height: 'auto'
			});
			
			view7.add(border2)
			
			scrollView.add(view7);
			
			var view3 = Ti.UI.createView({
				height: 'auto'
			});
			
			view3.add(alarmView)
			
			scrollView.add(view3);
	
			var border3 = Titanium.UI.createLabel({
			    text:' ',
			    height: 4,
				width: '100%',
			    backgroundColor	: '#000'
			});
			var view8 = Ti.UI.createView({
				height: 'auto'
			});
			
			view8.add(border3)
			
			scrollView.add(view8);
			
			var resept = Titanium.UI.createTextArea({
			    value: 'Resepten må fornyes ' + e.rowData.sluttdato,
			    editable: false,
			    color: '#fff',
			    font:{fontSize:15},
				width: '100%',
			    backgroundColor	: '#4d4d4d',
			    borderRadius: 6,
			    
			});
			
			var view4 = Ti.UI.createView({
				height: 'auto'
			});
			
			view4.add(resept)
			
			scrollView.add(view4);
		
			var border4 = Titanium.UI.createLabel({
			    text:' ',
			    height: 4,
				width: '100%',
			    backgroundColor	: '#000'
			   
			});
				var view9 = Ti.UI.createView({
				height: 'auto'
			});
			
			view9.add(border4)
			
			scrollView.add(view9);
		
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
			
			
			var view5 = Ti.UI.createView({
				height: 'auto'
			});
			
			view5.add(buttonGroupView)
			
			scrollView.add(view5);
			
			win.add(scrollView);
			
			Titanium.UI.currentTab.open(win)
		});
			
		return tv
};
