$(document).ready(function () {
	var current_state = [];
	var states = [];
	var past_7_days = [];
	var next_3_weeks = [];
	get_states();
	simplemaps_usmap.hooks.over_state = function (id) {
		current_state['id'] = id;
		current_state['name'] = simplemaps_usmap_mapinfo.names[id];
		update_info(current_state['id'], current_state['name']);
	}

	$('.close').on('click', function () {
		$('.alert').css('opacity', '0');
	});
	$('.full-dataset-trigger').on('click', function () {
		if (typeof (current_state['id']) != 'undefined') {
			update_info(current_state['id'], current_state['name']);
		}
		$('.full-dataset').modal("show");
	});

});

function update_info(id, state) {
	$('.state').html(state);
	//past 7 days
	$.ajax({
		method: "GET",
		//url: "http://52.149.152.176:2000/countries/US/past/"+state,
		url: "http://152.67.162.241:3000/countries/US/past/" + state,
	})
		.done(function (response) {
			past_7_days = response;
			var left_table = "";
			$.each(past_7_days, function (index, value) {
				left_table = left_table + "<tr><td>" + value['date'] + "</td><td>" + value['confirmed'] + "</td><td>" + value['deaths'] + "</td></tr>";
			});
			$('.historic_left').html(left_table);
		});

	//next 3 weeks
	$.ajax({
		method: "GET",
		//url: "http://52.149.152.176:2000/countries/US/predict/"+state,
		url: "http://152.67.162.241:3000/countries/US/predict/" + state,
	})
		.done(function (response) {
			if (typeof (response.overallPredictions) != 'undefined') {
				next_3_weeks = response.overallPredictions;
				var right_table = "";
				var week = 1;
				$.each(next_3_weeks, function (index, value) {
					var week_data = value = value[Object.keys(value)[0]];
					right_table = right_table + "<tr><td>" + week + "</td><td>" + week_data['total']['confirmed'] + "</td><td>" + week_data['total']['deaths'] + "</td></tr>";
					var week_prediction_table = "";
					$.each(week_data['predictions'], function (index_week, value_week) {
						week_prediction_table = week_prediction_table + "<tr><td>" + value_week['date'] + "</td><td>" + value_week['confirmed'] + "</td><td>" + value_week['deaths'] + "</td></tr>";
					});
					$('.historic_w_' + week).html(week_prediction_table);
					week++;
				});


				$('.alert').css('opacity', '0');
				$('.historic_right').html(right_table);
				//simplemaps_usmap_mapdata.state_specific[id].description=next_3_weeks[0];
			}
			else {
				next_3_weeks = [];
				$('.historic_left').html("");
				$('.historic_right').html("");
				$('.historic_w_1').html("");
				$('.historic_w_2').html("");
				$('.historic_w_3').html("");
				$('.alert').css('opacity', '1');
			}
		});
	update_date();
}

function get_states() {
	//states
	$.ajax({
		method: "GET",
		//url: "http://52.149.152.176:2000/countries/US/states"
		url: "http://152.67.162.241:3000/countries/US/states/"
	})
		.done(function (response) {
			states = response['statesInUS'];
		});
}

function update_date() {
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year = d.getFullYear();
	$('.update_date').html(d);
	$('.update_date_full_dataset').html(d);
}