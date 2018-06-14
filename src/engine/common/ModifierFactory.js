import { ACCOUNT_CODE, CERTIFICATE_CODE,
          GOVERN_DOC_CODE} from '../common/Constants'
import EmptyModifier from '../modifiers/EmptyModifier'
import AccountModifier from '../modifiers/AccountModifier'
import CertificateModifier from '../modifiers/CertificateModifier'
import GovernmentDocumentModifier from '../modifiers/GovernmentDocumentModifier'

class ModifierFactory {
  buildFor = code => {
    switch(code) {
      case ACCOUNT_CODE:
        return AccountModifier
      case CERTIFICATE_CODE:
        return CertificateModifier
      case GOVERN_DOC_CODE:
        return GovernmentDocumentModifier
      default:
        return EmptyModifier
    }
  }
}

export default new ModifierFactory
