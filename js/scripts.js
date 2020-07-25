$( document ).ready(function() {
	var states=[];
	var past_7_days=[];
	var next_3_weeks=[];
	get_states();
	simplemaps_usmap.hooks.over_state=function(id){
		update_info(id,simplemaps_usmap_mapinfo.names[id]);
	}
	
	$('.close').on('click', function () {
		$('.alert').css('opacity','0');
	});
});

function update_info(id,state){
	//past 7 days
	$.ajax({
	  method: "GET",
	  url: "http://52.149.152.176:2000/countries/US/past/"+state,
	})
	.done(function( response ) {
		past_7_days=response;
		var left_table="";
		$.each(past_7_days, function( index, value ) {
		  left_table=left_table+"<tr><td>"+value['date']+"</td><td>"+value['confirmed']+"</td><td>"+value['active']+"</td><td>"+value['deaths']+"</td></tr>";
		});
		$('.historic_left').html(left_table);
	});
	
	//next 3 weeks
	$.ajax({
	  method: "GET",
	  url: "http://52.149.152.176:2000/countries/US/predict/"+state,
	})
	.done(function( response ) {
		next_3_weeks=response.predictions;
		var right_table="";
		count=0
		$.each(next_3_weeks, function( index, value ) {
		  if(count==0){
			right_table=right_table+"<tr><td>"+value['date']+"</td><td>"+value['confirmed']+"</td><td>"+value['deaths']+"</td></tr>";
			count=6;
		  }
		  else{
			count=count-1; 
		  }
		});
		if(typeof(next_3_weeks)!='undefined'&&next_3_weeks.length>0){
			$('.alert').css('opacity','0');
			$('.historic_right').html(right_table);
			simplemaps_usmap_mapdata.state_specific[id].description=next_3_weeks[0];
		}
		else{
			$('.historic_left').html("");
			$('.historic_right').html("");
			$('.alert').css('opacity','1');
		}
	});
	update_date();
}

function get_states(){
	//states
	$.ajax({
	  method: "GET",
	  url: "http://52.149.152.176:2000/countries/US/states"
	})
	.done(function( response ) {
		states=response['statesInUS'];
  });
}

function update_date(){
	var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    $('.update_date').html(d);
}