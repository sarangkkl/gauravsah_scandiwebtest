import React, { Component } from 'react'
import "./VariationBox.scss"
export class VariationBox extends Component {

  
  render() {
      console.log(this.props)
    return (
      <div className='variation__box'>
          <input type="radio" name="brandtype" id="1" class="hidebx" />
          <label htmlFor='1' class="lbl-radio">
            <div class="display-box">
              {/* 32GB */}
            </div>
            {}
          </label>
      </div>
    )
  }
}

export default VariationBox

