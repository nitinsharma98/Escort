const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema} = require("./schema.js");



module.exports.isLoggedIn = (req , res , next) =>{

    if( !req.isAuthenticated() ){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in  !");
        return res.redirect("/login");
       }
       next();
}


module.exports.saveRedirectUrl = (req , res , next )  => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req , res , next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error", "You are not owner of this Listing !");
        return res.redirect(`/listings/${id}`)
    }
    next();
};


module.exports.validateListing = (req , res ,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 ,errMsg);                                          // is function me 1st error ko result , 2 nd ko result.error,validation vdo last cancle el.msg cut all change is in all missing only show listing is missig 
    }else{
        next();
    }
};

module.exports.validateReview = (req , res ,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 ,errMsg);                                          // is function me 1st error ko result , 2 nd ko result.error,validation vdo last cancle el.msg cut all change is in all missing only show listing is missig 
    }else{
        next();
    }
};




module.exports.isReviewAuthor = async (req, res, next) => {
    try {
      const { id, reviewId } = req.params;
      const review = await Review.findById(reviewId);
    
  
      if (!review)      
   {
        return res.status(404).send('Review not found'); // Handle review not found
      }
  
      if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not author of this Review !");
        return res.redirect(`/listings/${id}`);
      }
  
      next(); 
  
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error'); // Handle unexpected errors
    }
  };




// module.exports.isReviewAuthor = async(req , res , next) =>{
//     let {id, reviewId} = req.params;
//     let review = await Review.findById(reviewId);
//     if(!review.author.equals(res.locals.currentUser._id)){
//         req.flash("error", "You are not author of this Review !");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// };
