import Modifier from './Modifier'

class EmptyModifier extends Modifier {
  buildView = () => ('')
}

export default new EmptyModifier

