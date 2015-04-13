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
	var returnObj = {message: messagePart, rating: ratingPart};
	console.log(returnObj.message);
	console.log(returnObj.rating);
	console.log(returnObj);
	return returnObj;
	
}


module.exports = KoalaParse;