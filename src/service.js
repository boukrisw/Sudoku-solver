import React, { Component } from 'react';
import './App.css';


class Gride extends Component{
  
  constructor(props){
    super(props)
    this.state = {
    }
  }


  canPlay(i, j) {
    for( let x=0; x<this.props.dim;x++){
      if(this.props.gride[x][j] === this.props.value) return false;
    }
    
    for( let y=0; y<this.props.dim;y++){
      if(this.props.gride[i][y] === this.props.value) return false;
    }

    let debutX = i-(i % Math.sqrt(this.props.dim))

    let debutY = j-(j % Math.sqrt(this.props.dim))

    for( let x=0; x<Math.sqrt(this.props.dim);x++){
      for( let y=0; y<Math.sqrt(this.props.dim);y++){
        if(this.props.gride[(debutX+x)][(debutY+y)] === this.props.value) return false;
      }
    }
    return true;
  }

    
    fuck(i,j){
        this.props.play(i,j)
    } 

  PrintCase(c,i,j){
      if(c!==0){
          return <td key={j} onClick={this.fuck.bind(this,i,j)}><div>{c}</div></td>
      }else{
        return <td key={j} onClick={this.fuck.bind(this,i,j)} className={this.canPlay(i,j)? 'playable':''}></td>
      }
 }

  PrintGrid(){

    
    return <table className={this.props.dim===9 ? 's9' : 's4'}>
                <tbody>
                    { this.props.gride.map( (line,i)=> {  
                        return <tr key={i}>{line.map( (c,j)=> { return this.PrintCase(c,i,j)})}</tr>
                    })}        
                </tbody>        
           </table> 
  }

  render() {
    return (
        <div>
            {this.PrintGrid()}
        </div>
    );
  }
}

export default Gride;