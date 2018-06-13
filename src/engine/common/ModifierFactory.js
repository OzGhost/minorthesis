import { ACCOUNT_CODE, CERTIFICATE_CODE } from '../common/Constants'
import EmptyModifier from '../modifiers/EmptyModifier'
import AccountModifier from '../modifiers/AccountModifier'
import CertificateModifier from '../modifiers/CertificateModifier'

class ModifierFactory {
  buildFor = code => {
    switch(code) {
      case ACCOUNT_CODE:
        return AccountModifier
      case CERTIFICATE_CODE:
        return CertificateModifier
      default:
        return EmptyModifier
    }
  }
}

export default new ModifierFactory
