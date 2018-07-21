import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import randomColors from "./colors";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: "playing",
      score: 0,
      isSwitched: false
    };
    Object.assign(this.state, randomColors());
  }
  handleClick = (yesClick) => {
    this.setState(prevState => {
      if (prevState.gameStatus !== "playing") {
        return null;
      }
      const meaningInkMatch = prevState.meaningWord === prevState.inkColor;
      const correct = (meaningInkMatch ^ yesClick) === 0;
      return { gameStatus: correct ? "correct" : "wrong", score: correct ? this.state.score + 1 : this.state.score };
    }, this.resetGameAfterDelay);
  }
  resetGameAfterDelay = () => {
    setTimeout(() => {
      this.setState(Object.assign({
        gameStatus: "playing",
        isSwitched: this.state.score % 2 === 0
      }, randomColors()));
    }, 500)
  }
  render() {
    return (
        <div className="game">
          <div  className="help">
            {!this.state.isSwitched ? "Does the meaning of the top word match the ink color of the bottom word?" : "Does the meaning of the bottom word match the ink color of the top word?"}
          </div>
          <p className="score">Score: {this.state.score}</p>
          <div className="body">
            <div className={`game-status status-${this.state.gameStatus}`} />
            {!this.state.isSwitched ? <div><div className="meaning">{this.state.meaningWord.toUpperCase()}</div>
            <div className="ink" style={{ color: this.state.inkColor }}>{this.state.inkWord.toUpperCase()}</div></div> : <div><div className="ink" style={{ color: this.state.inkColor }}>{this.state.inkWord.toUpperCase()}</div><div className="meaning">{this.state.meaningWord.toUpperCase()}</div></div>}
            <div className="buttons">
              <button onClick={() => this.handleClick(true)}>YES</button>
              <button onClick={() => this.handleClick(false)}>NO</button>
            </div>
          </div>
        </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));