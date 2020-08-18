'use strict';

let wage_per_hour = document.getElementById('wage_per_hour');
let work_time = document.getElementById('work_time');
let result_daily_wage = document.getElementById('daily_wage');
let result_monthly_wage = document.getElementById('monthly_wage');
let shift_of_month = document.getElementById('shift_of_month');
let preset_selector = document.getElementById('preset_selector');

function clear_all() {
    wage_per_hour.value       = 1;
    work_time.value           = 1;
    shift_of_month.value      = 1;
    result_daily_wage.value   = 0;
    result_monthly_wage.value = 0;
}

function calc() {
    result_daily_wage.value = Math.floor(wage_per_hour.value * work_time.value).toLocaleString();
    result_monthly_wage.value = Math.floor((wage_per_hour.value * work_time.value * shift_of_month.value)).toLocaleString();
}

function copy_to_clipboard(where){
    const daily_wage = 0;
    const monthly_wage = 1;
    if(where === daily_wage){
        result_daily_wage.select();
        document.execCommand("Copy");
    }else if(where === monthly_wage){
        result_monthly_wage.select();
        document.execCommand("Copy");
    }
}

function toggle_preset(){
	let modal = document.getElementById('modal');
	modal.classList.toggle('isActive');
	if(localStorage.length>0){
		for(let i=0;i<localStorage.length; i++){
			let key_name = localStorage.key(i);
			const option = document.createElement('option');
			option.textContent = key_name;
			option.setAttribute('value',i);
			preset_selector.appendChild(option);
		}
	}
}




function set_now_value(){
	let name =window.prompt('プリセット名を入力してください','無題のプリセット');
	if(name===null) throw alert('キャンセルされました');
	if(wage_per_hour.value==''||work_time.value=='') throw alert('情報が入力されていません');
	let array = [];
	let obj = {
		'wage_per_hour':wage_per_hour.value,
		'work_time':work_time.value,
	};

	array.push(obj);
	let convert_JSON = JSON.stringify(obj);
	localStorage.setItem(name,convert_JSON);
}

function use_preset(){
	let no = preset_selector.value;
	let key_name = localStorage.key(no);
	let json_preset = localStorage.getItem(key_name);
	let preset = JSON.parse(json_preset);
	wage_per_hour.value = preset.wage_per_hour;
	work_time.value = preset.work_time;
	toggle_preset();
}

function remove_preset(){
	let no = preset_selector.value;
	let key_name = localStorage.key(no);
	localStorage.removeItem(key_name);
	location.reload();
}
