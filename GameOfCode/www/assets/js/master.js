/**
 * Created by Joe on 09/04/16.
 */

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.


var autocomplete, autocompleteb, travelMode;


function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.

    var $start = $('#start');
    var $end = $('#end')
    var $mode = $('input:checked').map(function(){
        return $(this).val();
    });
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */($start[0]),
        {types: ['geocode']});
    autocompleteb = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */($end[0]),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress.bind(autocomplete, $start));
    autocompleteb.addListener('place_changed', fillInAddress.bind(autocompleteb, $end));
    autocompleteb.addListener('place_changed', fillInAddress.bind(travelMode, $end));
    console.log($mode);
}

function fillInAddress($formInput) {
    // Get the place details from the autocomplete object.
    var place = this.getPlace();

    $formInput.data('lng', place.geometry.location.lng());
    $formInput.data('lat', place.geometry.location.lat());
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

$(document).ready(function(){
    $('#calculateID').on('submit', function(e) {

        e.preventDefault();

        var $form = $(e.currentTarget);
        var data = {position:{}};
        $form.find('input[name=from], input[name=to]').each((index, input) => {
            var $input = $(input);
            data['position'][$input.attr('name')] = {
                lng: $input.data('lng'),
                lat: $input.data('lat')
            };
        });

        var serializeData = $form.serializeArray();

        data.position.from['lat'] = data.position.from['lat'] || '49.600508';
        data.position.from['lng'] = data.position.from['lng'] || '6.113629';

        data.uid = 'j3h4jk23b';

        var localUrl = GameOfCode.Configuration.Server.url + "/trafficPlanner";


        $.ajax({
            type: "POST",
            url: localUrl,
            data: data
        });

        $('#pagetwo').show();
        $('#pageone').hide();
    });
});







