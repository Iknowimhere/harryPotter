const {Schema,model}=require('mongoose')

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,'username field is required']
    },
    email:{
        type:String,
        required:[true,'email field is required']
    },
    phone:{
        type:Number,
        required:[true,'phone field is required']
    },
    photo:{
        type:String,
    }
},{
    timestamps:true
}
)

module.exports=model('person',userSchema)