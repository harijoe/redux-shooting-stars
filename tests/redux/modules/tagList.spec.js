import {
  TAGLIST_ADD,
  TAGLIST_REMOVE,
  addTag,
  removeTag,
  default as tagListReducer
} from 'redux/modules/tagList'

import Immutable from 'immutable'

describe('(Redux Module) TagList', function () {
  it('Should export a constant TAGLIST_ADD.', function () {
    expect(TAGLIST_ADD).to.equal('TAGLIST_ADD')
    expect(TAGLIST_REMOVE).to.equal('TAGLIST_REMOVE')
  })

  describe('(Reducer)', function () {
    it('Should be a function.', function () {
      expect(tagListReducer).to.be.a('function')
    })

    it('Should initialize with an empty set (object).', function () {
      expect(tagListReducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', function () {
      let state = tagListReducer(undefined, {})
      expect(state.size).to.equal(0)
      state = tagListReducer(state, {type: '@@@@@@@'})
      expect(state.size).to.equal(0)
      state = tagListReducer(state, addTag('myTag'))
      expect(state.size).to.equal(1)
      state = tagListReducer(state, {type: '@@@@@@@'})
      expect(state.size).to.equal(1)
      expect(state.has('myTag')).to.be.true
      state = tagListReducer(state, removeTag('myTag'))
      expect(state.has('myTag')).to.be.false

    })
  })

  describe('(Action Creator) addTag', () => {
    it('Should be exported as a function', () => {
      expect(addTag).to.be.a('function')
    })

    it('Should return an action with type "TAGLIST_ADD".', () => {
      expect(addTag()).to.have.property('type', TAGLIST_ADD)
    })

    it('Should assign the first argument to the "payload" property.', function () {
      expect(addTag('myTag')).to.have.property('payload', 'myTag')
    })

    it('Should default to empty string if "payload" property was not provided.', function () {
      expect(addTag()).to.have.property('payload', '')
    })
  })

  describe('(Action Creator) removeTag', () => {
    it('Should be exported as a function', () => {
      expect(removeTag).to.be.a('function')
    })

    it('Should return an action with type "TAGLIST_REMOVE".', () => {
      expect(removeTag()).to.have.property('type', TAGLIST_REMOVE)
    })

    it('Should assign the first argument to the "payload" property.', function () {
      expect(removeTag('myTag')).to.have.property('payload', 'myTag')
    })

    it('Should default to empty string if "payload" property was not provided.', function () {
      expect(removeTag()).to.have.property('payload', '')
    })
  })

  describe('(Action Handler) TAGLIST_ADD', function () {
    it('Should add the tag in the state with the action payload\'s "value" property.', function () {
      let state = tagListReducer(undefined, {})
      expect(state.size).to.equal(0)
      state = tagListReducer(state, addTag('myTag'))
      expect(state.has('myTag')).to.equal(true)
      expect(state.size).to.equal(1)
      state = tagListReducer(state, addTag(''))
      expect(state.has('myTag')).to.equal(true)
      expect(state.size).to.equal(1)
      state = tagListReducer(state, addTag('myTag'))
      expect(state.has('myTag')).to.equal(true)
      expect(state.size).to.equal(1)
    })
  })

  describe('(Action Handler) TAGLIST_REMOVE', function () {
    it('Should remove the tag in the state with the action payload\'s "value" property.', function () {
      let state = tagListReducer(Immutable.Set(['myTag', 'myNewTag']), {})
      expect(state.size).to.equal(2)
      state = tagListReducer(state, removeTag('myNewTag'))
      expect(state.has('myTag')).to.equal(true)
      expect(state.size).to.equal(1)
      state = tagListReducer(state, removeTag(''))
      expect(state.has('myTag')).to.equal(true)
      expect(state.size).to.equal(1)
    })
  })
})
