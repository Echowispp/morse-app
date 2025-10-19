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

function validateLatin(text) {
	const isStringValid = /^[a-zåäö!?/=:,._'()0-9\s]*$/i;
	console.log(isStringValid.test(text));
	return isStringValid.test(text);
}

function validateMorse(text) {
	const isMorseStringValid = /^[.\-\/\s]*$/;
	return isMorseStringValid.test(text);
}
function highlightInvalidChars(box, isLatin) {
	const text = box.textContent;
	const html = [];
	let invalidChars = [];
	for (let char of text) {
		if (isLatin) {
			if (!/[a-zåäö!?/=:,._'()0-9\s]/i.test(char)) {
				html.push(
					`<span style="background-color: #ff6b6b; color: #ffffff">${char}</span>`
				);
				invalidChars.push(char);
			} else {
				html.push(char);
			}
		} else if (!/[.\-\/\s]/.test(char)) {
			html.push(
				`<span style="background-color: #ff6b6b; color: #ffffff">${char}</span>`
			);
			invalidChars.push(char);
		} else {
			html.push(char);
		}
	}
	// return;
	box.innerHTML = html.join("");
	// box.innerHTML = "<h1>otsikko</h1><p>tekstiii</p>";
	return invalidChars;
}

morseBox.addEventListener("input", () => {
	// return;
	const morseText = morseBox.textContent.trim();
	console.log("morseBox addEventListener was called");

	if (!morseText) {
		latinBox.textContent = "";
		return;
	}

	const morseHighlightedChars = highlightInvalidChars(morseBox, false);

	// if (morseHighlightedChars.length > 0) {
	// 	latinBox.textContent =
	// 		"Invalid morse characters: " +
	// 		[...new Set(morseHighlightedChars)].join(", ");
	// }

	const latinTranslation = morseToLatin(morseText);

	if (latinTranslation.includes("null")) {
		latinBox.textContent = "Invalid morse sequence";
	} else {
		latinBox.textContent = latinTranslation || "";
	}
});

latinBox.addEventListener("input", () => {
	console.log("latin box edit");

	const latinText = latinBox.textContent.trim();

	if (!latinText) {
		morseBox.textContent = "";
		return;
	}

	const latinHighlightedChars = highlightInvalidChars(latinBox, true);

	if (latinHighlightedChars.length > 0) {
		morseBox.textContent =
			"Invalid Latin characters: " +
			[...new Set(latinHighlightedChars)].join(", ");
		return;
	}

	const morseTranslation = latinToMorse(latinText);
	morseBox.textContent = morseTranslation;
});

[morseBox, latinBox].forEach((box) => {
	box.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	});
});
