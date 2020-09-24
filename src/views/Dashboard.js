import React, {Component} from "react";
import styled from 'styled-components';
import axios from "axios";
import {Button} from 'react-bootstrap';
import {Container, Row, Col} from "react-bootstrap";
import InfoCard from "../components/InfoCard/InfoCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";


const ContentContainer = styled.div`

`;

const CardContainer = styled.div`
    margin: 8px 0px 0px 8px;
`;

const BigHeader = styled.div`
    margin: 26px 0px 0px 42px;
    font-weight: 300;
    font-size: 22px;
    display:inline-block;
`;

const RefreshButtonContainer = styled.div`
    margin: 0px 0px 0px 24px;
    font-weight: 300;
    font-size: 22px;
    display: inline-block;
`;

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            exchangeRateData: [],
            currenciesToDisplay: ["EUR", "USD", "JPY", "CAD"],
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

    getTimeStamp() {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        return dateTime
    }

    render() {
        return (
            <ContentContainer className="content">
                <Container fluid>
                    <Row>
                        <Col sm>
                            <BigHeader>Current Bitcoin Rates</BigHeader>
                            <RefreshButtonContainer>
                                <Button onClick={() => window.location.reload()}>Refresh</Button>
                            </RefreshButtonContainer>
                            <a style={{marginLeft: "22px", fontWeight: 300}}>Last Check: {this.getTimeStamp()}</a>
                        </Col>
                    </Row>
                    <CardContainer>
                        <Row>
                            {this.state.currenciesToDisplay.map((currency) =>
                                <Col xl={2} lg={6}>
                                    <div>
                                        <div className="App">
                                            {Object.keys(this.state.exchangeRateData).map((key) => (
                                                key == currency ?
                                                    <div className="container">
                                                        <InfoCard currencyIcon={this.state.exchangeRateData[key].symbol}
                                                                  currencyLabel={key}
                                                                  bitcoinSellRate={this.state.exchangeRateData[key].buy}
                                                                  bitcoinBuyRate={this.state.exchangeRateData[key].sell}/>
                                                    </div> : null
                                            ))}
                                        </div>
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </CardContainer>
                </Container>
            </ContentContainer>
        );
    }
}

InfoCard.propTypes = {
    symbol: PropTypes.string,
    buy: PropTypes.number,
    sell: PropTypes.number,
};
export default Dashboard;