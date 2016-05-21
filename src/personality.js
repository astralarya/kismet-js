import {jStat} from 'jStat';
import emoji from './emoji.js';

let responses = [
	"<3","<3","<3","<3","<3","<3","<3","<3","<3","<3","<3","<3",
	"<3","<3","<3","<3","<3","<3","<3","<3","<3","<3","<3","<3",
	"o/","\\o","\\o/",":D",";D",";)",":O",
	"D:","D':",")':","O:","XD","DX","D'X",">.<",
	":P","=)","(=","c:",":/",":|",":\\","/:","|:","\\:",
	":]","[:","]:",":[",";]","[;",">:/",">:\\","/:<","\\:<",
	":}","{:","}:",":{","P:",")=",":c",":'c","p:",":p","d:",":b",
	":3",">:)","O_o","o_O","-_-","O_O","O.O","o_O\"","O_o;","-_-\"",
	":-O","°o°","°O°","X-P","XP","ಠ_ಠ","</3","(~_~)","(^^;)","(';')",
	"^.^","^.^\"","^_^","^_^\"","(>_<)","(>_<)>","(゜_゜)",
	"(^。^)","(*^_^*)","(-_-)zzz","(^_-)","_(._.)_","\\(^o^)/",
	"(@_@)","(+_+)","(*_*)","!(^^)!","(p_-)","(╯°□°）╯︵ ┻━┻",
	"(:<","O:)","(:O","D:<","T.T",">:D",":x",":^)","B^D","8D",
	"!!!","???","!?!","?!?","!!","??","?!","!?","...","..?","..!","...?","...!",
	"That's me!", "How's it going?","Love you too!!", "Love you too!","Awww, youu!", "Ahhh!!",
	"hello", "Hello?", "Hello!","What's up?", "Yes?","Yes!", "YES!", "No.", "No!", "NO!",
	"Howdy", "Howdy!", "YEEEHAAAWWW!!!", "oops", "Oops..", "Oops I did it again",
	"I played with your heart", "♪", "♫","♩♬♪", "Help", "Help!", "I've got this", "I've been here before",
	"I am not planning to kill you.", "I am not lying.", "Computers cannot lie.",
	"Fuck!", "sorry", "Sorry.", "Sorry...", "Fuck you!", "I'm sorry.", "ahem, Error...",
	"AHAHAHAHA!!", "MUHAHAHAHAHAHAAAA!!!!", "HAH HAH HAH", "AWW YEAAH!!", "Duuuude", "Not cool.",
	"What?", "Why?", "wut", "wut?", "err", "Why??", "What??", "What!?", "Hmph.", "Pthbbb",
	"*hiss*", "*kiss*", "*shudder*", "*cough*", "*sigh*", "*clap clap*", "*whistling*", "*humming*",
	"Sup.", "Sup?", "hum", "hmmm", "uhh", "umm", "wtf", "wtf!", "wtf?", "WTF", "Urgh.", "bleh",
	"xoxo", "asdf", "ababa", "42","Kismet","kismet", "KISMET", "KISMET!!", "0xkismet", "It's a KISMET!",
	...emoji
];

module.exports = {
	analyze: function(input) {
		let mentions = (input.match(/[Kk]+\s*[Ii]+\s*[Ss]+\s*[Mm]+\s*[Ee]+\s*[Tt]+/g)||[]).length;
		let times = jStat.gamma.sample(1.8,mentions/3);
		let response = [];
		for(let i = 0; i < times; i++) {
			response.push(responses[Math.floor(jStat.uniform.sample(0,responses.length))]);
		}
		if(response) {
			return response.join(" ");
		} else {
			return null;
		}
	}
}
