const mongoose = require("mongoose");

const tdmMatchSchema = new mongoose.Schema(
{
    tournament:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tournament",
        required:true
    },

    round:{
        type:Number,
        required:true
    },

    matchNumber:{
        type:Number,
        required:true
    },

    teamA:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TeamRegistration",
        default:null
    },

    teamB:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TeamRegistration",
        default:null
    },

    winner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TeamRegistration",
        default:null
    },

    nextMatch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TDMMatch",
        default:null
    },

    status:{
        type:String,
        enum:["upcoming","live","completed"],
        default:"upcoming"
    },

    matchTime:{
        type:Date
    }

},
{
    timestamps:true
});

module.exports=mongoose.model("TDMMatch",tdmMatchSchema);