import { Injectable } from '@angular/core';

interface IScrollToParams {
	to: number;
	duration?: number;
	element?: HTMLElement;
}

@Injectable()
export class ScrollToService {

	private scrollElement: any = null;

	/**
	 * I scroll a HTML ELemnent to a certain position.
	 * @param {IScrollToParams} vars
	 */
	scrollTo(vars: IScrollToParams): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (vars.element) {
				this.scrollElement = vars.element;
			}
			if (this.position() === vars.to) {
				resolve(true);
			}
			this.doScrolling(vars.to, vars.duration, () => {
				resolve(true);
			});
		});
	}

	/**
	 * I scroll the document to a certain position.
	 * @param {number} to
	 * @param {number} duration
	 * @param {Function} callback
	 */
	private doScrolling(to: number, duration: number = 500, callback: Function) {

		const animationFrameReqFunc = requestAnimationFrame ||
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			(<any>window).mozRequestAnimationFrame ||
			function (cb) {
				window.setTimeout(cb, 1000 / 60);
			};
		const start = this.position(),
			change = to - start,
			increment = 20;
		let currentTime = 0;

		const animateScroll = () => {
			currentTime += increment;
			const val = this.easeInOutQuad(currentTime, start, change, duration);
			this.move(val);
			if (currentTime < duration) {
				animationFrameReqFunc(animateScroll);
			} else {
				callback();
			}
		};
		animateScroll();
	}

	/**
	 * I set the elements scrollTop position
	 * @param amount
	 */
	private move(amount): void {
		if (this.scrollElement) {
			this.scrollElement.scrollTop = amount;
		} else {
			document.documentElement.scrollTop = amount;
			(<Element>document.body.parentNode).scrollTop = amount;
			document.body.scrollTop = amount;
		}
	}

	/**
	 * I tell the elements current scrollTop position
	 * @returns {number}
	 */
	private position(): number {
		return this.scrollElement ?
			this.scrollElement.scrollTop :
			document.documentElement.scrollTop ||
			(<Element>document.body.parentNode).scrollTop ||
			document.body.scrollTop;
	}

	// easing functions http://goo.gl/5HLl8
	private easeInOutQuad(t, b, c, d) {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * t * t + b;
		}
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}

	private easeInCubic(t, b, c, d) {
		const tc = (t /= d) * t * t;
		return b + c * (tc);
	}

	private inOutQuintic = function (t, b, c, d) {
		const ts = (t /= d) * t,
			tc = ts * t;
		return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
	};
}
