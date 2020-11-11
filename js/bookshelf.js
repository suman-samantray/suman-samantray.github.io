$(function(){

	let sheet_id = '1FlNKr2dJU6UsCW9R1kTttYcUNqt6M5mVW9bSVNL2q0g';
	var sheetUrl = `https://spreadsheets.google.com/feeds/cells/${sheet_id}/1/public/full?alt=json`;

	$.getJSON(sheetUrl, function(data){

		var entries = data.feed.entry;
		var parsed_entries = [];

		var n_col = 5
		var n_row = (entries.length / n_col) - 1

		for (var i = 1; i <= n_row; i += 1){
		    var j = n_col*i
		    var entry = {
		    	'title': entries[j].content.$t,
		    	'author': entries[j+1].content.$t,
		    	'completed_date': entries[j+2].content.$t,
		    	'url': entries[j+3].content.$t,
		    	'favourite': entries[j+4].content.$t
		    }
		    parsed_entries.push(entry);
		  }

		$.each(parsed_entries.reverse(), function(index, value) {
			var heading_link = $('<a/>', {
				'text': value["title"],
				'href': value["url"]
			})
			if (value["favourite"] == 1){
				heading_link.addClass('text-success')
			}
			var subheading = $('<div>', {
				'class':'subheading mb-3',
				'text': value["author"]
			})

			$( "#bookshelfContent" ).append([
				$('<h3/>', {'class': "mb-0"}).append([heading_link]),
				subheading
			])
		});
	});

});
