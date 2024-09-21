import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false,
});

export const Roles = mongoose.model('roles', rolesSchema);