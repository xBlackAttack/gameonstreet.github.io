mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FtZW9uc3RyZWV0IiwiYSI6ImNrbnFrNW9oazF5eTMybm54M254aHRhNGIifQ.8wj7bTXFR3I8odHR4J1VZw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/gameonstreet/cknqn5nvm04wk17uf29j4u064',
        center: [27.854587, 40.453905],
        zoom: 10
    });

// Add the geocontrol to the map.
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Arama / Search' // Placeholder text for the search bar
    })
);
 
// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

map.on('load', function () {
    map.addSource('recycle', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://raw.githubusercontent.com/gameonstreet/gameonstreet.github.io/main/data.geojson'
    });

    map.addLayer({
        'id': 'recycle-layer',
        'type': 'symbol',
        'source': 'recycle',
        'layout': {
            'icon-image': '{marker-symbol}',
            'icon-allow-overlap': false,
            'icon-size': 0.7
        }
    });
});

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'recycle-layer', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var title = e.features[0].properties.title;
    var address = e.features[0].properties.address;
    var phone = e.features[0].properties.phone;
    var province = e.features[0].properties.province;
    var city = e.features[0].properties.city;
    var description = '<strong>' + title + '</strong>' + '<p>' + address + ' ' + province + '/' + city + '</p>' + '<p>' + phone + '</p>';
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});
     
// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'recycle-layer', function () {
        map.getCanvas().style.cursor = 'pointer';
});
     
// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'recycle-layer', function () {
        map.getCanvas().style.cursor = '';
});
