import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import {Button, Col, Row} from 'react-bootstrap';
import axios from "axios";
import RateInfoCard from "../components/Cards/RateInfoCard";

const BigHeader = styled.div`
    margin: 26px 0px 0px 42px;
    font-weight: 300;
    font-size: 22px;
    display:inline-block;
`;

const DropDownButton = styled.button`

    border-radius: .25rem,
    margin-top: 6px;
    background-color: #55acee;
        position:relative
    color: white;
        :hover{
        opacity: 0.9
    }
    
`;

const DropDownContainer = styled.div`

`;

const DropDownList = styled.div`

    background-color: white;
    z-index: +1;
    position: absolute;
    width: 255px;
    margin-bottom: 20px;
`;

const DropDownListItem = styled.div`

    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 74%;
    transition: all .25s ease-in-out 0s;
    border: 0.2px solid lightgrey;
    margin-bottom: -1px;

    :hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
    transform: translate(0, -1px);
    background-color: lightblue;
    cursor: pointer;
    font-weight: 700;
    }
    
`;

const BitcoinConverterContainer = styled.div`
    z-index: -1;
    border: solid lightgrey 0.5px;
    border-radius: 10px;
    background-color: white;
    padding: 16px 16px 16px 16px;
    margin: 15px 0px 0px 0px;
    :hover {
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
        cursor: pointer;
    }
`;

const InputContainer = styled.div`
    z-index: -1;
    border: solid lightgrey 0.5px;
    border-radius: 10px;
    background-color: white;
    padding: 32px 16px 0px 16px;
    margin: 0px 0px 0px 0px;
    :hover {
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
        cursor: pointer;
    }
`;

const CurrencySelectionContainer = styled.div`
    z-index: -1;
    border: solid lightgrey 0.5px;
    border-radius: 10px;
    background-color: white;
    padding: 16px 16px 16px 16px;
    margin: 15px 0px 0px 0px;
    :hover {
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
        cursor: pointer;
    }
`;

const CalculationButtonContainer = styled.div`
    z-index: -1;
    border: solid lightgrey 0.5px;
    border-radius: 10px;
    background-color: white;
    padding: 16px 16px 16px 16px;
    margin: 15px 0px 0px 0px;
    :hover {
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
        cursor: pointer;
    }
`;

const CalculationResultContainer = styled.div`
    z-index: -1;
    border: solid lightgrey 0.5px;
    border-radius: 10px;
    background-color: white;
    padding: 16px 16px 16px 16px;
    margin: 15px 0px 0px 0px;
    :hover {
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
        transform: translate(0, -1px);
        cursor: pointer;
        font-weight: 500;
    }
`;

const StepContainer = styled.div`
    z-index: -1;
    border-bottom: solid lightgrey 0.5px;
    border-radius: 10px;
    background-color: white;
    padding: 16px 16px 16px 16px;
    margin: 15px 0px 0px 0px;
    color: grey;
    font-weight: 600;
`;

class BitcoinConverter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            exchangeRateData: [],
            listOpen: false,
            currency: null,
            buyRate: null,
            sellRate: null,
            userInput: "",
            calculationResult: null,
        };

    }

    componentDidMount() {
        axios.get('https://blockchain.info/ticker')
            .then(response => response.data)
            .then(data => {
                this.setState({exchangeRateData: data})
            });

        document.body.style.backgroundColor = "rgba(203,203,210,.15)"
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    calculate() {
        let isCurrencySelected = this.state.currency !== null
        let isUserInputFilled = this.state.userInput !== ""

        if (isUserInputFilled) {
            if (isCurrencySelected) {
                Object.keys(this.state.exchangeRateData).map((key) => (
                    key == this.state.currency ?

                        this.setState({
                            calculationResult: 1 / this.state.exchangeRateData[key].buy * this.state.userInput
                        })

                        : null
                ))
            } else {
                alert("No currency selected!")
            }
        } else {
            alert("Please enter number first!")
        }

    }

    handleChange = (event) => {
        this.setState({userInput: event.target.value})
    }

    render() {
        return (
            <>
                <BigHeader>Bitcoin Converter (Currency to BTC)</BigHeader>
                <BitcoinConverterContainer>
                    <Row>
                        <Col lg={1}>
                            <StepContainer>Step 1</StepContainer>
                        </Col>
                        <Col lg={3}>
                            <InputContainer>
                                <form>
                                    <input
                                        type='number'
                                        onChange={this.handleChange}
                                    />
                                    <p>Enter amount</p>
                                </form>
                                <div style={{color: "#55acee"}}><b>{this.state.currency}</b></div>
                            </InputContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={1}>
                            <StepContainer>Step 2</StepContainer>
                        </Col>
                        <Col lg={3}>
                            <CurrencySelectionContainer>
                                <DropDownContainer>
                                    <Button onClick={() => this.toggleList()}>Choose Currency</Button>
                                    {this.state.listOpen ?
                                        <DropDownList>
                                            <DropDownListItem onClick={() => this.setState(prevState => ({
                                                listOpen: !prevState.listOpen, currency: 'EUR'
                                            }))}>EUR</DropDownListItem>
                                            <DropDownListItem onClick={() => this.setState(prevState => ({
                                                listOpen: !prevState.listOpen, currency: 'USD'
                                            }))}>US-Dollar</DropDownListItem>
                                            <DropDownListItem onClick={() => this.setState(prevState => ({
                                                listOpen: !prevState.listOpen, currency: 'JPY'
                                            }))}>Yen</DropDownListItem>
                                            <DropDownListItem onClick={() => this.setState(prevState => ({
                                                listOpen: !prevState.listOpen, currency: 'CAD'
                                            }))}>Canadian-Dollar</DropDownListItem>
                                        </DropDownList>
                                        : null}
                                </DropDownContainer>
                            </CurrencySelectionContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={1}>
                            <StepContainer>Step 3</StepContainer>
                        </Col>
                        <Col lg={3}>
                            <CalculationButtonContainer>
                                <Button onClick={() => this.calculate()}>Calculate</Button>
                            </CalculationButtonContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={1}>
                            <StepContainer>Step 4</StepContainer>
                        </Col>
                        <Col lg={3}>
                            <CalculationResultContainer>
                                {this.state.calculationResult ? this.state.calculationResult :
                                    <i>Result will be displayed here</i>}
                            </CalculationResultContainer>
                        </Col>
                    </Row>
                </BitcoinConverterContainer>
            </>
        );
    }
}

export default BitcoinConverter;
