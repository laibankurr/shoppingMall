import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { sandboxId } from "../PaypalSetup";

export default class Paypal extends React.Component {
  render() {
    const onSuccess = (payment) => {
      console.log("Your payment was successful.", payment);

      this.props.onSuccess(payment);
    };

    const onCancel = (data) => {
      console.log("Payment failed.", data);
    };

    const onError = (err) => {
      console.log("Error!", err);
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.total;

    const client = {
      sandbox: sandboxId,
      production: "YOUR-PRODUCTION-APP-ID",
    };

    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={{
          size: "small",
          color: "white",
          shape: "pill",
          label: "checkout",
        }}
      />
    );
  }
}
