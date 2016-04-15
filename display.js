$(function() {
	$(document).ready(function() {
                function merge_arrays(p1,p2){
                     vars = [];
                     for(i = 0; i < p1.length; i++){
                         vars.push([p1[i],p2[i]]);
                     }
                     return vars;
                }
       		var myItems;
		$.getJSON('https://data.sparkfun.com/output/ro2lVanEnntyyAnb903b.json', function(data) {
			myItems = data.items;
			var d1 = [];
			var dataByIndex = [];
			for (var i = 0; i < 14; i += 0.25) {
				d1.push([i, Math.sin(i)]);
			}
			for(var i = 0; i < data.length; i++){
				for (var key in data[i]) {
					if (data[i].hasOwnProperty(key)) {
						console.log(key + " -> " + data[i][key]);
						if (!(key in dataByIndex))dataByIndex[key] = [];
						dataByIndex[key].push(data[i][key]);
					}
				}
				console.log(data[i]);
			}
                        for(i = 0; i < dataByIndex["timestamp"].length; i++){
                             dataByIndex["timestamp"][i] = Date.parse(dataByIndex["timestamp"][i])
                        }
                        var options = {
                            xaxis: {
                               mode: "time"
                            }
                        }
			$.plot("#graph1", [merge_arrays(dataByIndex["timestamp"],dataByIndex["temp"])],options);
			$.plot("#graph2", [merge_arrays(dataByIndex["pressure"],dataByIndex["temp"])]);
			$.plot("#graph3", [merge_arrays(dataByIndex["timestamp"],dataByIndex["pressure"])],options);
			$.plot("#graph4", [merge_arrays(dataByIndex["timestamp"],dataByIndex["humidity"])]);
		});
	});
});
