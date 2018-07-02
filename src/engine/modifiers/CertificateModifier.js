import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import Modifier from './Modifier'
import { host, MODIFIER_DIALOG, CERTIFICATE_CODE } from '../common/Constants'
import { valueChange } from '../actions'
import RequestPacker from '../common/RequestPacker'
import DataLoader from '../common/DataLoader'

const targetOfUse = [
  {value: 'CAN', label: 'Đất an ninh'},
  {value: 'CQP', label: 'Đất quốc phòng'},
  {value: 'DGD', label: 'Đất giáo dục'},
  {value: 'DGT', label: 'Đất giao thông'},
  {value: 'DVH', label: 'Đất văn hóa'},
  {value: 'DYT', label: 'Đất y tế'},
  {value: 'ODT', label: 'Đất ở đô thị'},
  {value: 'SKC', label: 'Đất cơ sở sản xuất kinh doanh'},
  {value: 'TSC', label: 'Đất trụ sở cơ quan, công trình sự nghiệp nhà nước'},
  {value: 'TIN', label: 'Đất tín ngưỡng'},
  {value: 'TON', label: 'Đất tôn giáo'},
  {value: 'DRA', label: 'Đất bãi thải, xử lý chất thải'},
  {value: 'MNC', label: 'Đất có mặt nước chuyên dùng'},
  {value: 'RPT', label: 'Đất có rùng trồng phòng hộ'},
  {value: 'DKV', label: 'Đất khu vui chơi, giải trí công cộng'},
  {value: 'DCH', label: 'Đất chợ'},
  {value: 'DNL', label: 'Đất công trình năng lượng'},
]

class CertificateModifier extends Modifier {

  cache

  getFields = data => [
    {
      name: 'id',
      label: 'Số hiệu GCN',
      type: 'text',
      value: data.id,
      listener: this.makeListenerFor('id'),
      readOnly: this.editMode
    },
    {
      name: 'signDate',
      label: 'Ngày ký',
      type: 'date',
      value: data.signDate,
      listener: this.makeListenerFor('signDate')
    },
    {
      name: 'provider',
      label: 'Cơ quan cấp',
      type: 'text',
      value: data.provider,
      listener: this.makeListenerFor('provider')
    },
    {
      name: 'privateArea',
      label: 'Diện tích riêng',
      type: 'number',
      value: data.privateArea,
      listener: this.makeListenerFor('privateArea')
    },
    {
      name: 'publicArea',
      label: 'Diện tích chung',
      type: 'number',
      value: data.publicArea,
      listener: this.makeListenerFor('publicArea')
    },
    {
      name: 'targetOfUse',
      label: 'Mục đích sử dụng',
      type: 'picker',
      value: data.targetOfUse,
      options: targetOfUse, listener: this.makeListenerFor('targetOfUse')
    },
    {
      name: 'goodUntil',
      label: 'Thời hạn sử dụng',
      type: 'date',
      value: data.goodUntil,
      listener: this.makeListenerFor('goodUntil')
    },
    {
      name: 'sourceOfUse',
      label: 'Nguồn gốc sử dụng',
      type: 'text',
      value: data.sourceOfUse,
      listener: this.makeListenerFor('sourceOfUse')
    }
  ]

  getTitle = () => (
    this.editMode
      ? 'Cập nhật thông tin giấy chứng nhận'
      : 'Thêm mới giấy chứng nhận'
  )

  getNamespace = () => CERTIFICATE_CODE

  getEditableFields = () => []

  buildViewUpperPart = store => {
    this.logCache(store)
    return (
      <div
        onDragOver={e=>e.preventDefault()}
        onDrop={this.onDrop}
      >
        {
          this.getFields(store).map(this.buildField)
        }
        <div className="w3-row" key={'plan'}>
          <div className="w3-col s5">
            <label className="w3-text-blue">Thửa đất:</label>
          </div>
          <div className="w3-col s7">
            {
              (store.plans && store.plans.length > 0)
                ?
                <div>
                  {
                    store.plans.map(p =>
                      this.buildRemovableItem(
                        'Tờ: '+p.mid+' | Thửa: '+p.pid,
                        () => this.removePlan(p.gid),
                        p.gid
                      )
                    )
                  }
                </div>
                : <small>Kéo và thả thửa đất tại đây</small>
            }
          </div>
        </div>
        <div className="w3-row" key={'puser'}>
          <div className="w3-col s5">
            <label className="w3-text-blue">Chủ sử dụng:</label>
          </div>
          <div className="w3-col s7">
            {
              (store.pusers && store.pusers.length > 0)
                ?
                <div>
                  {
                    store.pusers.map(u =>
                      this.buildRemovableItem(
                        '['+u.puid+'] '+u.name,
                        () => this.removePuser(u.puid),
                        u.id
                      )
                    )
                  }
                </div>
                : <small>Kéo và thả chủ sử dụng đất tại đây</small>
            }
          </div>
        </div>
      </div>
    )
  }

