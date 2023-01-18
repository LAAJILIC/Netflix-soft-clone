import { loadStripe } from "@stripe/stripe-js";
//we can expose the publishable key but only for our app security it is recommended to put it in dotenv
//dotenv is environment file that only our application has acces to it 
export const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);