$(function() {
	$.fn.qtip.defaults.style.def = false;
	$.getJSON('schooldata.json', function(schooldata){	
			 schooldata = schooldata.sort(function(){return "nb_schools";});
       		 var map = kartograph.map('#map', 1330, 620),
		  		    key = "nb_schools",
          		    scale,
					maxRad = 1.5;
       		 map.loadMap('map-usa.svg', function() {
          		  map.addLayer('usa', {
               		 styles: {
                 	   stroke: '#fff',
						'stroke-width': 1.5,
                  		fill: '#666',
		     			'fill-opacity': 0.6
               		 },		
 	    		  tooltips: function(data) {
                   	   return '<div class="tooltip">'+data.name+'</div>';
                	},
				  mouseenter: function(ss, path) {
                    path.attr('fill', Math.random() < 0.5 ? '#99BF4F' : '#219F62');
                    },
                  mouseleave: function(ss, path) {
                    path.animate({ fill: '#333' }, 1000);
                    },								
		        }); // end of addLayer
		    scale = kartograph.scale.linear(schooldata, key);
		    colscale = chroma.scale(chroma.brewer.Set3.slice());
		 	map.addSymbols({
                	type: kartograph.Bubble,
                	data: schooldata,
                	location: function(ss) {return [ss.lon, ss.lat];},
					attrs: function symbolAttrs(ss){
			  			return{
				  			r: ss[key]*maxRad,
				  			fill: colscale(scale(ss[key])),
				  			stroke: colscale(scale(ss[key])),
				  			'fill-opacity': 0.9
				  		}; 
			        }  
			});	 // end of addSymbols
		 }); // end of loadMap
	});	 // end of getJSON  
}); 


