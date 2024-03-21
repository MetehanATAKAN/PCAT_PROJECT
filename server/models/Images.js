import mongoose from 'mongoose';

const pcatSchema = mongoose.Schema({
    title:String,
    description:String,
    image:String
})

export default mongoose.model('photos',pcatSchema);