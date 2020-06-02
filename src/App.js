import React, { Component } from 'react';
import Provider from "./Provider";
import Objectives from "./components/Objectives";
import './App.css';

export default class App extends Component {

    render() {
        return (
            <Provider>
                <div className="mt-5 container mx-auto">
                    <Objectives />
                </div>
            </Provider>
        );
    }
}
