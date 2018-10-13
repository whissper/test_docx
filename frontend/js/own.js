
function collectOpts(selector) {
	var opts = [];
	
	$(selector+' .btn').each( function() {
		opts.push( $(this).hasClass('active') );
	});
	
	return opts;
}

$(document).ready(function() {
	
	$(document).on('click', '.btn-group .btn1', function(){
		$(this).siblings().each(function(){
			$(this).removeClass('active');
		});
        $(this).addClass('active');
	});
	
	$(document).on('click', '.btn-group .btn2', function(){
		$(this).siblings().each(function(){
			$(this).removeClass('active');
		});
		
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});
	
	$(document).on('click', '.back-to-log', function(){
		window.location = 'http://kom-es01-dev01:8888/exitlog/';
	});
	
	$(document).on('click', '#btnsend', function(){
		var jsonObj = {
			"docDate" 			: $('#docDate').val().trim(),
			"docTown" 			: $('#docTown option:selected').text(),
			"consumerName" 		: $('#consumerName').val().trim(),
			"consumerAddress" 	: $('#consumerAddress').val().trim(),
			"contractNum" 		: $('#contractNum').val().trim(),
			"contractDate" 		: $('#contractDate').val().trim(),
			"tsoRank" 			: $('#tsoRank').val().trim(),
			"tsoFio" 			: $('#tsoFio').val().trim(),
			"agentRank" 		: $('#agentRank option:selected').text(),
			"agentFio" 			: $('#agentFio').val().trim(),
			"consumerRank" 		: $('#consumerRank').val().trim(),
			"consumerFio" 		: $('#consumerFio').val().trim(),
			"surveyDate"		: $('#surveyDate').val().trim(),
			"objectAddress" 	: $('#objectAddress').val().trim(),
			"objectNote" 		: ( $('#objectNote').val().trim().length != 0 ? '('+ $('#objectNote').val().trim() +')' : ''),
			"p1" 				: $('#p1').val().trim(),
			"p2" 				: $('#p2').val().trim(),
			"p3_a" 				: collectOpts('#p3_a'),
			"p3_b" 				: collectOpts('#p3_b'),
			"p3_c" 				: collectOpts('#p3_c'),
			"p4" 				: collectOpts('#p4'),
			"p5" 				: collectOpts('#p5'),
			"p6" 				: collectOpts('#p6'),
			"p7" 				: collectOpts('#p7'),
			"p8" 				: collectOpts('#p8'),
			"p9" 				: collectOpts('#p9'),
			"p10" 				: collectOpts('#p10'),
			"p11" 				: collectOpts('#p11'),
			"washDate" 			: $('#washDate').val().trim(),
			"p11_water" 		: collectOpts('#p11_water'),
			"p12" 				: collectOpts('#p12'),
			"p13_a" 			: collectOpts('#p13_a'),
			"p13_a_date" 		: $('#p13_a_date').val().trim(),
			"p13_b" 			: collectOpts('#p13_b'),
			"p13_b_date" 		: $('#p13_b_date').val().trim(),
			"p13_c" 			: collectOpts('#p13_c'),
			"p14_a" 			: $('#p14_a').val().trim(),
			"p14_a1" 			: collectOpts('#p14_a1'),
			"p14_a2" 			: collectOpts('#p14_a2'),
			"p14_a3" 			: $('#p14_a3').val().trim(),
			"p14_b1" 			: collectOpts('#p14_b1'),
			"p14_b2" 			: collectOpts('#p14_b2'),
			"p14_b3" 			: $('#p14_b3').val().trim(),
			"p14_c1" 			: collectOpts('#p14_c1'),
			"p14_c2" 			: collectOpts('#p14_c2'),
			"p14_c3" 			: $('#p14_c3').val().trim(),
			"p15_a" 			: collectOpts('#p15_a'),
			"p15_a_d" 			: $('#p15_a_d').val().trim(),
			"p15_b" 			: collectOpts('#p15_b'),
			"p15_b_d" 			: $('#p15_b_d').val().trim(),
			"p15_c" 			: collectOpts('#p15_c'),
			"p15_c_d" 			: $('#p15_c_d').val().trim(),
			"p15_d" 			: collectOpts('#p15_d'),
			"p15_d_d" 			: $('#p15_d_d').val().trim(),
			"p16_a" 			: collectOpts('#p16_a'),
			"p16_a1" 			: collectOpts('#p16_a1'),
			"p16_a2" 			: collectOpts('#p16_a2'),
			"p16_a3" 			: collectOpts('#p16_a3'),
			"p16_b" 			: collectOpts('#p16_b'),
			"p16_c" 			: collectOpts('#p16_c'),
			"p16_gk" 			: $('#p16_gk').val().trim(),
			"p16_m3" 			: $('#p16_m3').val().trim(),
			"p17_a" 			: collectOpts('#p17_a'),
			"p17_b" 			: collectOpts('#p17_b'),
			"p17_c" 			: collectOpts('#p17_c'),
			"p18_a" 			: collectOpts('#p18_a'),
			"p18_a1" 			: collectOpts('#p18_a1'),
			"p18_b" 			: collectOpts('#p18_b'),
			"p18_b1" 			: collectOpts('#p18_b1'),
			"p18_c" 			: collectOpts('#p18_c'),
			"p18_c1" 			: collectOpts('#p18_c1'),
			"p19_a" 			: collectOpts('#p19_a'),
			"p19_b" 			: collectOpts('#p19_b'),
			"p20" 				: $('#p20').val().trim(),
			"p21_1" 			: [$('#p21_1').is(':checked')],
			"p21_2" 			: [$('#p21_2').is(':checked')],
			"p21_3" 			: [$('#p21_3').is(':checked')],
			"p21_4" 			: [$('#p21_4').is(':checked')],
			"p21_5" 			: [$('#p21_5').is(':checked')],
			"p21_6" 			: [$('#p21_6').is(':checked')],
			"p21_7" 			: [$('#p21_7').is(':checked')],
			"p21_71" 			: [$('#p21_71').is(':checked')],
			"p21_72" 			: [$('#p21_72').is(':checked')],
			"p21_73" 			: [$('#p21_73').is(':checked')],
			"p21_74" 			: [$('#p21_74').is(':checked')],
			"p21_8" 			: [$('#p21_8').is(':checked')],
			"p21_add" 			: $('#p21_add').val().trim(),
			"p22_date" 			: $('#p22_date').val().trim()
		};
		
		$('#json1').val(JSON.stringify(jsonObj));
		$('#form1').submit();
	});
	
});