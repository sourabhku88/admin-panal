import mongoose from "mongoose";

const userdSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.SchemaTypes.ObjectId, ref: 'roles' },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false,
});

export const Users = mongoose.model('users', userdSchema);