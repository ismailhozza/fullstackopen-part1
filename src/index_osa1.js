import React from 'react';
import ReactDOM from 'react-dom';


const Header = () => <h1>Anna palautetta</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({label, value, children}) => <tr><td>{label}</td><td>{value} {children}</td></tr>

const Statistics = ({hyva, neutraali, huono, keskiarvo, positiivisia}) => {
    if(hyva+neutraali+huono===0) {
        return (
            <div>
                <br/>
                <em>ei yhtään palautetta annettu</em>
            </div>
        )
    }
    return (
        <div>
            <h1>statistiikka</h1>

            <table>
                <tbody>
                    <Statistic label="hyvä" value={hyva}/>
                    <Statistic label="neutraali" value={neutraali}/>
                    <Statistic label="huono" value={huono}/>
                    <Statistic label="keskiarvo" value={keskiarvo}/>
                    <Statistic label="positiivisia" value={positiivisia}>%</Statistic>
                </tbody>
            </table>
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    hyva = () => {
        this.setState({ hyva: this.state.hyva + 1 })
    }

    neutraali = () => {
        this.setState({ neutraali: this.state.neutraali + 1 })
    }

    huono = () => {
        this.setState({ huono: this.state.huono + 1 })
    }

    asetaPalaute = (kentta) => {
        return () => {
            let state = {};
            state[kentta] = this.state[kentta] + 1;
            this.setState(state)
        }
    }

    positiivisia = () => {
        let val = this.state.hyva/(
            this.state.hyva
            +this.state.neutraali
            +this.state.huono);
        val = val || 0;
        return Math.round(val * 10000) / 100;
    }

    keskiarvo = () => {
        let val = (this.state.hyva-this.state.huono)/(
            this.state.hyva
            +this.state.neutraali
            +this.state.huono);
        val = val || 0;
        return Math.round(val * 10) / 10;
    }

    render() {
        return (
            <div>
                <Header />
                <Button handleClick={this.asetaPalaute('hyva')} text="hyvä"/>
                <Button handleClick={this.asetaPalaute('neutraali')} text="neutraali"/>
                <Button handleClick={this.asetaPalaute('huono')} text="huono"/>
                <Statistics
                    hyva={this.state.hyva}
                    neutraali={this.state.neutraali}
                    huono={this.state.huono}
                    keskiarvo={this.keskiarvo()}
                    positiivisia={this.positiivisia()}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
