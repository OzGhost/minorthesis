import { ACCOUNT_CODE, CERTIFICATE_CODE,
          GOVERN_DOC_CODE, PLAN_USER_CODE} from '../common/Constants'
import EmptyModifier from '../modifiers/EmptyModifier'
import AccountModifier from '../modifiers/AccountModifier'
import CertificateModifier from '../modifiers/CertificateModifier'
import GovernmentDocumentModifier from '../modifiers/GovernmentDocumentModifier'
import PlanUserModifier from '../modifiers/PlanUserModifier'

class ModifierFactory {
  buildFor = code => {
    switch(code) {
      case ACCOUNT_CODE:
        return AccountModifier
      case CERTIFICATE_CODE:
        return CertificateModifier
      case GOVERN_DOC_CODE:
        return GovernmentDocumentModifier
      case PLAN_USER_CODE:
        return PlanUserModifier
      default:
        return EmptyModifier
    }
  }
}

export default new ModifierFactory
