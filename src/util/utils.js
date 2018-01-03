import { BOARD_SIZE } from '../constants/board';

class Util {
  static getBoardOffset() {
    const board = document.getElementById("go-board");
    const offset = (41.0 / 651.0) * board.width;
    return offset;
  }

  static getOffsetLeft(e) {
    let elem = e;
    let offsetLeft = 0;
    do {
      if (!isNaN(elem.offsetLeft)) {
        offsetLeft += elem.offsetLeft;
      }
    } while (elem = elem.offsetParent);
    return offsetLeft;
  }

  static getOffsetTop(e) {
    let elem = e;
    let offsetTop = 0;
    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop;
      }
    } while (elem = elem.offsetParent);
    return offsetTop; 
  }

  static getXY(i, j) {

		const board = document.getElementById("go-board");
		const w = board.width;
		const h = board.height;
		const offset = Util.getBoardOffset();
		const x0 = Util.getOffsetLeft(board) + offset;
		const y0 = Util.getOffsetTop(board) + offset;

		return {
			x: x0 + (w / (BOARD_SIZE - 1)) * j,
			y: y0 + (h / (BOARD_SIZE - 1)) * i,
		};
  }

  static getIJ(x, y) {
    const board = document.getElementById("go-board");
    const offset = Util.getBoardOffset();
    const w = board.width - 2 * offset;
    const h = board.height - 2 * offset;

    const y0 = Util.getOffsetTop(board) + offset;
    const x0 = Util.getOffsetLeft(board) + offset;

    const i = Math.round(((y - y0) / h) * (BOARD_SIZE - 1));
    const j = Math.round(((x - x0) / w) * (BOARD_SIZE - 1));

    return {
      i: i,
      j: j,
    };
  }

  static getStoneDimension() {
  	const board = document.getElementById("go-board");
  	const offset = Util.getBoardOffset();
  	const dw = (board.width - 2 * offset) / (BOARD_SIZE - 1);

  	return { dw: dw, dh: dw };
  }
}

export default Util;