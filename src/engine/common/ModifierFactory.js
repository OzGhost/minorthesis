import { ACCOUNT_CODE } from '../common/Constants'
import EmptyModifier from '../modifiers/EmptyModifier'
import AccountModifier from '../modifiers/AccountModifier'

class ModifierFactory {
  buildFor = code => {
    switch(code) {
      case ACCOUNT_CODE:
        return AccountModifier
      default:
        return EmptyModifier
    }
  }
}

export default new ModifierFactory
