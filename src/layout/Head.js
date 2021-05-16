import React, { Component } from 'react';

import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class Head extends Component {

    render() {
        return (
            <Header style={{marginTop:18,}} >
                {/* <Left>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left> */}
                <Body style={{alignItems:'center'}}>
                    <Title>RAQ</Title>
                </Body>
                {/* <Right>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Right> */}
            </Header>
        );
    }

}