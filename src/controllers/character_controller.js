import models from '../models'
import BaseController from './base'

const axios = require('axios')

export default class CharacterController extends BaseController {
  CharacterController () { }

  async getMultipleChar (req, res) {
    try {
      const { numberOfChar } = req.params
      const regex = /[^0-9]/

      if (numberOfChar <= 0 || regex.test(numberOfChar) === true) {
        return super.ErrorBadRequest(res, { message: '400 Bad Request. You should enter a positive integer number' })
      }

      const rangeArray = [...Array(parseInt(numberOfChar) + 1).keys()].slice(1)
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
      return super.Success(res, { message: `GET Multiple Character request successfully, count: ${counter}`, data: filteredMultipleChar })
    } catch (error) {
      console.log(error)
    }
  }

  async getCharByName (req, res) {
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

  async create (req, res) {
    try {
      const { name, status, species, origin } = req.body

      if (!name || !status || !species || !origin) {
        return super.ErrorBadRequest(res, { message: '400 Bad Request. All fields are required' })
      }

      const characterExists = await models.Character.findOne({
        where: {
          name
        }
      })

      if (characterExists) {
        return super.ErrorBadRequest(res, { message: '400 Bad Request. Character already exists!' })
      }

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
      return super.InternalError(res, { message: '500 Internal Server Error.', error })
    }
  }
}
