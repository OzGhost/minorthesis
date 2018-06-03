import ol from 'openlayers'
import Mapper from './Mapper'

class Ruler {

  isActive: false
  sketch: null
  helpTooltipElement: null
  helpTooltip: null
  measureTooltipElement: null
  measureTooltip: null
  draw: null
  listener: null

  isMeasuring = () => this.isActive

  handleMeasurePointerMove = evt => {
    if (evt.dragging || !this.isActive)
      return
    let helpMsg = 'Nhấn chuột để bắt đầu đo'
    if (this.sketch) {
      let geom = (this.sketch.getGeometry());
      if (geom instanceof ol.geom.Polygon)
        helpMsg = '[Đo diện tích]/nhấn nút [ESC] để thoát chế độ đo'
      else if (geom instanceof ol.geom.LineString)
        helpMsg = '[Đo chiều dài]/nhấn nút [ESC] để thoát chế độ đo'
    }

    if (this.helpTooltipElement) {
      this.helpTooltipElement.innerHTML = helpMsg
      this.helpTooltipElement.classList.remove('hidden')
    }
    this.helpTooltip
      && this.helpTooltip.setPosition(evt.coordinate)
  }

  addInteraction = (deserveType, map, source) => {
    this.deactive(map)
    this.activate()
    let type = deserveType === 'area'
      ? 'Polygon'
      : 'LineString'
    this.draw = new ol.interaction.Draw({
      source: source,
      type: type,
      style: this.getRuleStyle()
    })
    map.addInteraction(this.draw)

    this.createMeasureTooltip(map)
    this.createHelpTooltip(map)

    this.draw.on('drawstart', this.handleStartMeasuring)
    this.draw.on('drawend', this.handleEndMeasuring)

    map.getViewport().addEventListener('mouseout', () => {
      this.helpTooltipElement
        && this.helpTooltipElement.classList.add('hidden')
    })
  }

  activate = () => {
    document.addEventListener('keydown', this.handleDeactive)
    this.isActive = true
  }

  handleDeactive = event => {
    if (event.keyCode === 27)
      this.deactive(Mapper.getMap())
  }

  getRuleStyle = () => (
    new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  )

  createHelpTooltip = map => {
    let e = this.helpTooltipElement
    if (e)
      e.parentNode.removeChild(e)
    e = document.createElement('div')
    e.className = 'tooltip hidden'
    this.helpTooltip = new ol.Overlay({
      element: e,
      offset: [15, 15],
      positioning: 'center-left'
    })
    this.helpTooltipElement = e
    map.addOverlay(this.helpTooltip)
  }

  createMeasureTooltip = map => {
    let e = this.measureTooltipElement
    if (e)
      e.parentNode.removeChild(e)
    e = document.createElement('div')
    e.className = 'tooltip tooltip-measure'
    this.measureTooltip = new ol.Overlay({
      element: e,
      offset: [-12, -15],
      positioning: 'bottom-center'
    })
    this.measureTooltipElement = e
    map.addOverlay(this.measureTooltip)
  }

  handleStartMeasuring = evt => {
    this.sketch = evt.feature
    let tooltipCoord = evt.coordinate
    this.listener = evt.feature.getGeometry().on('change', e => {
      let geom = e.target
      let output = ''
      if (geom instanceof ol.geom.Polygon) {
        output = this.formatArea(geom)
        tooltipCoord = geom.getInteriorPoint().getCoordinates()
      } else if (geom instanceof ol.geom.LineString) {
        output = this.formatLength(geom)
        tooltipCoord = geom.getLastCoordinate()
      }
      this.measureTooltipElement.innerHTML = output
      this.measureTooltip.setPosition(tooltipCoord)
    })
  }

  formatLength = line => {
    let length = ol.Sphere.getLength(line)
    return length > 100
      ? (Math.round(length / 1000 * 100) / 100) + ' km'
      : (Math.round(length * 100) / 100) + ' m'
  }

  formatArea = polygon => {
    let area = ol.Sphere.getArea(polygon)
    return area > 10000
      ? (Math.round(area / 1000000 * 100) / 100) + ' km<sup>2</sup>'
      : (Math.round(area * 100) / 100) + ' m<sup>2</sup>'
  }

  handleEndMeasuring = () => {
    this.sketch = null
    ol.Observable.unByKey(this.listener)
  }

  deactive = map => {
    this.isActive = false
    map.removeInteraction(this.draw)
    map.removeOverlay(this.helpTooltip)
    map.removeOverlay(this.measureTooltip)
    document.removeEventListener('keydown', this.handleDeactive)
  }
}

export default new Ruler
