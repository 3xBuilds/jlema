import mongoose, {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    wallet: {
        type: String,
        required: true,
        immutable: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    dp: {
        type: String,
    },
    twitter: {
        type: String,
    },
    highlights: {
        type: Array,
    },
    points: {
        type: Number,
        default: 0
    },
    jlema: {
        type: Number,
        default: 0
    },
    jlemalegendary: {
        type: Number,
        default: 0
    },
    specialEdition:{
        type: Number,
        default: 0
    },
    badges: {
        type: Array,
        default: []
    }
  }, {collection: "users"})

  const User = models.User || model('User', UserSchema);

  export default User