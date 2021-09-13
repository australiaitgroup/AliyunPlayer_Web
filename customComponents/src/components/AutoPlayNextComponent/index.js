import autoPlayHtml from "./index.html";
import "./index.scss";
import { parseDom } from "utils";

/**
 * Auto Play Configuration
 */
export default class AutoPlayNextComponent {
	/**
	 * @constructor AutoPlayNextComponent
	 */
	constructor() {
		this.html = parseDom(autoPlayHtml);
	}

	createEl() {
		let menuList = document.querySelector(".prism-setting-list");
		menuList.appendChild(this.html);
	}
}
