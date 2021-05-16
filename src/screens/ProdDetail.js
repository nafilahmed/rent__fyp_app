import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import * as axios from 'axios';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          text_input_email: "saad@gmail.com",
          text_input_password:"12345",
          // text_input_email: "",
          // text_input_password:"",
          login_error:'',
          login_loader:false,
          isVisible:false,
          pass_email:"",
          pass_success:false,
          pass_error:false,
          email_loader:false,
          fail_email_send:'Enter correct e-mail',
          valid_email_error:false,
        }
      }



}