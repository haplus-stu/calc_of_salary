"use strict";

const wage_per_hour       = document.getElementById("wage_per_hour");
const tork_time           = document.getElementById("work_time");
const result_daily_wage   = document.getElementById("daily_wage");
const result_monthly_wage = document.getElementById("monthly_wage");
const shift_of_month      = document.getElementById("shift_of_month");
const preset_selector     = document.getElementById("preset_selector");

/**
 * 全input内の値をクリアする関数
 */
function clear_all() {
	wage_per_hour.value = 1;
	work_time.value = 1;
	shift_of_month.value = 1;
	result_daily_wage.value = 0;
	result_monthly_wage.value = 0;
}

/**
 * 給料を計算するメイン関数
 */
function calc() {
	result_daily_wage.value = Math.floor(
		wage_per_hour.value * work_time.value
	).toLocaleString();
	result_monthly_wage.value = Math.floor(
		wage_per_hour.value * work_time.value * shift_of_month.value
	).toLocaleString();
}
/**
 * 文字列をクリップボードにコピーする関数
 * @param {string} where コピーする文字列がある場所をidで指定
 */
function copy_to_clipboard(where) {
	const daily_wage = 0;
	const monthly_wage = 1;
	if (where === daily_wage) {
		result_daily_wage.select();
		document.execCommand("Copy");
	} else if (where === monthly_wage) {
		result_monthly_wage.select();
		document.execCommand("Copy");
	}
}

/**
 * モーダルウィンドウの表示を切り替える関数
 */
function toggle_preset() {
	let modal = document.getElementById("modal");
	modal.classList.toggle("isActive");
	if (localStorage.length > 0) {
		for (let i = 0; i < localStorage.length; i++) {
			let key_name = localStorage.key(i);
			const option = document.createElement("option");
			option.textContent = key_name;
			option.setAttribute("value", i);
			preset_selector.appendChild(option);
		}
	}
}

/**
 * localStorage内に値を保存する関数
 */
function set_now_value() {
	let name = window.prompt(
		"プリセット名を入力してください",
		"無題のプリセット"
	);
	if (name === null) throw alert("キャンセルされました");
	if (wage_per_hour.value == "" || work_time.value == "")
		throw alert("情報が入力されていません");
	let array = [];
	let obj = {
		wage_per_hour: wage_per_hour.value,
		work_time: work_time.value
	};

	array.push(obj);
	let convert_JSON = JSON.stringify(obj);
	localStorage.setItem(name, convert_JSON);
}

/**
 * localStorage内の値を使用する関数
 */
function use_preset() {
	let no = preset_selector.value;
	let key_name = localStorage.key(no);
	let json_preset = localStorage.getItem(key_name);
	let preset = JSON.parse(json_preset);
	wage_per_hour.value = preset.wage_per_hour;
	work_time.value = preset.work_time;
	toggle_preset();
}
/**
 * localStorage内の値を削除する関数
 */

function remove_preset() {
	let no = preset_selector.value;
	let key_name = localStorage.key(no);
	localStorage.removeItem(key_name);
	location.reload();
}
