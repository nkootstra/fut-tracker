import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

let timer = null;

export default class Countdown extends Component {

    state = {
        timeLeft: ""
    }

    componentDidMount() {
        this.updateCountdown();
        timer = setTimeout(() => {
            this.updateCountdown();
        }, 6000)
    }

    updateCountdown() {
        this.setState({timeLeft:(!dayjs(this.props.date).isBefore(dayjs()) ?
                "Ojective ends ".concat(dayjs().to(this.props.date)) : "Objective ended")});
    }

    componentWillUnmount() {
        clearTimeout(timer);
    }


    render() {

        return (
            <div className={this.props.className}>
                {this.state.timeLeft}
            </div>
        );
    }
}

Countdown.propTypes = {
    date: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};