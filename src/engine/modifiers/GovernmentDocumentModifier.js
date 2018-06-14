import Modifier from './Modifier' 
import { GOVERN_DOC_CODE } from '../common/Constants'

class GovernmentDocumentModifier extends Modifier {

  getEditableFields = store => {
    return ['docId', 'docContent', 'docLink']
      .map(fieldName => this.getFieldByFieldName(store, fieldName))
  }

  getTitle = () => 'Thêm mới văn bản nhà nước'

  getNamespace = () => GOVERN_DOC_CODE
}

export default new GovernmentDocumentModifier

