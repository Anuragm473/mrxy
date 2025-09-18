// src/components/CheckoutButton.tsx (simplified)
import React from "react";

async function createOrder(token: string, cartPayload: any) {
  const res = await fetch("/api/checkout/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cartPayload),
  });
  return res.json();
}

export default function CheckoutButton({ token, cartPayload }: { token: string; cartPayload: any }) {
  const handleCheckout = async () => {
    const data = await createOrder(token, cartPayload);
    if (data?.error) {
      alert(data.error);
      return;
    }

    const options: any = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: "CapShap",
      description: "Order payment",
      order_id: data.razorpayOrderId,
      handler: async function (response: any) {
        // Send payment verification to server
        const verify = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            orderId: data.orderId,
          }),
        });
        const verifyRes = await verify.json();
        if (verifyRes?.success) {
          // Redirect to success page
          window.location.href = `/order/success?orderId=${data.orderId}`;
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        // you can pass buyer details here
      },
      theme: { color: "#ff6f00" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return <button onClick={handleCheckout} className="btn">Pay now</button>;
}
