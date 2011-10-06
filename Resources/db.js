(function() {
	mymeds.db = {};

	//bootstrap database
	var db = Ti.Database.open('MyMeds3')
	db.execute('CREATE TABLE IF NOT EXISTS medisiner(id INTEGER PRIMARY KEY, name TEXT, info TEXT, sdate INTEGER, fdate INTEGER, klokkeslett INTEGER, mandag BOOLEAN, tirsdag BOOLEAN, onsdag BOOLEAN, torsdag BOOLEAN, fredag BOOLEAN, lordag BOOLEAN, sondag BOOLEAN)')
	db.close()

	mymeds.db.list = function() {
		var medisinListe = []
		var db = Ti.Database.open('MyMeds3')
		var result = db.execute('SELECT * FROM medisiner')
		while (result.isValidRow()) {
			medisinListe.push({
				//for tableView
				title: result.fieldByName('name'),
				hasChild:true,
				//for meg
				id: result.fieldByName('id'), //custom data attribute to pass to detail page
				name: result.fieldByName("name"),
				info: result.fieldByName('info'),
				klokke: result.fieldByName('klokkeslett'),
			});
			result.next();
		}
		result.close(); //make sure to close the result set
		db.close();

		return medisinListe;
	};

	mymeds.db.add = function(_name, _info, _sdate, _fdate, _klokkeslett, _mandag, _tirsdag, _onsdag, _torsdag, _fredag, _lordag, _sondag) {
		var db = Ti.Database.open('MyMeds3');
		db.execute('INSERT INTO medisiner(name,info,sdate,fdate,klokkeslett,mandag,tirsdag,onsdag,torsdag,fredag,lordag,sondag) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', _name, _info, _sdate, _fdate, _klokkeslett, _mandag, _tirsdag, _onsdag, _torsdag, _fredag, _lordag, _sondag)
		db.close();

		//Dispatch a message to let others know the database has been updated
		Ti.App.fireEvent("databaseUpdated");
	};

	mymeds.db.del = function(_id) {
		var db = Ti.Database.open('MyMeds3');
		db.execute("DELETE FROM medisiner WHERE id = ?",_id);
		db.close();

		//Dispatch a message to let others know the database has been updated
		Ti.App.fireEvent("databaseUpdated");
	};
	
	mymeds.db.delAll = function() {
		var db = Ti.Database.open('MyMeds3');
		db.execute("DELETE FROM medisiner");
		db.close();

		//Dispatch a message to let others know the database has been updated
		Ti.App.fireEvent("databaseUpdated");
	}	
})();