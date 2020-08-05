var searchRVA = (function () {
    var dataAutocomplete;
    var dataAutocompleteCoordinates;

    var options = {
        minCharNumber: 3,
        adjustWidth: false,
        data: dataAutocomplete,
        requestDelay: 150,
        list: {
            onClickEvent: function() {
                var addressSearch = $("#searchInput").val();
                dataAutocompleteCoordinates.forEach(function(data) {
                    if (data[0] == addressSearch) {
                        var xyCoord = [data[1], data[2]];
                        view.setCenter(proj4('EPSG:3948', 'EPSG:3857', xyCoord));
                        if (addressSearch.indexOf('Lieu-dit') != -1) {
                            view.setZoom(18);
                        } else {
                            view.setZoom(20);
                             marker.setPosition(proj4('EPSG:3948', 'EPSG:3857', xyCoord));
                        }
                    }
                }); 
            }
        }
    };

    var view;
    var marker;

    var setView = function(sviewerView) {
        view = sviewerView;
    };

    var setMarker = function (sviewerMarker) {
        marker = sviewerMarker;
    };

    var init = function () {

        /*marker =  new ol.Overlay({
            element: $('#marker')[0],
            positioning: 'bottom-left',
            stopEvent: false
        });*/

        dataAutocomplete = []; // store addresses and localities names. Used to display in autocompletion
        dataAutocompleteCoordinates = []; // store addresses and localities names and coordinates. Used to display matching address or locality on the map
        
        $("#searchInput").autocomplete({
            source: dataAutocomplete,
            appendTo: "#addressForm",
            delay: 200,
            minLength: 3,
        });

        $("#searchInput").on( "autocompleteselect", function(event, ui) {
            var addressSearch = ui.item.value;
        	dataAutocompleteCoordinates.forEach(function(data) {
        		if (data[0] == addressSearch) {
        			var xyCoord = [data[1], data[2]];
                    view.setCenter(proj4('EPSG:3948', 'EPSG:3857', xyCoord));
                    if (addressSearch.indexOf('Lieu-dit') != -1) {
                    	view.setZoom(18);
                    } else {
                    	view.setZoom(20);
                    	 marker.setPosition(proj4('EPSG:3948', 'EPSG:3857', xyCoord));
                    }
        		}
        	});
        });

        $('.ui-autocomplete').css('max-height','40%');
        $('.ui-autocomplete').css('max-width','90%');
        $('.ui-autocomplete').css('overflow-y','auto');
        $('.ui-autocomplete').css('overflow-x','hidden');
    };


    /**
     * method: getAddressesAsked
     * Queries the api RVA (Référentiel Voies et Adresses) of Rennes Metropole 
     * to find matching addresses and localities 
     */
    var getAddressesAsked = function () {
    	dataAutocompleteCoordinates.splice(0, dataAutocompleteCoordinates.length);
        dataAutocomplete.splice(0, dataAutocomplete.length);
    	var adressAsked = $("#searchInput").val();
    	var adressAskedSplit = adressAsked.split(','); 
    	var adressAskedLowerCase = adressAsked.toLowerCase();
    	var requestLanes = 'https://api-rva.sig.rennesmetropole.fr/?key=556ead9b7893a352bcf9&version=1.0&format=json&epsg=3948&cmd=getlanes&insee=all&query=' + adressAskedSplit[0];
    	var requestAddresses = 'https://api-rva.sig.rennesmetropole.fr/?key=556ead9b7893a352bcf9&version=1.0&format=json&epsg=3948&cmd=getfulladdresses&query='+ adressAskedSplit[0];
    	
    	if (adressAskedSplit[0].length > 5) {
	    	$.getJSON(requestLanes, function(dataApiJson) {
	    		var data = dataApiJson.rva.answer;
	    		if ((data.lanes).length > 0) {
	    			data.lanes.forEach(function(lane) {
	    				if (lane.type == 'Lieu-dit') {
	    					var localityName = lane.name4 + ' (Lieu-dit)';
	    					dataAutocomplete.push(localityName);
	    					var laneUpperCornerSplit = lane.upperCorner.split(' ');
	    					var laneInformations = [localityName, laneUpperCornerSplit[0], laneUpperCornerSplit[1]];
	    					dataAutocompleteCoordinates.push(laneInformations);
	    				}
	    			});
	    		 }
	    	});
	    	
	    	$.getJSON(requestAddresses, function(dataApiJson) {
	    		var data = dataApiJson.rva.answer;
	    		if ( ((data.addresses).length > 0 )  ) {
	    			data.addresses.forEach(function(address) {
		    			if( ((address.addr3.toLowerCase().substring(0, adressAskedLowerCase.length)) == adressAskedLowerCase)
		    				|| ((address.addr3.toLowerCase().includes(adressAskedLowerCase)) == true)) {
		    				if (dataAutocomplete.indexOf(address.addr3) == -1) {
		    					dataAutocomplete.push(address.addr3);
			    				var addressInformations = [address.addr3, address.x, address.y];
			    				dataAutocompleteCoordinates.push(addressInformations);
		    				}
	    				}
	    			});
	    		}
	    	});
    	}
    };

    /**
     * method: searchLocality
     * Queries the api RVA (Référentiel Voies et Adresses) of Rennes Metropole to find locality
     * @param {string} adressAsked address to find
     */
    var searchLocality = function (adressAsked) {
        var request = 'https://api-rva.sig.rennesmetropole.fr/?key=556ead9b7893a352bcf9&version=1.0&format=json&epsg=3948&cmd=getlanes&insee=all&query=' + adressAsked;
        $.getJSON(request, function(dataApiJson) {
            var answer = dataApiJson.rva.answer;
            // if several addresses was found
            if (answer.lanes.length > 0) {
                var lowerCornerSplit = answer.lanes[0].lowerCorner.split([' ']);
                var upperCornerSplit = answer.lanes[0].upperCorner.split([' ']);
                var xyCoordUp = [upperCornerSplit[0], upperCornerSplit[1]];
                view.setCenter(proj4('EPSG:3948', 'EPSG:3857', xyCoordUp));
                view.setZoom(18);
            } else {
                 //searchPlace();
            	messagePopup(tr("adresse non trouvée"));
            }
        });
    };

       /**
     * method: searchAddress
     * Queries the api RVA (Référentiel Voies et Adresses) of Rennes Metropole to find a place
     */
    var searchAddress = function() {
        var adressAsked = $("#searchInput").val();
        var request = 'https://api-rva.sig.rennesmetropole.fr/?key=556ead9b7893a352bcf9&version=1.0&format=json&epsg=3948&cmd=getfulladdresses&query='+ adressAsked.split(',')[0];
        var xyCoord;
        $.getJSON(request, function(dataApiJson) {
            var addresses = dataApiJson.rva.answer.addresses;
            // if several addresses was found
            if (addresses.length > 1) {
                // if the request ask by the user starts by a number zoom in the street address
                if (isNaN(parseInt(adressAsked.split(' ')[0])) == false) {
                    addresses.forEach(function(address) {
                        if (address.addr2 == adressAsked) {
                            xyCoord = [address.x, address.y];
                            view.setCenter(proj4('EPSG:3948', 'EPSG:3857', xyCoord));
                            view.setZoom(20);
                        } 
                    });
                // else zoom in the street
                } else {
                    xyCoord = [addresses[0].x, addresses[0].y];
                    view.setCenter(proj4('EPSG:3948', 'EPSG:3857', xyCoord));
                    view.setZoom(19);
                }
            // if only one adresse was found zoom in this address
            } else if(addresses.length == 1) {
                xyCoord = [addresses[0].x, addresses[0].y];
                view.setCenter(proj4('EPSG:3948', 'EPSG:3857', xyCoord));
                view.setZoom(20);
            // if no address was found, call to the function searchPlace
            } else {
                searchLocality(adressAsked.split(',')[0]);
            }
        });
        return false;
    };

        /**
     * method: sendInformationToParentPage
     * send link parms to the parent page
     * used if the sviewer is in an iframe 
     */
    var sendInformationToParentPage = function() {
	    var c = view.getCenter();
	    var linkParams = {};
	    if (config.gficoord && config.gfiz && config.gfiok) {
	        linkParams.x = encodeURIComponent(Math.round(config.gficoord[0]));
	        linkParams.y = encodeURIComponent(Math.round(config.gficoord[1]));
	        linkParams.z = encodeURIComponent(config.gfiz);
	        linkParams.q = '1';
	    }
	    else {
	    	if ( c!= null) {
		        linkParams.x = encodeURIComponent(Math.round(c[0]));
		        linkParams.y = encodeURIComponent(Math.round(c[1]));
		        linkParams.z = encodeURIComponent(view.getZoom());
	    	}
	    }
	    linkParams.lb = encodeURIComponent(config.lb);
	    if (config.customConfigName) { linkParams.c = config.customConfigName; }
	    if (config.kmlUrl) { linkParams.kml = config.kmlUrl; }
	    if (config.search) { linkParams.s = '1'; }
	    if (config.layersQueryString) { linkParams.layers = config.layersQueryString; }
	    if (config.title&&config.wmctitle!=config.title) { linkParams.title = config.title; }
	    if (config.wmc) { linkParams.wmc = config.wmc; }

	    try{
	    	if (typeof parent.interactWithSviewer === "function") {
	    		var parentOrigin = parent.location.origin;
	    		var documentOrigin = document.location.origin; 
	    		if (parentOrigin == documentOrigin) {
	    			parent.interactWithSviewer(linkParams);
	    		}
	    	}
	    }catch(e){
	        // not accessible
	    }
    };


    return {
        init: init,
        searchAddress: searchAddress,
        getAddressesAsked: getAddressesAsked,
        sendInformationToParentPage: sendInformationToParentPage,
        setView: setView,
        setMarker: setMarker
    };
})();

 
