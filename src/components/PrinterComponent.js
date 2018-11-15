import React, { Component } from 'react'
import ReactToPrint from 'react-to-print'

class ComponentToPrint extends Component {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class PrinterComponent extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">{'列印'}</a>}
          content={() => this.componentRef}
        />
        <div style={styles.content}>
          <ComponentToPrint
            ref={el => (this.componentRef = el)} 
          />
        </div>
      </div>
    )
  }
}

const styles = {
  content: {
    display: 'none'
  }
}

export default PrinterComponent