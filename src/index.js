import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";


class Square extends React.Component{
    render(){
        return(
            <Button variant="contained" style={{ fontSize: '63px', "minHeight": "200px", "minWidth": "200px", "color":"#F5E8C7", "backgroundColor": "#9E7777", }} onClick={this.props.onClick}>{this.props.value}</Button>
        );
    }
}

class Board extends React.Component{

    constructor(props){
        super(props)
        this.state={
            squares: Array(9).fill(null),
            turno: false,
            allMoves: Array(0).fill(null),
            won: false,
            text: "It's player X's turn",

        }
    }

    handleClick(i){
        if(this.state.squares[i] === null && this.state.won === false) {
            const squares2 = this.state.squares.slice();
            squares2[i] = this.state.turno ? 'O' : 'X';
            this.setState({
                squares: squares2,
                text: "It's player " + (this.state.turno ? 'X' : 'O') + "'s turn",
                turno: !this.state.turno,
            })

            this.state.allMoves.push(squares2)
            this.victory(squares2)
        }


    }

    renderSquare(i){
        return(
            <Square value={this.state.squares[i]} onClick={ ()=>this.handleClick(i) }/>
        );
    }

    handleRestartButton(){
        const squares2 = new Array(9).fill(null);
        this.setState({squares: squares2, turno: false, won: false})
        const allMoves2 = new Array(0);
        this.setState({allMoves: allMoves2,})
    }

    handleHistoryButton(i){
        this.setState({squares: this.state.allMoves[i], turno: (i % 2) === 0, won: false, })
        const allMoves2 = this.state.allMoves;
        allMoves2.length = i + 1;
        this.setState({allMoves: allMoves2,})
    }

    victory(squares2){

        const condition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

        for(var index = 0; index < condition.length; index++){
            if( (squares2[condition[index][0]] != null) &&(squares2[condition[index][0]] === squares2[condition[index][1]]) && (squares2[condition[index][1]] === squares2[condition[index][2]])){
                this.setState({won: true, text: "Player " + (this.state.turno ? 'O' : 'X') + " has won"})
            }
        }
    }

    historyButtons(){

        return this.state.allMoves.map((number, index) => {

            return (
                    <div key={"div" + index}>
                        <Button className="boton" key={"button" + index} variant="contained" style={{"color":"#F5E8C7", "backgroundColor": "#9E7777", }} onClick={() => this.handleHistoryButton(index)}>
                            {"Turn " + (index+1)}
                        </Button>
                    </div>
            );

        })

    }


    render(){

        return(
            <div style={{ "display":"flex", "flexDirection": "column", "gap": "25px"}}>
                <div className={"bigText"}>
                    {this.state.text}
                </div>
                <div className="board">
                    <div className={"fila"}>
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className={"fila"}>
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className={"fila"}>
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
                <div className={"history"}>
                        <Button className="boton" variant="contained" style={{"color":"#F5E8C7", "backgroundColor": "#9E7777", }} onClick={()=>this.handleRestartButton()}> Restart </Button>
                        {this.historyButtons()}
                </div>
            </div>

        );
    }
}

class Game extends React.Component{
    render() {
        return(
            <div className="main" >
                <Container styles={{display: "flex", flexDirection: "column", height: "100vh"}}>
                    <Board/>
                </Container>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
  document.getElementById('root')
);
