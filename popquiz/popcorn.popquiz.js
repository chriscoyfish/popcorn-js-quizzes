// PLUGIN: Footnote/Text

(function ( Popcorn ) {

  /**
* Popquiz popcorn plug-in
* Provides dynamic quizzes  (synced to video) to be added to the page.
* Options parameter will need:
* - question is the text of the question
* - start is the time that you want to start showing video
* - limit is time limit for asnwering the question
* - answer is index of correct choice
* - choices is the list of answer choices available
* - target is the id of the document element that the quiz will be shown in,
*   this target element must exist on the DOM
*
* @param {Object} options
*
* Example:
* var p = Popcorn('#video')
* .footnote({
* start: 5, // seconds
* limit: 15, // seconds
* question: 'What did video show?',
* choices: ['Nothing', 'Cool stuff!'],
* answer: 1, // index
* target: 'quizdiv'
* });
*
* Authors:
* Adarsh Uppula
* Aaron Bazzone
*
**/

var newAnswer = "";
var idIterator = "0"
var docId = function(theId) {
    return document.getElementById(theId);        
}

var resizeQuizPanel = function() {
   var video = docId('video');
   var vidHeight = video.offsetHeight - 4;
   var vidWidth = video.offsetWidth;
   var vidPane = docId('quizPanel');
   vidPane.style.height = vidHeight + "px";
   vidPane.style.width = vidWidth + "px";

    var vidPaneWid = vidPane.offsetWidth;
    docId('quizMain').style.width = vidWidth +vidPaneWid  + "px";
    
}        

var setQuestion= function (question) {
	docId('question').innerHTML = question;
}

var checkAnswer=function(t, chosen, options) {
	if (true) {
		setTimeout(function(){t.play(); docId('quizPanel').style.display="none"; options._container.style.display = "none"}, 2000);
	}
}

var addAnswer= function (answer) {
    idIterator ++;
    var newOption = document.createElement('div');
     var radio = document.createElement('input');
     radio.id = "answer_" + idIterator;
	 radio.name = idIterator;
     radio.type = 'radio';
	 ig = function(i) { return i;}(idIterator)
	 radio.onclick = function() { alert(ig)};
     
     var label = document.createElement('span');    
     label.id = "label_" + idIterator;
     label.innerHTML = answer;
     
     newOption.appendChild(label);
     newOption.insertBefore(radio, label);
     docId('answers').appendChild(newOption);
    
}

  Popcorn.plugin( "popquiz", {

    manifest: {
      about: {
        name: "Popcorn Popquiz Plugin",
        version: "0.1",
        author: "@auppula",
        website: "example.com"
      },
      options: {
        start: {
          elem: "input",
          type: "number",
          label: "Start"
        },
        limit: {
          elem: "input",
          type: "number",
          label: "Limit"
        },
		answer: {
          elem: "input",
          type: "number",
          label: "Answer"
        },
        question: {
          elem: "input",
          type: "text",
          label: "Question"
        },
		choices: {
          elem: "input",
          type: "array",
          label: "Choices"
        },
        target: "quiz-container"
      }
    },

    _setup: function( options ) {
	  //controls(true);
	 resizeQuizPanel();
	
      var target = Popcorn.dom.find( options.target );

      options._container = document.createElement( "div" );
      options._container.style.display = "none";
      target.appendChild( options._container );
    },

    /**
* @member footnote
* The start function will be executed when the currentTime
* of the video reaches the start time provided by the
* options variable
*/
    start: function( event, options ){
	  
	  this.pause();

	  if (options.text) {
		  options._container.innerHTML = options.text;
		  options._container.style.display = "inline";
	  }
	 
	 var t = this;
	 
	 //show qa
	 if (options.question) {
		  docId('answers').innerHTML="";
		  idIterator = 0;
		  docId('quizPanel').style.display="inline-block";
		  docId('quizSubmit').onclick = function() {checkAnswer(t, 1, options)};
		  setQuestion(options.question);
		  for (var i = 0; i < options.choices.length; i++) {
				addAnswer(options.choices[i]);
		  } 
	  }
	  
	  if (options.limit != 0) {
		setTimeout(function(){t.play(); docId('quizPanel').style.display="none"; options._container.style.display = "none"}, options.limit);
	  }
    },
	
	showQuestions: function( options ){
	  options._container.innerHTML = options.question;
      options._container.style.display = "inline";
    },

    /**
* @member footnote
* The end function will be executed when the currentTime
* of the video reaches the end time provided by the
* options variable
*/
    end: function( event, options ){
      //
    },

    _teardown: function( options ) {
      var target = Popcorn.dom.find( options.target );
      if ( target ) {
        target.removeChild( options._container );
      }
    }

  });
})( Popcorn );