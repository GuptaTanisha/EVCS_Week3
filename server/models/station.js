import mongoose from 'mongoose';

const stationSchema = mongoose.Schema({
    slot: {type: Number,
        max: 24},
    stationId: Number
});

const Station= mongoose.model('Station',stationSchema);
export default Station;