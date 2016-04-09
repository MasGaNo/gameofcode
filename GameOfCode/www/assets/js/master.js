/**
 * Created by Joe on 09/04/16.
 */

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete, autocompleteb;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.

    var $start = $('#start');
    var $end = $('#end')
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

    geolocate();
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
            /*var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());*/
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
                lng: $input.data('lat'),
                lat: $input.data('lng')
            };
        });

        data.position.from['lat'] = data.position.from['lat'] || 6.113629;
        data.position.from['lng'] = data.position.from['lng'] || 49.600508;

        data.uid = 'j3h4jk23b';

        var serializeData = $form.serializeArray();
        serializeData.forEach((dataForm) => {
            if (dataForm.name === 'from' || dataForm.name === 'to') {
                return;
            }

            if (dataForm.name in data) {
                if (!(data[dataForm.name] instanceof Array)) {
                    data[dataForm.name] = [data[dataForm.name]];
                }
                data[dataForm.name].push(dataForm.value);
            } else {
                data[dataForm.name] = dataForm.value;
            }
        });

        var localUrl = GameOfCode.Configuration.Server.url + "/trafficPlanner";

        var $button = $form.find('button[type=submit]');
        var $loader = $button.next('.loader');
        $button.prop('disabled', true);
        $loader.addClass('active');

        $.ajax({
            type: "POST",
            url: localUrl,
            data: data
        }).complete((data) => {

        }).fail((data) => {
            alert('Error... please try again later...');
        }).always(() => {
            $button.prop('disabled', false);
            $loader.removeClass('active');
        });

    });
});







