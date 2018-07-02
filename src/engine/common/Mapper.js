import ol from 'openlayers'
import store from '../store'
import Ruler from './Ruler'
import { receiveTargetId } from '../actions'

class Mapper {

  map = undefined
  view = undefined
  mainLayer = undefined
  mainSource = undefined
  overlaySource = undefined
  format = new ol.format.GeoJSON()
  osmLayer = undefined

  init = layers => {
    this.mainSource = this.createMainLayerSource(layers)
    this.mainLayer = new ol.layer.Tile({ source: this.mainSource })
    this.overlaySource = new ol.source.Vector({ format: this.format })
    this.osmLayer = new ol.layer.Tile({source: new ol.source.OSM()})

    const overlay = this.createOverlayLayer()

    this.view = new ol.View({
      center: [12071579, 1339273],
      zoom: 16
    })

    this.map = new ol.Map({
      interactions: ol.interaction.defaults({doubleClickZoom: false}),
      layers: [this.osmLayer, this.mainLayer, overlay],
      target: 'map',
      view: this.view
    })

    this.map.on('dblclick', this.handleFeatureSelecting)
    this.map.on('pointermove', evt => {
      this.handleFeatureHovering(evt)
      Ruler.handleMeasurePointerMove(evt)
    })
  }

  createMainLayerSource = layers => {
    let params = {
      'map': '/zk/t/tmp/full/dbms.map',
      'SERVICE': 'WMS',
      'VERSION': '1.1.1',
      'REQUEST': 'GetMap',
      'FORMAT': 'image/png',
      'LAYERS': layers ? layers.join(',') : 'thuadat'
    }
    return new ol.source.TileWMS({
      url: 'http://localhost/cgi-bin/mapserv',
      serverType: 'mapserver',
      crossOrigin: 'anonymous',
      params
    })
  }

  createOverlayLayer = () => (
    new ol.layer.Vector({
      source: this.overlaySource,
      opacity: 0.3,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'crimson'
        }),
        stroke: new ol.style.Stroke({
          color: 'green',
          width: 1
        })
      })
    })
  )

  handleFeatureSelecting = evt => {
      if (! this.isFeatureWasHit(evt) || Ruler.isMeasuring())
        return

      const resolution = +this.view.getResolution()
      const url = this.mainSource.getGetFeatureInfoUrl(
        evt.coordinate,
        resolution,
        'EPSG:3857',
        {'INFO_FORMAT': 'text/javascript'}
      )
      let reCorrectUrl = url.replace('GetMap', 'GetFeatureInfo')
                            .replace('thuadat%2Cquihoach', 'thuadat')
      fetch(reCorrectUrl)
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

  viewTarget = target => {
    if (!target || !target.geo)
      return
    const feature = this.format.readFeature( JSON.parse(target.geo) )
    this.clearOverlay()
    this.overlaySource.addFeature(feature)
    this.view.fit(feature.getGeometry(), { size: this.map.getSize() })
  }

  clearOverlay = () => {
    if (this.overlaySource)
      this.overlaySource.clear()
  }

  filterLayer = layersFiltered => {
    const systemLayer = layersFiltered.filter(e => e !== 'osm')
    console.log(systemLayer)
    if (systemLayer.length > 0) {
      this.mainLayer.setVisible(true)
      this.mainLayer.setSource(this.createMainLayerSource(systemLayer))
    } else {
      this.mainLayer.setVisible(false)
    }
    this.osmLayer.setVisible(layersFiltered.indexOf('osm') >= 0)
  }

  getMap = () => this.map

  getSource = () => this.mainSource
}

export default new Mapper

