//define model =============================================
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    joinedDate: { type: Date, default: Date.now },
    favorites: []  
});

UserSchema.methods.withoutPassword = function withoutPassword() {
    return {
        _id: this._id,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        joinedDate: this.joinedDate,
        favorites: this.favorites
    }
}

mongoose.model('users', UserSchema);

module.exports = mongoose.model('users'); 
