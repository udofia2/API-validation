const mongose = require('mongoose')

const { Schema } = mongose

const conditions = new Schema({
  // b1
  field: {
    type: String,
    required: true
  },
  // b2
  condition: {
    type: String,
    enum: ['eq', 'neq', 'gt', 'gte', 'contains'],
    required: true
  },
  // b3
  condition_value: {
    type: Number,
    required: true
  },

})

module.exports = mongose.model('conditions', conditions)