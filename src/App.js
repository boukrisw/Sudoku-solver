import React, { Component } from 'react';
import './App.css';
import linkedin from './linkedin.png'

import Gride from './service.js'

import getRandomConfig from './generator.js'
class App extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      value: 0,
      dim : 9,
      gride:[[3, 0, 6, 5, 0, 8, 4, 0, 0],[5, 2, 0, 0, 0, 0, 0, 0, 0],[0, 8, 7, 0, 0, 0, 0, 3, 1],[0, 0, 3, 0, 1, 0, 0, 8, 0],[9, 0, 0, 8, 6, 3, 0, 0, 5],[0, 5, 0, 0, 9, 0, 6, 0, 0],[1, 3, 0, 0, 0, 0, 2, 5, 0],[0, 0, 0, 0, 0, 0, 0, 7, 4],[0, 0, 5, 2, 0, 6, 3, 0, 0]] 
    }
  }

  async generate(){
    let table = await getRandomConfig();
    this.setState({
      dim: parseInt(table.size),
      gride: this.toTable(table.size,table.squares),
      value:0
    })
  }

  toTable(s , t){
    this.tabInit = []
    let res = [];
    for( let i=0; i<s;i++){
      let line = [];
      for( let j=0; j<s;j++){
        line.push(0);
      } 
      res.push(line);
    }
    for( let i=0; i<t.length;i++){
        this.tabInit.push(t[i])
        let val = t[i];
        res[val.x][val.y] = val.value
    }
    return res
  }
  solver(){
    this.solve(0,0)
  }

  canPlay(i, j,val) {
    for( let x=0; x<this.state.dim;x++){
      if(this.state.gride[x][j] === val) return false;
    }
    
    for( let y=0; y<this.state.dim;y++){
      if(this.state.gride[i][y] ===val) return false;
    }

    let debutX = i-(i % Math.sqrt(this.state.dim))

    let debutY = j-(j % Math.sqrt(this.state.dim))

    for( let x=0; x<Math.sqrt(this.state.dim);x++){
      for( let y=0; y<Math.sqrt(this.state.dim);y++){
        if(this.state.gride[(debutX+x)][(debutY+y)] === val) return false;
      }
    }
    return true;
  }

  solve(i,j){
    if(i*this.state.dim + j >= this.state.dim*this.state.dim){
      return true;
    }
      
    if(this.state.gride[i][j] !== 0){
      if(j=== this.state.dim-1){
        return this.solve(i+1,0);
      }else{
        return this.solve(i,j+1);
      }
    }
      
    for(var val = 1; val <= this.state.dim; val++){
      if(this.canPlay(i,j,val)){
        let tab = this.state.gride
        tab[i][j] = val;
        this.setState({
          gride: tab
        })
        if(j=== this.state.dim-1){
          if(this.solve(i+1,0)){
            return true;
          }
        }else{
          if(this.solve(i,j+1)){
            return true;
          }
        }
      }
    }
    let tab = this.state.gride
    tab[i][j] = 0;
    this.setState({
      gride: tab
    })    
    return false;
  }
  
  onchangeValue(e){
    e.preventDefault()

    let i;
    if(e.target.value === 'remove'){
      i = 0
    }else{
      i = parseInt(e.target.value)
    }
    this.setState({
      value: i
    })
  }

  choices(){
    return (<select value={this.state.value} onChange={(event) => this.onchangeValue(event)}>
              <option>remove</option>
               {this.state.gride.map( (elt ,i )=> {return <option key={i+1}>{i+1}</option>})}
            </select>)
  }


  

  onchangeDim(e){
    e.preventDefault()
    let tab;
    let d = e.target.value;
    if(parseInt(d)===4){
      tab= [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    }else {
      tab= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
    }
    this.setState({
      dim: parseInt(d),
      gride: tab,
      value:0
    })
  }


  play(i,j){

  
    let tab = this.state.gride 
    tab[i][j] = this.state.value
    this.setState({
      gride: tab
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="toolbar" role="banner">
            Suduko Solver
            <div className="spacer"></div>
            Dimension
            <select value={this.state.dim} onChange={(event) => this.onchangeDim(event)}> 
              <option>9</option>
              <option>4</option>
            </select>
            <div className="spacer"></div>

            <button onClick={this.generate.bind(this)}>Generate a grid</button>
            <div className="spacer"></div>
            <button onClick={this.solver.bind(this)}>Solve</button>
            <div className="spacer"></div>
            <a href="https://www.linkedin.com/in/walid-boukris-179771157/">
              <img width='40' src={linkedin} alt='Linkedin' title='linkedin'/>
            </a>
          </div>
          <div>
              Select an integer or remove if you want to delete a number
              {this.choices()}
          </div>
          <Gride play={this.play.bind(this)} value={this.state.value} dim={this.state.dim} gride={this.state.gride}/>
        </header>
      </div>
    );
  }
}

export default App;