import "./App.css";
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { useEffect, useState, useRef } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps';
const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})


  const [longitude, setLongitude] = useState(-0.112869)
  const [latitude, setLatitude] = useState(51.504)

  useEffect(() => {
    let map = tt.map({
      // eslint-disable-next-line no-undef
      key: import.meta.env.VITE_TOM_TOM_API_KEY,
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 14,
      language: 'en-US',
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true
      }
    })

    setMap(map)

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25]
      }
      const popup = new tt.Popup({ 
        offset: popupOffset 
      }).setHTML('This is you!')
      
      const element = document.createElement('div')
      element.className = 'marker'

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      }).setLngLat([longitude, latitude]).addTo(map)

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        setLongitude(lngLat.lng)
        setLatitude(lngLat.lat)
      })

      marker.setPopup(popup).togglePopup()
    }

    addMarker()
    return () => {
      map.remove()
    }
  }, [longitude, latitude])

  return (
    <>
      <div className='app'>
        <div ref={mapElement} className='map' />
        <div className='searchbar'>
          <h1>Where to?</h1>
          <input
            type="text"
            id="longitude"
            className="longitude"
            placeholder="Put in Longitude"
            onChange={(e) => { setLongitude(e.target.value) }}
          />
          <input
            type="text"
            id="latitude"
            className="latitude"
            placeholder="Put in latitude"
            onChange={(e) => { setLatitude(e.target.value) }}
          />
        </div>
      </div>
    </>
  )
}

export default App
