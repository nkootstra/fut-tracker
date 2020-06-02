import React, { Component } from 'react';
import Provider from "./Provider";
import Header from "./components/Header";
import Objectives from "./components/Objectives";
import './App.css';

export default class App extends Component {

    render() {
        return (
            <Provider>
                <Header />
                <div className="mt-5 container mx-auto">
                    <Objectives />
                </div>
            </Provider>
        );
    }
}
