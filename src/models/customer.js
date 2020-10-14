const mongosse =  require('mongoose');
const Schema = mongosse.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    
})