// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var marker, geocoder;
var markers = [];

function initialize() {
    var myLatlng = new google.maps.LatLng(13.0878400, 80.2784700);
    var myOptionss = {
        zoom: 15,
        center: myLatlng,
        //panControl: true,
        //scaleControl: true,
        //streetViewControl: true,
        //zoomControl: true,
        //disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 50,
        minZoom: 10
    };

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'),
       myOptionss);

    autoCompleteMap();
}

function autoCompleteMap() {
    autocomplete = new google.maps.places.Autocomplete(
         /** @type {HTMLInputElement} */(document.getElementById('pac-input')),
         { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function () {

        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        //marker.setIcon(/** @type {google.maps.Icon} */({
        //    url: place.icon,
        //    size: new google.maps.Size(71, 71),
        //    origin: new google.maps.Point(0, 0),
        //    anchor: new google.maps.Point(17, 34),
        //    scaledSize: new google.maps.Size(35, 35)
        //}));
        mapMarker(place.geometry.location);
        // marker.setVisible(true);
    });
}

function mapMarker(location) {
    try {

        marker = new google.maps.Marker({ //on créé le marqueur
            position: location,
            animation: google.maps.Animation.DROP,
            draggable: true,
            map: map
        });

        map.setCenter(location);

        markers.push(marker);

        for (var i = 0; i < markers.length - 1; i++) {
            markers[i].setMap(null);
        }

        google.maps.event.addListener(marker, 'dragend', function (event) {
            document.getElementById("pac-input").value = "";
            map.setCenter(event.latLng);
            //$('#PostAd_lat').val(event.latLng.lat());
            //$('#PostAd_long').val(event.latLng.lng());
            getAddress(event.latLng);
        });
        //}
        //$('#PostAd_lat').val(location.lat());
        //$('#PostAd_long').val(location.lng());
        getAddress(location);
    }
    catch (e) {
        console.log(e.toString());
    }
}

function getAddress(latLng) {
    try {
        geocoder.geocode({ 'latLng': latLng },
             function (results, status) {
                 if (status == google.maps.GeocoderStatus.OK) {
                     var address = "";
                     if (results[0].address_components[0].types[0] == "street_number") {
                         for (i = 1; i < results[0].address_components.length; i++) {
                             if (results[0].address_components[i].types[0] != "postal_code" && results[0].address_components[i].types[0] != "locality")
                                 address += "," + results[0].address_components[i].long_name;
                         }

                     }
                     if (results[0].address_components[0].types[0] == "route") {
                         for (i = 1; i < results[0].address_components.length; i++) {
                             if (results[0].address_components[i].types[0] != "postal_code" && results[0].address_components[i].types[0] != "locality")
                                 address += "," + results[0].address_components[i].long_name;
                         }
                     }
                     if (results[0].address_components[0].types[0] == "premise") {
                         for (i = 1; i < results[0].address_components.length; i++) {
                             if (results[0].address_components[i].types[0] != "postal_code" && results[0].address_components[i].types[0] != "locality")
                                 address += "," + results[0].address_components[i].long_name;
                         }
                     }
                     while (address.charAt(0) === ',')
                         address = address.slice(1);
                     if ($('#pac-input').val() == '')
                         $('#pac-input').val(address);

                     var address1 = document.getElementById('pac-input').value;
                     if (address1.length) {
                         var addressArr = address1.split(',');
                         var i = 0;
                         for (j = addressArr.length; j >= 0; j--) {
                             if (i == 3)
                                 document.getElementById('txtcity').value = addressArr[j];
                             if (i == 4)
                                 document.getElementById('txtlocality').value = addressArr[j];
                             i++;
                         }
                     }
                             
                 }
                 else {
                     document.getElementById("pac-input").value = " ";
                     alert("Please try after few seconds")
                 }
             });
    }
    catch (e) {
        console.log(e.toString());
    }
}
