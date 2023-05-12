import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
class dateFact extends LitElement {
  static properties = {
    header: { type: String },
    resApiData: { type: String },
    errorData: { type: String }
  }

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 340px;
        background-color: #99ccff;
    }

    :host h4 {
        margin-top: 20px
    }
    
    label {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
        display: block;
        margin-top: 10px;
        margin-right: 2px;
      }

      p {
        margin:0
      }


      .btn {
        margin-top:10px;
        width: 50%;
        height: 40px;
        cursor: pointer;
        background: transparent;
        border: 1px solid #91C9FF;
        outline: none;
        transition: 1s ease-in-out;
      }
      
      svg {
        position: absolute;
        left: 0;
        top: 0;
        fill: none;
        stroke: #fff;
        stroke-dasharray: 150 480;
        stroke-dashoffset: 150;
        transition: 1s ease-in-out;
      }
      
      .btn:hover {
        transition: 1s ease-in-out;
        background: #4F95DA;
      }
      
      .btn:hover svg {
        stroke-dashoffset: -480;
      }
      
      .btn span {
        color: white;
        font-size: 18px;
        font-weight: 100;
      }

      .datefact {
        font-weight:bold
        font-size: 20px;
        border: 1px solid red
      }

  `;

  constructor() {
    super();
    this.header = 'Widget';

    this.date = '';
    this.resApiData = '';
    this.errorData = '';
  }

  dateChange(e) {
    this.date = e.target.value
  }

  async submit() {
    if (this.date) {
      try {
        const datedata = this.date;
        const response = await fetch(`http://numbersapi.com/${datedata}/date`);
        const data = await response.text();
        this.resApiData = data
        // console.log(this.resApiData);
      } catch (e) {
        console.log(e);
      }
    } else {
      var error = document.getElementsByClassName('invalid-feedback');
      error.innerHTML='please fill out content(**/**)!'
      this.errorData = error.innerHTML;
      alert(this.errorData)
      console.log(this.errorData);
    }
  }


  render() {
    return html`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <div>
          <h4 class="pt-2">${this.header}</h4>
          <div>
            <div class="text-center form-group inputform" >
              <input type="text" id="date" name="date" class="form-control w-50 mx-auto" .value=${this.date} @input=${this.dateChange} >
            </div>
          
            <div>
              <button class="btn btn-primary mb-2" @click=${this.submit}>Display Fact</button>
            </div>
            <div class="datefact">${this.resApiData}</div>
          </div>
        </div>
    `;
  }
}

customElements.define('date-fact', dateFact);