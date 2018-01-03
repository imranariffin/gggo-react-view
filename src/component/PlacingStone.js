import React, { Component } from 'react';

import Util from '../util/utils';
import StoneFactory from '../util/StoneFactory';
import { B, W } from '../constants/stones';

class PlacingStone extends Component {
	render() {
		const board = document.getElementById("go-board");

		if (board === null) {
			return null;
		}

		const { i, j, t } = this.props;
		
		console.log(i);
		console.log(j);
		console.log(t);

		const color = t % 2 == 0 ? B : W ;

		const offset = Util.getBoardOffset();
		const x0 = Util.getOffsetLeft(board) + offset;
		const y0 = Util.getOffsetTop(board) + offset;
		const { dh, dw } = Util.getStoneDimension();

		const style = {
			width: dw,
			height: dh,
			top: y0 + i * dh - 0.9 * (dh / 2),
			left: x0 + j * dw - 0.9 * (dw / 2),
			position: 'fixed',
		};

		let img = null;
		switch (color) {
			case W: img = "img/go-stone-white.png"; break;
			case B: img = "img/go-stone-black.png"; break;
			default: img = null;
		}

		return (<img 
			onClick={this.props.handleClick}
			key={t}
			style={style} 
			src={img}
		/>)

		// const stone = StoneFactory.getStone(i, j, t, color);

		// return stone;
	}
}

export default PlacingStone;