const map = new maplibregl.Map({
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: coordinates, // starting position [lng, lat]
    zoom: 9.5, // starting zoom
    container: 'map',
  })

// Create a new marker and set its coordinates 
const marker = new maplibregl.Marker({color: "red"})
    .setLngLat(coordinates) // Replace with your desired coordinates
    .setPopup(
        new maplibregl.Popup({ offset: 25 }).setHTML(
            `<b>Exact location provided after booking.</b>`)
    )
    .addTo(map); // Add the marker to your existing map
