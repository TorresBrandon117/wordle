export default function Col({wordToGuess, word, index }) {
const char = word.charAt(index);

let className = "col";

if (wordToGuess != null) {
    if (wordToGuess.charAt(index) === char){
        className += " correct";
    }
    else if (wordToGuess.includes(char)){
        className += " present";
    }
    else {
        className += " not-found";
    }

}
    return <div className="col">{char}</div>;
}