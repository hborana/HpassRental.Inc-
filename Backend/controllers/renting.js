const carListings = require("../models/carListings")
const rentItems = require("../models/renting")
const login = require("../models/login")
const {StatusCodes} = require("http-status-codes")
const stripe = require('stripe')(process.env.STRIPE_KEY)

const rentItem = async(req,res)=>{
    const owner_id = await carListings.findOne({_id:req.body.item_id})
    req.body.owner_id = owner_id.ownerId.toString()
    const user_id = req.user.userID
    req.body.user_id = user_id
    const rentItem = await rentItems.create(req.body)
    const update = await carListings.findOneAndUpdate({_id:req.body.item_id},{rentStatus:true},{new:true, runValidators:true})
    res.status(StatusCodes.OK).json({message:"item rented", data:{rentItem}, status_code:StatusCodes.OK})
}

const stripePayment = async(req, res) =>{
    // const {} = req.body;

    // const calculateOrderAmount = () =>{
    //     // add code to do payment
    // }
    const total = 3000
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency: 'usd'
    })
          
    res.status(StatusCodes.OK).json({message:"success", data:{clientSecret:paymentIntent.client_secret}, status_code:StatusCodes.OK})


}


const sendPaymentEmail = async(req,res)=>{ 
    const user = await login.findOne({_id:req.user.userID})   
    const text = "your payment for the item for the cost of "+req.body.total+" is done"
    console.log(user.email)
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
          to: user.email, 
          from: 'hpass609@gmail.com', 
          subject: 'Payment Done',
          text: text,
    }
    const info = sgMail.send(msg)          
    res.status(StatusCodes.OK).json({message:"success", data:"email has been sent", status_code:StatusCodes.OK})


}




const mostRentedItems = async(req,res)=>{
    const items = await rentItems.find({})
    let freq = {}
    for (let i = 0; i < items.length; i++){
        if (!freq[items[i].item_id]){
            freq[items[i].item_id] = 1
        }
        else{
        freq[items[i].item_id]+=1
        }
    }
    const largestValue = Math.max(...Object.values(freq));
    const largestObject = Object.entries(freq).find(([key, value]) => value === largestValue);
    const itemDetails = await carListings.findOne({_id:largestObject[0]})
    const responseObject = {itemdetails:itemDetails, item_frequency: largestObject[1]}
    res.status(StatusCodes.OK).json({message:"success", data:responseObject , status_code:StatusCodes.OK})
}


const mostRentedItemsForUser = async(req,res)=>{
    console.log(req.user.userID)
    const items = await rentItems.find({owner_id:req.user.userID})
    let freq = {}
    for (let i = 0; i < items.length; i++){
        if (!freq[items[i].item_id]){
            freq[items[i].item_id] = 1
        }
        else{
        freq[items[i].item_id]+=1
        }
    }
    const largestValue = Math.max(...Object.values(freq));
    const largestObject = Object.entries(freq).find(([key, value]) => value === largestValue);
    const itemDetails = await carListings.findOne({_id:largestObject[0]})
    const responseObject = {itemdetails:itemDetails, item_frequency: largestObject[1]}
    res.status(StatusCodes.OK).json({message:"success", data:responseObject , status_code:StatusCodes.OK})
}




module.exports = {rentItem, stripePayment,sendPaymentEmail, mostRentedItems, mostRentedItemsForUser}