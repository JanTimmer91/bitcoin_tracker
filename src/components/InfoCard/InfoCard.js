import styled from "styled-components";
import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from 'prop-types';

const InfoCardContainer = styled.div`
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
    }
`;

const CurrencyIconContainer = styled.div`
    display: inline-block;
    margin: 0px 14px 0px 0px;
    font-weight: 700px;
    font-size: 30px;
`;

const CurrencyIconContainerLabelContainer = styled.div`
    display: inline-block;
    margin-right: 5px
`;

const BitcoinSellRateContainer = styled.div`
    border-top: 1px solid #d9d9d9;
    padding: 8px 0px 0px 0px;
    font-weight: 200;
`;

const BitcoinBuyRateContainer = styled.div`
    font-weight: 200;
`;

export class InfoCard extends Component {
    render() {
        return (
            <InfoCardContainer>
                <div>
                    <Row>
                        <Col>
                            <CurrencyIconContainer>{this.props.currencyIcon}</CurrencyIconContainer>
                            <CurrencyIconContainerLabelContainer>
                                {this.props.currencyLabel}
                            </CurrencyIconContainerLabelContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <BitcoinSellRateContainer>Sell: <b>{this.props.bitcoinSellRate}</b> BTC</BitcoinSellRateContainer>
                            <BitcoinBuyRateContainer>Buy: <b>{this.props.bitcoinBuyRate}</b> BTC</BitcoinBuyRateContainer>
                        </Col>
                    </Row>
                </div>
            </InfoCardContainer>
        );
    }
}

InfoCard.propTypes = {
    currencyIcon: PropTypes.string,
    currencyLabel: PropTypes.string,
    bitcoinSellRate: PropTypes.number,
    bitcoinBuyRate: PropTypes.number,
};
export default InfoCard;