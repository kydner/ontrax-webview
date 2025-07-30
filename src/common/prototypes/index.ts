import stringPrototype from 'src/common/prototypes/string.prototype'
import numberPrototype from 'src/common/prototypes/number.prototype'
import arrayPrototype from 'src/common/prototypes/array.prototype'
import booleanPrototype from 'src/common/prototypes/boolean.prototype'
export default function () {
  stringPrototype()
  numberPrototype()
  arrayPrototype()
  booleanPrototype()
}
