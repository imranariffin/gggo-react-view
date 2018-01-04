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
  [E, E, E, E, E, E, E, E, E,],

  [E, E, E, E, E, E, E, E, E,],
  [E, E, E, E, E, E, E, E, E,],
  [E, E, E, E, E, E, E, E, E,],

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

    const boardStyle = {
      height: '100%',
      width: '100%',
    };

    return (
      <div id="board-container" className="row">
        <div className="col-md-3 left-panel">
          <div className="row">
            <div className="col-md-12">
              <img className="profile-pic-stone" src="img/go-stone-black.png" />
              <img className="profile-pic-2" src="img/sai3.jpeg" />
            </div>
          </div>
          <div className="card">
            <img 
              className="round-pic"
              width="100%"
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" 
              alt="Card image cap" 
            />
            <div className="card-body">
              <a href="#"><h4 class="card-title">saifujiwara</h4></a>
            </div>
          </div>
        </div>
        <div className="col-md-6 board">
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
        <div className="col-md-3 right-panel">
          <div className="row">
            <div className="col-md-12">
              <img className="profile-pic-stone" src="img/go-stone-white.png" />
              <img className="profile-pic-2" src="img/hikaru.jpeg" />
            </div>
          </div>
          <div className="card">
            <img 
              className="round-pic"
              width="100%" 
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" 
              alt="Card image cap" 
            />
            <div className="card-body">
              <a href="#"><h4 class="card-title">hikaru</h4></a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleHover(e) {

    const x = e.pageX;
    const y = e.pageY;

    const pos = Util.getIJ(x, y);
    const i = pos.i;
    const j = pos.j;

    if (this.offTheBoard(x, y)) {
      console.log("off the board!");
      return;
    }

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

  offTheBoard(x, y) {
    const boardContainer = document.getElementById("board-container");

    const error = 0.2;
    const offset = Util.getBoardOffset();
    const x0 = Util.getOffsetLeft(boardContainer);
    const y0 = Util.getOffsetTop(boardContainer);
    const w = parseFloat(boardContainer.style.width);
    const h = parseFloat(boardContainer.style.height);

    if (
      x < x0 + offset - error ||
      x > x0 + w - offset + error ||
      y < y0 + offset - error ||
      y > y0 + h - offset + error
    ) {
      return true;
    }

    return false;
  }
}

export default Go;
