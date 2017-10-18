import camelcaseKeys from 'camelcase-keys'
import  _ from 'lodash'

export const  camel = {
    convertObj :(obj)=> camelcaseKeys(obj),
    convertArr : (arr)=>  _.map(arr, (item)=> camelcaseKeys(item))
}
export default camel