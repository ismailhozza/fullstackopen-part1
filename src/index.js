import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: 0
    }
    this.votes = new Map();
  }

  vote = () => {
    let votes = this.votes.get(this.state.selected);
    votes = votes || 0;
    votes = votes + 1;
    this.votes.set(this.state.selected, votes);
    this.setState({ votes: votes })
  }

  next = () => {
    const total = this.props.anecdotes.length;
    const newSelection = Math.floor(total*Math.random());
    let votes = this.votes.get(newSelection);
    votes = votes || 0;
    this.setState({ selected: newSelection, votes: votes })
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <p>has {this.state.votes} votes</p>
        <button onClick={this.vote}>vote</button>
        <button onClick={this.next}>next anecdote</button>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)