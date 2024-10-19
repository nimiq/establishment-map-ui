import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import Text from 'ol/style/Text'

// Style for map features like roads
export const mapStyle = new Style({
  stroke: new Stroke({
    color: '#888', // Gray for roads
    width: 2,
  }),
  text: new Text({
    font: '12px sans-serif',
    fill: new Fill({
      color: '#333', // Label text color
    }),
    textBaseline: 'middle',
    placement: 'line',
  }),
})

// Style for layer points (PBF layer)
export const layerStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({
      color: '#ff0000', // Red for points
    }),
    stroke: new Stroke({
      color: '#fff', // White border around points
      width: 2,
    }),
  }),
})
