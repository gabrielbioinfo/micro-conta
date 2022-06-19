const ERROR = {
  GENERIC: 'errors.some.error',
  MISSING_IMPLEMENTATION: 'errors.missing.implementation',
  INVALID_OPERATION: 'errors.invalid.operation',
  ENTITY_NOT_FOUND: 'errors.entity.not.found',

  INVALID_FIELD_CHANGE: 'errors.invalid.field.change',
  INVALID_UUID: 'errors.invalid.uuid',
  INVALID_CPF: 'errors.invalid.cpf',
  INVALID_CPF_IS_REQUIRED: 'errors.invalid.cpf.is.required',
  INVALID_CPF_EMPTY: 'errors.invalid.cpf.empty',
  INVALID_CPF_REJECTED: 'errors.invalid.cpf.rejected',
  INVALID_CPF_ALLTHESAME: 'errors.invalid.cpf.allthesame',
  INVALID_CPF_NOT_UNIQUE: 'errors.invalid.cpf.notunique',
  INVALID_FULLNAME: 'errors.invalid.fullname',
  INVALID_FULLNAME_EMPTY: 'errors.invalid.fullname.empty',
  INVALID_AMOUNT: 'errors.invalid.amount',
  INVALID_AMOUNT_NEGATIVE: 'errors.invalid.amount.negative',

  INVALID_CONTA_DIGITAL: 'errors.invalid.contadigital',
  INVALID_CONTA_DIGITAL_MISSING_NUMBER:
    'errors.invalid.contadigital.missing.number',
  INVALID_CONTA_DIGITAL_MISSING_AGENCY:
    'errors.invalid.contadigital.missing.agency',

  CONTA_DIGITAL_CHANGE_FIELD_NOT_ALLOWED:
    'errors.contadigital.change.field.not.allowed',
  CONTA_DIGITAL_CHANGE_SALDO_NOT_ALLOWED:
    'errors.contadigital.change.saldo.not.allowed',
  CONTA_DIGITAL_SALDO_INSUFFICIENT: 'errors.contadigital.saldo.insufficient',
};

export default ERROR;
