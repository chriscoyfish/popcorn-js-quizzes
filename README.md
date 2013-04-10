popcorn-js-quizzes
==================
This is a plugin for Popcorn.js which adds dynamic quiz functionality. For instance, to add a basic 2 second long quiz:

	var popcorn = Popcorn('#video');
	popcorn.popquiz({
	 start: 10,
	 limit: 2000,
	 target: "note",
	 question: "What type of move is this?",
	 choices: ["Live action", "Animated"],
	 text: "Common, this should be easy....",
	 answer: 1
	});
