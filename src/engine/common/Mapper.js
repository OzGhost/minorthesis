import ol from 'openlayers'
import store from '../store'
import { receiveTargetId } from '../actions'

class Mapper {

  map = {}
  view = {}
  mainLayer = {}
  mainSource = {}
  overlaySource = {}
  format = new ol.format.GeoJSON()
  

  init = layers => {
    this.mainSource = this.createMainLayerSource(layers)

    this.mainLayer = new ol.layer.Tile({ source: this.mainSource })

    this.overlaySource = new ol.source.Vector({
      format: this.format
    })

    const overlay = new ol.layer.Vector({
      source: this.overlaySource,
      opacity: 0.3,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'red'
        }),
        stroke: new ol.style.Stroke({
          color: 'green',
          width: 1
        })
      })
    })

    this.view = new ol.View({
      center: [574500.4, 1320837.6],
      zoom: 17
    })

    this.map = new ol.Map({
      interactions: ol.interaction.defaults({doubleClickZoom: false}),
      layers: [this.mainLayer, overlay],
      target: 'map',
      view: this.view
    })

    this.map.on('dblclick', this.handleFeatureSelecting)
    this.map.on('pointermove', this.handleFeatureHovering)
  }

  handleFeatureSelecting = evt => {
      if (! this.isFeatureWasHit(evt))
        return

      let resolution = +this.view.getResolution()
      let url = this.mainSource.getGetFeatureInfoUrl(
        evt.coordinate,
        resolution,
        'EPSG:3857',
        {'INFO_FORMAT': 'text/javascript'}
      )
      fetch(url.replace('GetMap', 'GetFeatureInfo'))
        .then(res => res.json())
        .then(target => store.dispatch(
          receiveTargetId(evt.originalEvent, target.id)
        ))
  }

  isFeatureWasHit = evt => {
    let pixel = this.map.getEventPixel(evt.originalEvent)
    return this.map.forEachLayerAtPixel(pixel, () => true)
  }

  handleFeatureHovering = evt => {
    if (evt.dragging)
      return
    this.map.getTargetElement().style.cursor = this.isFeatureWasHit(evt)
      ? 'pointer'
      : ''
  }

  createMainLayerSource = layers => {
    let params = {
      'map': '/zk/t/tmp/full/dbms.map',
      'SERVICE': 'WMS',
      'VERSION': '1.1.1',
      'REQUEST': 'GetMap',
      'FORMAT': 'image/png',
      'LAYERS': 'thuadat'
      //'LAYERS': layers ? layers.join(',') : 'thuadat'
    }
    return new ol.source.TileWMS({
      url: 'http://localhost/cgi-bin/mapserv',
      serverType: 'mapserver',
      crossOrigin: 'anonymous',
      params
    })
  }

  viewTarget = target => {
    const feature = this.format.readFeature( JSON.parse(target.geo) )
    this.overlaySource.clear()
    this.overlaySource.addFeature(feature)
    this.view.fit(feature.getGeometry(), { size: this.map.getSize() })
  }

  filterLayer = layersFiltered => {
    this.mainLayer.setSource(this.createMainLayerSource(layersFiltered))
  }

}

export default new Mapper

