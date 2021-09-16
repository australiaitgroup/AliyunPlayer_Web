import rateHtml from "./index.html";
import "./index.scss";
import { parseDom } from "utils";

/**
 * 倍速播放组件
 */
export default class RateComponent {
	/**
	 * @constructor 倍速播放组件构造函数
	 * @param currentSpeedString {@String Playbackspeed default '1.0'}
	 */
	constructor(currentSpeedString = "1.0") {
		this.html = parseDom(rateHtml);
		this.currentSpeed = currentSpeedString;
		this.availableSpeeds = ["0.5", "1.0", "1.25", "1.5", "2.0"];
	}

	createEl(el) {
		let eleControlbar = el.querySelector(".prism-controlbar");
		eleControlbar.appendChild(this.html);
	}

	created(player) {
		if (this.availableSpeeds.includes(this.currentSpeed)) {
			let currentRateEle = this.html.querySelector(".current-rate");
			currentRateEle.innerText = currentSpeed + "x";
			let rateListEleArray = this.html.querySelectorAll(".rate-list > li");
			currentRateEle.innerText = this.currentSpeed + "x";
			[...rateListEleArray].map((item) => {
				if (item.dataset.rate === rate) {
					item.classList.add("current");
				}
				if (item.dataset.rate !== rate) {
					item.classList.remove("current");
				}
				return;
			});
			player.setSpeed(parseFloat(this.currentSpeed));
		} else {
			this.currentSpeed = "1.0";
			let currentRateEle = this.html.querySelector(".current-rate");
			currentRateEle.innerText = currentSpeed + "x";
			let rateListEleArray = this.html.querySelectorAll(".rate-list > li");
			currentRateEle.innerText = this.currentSpeed + "x";
			[...rateListEleArray].map((item) => {
				if (item.dataset.rate === rate) {
					item.classList.add("current");
				}
				if (item.dataset.rate !== rate) {
					item.classList.remove("current");
				}
				return;
			});
			player.setSpeed(1);
		}
	}

	ready(player, e) {
		let currentRateEle = this.html.querySelector(".current-rate");
		let rateListEle = this.html.querySelector(".rate-list");
		let timeId = null;

		// 隐藏设置里面的倍速播放
		let settingRate = document.querySelector(".prism-setting-item.prism-setting-speed");
		if (settingRate) {
			settingRate.classList.add("player-hidden");
		}

		currentRateEle.onclick = () => {
			rateListEle.style.display = "block";
		};
		currentRateEle.onmouseleave = () => {
			timeId = setTimeout(() => {
				rateListEle.style.display = "none";
			}, 100);
		};

		rateListEle.onmouseenter = () => {
			clearTimeout(timeId);
		};
		rateListEle.onmouseleave = () => {
			rateListEle.style.display = "none";
		};

		rateListEle.onclick = ({ target }) => {
			let rate = target.dataset.rate;
			window.localStorage.setItem("aliplayer-playback-speed", `${rate}`);
			if (rate) {
				player.setSpeed(rate);
				if (target.className !== "current") {
					let currentEle = rateListEle.querySelector(".current");
					if (currentEle) {
						currentEle.className = "";
					}
					target.className = "current";
				}
				rateListEle.style.display = "none";
				currentRateEle.innerText = rate + "x";
			}
		};
	}
}
