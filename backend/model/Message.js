var mongoose = require('mongoose');
var messageSchema = mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: "chatroom is required",
        ref: "Chatroom",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "user is required",
        ref: "User",
    },
    message: {
        type: String,
        required: "Message is required!"
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Message', messageSchema);
