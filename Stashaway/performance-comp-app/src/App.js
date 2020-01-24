import React, { Component } from 'react'
import './App.css';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Chart from './Components/Chart/Chart';
import axios from 'axios';


export class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      portfolio: [],
      displayPortfolio:"",
      data: [],
      originalData:[],
      defaultTimePeriod: "max",
      activeCurrency:"SGD"
    };
  }

  componentDidMount() {

    let URL1 = "http://localhost:3306/get100data"
    let URL2 = "http://localhost:3306/get6040data"


    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);

    const example = {}

    Promise.all([
      promise1, promise2, 
    ]).then(values => {
      for (let i=0 ; i<values.length; i++) {
        for (var key in values[i].data){
          example[key] = values[i].data[key]
        }
      }

    const data = example["6040Data"];
  
    let intData = data;

    const displayData = []

    let startingAmountStash = 100000;
    let startingAmountOther = 100000;
    let intermediateAmountStash = 0;
    let intermediateAmountOther = 0;
    

    for (var a in intData) {
      intermediateAmountStash = (intData[a][0] * startingAmountStash/100) + startingAmountStash
      intermediateAmountOther = (intData[a][1] * startingAmountOther/100) + startingAmountOther
      
      displayData.push({"month":a,"stash":intermediateAmountStash, "other":intermediateAmountOther})
      startingAmountOther = intermediateAmountOther;
      startingAmountStash = intermediateAmountStash;
    }

    this.setState({
      data: displayData,
      originalData:displayData,
      displayPortfolio: "6040Data",
      portfolio: example
    })
  })

}

  updatePortfolo = (e) => {
    this.setState({
      displayPortfolio: e.target.value
    });

    const data = this.state.portfolio[e.target.value];

    let intData = data;
    
    function getDataWithinTimePeriod(month, intData) {
      const newintData = {}

        var startDate = new Date("2018-12-31");
        var endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() - month, 
          startDate.getDate()
      );
      for (var date in intData) {
        const dateFormat = new Date(date);
        if (dateFormat <= startDate && dateFormat >= endDate){
          newintData[date] = intData[date]
        }
      }
      return newintData;
    }

    if (this.state.defaultTimePeriod === "6 month") {
      // Grab latest 6 months of data from intData and stash data
      intData = getDataWithinTimePeriod(6,intData);
    } else if (this.state.defaultTimePeriod === "3 month") {
      intData = getDataWithinTimePeriod(3,intData);
    } else if (this.state.defaultTimePeriod === "1 month") {
      intData = getDataWithinTimePeriod(1,intData);
  }

    const displayData = []

    let startingAmountStash = 100000;
    let startingAmountOther = 100000;
    let intermediateAmountStash = 0;
    let intermediateAmountOther = 0;
    

    for (var a in intData) {
      intermediateAmountStash = (intData[a][0] * startingAmountStash/100) + startingAmountStash
      intermediateAmountOther = (intData[a][1] * startingAmountOther/100) + startingAmountOther
      
      displayData.push({"month":a,"stash":intermediateAmountStash, "other":intermediateAmountOther})
      startingAmountOther = intermediateAmountOther;
      startingAmountStash = intermediateAmountStash;
    }

    this.setState({
      data: displayData,
      originalData:displayData,
      displayPortfolio: e.target.value
    })
  
  }


  timeChange = (e) => {
    const data = this.state.portfolio[this.state.displayPortfolio];

    let intData = [];

    if (data != null) {
      intData = data
    } else {
      intData = []
    }
    
    if (e.target.value === "max") {
      intData = data;
    } else if (e.target.value === "6 month") {
      // Grab latest 6 months of data from intData and stash data
        const newintData = {}

        var startDate = new Date("2018-12-31");
        var endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() - 6, 
          startDate.getDate()
      );
      for (var date in intData) {
        const dateFormat = new Date(date);
        if (dateFormat <= startDate && dateFormat >= endDate){
          newintData[date] = intData[date]
        }
      }


      intData = newintData;



    } else if (e.target.value === "3 month") {
      const newintData = {}

      startDate = new Date("2018-12-31");
      endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 3, 
        startDate.getDate()
    );
    for (date in intData) {
      const dateFormat = new Date(date);
      if (dateFormat <= startDate && dateFormat >= endDate){
        newintData[date] = intData[date]
      }
    }

    intData = newintData;


    } else if (e.target.value === "1 month") {
      const newintData = {}

      startDate = new Date("2018-12-31");
      endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 1, 
        startDate.getDate()
    );
    for (date in intData) {
      const dateFormat = new Date(date);
      if (dateFormat <= startDate && dateFormat >= endDate){
        newintData[date] = intData[date]
      }
    }

    intData = newintData;
  }

    const displayData = []

    let startingAmountStash = 100000;
    let startingAmountOther = 100000;
    let intermediateAmountStash = 0;
    let intermediateAmountOther = 0;
    

    for (var a in intData) {
      intermediateAmountStash = (intData[a][0] * startingAmountStash/100) + startingAmountStash
      intermediateAmountOther = (intData[a][1] * startingAmountOther/100) + startingAmountOther
      
      displayData.push({"month":a,"stash":intermediateAmountStash, "other":intermediateAmountOther})
      startingAmountOther = intermediateAmountOther;
      startingAmountStash = intermediateAmountStash;
    }

    this.setState({
      ...this.state,
      data: displayData,
      originalData:displayData,
      defaultTimePeriod:e.target.value
    })
  
  }

  currencyChange = (e) => {
    const currency = e.target.value;
    const data = this.state.originalData;
    var result = [];

    if(currency === "SGD") {
      result = data.map(x=>({month:x.month, stash:(x.stash), other:(x.other) }))
    } else {
      result = data.map(x=>({month:x.month, stash:(x.stash * 1.35), other:(x.other * 1.35) }))
    }
    this.setState({
      data:result,
      activeCurrency:currency
    })
  }

  render() {
    // console.log(this.state)
    return (
      <div className="AppBody">
        <Header></Header>
        <br></br>
        <Body onChange={this.updatePortfolo} onTimeChange = {this.timeChange} onCurrencyChange = {this.currencyChange} active={this.state.activeCurrency} activeTime={this.state.defaultTimePeriod} ></Body>
        <Chart data={this.state.data} displayPortfolio = {this.state.displayPortfolio}/>
      </div>
    )
  }
}

export default App

