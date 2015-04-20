function main(status){
	console.log(status);
	if(status==="active"){
		return "I'll record that for you";
	}
	else {
		return "Nice to meet you"
	}
}

module.exports = main;