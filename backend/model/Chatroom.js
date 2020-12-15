var mongoose = require('mongoose');


var chatroomSchema = mongoose.Schema({
        _id :{type:mongoose.Types.ObjectId,required:true},
        chats: { type : Array , "default" : [] },
   },{ _id: false });
   
module.exports = mongoose.model('Chatroom', chatroomSchema);
