function KoalaParse(str){

	var slash =/#/;

	var twoStrings = str.split(slash);

	var messagePart = twoStrings[0];
	var ratingPart = parseInt(twoStrings[1]);

	if (ratingPart<1){
		ratingPart = 1;
	}
	 else if(ratingPart > 5){
		ratingPart = 5;
	}
	else if(isNaN(ratingPart)){
		ratingPart = 0;
	}
	var returnObj = {message: messagePart, rating: ratingPart};
	
	return returnObj;
	
}

module.exports = KoalaParse;
