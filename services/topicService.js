import async from 'asyncawait/async'
import entities from '../entities'
import path from 'path'
import config from "config"
import _ from 'lodash'
import camelResult from '../helper/camelResult'
import util from 'util'
import baseService from './baseService'

let tsconfig = config.get("host")

export default class services extends baseService {
  
}