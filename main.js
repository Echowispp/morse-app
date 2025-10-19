const morseDictionary = {
	A: ".-",
	B: "-...",
	C: "-.-.",
	D: "-..",
	E: ".",
	F: "..-.",
	G: "--.",
	H: "....",
	I: "..",
	J: ".---",
	K: "-.-",
	L: ".-..",
	M: "--",
	N: "-.",
	O: "---",
	P: ".--.",
	Q: "--.-",
	R: ".-.",
	S: "...",
	T: "-",
	U: "..-",
	V: "...-",
	W: ".--",
	X: "-..-",
	Y: "-.--",
	Z: "--..",
	Å: ".--.-",
	Ä: ".-.-",
	Ö: "---.",
	"!": "..--.",
	"?": "..--..",
	"/": "-..-.",
	"=": "-...-",
	":": "---...",
	",": "--..--",
	".": ".-.-.-",
	_: "-....-",
	"'": ".----.",
	"(": "-.--.",
	")": "-.--.-",
	1: ".----",
	2: "..---",
	3: "...--",
	4: "....-",
	5: ".....",
	6: "-....",
	7: "--...",
	8: "---..",
	9: "----.",
	0: "-----",
};

const reverseMorse = Object.fromEntries(
	Object.entries(morseDictionary).map(([char, morse]) => [
		morse,
		char.toLowerCase(),
	])
);

const morseBox = document.getElementById("morseBox");
const latinBox = document.getElementById("latinBox");

function latinToMorse(text) {
	return text
		.toUpperCase()
		.split(" ")
		.map((word) =>
			word
				.split("")
				.map((char) => morseDictionary[char] || null)
				.join(" ")
		)
		.join(" / ");
}

function morseToLatin(morse) {
	return morse
		.split(" / ")
		.map((word) =>
			word
				.split(" ")
				.map((code) => reverseMorse[code] || null)
				.join("")
		)
		.join(" ");
}

function checkInvalidChars(box, isLatin) {
	const text = box.textContent;
	let invalidChars = [];

	for (let char of text) {
		if (isLatin) {
			if (!/[a-zåäö!?/=:,._'()0-9\s]/i.test(char)) {
				invalidChars.push(char);
			}
		} else if (!/[.\-\/\s]/.test(char)) {
			invalidChars.push(char);
		}
	}

	return invalidChars;
}
morseBox.addEventListener("input", () => {
	const morseText = morseBox.textContent.trim();
	if (!morseText) {
		latinBox.textContent = "";
		return;
	}

	const morseInvalidChars = checkInvalidChars(morseBox, false);

	if (morseInvalidChars.length > 0) {
		latinBox.textContent =
			"Invalid morse characters: " + [...new Set(morseInvalidChars)].join(", ");
		return;
	}

	const latinTranslation = morseToLatin(morseText);
	if (latinTranslation.includes("null")) {
		latinBox.textContent = "Invalid morse sequence";
	} else {
		latinBox.textContent = latinTranslation || "";
	}
});

latinBox.addEventListener("input", () => {
	const latinText = latinBox.textContent.trim();
	if (!latinText) {
		morseBox.textContent = "";
		return;
	}

	const latinInvalidChars = checkInvalidChars(latinBox, true);

	if (latinInvalidChars.length > 0) {
		morseBox.textContent =
			"Invalid Latin characters: " + [...new Set(latinInvalidChars)].join(", ");
		return;
	}

	const morseTranslation = latinToMorse(latinText);
	morseBox.textContent = morseTranslation;
});
