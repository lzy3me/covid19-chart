import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

class ChartData extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log(this.props)
        this.setState({
            datasets: [
                {
                    label: 'infected',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    barThickness: 12,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: []
                }
            ]
        })
    }

    componentDidMount() {
        let _this = this

        setInterval(() => {
            var oldDataSet = _this.state.datasets[0];
            var newData = [];

            this.props.item[1].forEach(val => {
                newData.push(val);
            });

            var newDataSet = {
                ...oldDataSet
            };

            newDataSet.data = newData;
            _this.setState({
                labels: this.props.item[0],
                datasets: [newDataSet]
            });
        }, 500);
    }

    render() {
        return (
            <HorizontalBar data={this.state} height={1000} />
        )
    }
}

export default ChartData