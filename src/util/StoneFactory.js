import Util from './utils';
import React from 'react';
import { E, B, W } from '../constants/stones';

class StoneFactory {
	static getStone(i, j, t, color) {

		const board = document.getElementById("go-board");
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
			onClick={(e) => { console.log("click!"); }}
			key={t}
			style={style} 
			src={img}
		/>)
	}
}

export default StoneFactory;