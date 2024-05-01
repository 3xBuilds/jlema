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
        default: [0,0,0]
    },
    points: {
        type: Number,
        default: 0
    }
  }, {collection: "users"})

  const User = models.User || model('User', UserSchema);

  export default User