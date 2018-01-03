import React, { Component } from 'react';
import './App.css';

import Util from './util/utils';
import PlacingStone from './component/PlacingStone';
import StoneFactory from './util/StoneFactory';

import { E, B, W } from './constants/stones';
import { BOARD_SIZE } from './constants/board';

// import unirest from 'unirest';
import axios from 'axios';

const m = [
  [E, E, E, E, E, E, E, E, E,],
  [E, E, E, E, E, E, E, E, E,],
  [E, E, E, E, E, B, E, E, E,],

  [E, E, E, W, W, B, E, E, E,],
  [E, E, E, W, B, B, E, E, E,],
  [E, E, E, W, E, E, E, E, E,],

  [E, E, E, E, E, E, E, E, E,],
  [E, E, E, E, E, E, E, E, E,],
  [E, E, E, E, E, E, E, E, E,],
];

class Go extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      i: 0,
      j: 0,
      t: 0,
      m: m,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  render() {

    const stones = [];
    let t = 100;
    const board = document.getElementById("go-board");
    if (board !== null) {
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (m[i][j] !== E) {
            t++;
            const color = m[i][j];
            stones.push(StoneFactory.getStone(i, j, t, color));
          }
        }
      }
    }

    const h = window.innerHeight;
    const boardStyle = {
      height: h,
      widht: h,
    };

    return (
      <div>
        { stones }
        <img id="go-board" src="img/go-board-9-9.png"
          style={boardStyle}
          onMouseMove={this.handleHover} 
          
        />
        <PlacingStone 
          {...this.state}
          handleClick={this.handleClick}
        />
      </div>
    );
  }

  handleHover(e) {

    const x = e.pageX;
    const y = e.pageY;

    const pos = Util.getIJ(x, y);
    const i = pos.i;
    const j = pos.j;

    console.log("hover!");
    this.setState({
        i: i, j: j, t: this.state.t,
    });
  }

  handleClick(e) {
    const { i, j, t } = this.state;
    m[i][j] = t % 2 == 0 ? B : W;

    axios
      .get('http://localhost:8081/GGGo/api/online-users')
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      t: this.state.t + 1,
      m: m,
    });

  }
}

export default Go;
