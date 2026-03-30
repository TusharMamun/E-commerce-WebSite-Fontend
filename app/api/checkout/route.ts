import { ProductTyps } from "@/type"
import { NextRequest, NextResponse } from "next/server"
import Stripe from 'stripe';
export const POST = async (request: NextRequest) => {
const strip =new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const { item, email } = await request.json()
    
    const lineItems = item.map((item: ProductTyps) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.description?.substring(0, 500),
          images: item.images 
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }))
console.log(lineItems)

    // })
const session = await strip.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
    metadata: {
email
    }
});
console.log(session)

    return NextResponse.json(
   {
    message:"succes to Retrive",
    success:true,
    id:session.id,
url: session.url


   }
    )
    
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}