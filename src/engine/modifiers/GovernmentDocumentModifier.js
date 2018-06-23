import Modifier from './Modifier' 
import { host, GOVERN_DOC_CODE } from '../common/Constants'
import RequestPacker from '../common/RequestPacker'

class GovernmentDocumentModifier extends Modifier {

  getEditableFields = store => {
    return ['docCode', 'docContent', 'docLink']
      .map(fieldName => this.getFieldByFieldName(store, fieldName))
  }

  getTitle = () => 'Thêm mới văn bản nhà nước'

  getNamespace = () => GOVERN_DOC_CODE

  onSubmit = store => {
    if ( ! this.isPassPreCondition(store))
      return
    fetch(
      host + '/government-doc',
      RequestPacker.packAsPost(store)
    ).then(res=>res.json())
    .then(res=>this.handleResult(res, store))
  }

  isPassPreCondition = store => {
    const {docCode, docContent, docLink} = store
    if (typeof(docCode) !== 'string' || docCode.trim() === '') {
      this.pushMessage('Vui lòng điền số hiệu văn bản!', false)
      return false
    }
    if (typeof(docContent) !== 'string' || docContent.trim() === '') {
      this.pushMessage('Vui lòng điền nội dung văn bản!', false)
      return false
    }
    if (typeof(docLink) !== 'string' || docLink.trim() === '') {
      this.pushMessage('Vui lòng điền liên kết văn bản!', false)
      return false
    }
    return true
  }
}

export default new GovernmentDocumentModifier

