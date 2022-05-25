const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const message = document.getElementById("message");
const output = document.getElementById("result");
const image1 = document.getElementById("image1");

startRecognition = () => {
    if (SpeechRecognition !== undefined) { // test if speechrecognitio is supported
        let recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; // which language is used?
        recognition.interimResults = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
        recognition.continuous = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous

        recognition.onstart = () => {
            message.innerHTML = `Starting listening, speak in the microphone please<br>Say "help me" for help`;
            output.classList.add("hide"); // hide the output
        };

        recognition.onspeechend = () => {
            message.innerHTML = `I stopped listening `;
            recognition.stop();
        };

        recognition.onresult = (result) => {
            let transcript = result.results[0][0].transcript;
            let confidenceTranscript = Math.floor(result.results[0][0].confidence * 100); // calc. 'confidence'
            output.classList.remove("hide"); // show the output
            output.innerHTML = `I'm ${confidenceTranscript}% certain you just said: <b>${transcript}</b>`;
            actionSpeech(transcript);
        };

        recognition.start();
    } else { // speechrecognition is not supported
        message.innerHTML = "sorry speech to text is not supported in this browser";
    }
};

// process speech results
actionSpeech = (speechText) => {
    speechText = speechText.toLowerCase().trim(); // trim spaces + to lower case
    console.log(speechText); // debug 
    switch (speechText) {
        // switch evaluates using stric comparison, ===
        case "dark":
            document.body.style.background = "#424242";
            document.body.style.color = "white";
            document.getElementById("button").style.background = "#0686d6";
            break;
        case "light":
            document.getElementById("button").style.background = "#0686d6";
            document.body.style.background = "white";
            document.body.style.color = "black";
            image1.classList.add("hide"); // hide image (if any)
            break;
        case "easter egg":
            document.getElementById("button").style.background = "#ff35e1";
            image1.classList.add("hide"); // hide image (if any)
            headerimg.src = "https://cdn.discordapp.com/attachments/951115661034274836/978939274235879444/20220525_103506.jpg";

            break;
        case "image": // let op, "fall-through"
            image1.src = "https://cdn.discordapp.com/attachments/951115661034274836/978932130472132608/20220525_100644.jpg";
            image1.style.width = "400px";
            image1.classList.remove("hide") // show image
            break;
        case "teacher":
            window.open("https://www.linkedin.com/in/jrijsdijk/", "_self");
            break;
        case "help me": // let op, "fall-through"
            help_list.classList.remove("hide") // show image
            break;
        default:
            // do nothing yet
    }
}