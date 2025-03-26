import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

function StripeCheckout({ appointmentId }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = await stripe.createToken(elements.getElement(CardElement));

    axios.post("http://localhost:5001/api/payments", {
      appointmentId,
      stripeToken: token.id,
    })
    .then(() => alert("Payment Successful!"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}

export default StripeCheckout;
