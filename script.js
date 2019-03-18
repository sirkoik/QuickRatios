try {
	var test = $;	
} catch(e) {
	alert('jQuery not found. Script will not function as expected.');
}


$(function() {
	var thisIndex = 0;
	var thisVal = 0;

	var autoCalc = $('#auto-calc').is(':checked');

	$('.ratio')
		/*.change(function() {
			thisIndex = $(this).attr('id').substr(5);
			thisVal = $(this).val();
			if (autoCalc) calc();
		})*/
		.spinner({
			stop: function() {
				thisIndex = $(this).attr('id').substr(5);
				thisVal = $(this).val();
				//console.log('Spinning, index = ',thisIndex,'val=',thisVal);
				if (autoCalc) calc();
			}
		});

	$('#calc').click(function() {
		calc();
	});

	function calc() {
		var numFilled = 0;
		var pos = 0;
		var varPos = 0;

		var vals = [];

		$('.ratio').each(function() {
			var selVal = $(this).val();
			if ($.isNumeric(selVal)) {
				numFilled++;
				vals.push(selVal);
			} else {
				console.log('pos ' + pos + 'not numeric');
				varPos = pos;
				vals.push(null);
			}

			pos++;
		});

		if (numFilled < 3) return false;
		
		//if (numFilled == 4) vals[thisIndex] = thisVal;

		var solns = [
			vals[1] * vals[2] / vals[3],
			vals[0] * vals[3] / vals[2],
			vals[0] * vals[3] / vals[1],
			vals[1] * vals[2] / vals[0]
		];

		if (numFilled == 3) {
			if (varPos == 0) $('#field0').val(solns[0]);
			if (varPos == 1) $('#field1').val(solns[1]);
			if (varPos == 2) $('#field2').val(solns[2]);
			if (varPos == 3) $('#field3').val(solns[3]);
		} else if (numFilled == 4) {
			if (thisIndex == 0) $('#field1').val(solns[1]);  
			if (thisIndex == 1) $('#field0').val(solns[0]);  
			if (thisIndex == 2) $('#field3').val(solns[3]);  
			if (thisIndex == 3) $('#field2').val(solns[2]);  
		}
		
		

		//console.log(numFilled, varPos);
	}

	$('#clear-fields').click(function() {
		$('.ratio').val('');
	});

	$('#help').click(function() {
		$('#help-dialog').dialog('open');
	});	
	
	$('#calc').button();
	$('#clear-fields').button();
	$('#auto-calc').button().click(function() {
		autoCalc = $(this).is(':checked');
	});
	$('#help').button();
	
	$('#help-dialog').dialog({autoOpen: false});

});