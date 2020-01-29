import React, {Component} from 'react';
import './Chart.css';
import * as d3 from 'd3';

class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 400,
        }
        this.chartRef = React.createRef();
        this.drawChart = this.drawChart.bind(this);
    }

    getWidth(){
        console.log(this.chartRef.current.parentElement.offsetWidth, "width of element")
        return this.chartRef.current.parentElement.offsetWidth;
    }
    getHeight(){
        console.log(this.chartRef.current.parentElement.offsetHeight, "Height of element")
        // return this.chartRef.current.parentElement.offsetHeight;
        return 400;
    }

    componentDidMount() {
        let width = this.getWidth()
        let height = this.getHeight();
        this.setState({width: width, height: height}, ()=> {
            this.drawChart();
        });

        let resizedFn;
        window.addEventListener("resize", () => {
            clearTimeout(resizedFn);
            resizedFn = setTimeout(() => {
                this.redrawChart();
            }, 200)
        });
    }

    redrawChart() {
        let width = this.getWidth()
        this.setState({width: width});
        d3.select("svg").remove();
        this.drawChart = this.drawChart.bind(this);
        this.drawChart();
    }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart() {
        const margin = {top:100, right: 60, bottom:60, left: 90};
        const width = this.state.width - margin.left - margin.right;
        const height = this.state.height - margin.top - margin.bottom;

        // Refresh graph upon draw
        d3.select("svg").remove();

        const data = this.props.data;

        //Create chart element
        const svg = d3.select(".chart")
        .append("svg")
            .attr("width", width + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .style("background-color", "#021839")
        .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        const xscale = d3.scaleBand();
        xscale.domain(data.map(d => d.month))
        xscale.range([0,width ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        //Scale with lesser ticks
        const simpleScale = d3.scaleBand();
        simpleScale.domain(data.map(d => (monthNames[new Date(d.month).getMonth()] + " " + new Date(d.month).getFullYear() )))
        simpleScale.range([0,width]);

        //x-axis
        svg.append("g")
            .attr('class','axis x')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(simpleScale))
            .style("stroke", "white")
            .style("fill", "white")
            .attr("stroke-width", 1);

        const yscale = d3.scaleLinear();
        yscale.domain([d3.min(data, d=> Math.min(d.other, d.stash)) - 200, d3.max(data, d => Math.max(d.other, d.stash) )]);
        yscale.range([height, 0]);

        //y-axis
        svg.append("g")
            .attr('class','axis y')
            .call(d3.axisLeft(yscale))
            .style("stroke", "white") 

        // gridlines in y axis function
        function make_y_gridlines() {		
            return d3.axisLeft(yscale)
                .ticks(6)
        }

        // add the Y gridlines
        svg.append("g")			
        .attr("class", "grid")
        .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
        )

        //plot benchmark comparison data
        svg.append("path")
            .datum(data)
            .attr('class', 'line')
            .attr("fill", "none")
            .attr("stroke", "orange")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return xscale(d.month) })
                .y(function(d) { return yscale(d.other) })
                )

        //Plot stash away data    
        svg.append("path")
        .datum(data)
        .attr('class', 'line')
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xscale(d.month) })
            .y(function(d) { return yscale(d.stash) })
            )
        
        //Data for legend
        const portfolio=this.props.displayPortfolio;
        let portfolioText ="";
        if (portfolio === "6040Data") {
            portfolioText = "40% VTSMX (Stock) + 60% VBMFX (Bond)"
        } else {
            portfolioText = "100% VTSMX (Stock)"
        }
        
        //Legend
        svg.append("circle").attr("cx",width/2 - 360).attr("cy",285).attr("r", 6).style("fill", "red")
        svg.append("circle").attr("cx",width/2 - 130).attr("cy",285).attr("r", 6).style("fill", "orange")
        svg.append("text").attr("x", width/2 - 340).attr("y", 285).text("Stashaway Risk Index 14%").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "white")
        svg.append("text").attr("x", width/2 - 110).attr("y", 285).text(portfolioText).style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "white")

        //Title
        svg.append("text").attr("x", -40).attr("y", -60).text("Portfolio value based on gross returns").style("font-size", "20px").attr("alignment-baseline","middle").style("fill", "white").style("font-weight", "bold")
        svg.append("text").attr("x", -40).attr("y", -30).text("Gross returns and exchange rates are hard coded").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "white")


    }
          
    render(){
      return (
          <div ref={this.chartRef} >
              <div className="chart"/>
          </div>
      )
    }
  }
      
  export default BarChart;