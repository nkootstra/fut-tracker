import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'balloon-css';

dayjs.extend(relativeTime)

let timer = null;

export default class Countdown extends Component {

    state = {
        timeLeft: ""
    }

    componentDidMount() {
        this.updateCountdown();
        timer = setInterval(() => {
            this.updateCountdown();
            }, 5000
        );
    }

    componentWillUnmount() {
        // we set the timeout to this.turnOffRedTimeout so that we can
        // clean it up when the component is unmounted.
        // otherwise you could get your app trying to modify the state on an
        // unmounted component, which will throw an error
        clearTimeout(timer);
    }

    updateCountdown() {
        this.setState({
            timeLeft:(!dayjs(this.props.date).isBefore(dayjs()) ?
                "Ojective ends ".concat(dayjs().to(this.props.date)) : "Objective ended")});
    }

    render() {

        return (
            <div className={this.props.className} aria-label={dayjs(this.props.date).format()} data-balloon-pos="right">
                {this.state.timeLeft}
            </div>
        );
    }
}

Countdown.propTypes = {
    date: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};