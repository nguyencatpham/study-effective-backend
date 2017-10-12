import camelcaseKeys from 'camelcase-keys'
import  _ from 'lodash'

export default camel = {
    convertObj :(obj)=> camelcaseKeys(obj),
    convertArr : (arr)=>  _.map(arr, (item)=> camelcaseKeys(item))
}