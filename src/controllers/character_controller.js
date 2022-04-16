import models from '../models'
import BaseController from './base'

const axios = require('axios')

export default class CharacterController extends BaseController {
  CharacterController() { }

  async getMultipleChar(req, res) {
    try {
      const N = 15
      const rangeArray = [...Array(N + 1).keys()].slice(1)
      const multipleChar = await axios.get(`https://rickandmortyapi.com/api/character/${rangeArray}`)
      const filteredMultipleChar = multipleChar.data.map((item) => {
        return {
          name: item.name,
          status: item.status,
          species: item.species,
          origin: item.origin.name
        }
      })
      const counter = filteredMultipleChar.length
      return super.Success(res, { message: `Successfully GET Multiple Character request, count: ${counter}`, data: filteredMultipleChar })
    } catch (err) {
      console.log(err)
    }
  }

  async getCharByName(req, res) {
    try {
      const { name } = req.params
      const CharByNameFromPostgres = await models.Character.findAll({
        where: {
          name
        }
      })

      if (CharByNameFromPostgres.length !== 0) {
        return super.Success(res, { message: 'GET Characters by Name request successfully', data: CharByNameFromPostgres })
      } else {
        const CharactersByName = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`)
        const filteredCharByName = CharactersByName.data.results.map((item) => {
          return {
            name: item.name,
            status: item.status,
            species: item.species,
            origin: item.origin.name
          }
        })
        return super.Success(res, { message: 'GET Characters by Name request successfully', data: filteredCharByName })
      }
    } catch (error) {
      console.log(error)
      return super.NotFound(res, { message: '404 Character Not Found', data: error.response.data })
    }
  }

  async create(req, res) {
    try {
      const { name, status, species, origin } = req.body
      const newChar = await models.Character.create({
        name,
        status,
        species,
        origin
      }, {
        fields: ['name', 'status', 'species', 'origin']
      })
      return super.Success(res, { message: 'Character created successfully', data: newChar })
    } catch (error) {
      console.log(error)
      return super.ErrorBadRequest(res, { message: '400 Bad Request', error: error.errors.map(item => item.message) })
    }
  }

  async show(req, res) {
    return super.Success(res, '')
  }
}
