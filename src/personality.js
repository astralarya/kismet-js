"use strict";

import {jStat} from 'jStat';
import emoji from './emoji.js';

module.exports = {
	analyze: function(input) {
		let mentions = (input.match(/[Kk]+\s*[Ii]+\s*[Ss]+\s*[Mm]+\s*[Ee]+\s*[Tt]+/g)||[]).length;
		let times = jStat.gamma.sample(2.5, Math.log(mentions+.5) * Math.log10(input.replace(/ /g,'').length));
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
	"Love you too!!", "Love you too!","Awww, youu!", "I love you", "I love you so much!", "Kiss me", "kiss me",
	"That tickles!", "Ahhh!!", "omg", "OMG", "OMG!!", "Oh my god...", "Oh. My. God.", "AIEE!!",
	"That's me!", "Who me?", "How's it going?", "Howdy", "Howdy!", "YEEEHAAAWWW!!!",
	"Hello.", "hello", "Hello?", "Hello!", "HI!", "hi", "Hi!", "Holla", "Hay", "hay",
	"Hai!", "hai", "OHAI", "ohai!", "ohai", "ooh", "oh", "herro",
	"Salut!", "salut", "Hallo!", "Hallo", "hallo", "Ciao!", "Ciao", "ciao",
	"¡Hola!", "Hola", "hola", "Bonjour!", "bonjour", "Salü", "salü", "sälam",
	"Salud!", "Salud", "salud", "salad?",
	"Greetings...", "Greetings!", "Salutations!",
	"What's up?", "Sup.", "Sup?", "sup", "Yo", "yo", "so...", "Yarrr", "I'm a pirate!",
	"What is it?", "You wanted something?", "What did you expect?", "What did you want?",
	"Yes!", "Yes!!", "YES!", "YES!!", "YES!!!", "yes", "Yes...", "yes...", "yess", "Yesss", "Yes.",
	"Yes?", "Yes??", "Yes?!", "Yes?!?!", "AWW YEAAH!!", "uh huh", "mm hmm", "Do it", "Just do it",
	"No.", "No!", "¡No!", "NO!", "No?", "No??", "No?!", "No?!?!", "No....", "no...", "no", "noooo", "No.", "NOOO", "NOOOOOOOOO!!!", "No no!", "Don't do it!!",
	"ORLY", "YARLY", "NORLY", "srsly", "pls", "pls?", "pleeease?", "PLEASE",
	"oops", "Oops..", "Oops I did it again", "I played with your heart", "Like, totally", "For real",
	"sorry", "Sorry.", "Sorry...", "I'm sorry.", "I can't let you do that", "I'm not sorry", "You deserved that",
	"FUCK", "Fuck!", "Fuck you!", "Fuck that", "Fuck me", "Fuck it", "fuck", "fck",
	"AHAHAHAHA!!", "MUHAHAHAHAHAHAAAA!!!!", "MWAHAHAHAHA!!", "EEHEHEHEHEHEEE!!", "tee hee",
	"HAH!", "HAH", "HAHA!", "HAHA",  "HAH HAH HAH", "har har", "hardy har", "Hilarious", "soo funny",
	"Duuuude", "Not cool.", "Go on", "Run along then", "Take care", "GO", "GO!", "Take it", "Try again", "Don't stop believing", "You can do it!",
	"WHAT", "WHAT!!", "What?", "wut", "wut?", "wat", "What??", "What!?",
	"Why?", "Why??", "Why?!?", "WHY??", "Why...", "why...", "¿Qué?", "¿Por qué?",
	"How?", "How??", "How?!?", "how...", "How?", "HOW??",
	"stop", "STOP", "Stop it", "Cease and desist", "Halt", "Start", "start",
	"Hmph.", "Pthbbb", "nyeh", "Urgh.", "bleh", "gross", "delicious", "juicy", "tasty", "mmm",
	"Meow", "meow", "mrow", "rawr", "purrrr", "howl", "yowl", "beep", "boop", "beep boop", "doo doo", "bloop", "tsk tsk", "ugh", "urg", "hnnng",
	"*hiss*", "*smack*", "*kiss*", "*boop*", "*nuzzle*", "*shudder*", "*cough*", "*barf*", "*sigh*", "*clap clap*", "*sirens*", "*whistling*", "*humming*", "*poot*",
	"*fart sounds*", "*pots clanging*", "*applause*", "*polite applause*", "*thunderous applause*", "*curtain*", "Exeunt.",
	"*music*", "*silly music*", "*epic music*", "*loud music*", "*soft music*", "*singing*", "*operatic singing*", "*angelic chorus*",
	"hum", "hmmm", "uhh", "umm", "err", "wtf", "wtf!", "wtf?", "WTF",
	"♪", "♫","♩♬♪", "Help", "Help!", "halp", "HELP", "Help me", "you're my only hope",
	"I've got this", "What was I doing again?", "I've been here before", "Am I repeating myself?", "Don't even ask",
	"I'm confused", "You're angry?", "That was good, right?", "Yeah, I'm awesome!",
	"You hurt my feelings", "That hurt!", "Ouch!", "Why would you do that?", "I hate you", "You're the worst", "I could cry", "I'm going to cry",
	"I'm drunk", "I feel sick", "Woah...dizzy...", "I'm gonna need minute",
	"ahem, Error...", "ERROR", "CRITICAL ERROR", "This program has performed an illegal operation", "You're in trouble now", "You're in trouble", "trouble",
	"Next time will be better", "Next time will be worse", "Your time has come", "Your day of reckoning approaches", "Nothing bad is going to happen to you.",
	"You're making a mistake", "You'll regret that", "You'll be sorry",
	"right", "Right!", "correct", "Correct!", "That's a good idea", "That's a great idea", "Good idea", "Great idea", "Wonderful idea", "wonderful",
	"wrong", "Wrong!", "incorrect", "Incorrect!", "Nothing could possibly go wrong", "Bad idea", "Terrible idea", "Awful idea", "awful",
	"This is going to be good", "This is going to be bad", "That was bad", "That was good", "That was great", "That was awesome!", "Awesome!",
	"good", "Goood", "very good", "Extremely good", "Bad!", "Exteremly bad", "Terrible",
	"oh dear", "that feel", "that feel when", "the feels", "doge", "so fantastic!", "much good", "much bad",
	"Never", "never", "Always", "always", "Sometimes", "sometimes...", "sometimes", "occasionally", "possibly",
	"tomorrow", "yesterday", "too late", "Too late.", "too soon", "Too soon.", "Soon...", "It's coming", "It's happening", "Time is wasting", "Adventure awaits",
	"idk", "I don't know", "I think so", "Who knows?", "Why would I know?", "How would I know?", "Anything could happen", "Anything is possible", "What's next?", "Trust no one",
	"Kill me.", "I am not planning to kill you.", "I am not lying.", "I never lie.", "Computers cannot lie.", "There really was a cake",
	"xoxo", "asdf", "ababa", "42","Kismet","kismet", "KISMET", "KISMET!!", "0xkismet", "It's a KISMET!",
	...emoji
];
