function dato (e) {
	
	var datoer = ''
	
	if (e.mandag == true){
		datoer = 'mandag'
	}
	
	if (e.tirsdag == true){
		if(datoer.length > 0){
			datoer = datoer + ', tirsdag'
		}
		else{
			datoer = 'tirsdag'
		}
	}
	
	if (e.onsdag == true){
		if(datoer.length > 0){
			datoer = datoer + ', onsdag'
		}
		else{
			datoer = 'onsdag'
		}
	}
	
	if (e.torsdag == true){
		if(datoer.length > 0){
			datoer = datoer + ', torsdag'
		}
		else{
			datoer = 'torsdag'
		}
	}
	
	if (e.fredag == true){
		if(datoer.length > 0){
			datoer = datoer + ', fredag'
		}
		else{
			datoer = 'fredag'
		}
	}
	
	if (e.lordag == true){
		if(datoer.length > 0){
			datoer = datoer + ', lørdag'
		}
		else{
			datoer = 'lørdag'
		}
	}
	
	if (e.sondag == true){
		if(datoer.length > 0){
			datoer = datoer + ', søndag'
		}
		else{
			datoer = 'søndag'
		}
	}
	
	return datoer
};
