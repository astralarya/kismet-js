module.exports = {
	analyze: function(input) {
		var mentions = (input.match(/[Kk]+\s*[Ii]+\s*[Ss]+\s*[Mm]+\s*[Ee]+\s*[Tt]+/g)||[]).length;
		if(mentions) {
			return "KISMET!";
		} else {
			return null;
		}
	}
}
