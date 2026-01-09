import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})

export class MyComponent {
  @State() firstName: string = '';
  @State() firstNameError: string = '';
  @State() firstNameTouched: string = "false";

  @State() middleName: string = '';

  @State() lastName: string = '';
  @State() lastNameError: string = '';
  @State() lastNameTouched: string = 'false';

  @State() cardNumber: string = '';
  @State() cardNumberError: string = '';
  @State() cardNumberTouched: string = 'false';

  @State() CVV: string = '';
  @State() CVVError: string = '';
  @State() CVVTouched: string = 'false';

  @State() expMonth: string = '';
  @State() expMonthError: string = '';
  @State() expMonthTouched: string = 'false';

  @State() expYear: string = '';
  @State() expYearError: string = '';
  @State() expYearTouched: string = 'false';

  @State() formIsValid: boolean = false;
  @State() paymentSuccess: boolean = false;



  handleChange(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    const regexOnlyNumbers = /^\d+$/;  // Regular expression to match only numbers

    switch (field) {
      case 'firstName':
        this.firstName = inputElement.value;
        this.firstNameTouched = "true";
        if (inputElement.checkValidity() === false) { this.firstNameError = `* First Name is a required field.`; } else { this.firstNameError = ''; }
        break;
      case 'middleName':
        this.middleName = inputElement.value;
        break;
      case 'lastName':
        this.lastName = inputElement.value;
        this.lastNameTouched = "true";
        if (inputElement.checkValidity() === false) { this.lastNameError = `* Last Name is a required field.`; } else { this.lastNameError = ''; }
        break;
      case 'cardNumber':
        this.cardNumber = inputElement.value;
        this.cardNumberTouched = "true";
        if ((inputElement.checkValidity() === false) || regexOnlyNumbers.test(this.cardNumber) === false) { this.cardNumberError = `Card Number is Invalid`; } else { this.cardNumberError = ''; }
        break;
      case 'CVV': this.CVV = inputElement.value;
        this.CVVTouched = "true";
        if ((inputElement.checkValidity() === false) || regexOnlyNumbers.test(this.CVV) === false) { this.CVVError = `CVV Number is Invalid`; } else { this.CVVError = ''; }
        break;
      case 'expMonth':
        this.expMonth = inputElement.value;
        this.expMonthTouched = "true";
        if ((inputElement.checkValidity() === false) || regexOnlyNumbers.test(this.expMonth) === false) { this.expMonthError = `invalid Month`; } else { this.expMonthError = ''; }
        break;
      case 'expYear':
        this.expYear = inputElement.value;
        this.expYearTouched = "true";
        if ((inputElement.checkValidity() === false) || regexOnlyNumbers.test(this.expYear) === false) { this.expYearError = `invalid Year`; } else { this.expYearError = ''; }
        break;
    }

    //this.formIsValid = this.isFormValid();

  }


  isFormValid(e: Event) {
    let allValid = false;

    if (
      this.firstNameError === '' &&
      this.lastNameError === '' &&
      this.cardNumberError === '' &&
      this.CVVError === '' &&
      this.expMonthError === '' &&
      this.expYearError === '' &&

      this.firstNameTouched === 'true' &&
      this.lastNameTouched === 'true' &&
      this.cardNumberTouched === 'true' &&
      this.CVVTouched === 'true' &&
      this.expMonthTouched === 'true' &&
      this.expYearTouched === 'true'
    ) {
      allValid = true;
    }

    this.formIsValid = allValid;
  }


