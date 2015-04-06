function findMaxValue(element) {
	var maxValue = undefined;
	$(element).each(function() {
		var val = parseInt($(this).height());
		if (maxValue === undefined || maxValue < val) {
			maxValue = val
		}
	});
	return maxValue
}

function findmaxTDCount(table) {
	var TDCountValue = 0;
	table.find("tr").each(function() {
		if ($(this).find("td").length > TDCountValue) {
			TDCountValue = $(this).find("td").length
		}
	});
	return TDCountValue
}

$(document).ready(function() {
			
	$("table").addClass('table').addClass('table-bordered').addClass('table-responsive');
	
	$("table:not(table table):not(table > table):not(:parent(table))").each(function() {
		//$(this).addClass('table').addClass('table-bordered').addClass('table-responsive');
		if ((!($(this).hasClass('table')) || !($(this).hasClass('table-responsive'))) && ($(this).parent('table').length < 1)) {
			var maxTDCount = findmaxTDCount($(this));
			$(this).find('td:last-child').each(function() {
				TDCount = $(this).siblings().length;
				if ((TDCount + 1) < maxTDCount) {
					$(this).attr('colspan', maxTDCount - TDCount)
				}
			});
		}
	});
	
	$("table").each(function() {
		
		var table = $(this);
		var container = $("div.container");
		var thcount = $(this).find('tr').children().length;
		
		$(this).find('td').css('min-width', (container.width()/3));
		$(this).find('th').css('min-width', (container.width()/3));
		
		if (table.width() > (container.width()) - 20) {
			table.wrap("<div class='scrolling-table-wrapper'></div>");
		}
	});
	
	var list = $('ul.nav-tabs li a');
	var maxValue = findMaxValue(list);
	list.each(function() {
		if ($(this).height() < maxValue) {
			$(this).height(maxValue);
		}
	});
	$("div").removeClass(function(index, css) {
		return (css.match(/(^|\s)table\S+/g) || []).join(' ');
	});
	$("table table").removeClass(function(index, css) {
		return (css.match(/(^|\s)table\S+/g) || []).join(' ');
	}).removeClass('table');
});
