import { Schema as _Schema, model} from 'mongoose';
 
const LocationSchema = new _Schema({
    name:{
        type: String, 
        required: true
    },
    createdBy:{
        type: _Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
});

const Location =model('Location',LocationSchema);

export default Location;