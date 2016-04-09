/**
 * Created by Joe on 09/04/16.
 */
var getData = querystring.stringify({
    'msg' : 'Game of codes'
});

var options = {
    hostname: 'https://maps.googleapis.com/maps/api/directions/json?origin=luxembourg&destination=France&waypoints=Rodange&language=FR&key=AIzaSyDE5v5BvgE7zpYBHlH5g9_HlqAPgXXsHpQ',
    port: 80,
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': getData.length
    }
};

var req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
res.setEncoding('utf8');
res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
});
res.on('end', () => {
    console.log('No more data')
})
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();