const joi = require('joi')
const Home = (Conditions) => {
  const home = (req, res) => {
    /**
     * @param       GET /
     * @desc        Displays my credentials in a json format using the JSEND standard
     * @access      public( Every one can access)
     */
    res.status(200).json({
      "message": "My Rule-Validation API",
      "status": "success",
      "data": {
        "name": "UDOFIA ABASIODIONG",
        "github": "@udofia2",
        "email": "enalsy22@gmail.com",
        "mobile": "08137024087",
        "twitter": "@enalsy2"
      }
    })
  }

  const validate = async (req, res) => {
    const schema = joi.object().keys({

      rule: joi.object().keys({
          field: joi.string()
            .required()
            .messages({
              'string.base': `[Field] should be a type of 'String'`,
              'string.empty': `[Field] cannot be an empty field`,
              // 'string.min': `"a" should have a minimum length of {#limit}`,
              'any.required': `[Field] is a required`
            }),
          condition: joi.string()
            .required().valid('eq', 'neq', 'gt', 'gte'),
          condition_value: joi.number()
            .required(),

        })
        .required()
        .messages({
          'object.base': `[rule] should be an object`,
          'any.required': `[rule] is a required`
        }),
      
      data: joi.object().keys({
          field: joi.ref('...rule.field')
      })


    })

    try {
      const result = await schema.validateAsync(req.body);

      console.log(result.error)


      res.status(200).json({
        message: `field [${req.body.rule.field}] successfully validated`,
        status: "success",
        data: "yet to come"
      })

    } catch (err) {
      console.log(err)
      res.status(400).json({
        message: `${Object.values(err.details).map(a=> a.message)}.`,
        status: 'error',
        data: null,
      })

    }


  }

  /**
   * @param       POST /validation
   * @desc        Rule validation Route
   * @access      public( Every one can access)
   */
  const validate2 = async (req, res) => {

    const {
      field,
      condition,
      condition_value
    } = req.body

    try {

      // /b
      // const fieldCheck = field.split('.')
      // console.log(fieldCheck.length)
      // if (fieldCheck.length >= 2) {
      //   console.log('the field needs some implementation on the data level')
      // }


      const ruleCondition = ['eq', 'neq', 'gt', 'gte']
      console.log(Conditions.schema.path('condition').enumValues);
      const cond = new Conditions({
        field,
        condition,
        condition_value
      })

      await cond.save()

      // console.log(cond)

      res.status(200).json({
        // RULE as an OBJECT data type and all the required fields
        "rule": {
          field: cond.field,
          condition: cond.condition,
          condition_value: cond.condition_value
        },
        //DATA field as a valid JSON object, displaying the requirements from the RULE
        "data": "Yet to come"
      })

    } catch (err) {

      if (err.name == 'ValidationError') {
        //d
        console.error('Error Validating!', err);
        return res.status(400).json({
          "message": `[${Object.entries(err.errors).map((items, index) => items[index])}] is required.`,
          "status": "error",
          "data": null,
          err
        })

      } else if (err.name == "ReferenceError") {
        console.log(err)
        return res.json({
          "message": `${err}.`,
          "status": "error"
        })
      } else {
        console.error(err);
        res.status(500).json(err);
      }

    }

  }

  return {
    home,
    validate,
    validate2
  }
}

module.exports = Home