  logCache = store => {
    this.cache = store
  }

  buildField = fieldInfo => {
    return (
      <div className="w3-row" key={fieldInfo.name}>
        <div className="w3-col s5">
          <label className="w3-text-blue">{fieldInfo.label}:</label>
        </div>
        <div className="w3-col s7">
          {
            this.buildInput(fieldInfo)
          }
        </div>
      </div>
    )
  }

  buildInput = fieldInfo => {
    let tag
    switch(fieldInfo.type) {
      case 'picker':
        tag = 
          <select
              className="w3-input w3-border"
              value={fieldInfo.value || '_'}
              onChange={e=>fieldInfo.listener(e.target.value)}
          >
            {
              [
                {value:'_', label:'...'},
                ...fieldInfo.options
              ].map(o =>
                <option key={o.value} value={o.value}>{o.label}</option>
              )
            }
          </select>
        break
      case 'date':
        tag = 
          <DatePicker
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="w3-input w3-border"
            dateFormat="DD/MM/YYYY"
            selected={fieldInfo.value ? moment(fieldInfo.value) : undefined}
            onChange={e=>fieldInfo.listener(e.valueOf())}
          />
        break
      case 'number':
        tag =
          <input
            type="text"
            className="w3-input w3-border"
            value={fieldInfo.value}
            onChange={e=>fieldInfo.listener(e.target.value)}
          />
        break
      default:
        tag =
          <input
            type="text"
            className="w3-input w3-border"
            value={fieldInfo.value}
            onChange={e=>fieldInfo.listener(e.target.value)}
            disabled={fieldInfo.readOnly}
          />
        break
    }
    return tag
  }

  onDrop = event => {
    event.preventDefault();
    const code = event.dataTransfer.getData('code')
    const payload = JSON.parse(event.dataTransfer.getData('payload'))
    if (code === 'plan') {
      this.addPlan(payload)
    }
    if (code === 'puser') {
      this.addPuser(payload)
    }
  }

  addPlan = payload => {
    const currentPlans = this.cache.plans || []
    const existed = currentPlans.filter(p => p.gid === payload.gid).length > 0
    if (existed)
      return
    const nextPlans = [...currentPlans, this.convertPlan(payload)]
    this.reactor(
      valueChange(MODIFIER_DIALOG, this.getNamespace()+'.plans', nextPlans)
    )
  }

  convertPlan = ori => {
    return {
      pid: ori.pid,
      mid: ori.shbando,
      pid: ori.shthua
    }
  }

  addPuser = payload => {
    const currentPusers = this.cache.pusers || []
    const existed = currentPusers
      .filter(u => u.puid === payload.puserId).length > 0
    if (existed)
      return
    const nextPusers = [...currentPusers, this.convertPuser(payload)]
    this.reactor(
      valueChange(MODIFIER_DIALOG, this.getNamespace()+'.pusers', nextPusers)
    )
  }

  convertPuser = ori => {
    console.log('cout << try to convert: ', JSON.stringify(ori))
    return {
      puid: ori.puserId,
      name: ori.personalName || ori.groupName
    }
  }

  buildRemovableItem = (text, onRemove, key) => (
    <div key={key} className="w3-card w3-hover-blue w3-padding removable-item">
      {text}
      <span className="remove-btn" onClick={onRemove}>x</span>
    </div>
  )

  removePlan = pid => {
    const currentPlans = this.cache.plans || []
    const nextPlans = currentPlans.filter(p => p.gid !== pid)
    this.reactor(
      valueChange(
        MODIFIER_DIALOG,
        this.getNamespace()+'.plans',
        nextPlans
      )
    )
  }

  removePuser = uid => {
    const currentPusers = this.cache.pusers || []
    const nextPusers = currentPusers.filter(u => u.puid !== uid)
    this.reactor(
      valueChange(
        MODIFIER_DIALOG,
        this.getNamespace()+'.pusers',
        nextPusers
      )
    )
  }

  onSubmit = store => {
    const payload = {
      ...store,
      pusers: store.pusers
        ? store.pusers.map(u => u.puid)
        : [],
      plans: store.plans
        ? store.plans.map(p => p.gid)
        : []
    }
    this.lauchPayload(payload)
  }

  lauchPayload = payload => {
    fetch(
      host + '/certificate',
      this.editMode
        ? RequestPacker.packAsPut(payload)
        : RequestPacker.packAsPost(payload)
    ).then(e=>e.json())
    .then(rs => this.handleResult(rs, payload))
  }

  handleErrorOnResult = (res, payload) => {
    return false
  }

}

export default new CertificateModifier

