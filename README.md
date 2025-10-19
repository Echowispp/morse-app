# Morse translator

This is a simple program that translates morse code to "normal" characters - so dots and dashes into letters, numbers and punctuation. I feel I should also mention I made this for

**Link**: https://morse-app-sand.vercel.app/

# A summary of how this was made:

First, I thought to make a good-looking UI and that took... a while.
After I had a functional UI, I set on to get some basic functionality in. First I added a 'dictionary' for the code to use to translate morse. So, if there's any mistakes in the translation, you can blame a typo there.
With the library complete, I set on to finish a way for the boxes to sync, when that was done I put in the rest of the code in commit #3 or #4, depending on whether you count the initial commit. Then, turns out, the system to highlight unsupported characters was really hard to fix and I couldn't do much of anything to fix it. Then, I decided to just leave it be and drop the highlights; currently the page only shows which kind of characters are not translatable but not where they are, unfortunately. And that's pretty much where this project's at right now.
