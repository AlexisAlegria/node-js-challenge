import models from '../models'
import BaseController from './base'

const axios = require('axios')

export default class CharacterController extends BaseController {
  CharacterController () { }

  async get (req, res) {
    try {
      const { id } = req.params
      const oneChar = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      const characterArray = []
      characterArray.push(oneChar.data)
      const filteredOneChar = characterArray.map((item) => {
        return {
          name: item.name,
          status: item.status,
          species: item.species,
          origin: item.origin.name
        }
      })

      return super.Success(res, { message: 'Successfully GET Single Character request', data: filteredOneChar })
    } catch (err) {
      console.log(err)
    }
  }

  async getMultipleChar (req, res) {
    try {
      const N = 22
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

      return super.Success(res, { message: 'Successfully GET Multiple Character request', data: filteredMultipleChar })
    } catch (err) {
      console.log(err)
    }
  }

  async getCharByName (req, res) {
    try {
      const { name } = req.params
      const CharactersByName = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`)
      const filteredCharByName = CharactersByName.data.results.map((item) => {
        return {
          name: item.name,
          status: item.status,
          species: item.species,
          origin: item.origin.name
        }
      })

      return super.Success(res, { message: 'Successfully GET Characters by Name request', data: filteredCharByName })
    } catch (err) {
      console.log(err)
    }
  }

  async getCharByNameFromPostgres (req, res) {
    try {
      const { name } = req.params
      const CharByNameFromPostgres = await models.Character.findAll({
        where: {
          name
        }
      })
      return super.Success(res, { message: 'Successfully GET Characters by Name request', data: CharByNameFromPostgres })
    } catch (err) {
      console.log(err)
    }
  }

  async create (req, res) {
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
  }

  async show (req, res) {
    return super.Success(res, '')
  }
}