  handleSubmit(e: Event) {
    e.preventDefault();
    this.formIsValid = false;

    // use an api from something like stripe to process payment
    console.log('Submitting payment with card number:', this.cardNumber);

    // Simulate token creation
    const token = { id: 'tok_sample123456' };

    // Simulate sending token to backend
    fetch('/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token, amount: 1000 }), // Amount in cents
    })
      .then(response => response.json())
      .then(data => {
        console.log('Payment successful:', data);
        // Handle success (e.g., redirect to thank you page)
      })
      .catch(err => console.error('Error:', err))

    
    // simulate success message
    this.paymentSuccess = true;
    // note: I dident have time to set up an express server to handle the payment processing
  }


  render() {
    return (<div>
      <form
        onSubmit={(e) => this.handleSubmit(e)} 
        onChange={(e) => this.isFormValid(e)} 
        id="paymentForm" 
        class="payment-form"
        aria-labelledby="payment Form"
        >

        <div class="total-due" aria-describedby="Total Due">Total Due: $100.00</div>

        <div class="section-header">Payment Information</div>
        <div class="section-subheader">Please enter your payment details below.</div>

        <div class="section-holder">
          <div class="input-group">
            <label htmlFor="name">First Name*:</label>
            <input
              id="firstName"
              type="text"
              required
              minlength="1"
              maxlength="30"
              value={this.firstName}
              onChange={(event) => this.handleChange(event, 'firstName')}
              data-touched={this.firstNameTouched}
              aria-required="true"
              aria-describedby="First Name"
              aria-invalid={this.firstNameError ? 'true' : 'false'}
            />
            <div class="error-message"><span role="alert" hidden={this.firstNameError.length ? false:true} >{this.firstNameError}</span></div>
          </div>

          <div class="input-group">
            <label htmlFor="middleName">Middle Initial:</label>
            <input
              id="middleName"
              type="text"
              maxlength="1"
              value={this.middleName}
              onInput={(event) => this.handleChange(event, 'middleName')}
              aria-required="false"
              aria-describedby="Middle Name"
            />
          </div>

          <div class="input-group">
            <label htmlFor="lastName">Last Name*:</label>
            <input
              id="lastName"
              type="text"
              required
              minlength="1"
              maxlength="30"
              value={this.lastName}
              onInput={(event) => this.handleChange(event, 'lastName')}
              data-touched={this.lastNameTouched}
              aria-required="true"
              aria-describedby="Last Name"
              aria-invalid={this.lastNameError ? 'true' : 'false'}
            />
            <div class="error-message"><span role="alert" hidden={this.lastNameError.length ? false:true} >{this.lastNameError}</span></div>
          </div>

        </div>



        <div class="section-holder">
          <div class="input-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              id="cardNumber"
              type="text"
              required
              minlength="16"
              maxlength="16"
              placeholder='0000000000000000'
              value={this.cardNumber}
              onInput={(event) => this.handleChange(event, 'cardNumber')}
              data-touched={this.cardNumberTouched}
              aria-required="true"
              aria-describedby="Card Number"
              aria-invalid={this.cardNumberError ? 'true' : 'false'}
            />
            <div class="error-message"><span role="alert" hidden={this.cardNumberError.length ? false:true} >{this.cardNumberError}</span></div>
          </div>
          <div class="input-group">
            <label htmlFor="CVV">CVV:</label>
            <input
              id="CVV"
              type="text"
              required
              minlength="3"
              maxlength="3"
              placeholder='000'
              value={this.CVV}
              onInput={(event) => this.handleChange(event, 'CVV')}
              data-touched={this.CVVTouched}
              aria-required="true"
              aria-describedby="CVV Number"
              aria-invalid={this.CVVError ? 'true' : 'false'}
            />
            <div class="error-message"><span role="alert" hidden={this.CVVError.length ? false:true} >{this.CVVError}</span></div>
          </div>
        </div>



        <div class="section-holder">

          <div class="input-group">
            <label htmlFor="expMonth">Expiration Month:</label>
            <input
              id="expMonth"
              type="number"
              min="1"
              max="12"
              maxlength="2"
              placeholder='MM'
              value={this.expMonth}
              onInput={(event) => this.handleChange(event, 'expMonth')}
              data-touched={this.expMonthTouched}
              aria-required="true"
              aria-describedby="expiration Month"
              aria-invalid={this.expMonthError ? 'true' : 'false'}
            />
            <div class="error-message"><span role="alert" hidden={this.expMonthError.length ? false:true} >{this.expMonthError}</span></div>
          </div>

          <div class="input-group">
            <label htmlFor="expYear">Expiration Year:</label>
            <input
              id="expYear"
              type="number"
              min="26"
              max="46"
              maxlength="2"
              placeholder='YY'
              value={this.expYear}
              onInput={(event) => this.handleChange(event, 'expYear')}
              data-touched={this.expYearTouched}
              aria-required="true"
              aria-describedby="Expiration Year"
              aria-invalid={this.expYearError ? 'true' : 'false'}
            />
            <div class="error-message"><span role="alert" hidden={this.expYearError.length ? false:true} >{this.expYearError}</span></div>
          </div>
        </div>

        {this.formIsValid ? <input type="submit" value="Submit">Pay</input> : <input type="submit" disabled>Pay</input>}
        {this.paymentSuccess ? <div class="success-message" role="alert" >Payment Successful! Thank you for your purchase.</div> : ''}

      </form>
    </div>);

  }
}
