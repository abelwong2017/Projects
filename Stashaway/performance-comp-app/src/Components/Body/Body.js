import React from 'react';
import './Body.css'

export default function Body(props) {
    const currency = ["SGD","USD"];
    function returnCurrency(currency) {
         return (currency.map((name, index)=> {
         return (<button className={props.active === name ? 'active button' : 'button'} value={name} onClick={props.onCurrencyChange} key={name}>{name}</button>)
        }));
    }

    const timeline = ["1 month","3 month", "6 month", "max"];
    const timelineDisplay = ["1 Month","3 Months", "6 Months", "Max"];
    function returnTimeline(timeline) {
        return (timeline.map((name, index)=> {
        return (<button className={props.activeTime === name ? 'active button' : 'button'} value={name} onClick={props.onTimeChange} key={name}>{timelineDisplay[index]}</button>)
       }));
   }

    return (
        <div className="Body">
            
            <p className="bodyHeader">Portfolio Benchmark</p>
            <div className="container">
                <div className="comparisonFourteen">
                    <p className="title">General Investing</p>
                    <p className="index">StashAway Risk Index 14%</p>
                </div>
                <div className="benchmark">
                    <select onChange={props.onChange} className="benchmarkDetails">
                        <option value="6040Data" disabled selected>Which benchmark do you wish to compare?</option>
                        <option value="6040Data" >40% Equity 60% Bonds</option>
                        <option value="100Data">100% Equity</option>
                    </select>
                </div>
                <div className="circle overlay">VS</div>
            </div>

            <div className="timePeriod">
                <div className="btn-group">
                    {returnTimeline(timeline)}
                </div>
            </div>

            <div className="currency">
                <div className="btn-group">
                    {returnCurrency(currency)}
                </div>
            </div>
            
        </div>
    )
}