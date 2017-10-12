import topic from './topics'

export default routers ={
    resolve :(app)=>{
        app.use('/topics', topic)
    }
}