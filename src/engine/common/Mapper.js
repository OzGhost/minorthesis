import ol from 'openlayers'

class Mapper {

  map = {}
  view = {}
  mainLayer = {}
  overlaySource = {}
  format = new ol.format.GeoJSON()
  

  init = () => {
    this.mainLayer = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://localhost/cgi-bin/mapserv',
        params: {
          'map': '/zk/t/tmp/full/dbms.map',
          'SERVICE': 'WMS',
          'VERSION': '1.1.1',
          'REQUEST': 'GetMap',
          'LAYERS': 'thuadat',
          'FORMAT': 'image/png'
        }
      })
    })

    this.overlaySource = new ol.source.Vector({
      format: this.format
    })

    const overlay = new ol.layer.Vector({
      source: this.overlaySource,
      opacity: 0.5,
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
      layers: [this.mainLayer, overlay],
      target: 'map',
      view: this.view
    })
  }

  viewTarget = target => {
    const feature = this.format.readFeature( JSON.parse(target.geo) )
    this.overlaySource.clear()
    this.overlaySource.addFeature(feature)
    this.view.fit(feature.getGeometry(), { size: this.map.getSize() })
  }

}

export default new Mapper

