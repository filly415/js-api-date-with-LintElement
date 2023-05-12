import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
class mathFact extends LitElement {
    static properties = {
        header: { type: String },
        resApiData: { type: String }
    }

    static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: #b3ccff;
    }

    :host h3 {
        padding-top: 10px
    }
    
    label {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
        display: block;
        margin-top: 10px;
        margin-right: 2px;
      }

      input[type="date"] {
        width: 30%;
        height:20px;
        padding: 5px;
        font-size: 16px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
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

      .mathfact {
        font-weight:bold
        font-size: 20px;
        border: 1px solid red
      }
      
  `;

    constructor() {
        super();
        this.header = 'Widget';

        this.math = 0;
        this.resApiData = '';
    }

    mathChange(e) {
        this.math = e.target.value
    }

    async submit() {
        try {
            const mathdata = this.math;
            const response = await fetch(`http://numbersapi.com/${mathdata}/math`);
            const data = await response.text();
            this.resApiData = data
            console.log(this.resApiData);
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        return html`
        <h3 >${this.header}</h3>
        <div >
            <div>
                <input type="number" id="math" name="math" .value=${this.math} @input=${this.mathChange}>
            </div>
            
            <div>
                <button class="btn" @click=${this.submit}>Display Fact</button>
            </div>
            <div class="mathfact">${this.resApiData}</div>
        </div>
    `;
    }
}

customElements.define('math-fact', mathFact);