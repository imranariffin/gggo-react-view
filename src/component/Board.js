// import React, { Component } from 'react';
// import { E, B, W } from '../constants/stones';
// import { BOARD_SIZE } from '../constants/board';

// class Board extends Component {
// 	render() {
// 		const h = window.innerHeight;
//     const style = {
//       height: h,
//       widht: h,
//     };

//     const stones = [];

//     // for (let i = 0; i < BOARD_SIZE; i++) {
//     // 	for (let j = 0; j < BOARD_SIZE; j++) {
//     // 		console.log(this.props);
//     // 		if (this.props.m[i][j] !== E) {
//     // 			stones.push(
//     // 				<img src="img/go-stone-black.png" />
//     // 			);
//     // 		}
//     // 	}
//     // }

//     console.log(this.props);

// 		return (
// 			<div>
// 				{stones}
// 				<img id="go-board" src="img/go-board-9-9.png"
//           style={style}
//           onMouseMove={this.props.handleHover} 
//           onClick={this.props.handleClick}
//        	/>
//        </div>
// 		);
// 	}
// }

// export default Board;