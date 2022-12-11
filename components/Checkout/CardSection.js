import { CardElement } from '@stripe/react-stripe-js';

function CardSection(props) {
  return (
    <div>
      <div className="mt-6">
        <label htmlFor="card-element">Credit or Debit Card</label>

        <div className="mt-4">
          <fieldset style={{ border: 'none' }}>
            <div className="form-row">
              <div id="card-element" style={{ width: '100%' }}>
                <CardElement

                // options={{
                //   style: { width: '100%', base: { fontSize: '18px' } },
                // }}
                />
              </div>
              <br />
              <div className="order-button-wrapper">
                <button className="btn" onClick={props.submitOrder}>
                  Confirm order
                </button>
              </div>
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
              <div id="card-errors" role="alert" />
            </div>
          </fieldset>
        </div>
      </div>
      <style jsx>
        {`
          .order-button-wrapper {
            display: flex;
            width: 100%;
            align-items: flex-end;
            justify-content: flex-end;
          }
        `}
      </style>
    </div>
  );
}
export default CardSection;
