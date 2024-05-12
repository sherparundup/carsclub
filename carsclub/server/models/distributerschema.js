const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const distributorSchema = new mongoose.Schema({
     distributorName: {
         type : String,
         required: true
     },
     email: {
         type: String,
         required: true
     },
     phone: {
        type: String,
        required: true
    },
    distributorPassword: {
        type: String,
        required: true
    },
    cPassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token:{
                type: String
            }
        }
    ]
})

// hashing password

distributorSchema.pre('save', async function(next){
    
    if(this.isModified('distributorPassword')){
        this.distributorPassword = await bcrypt.hash(this.distributorPassword, 12);
        this.cPassword = await bcrypt.hash(this.cPassword, 12);
    }
    next();

});


//generating token
distributorSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err){
        console.log(err)
    }
}


const Distributor = mongoose.model('Distributor', distributorSchema);

module.exports = Distributor;
