import Razorpay from "razorpay";

export default async function paymentGateway(totalAmount) {
  try {
    const response = await fetch(
      "https://api-production-f5b0.up.railway.app/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount, // Send totalAmount directly to backend
          currency: "INR", // Optionally, you can specify currency if needed
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch order ID");
    }

    const { order_id } = await response.json();

    const options = {
      key_id: "rzp_test_hrbQr4W0doVFUt",
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      name: "Food App",
      description: "Payment for Food Order",
      image: "https://static.vecteezy.com/system/resources/previews/008/687/818/non_2x/food-delivery-logo-free-vector.jpg",
      order_id: order_id, // Use the correct property name from backend response
      handler: function (response) {
        console.log("Payment success:", response);
        // You can handle success actions here, e.g., redirect to a thank you page
      },
      prefill: {
        name: "Naman",
        email: "namanuppal@gmail.com",
        contact: "9012345678",
      },
      notes: {
        address: "123, Street",
      },
      theme: {
        color: "#F37254",
      },
    };

    console.log("OPTIONS ARE:", options);
    console.log("ORDER_ID IS:", order_id); // Correctly log order_id

    // Dynamically load the Razorpay script if it's not already loaded
    if (typeof Razorpay === "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    } else {
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
      razorpay.open();
    }

  } catch (error) {
    console.error("Payment gateway error:", error);
    // Handle error as per your application's needs
  }
}
