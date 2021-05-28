import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Button, Container, Content, Form, Header, Icon, Input, Item, Label, Picker, Text, Textarea } from "native-base";
import React from "react";
import { Image, View } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';


export default class Product extends React.Component {

    constructor(props) {
        super(props);
        AsyncStorage.clear();
        this.state = {
            categoriesPickerData: [],
            unitPickerData: [],
            selectedCategory: '',
            selectedUnit: '',
            featureImage: '',
            pictures: []
        }
    }

    async componentDidMount() {
        this.setState({
            categoriesPickerData: await this.getCategoriesData(),
            unitPickerData: await this.getUnitData()
        })
    }

    async getCategoriesData() {
        let response = await axios.get('http://brandsmen.com.pk/rentfyp_api/public/api/all_cat')
        return response.data;
    }

    async getUnitData() {
        let response = await axios.get('http://brandsmen.com.pk/rentfyp_api/public/api/all_cities')
        return response.data;
    }


    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Item regular style={{ marginTop: 10, }}>
                            <Input placeholder="Enter Name" />
                        </Item>
                        <Item regular style={{ marginTop: 10, }}>
                            <Input placeholder="Enter Price" />
                        </Item>

                        <Item regular style={{ marginTop: 10, }}>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select unit"
                                style={{ width: undefined }}
                                selectedValue={this.state.selectedUnit}
                                onValueChange={(itemValue, itemIndex) => { this.setState({ selectedUnit: itemValue }) }}
                            >
                                <Picker.Item label="Select Unit" value="0"></Picker.Item>
                                {this.state.categoriesPickerData.map(item => <Picker.Item label={item.name} value={item.id}></Picker.Item>)}
                            </Picker>
                        </Item>

                        <Item regular style={{ marginTop: 10, }}>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select category"
                                style={{ width: undefined }}
                                selectedValue={this.state.selectedCategory}
                                onValueChange={(itemValue, itemIndex) => { this.setState({ selectedCategory: itemValue }) }}
                            >
                                <Picker.Item label="Select Category" value="0"></Picker.Item>
                                {this.state.unitPickerData.map(item => <Picker.Item label={item.name} value={item.id}></Picker.Item>)}
                            </Picker>
                        </Item>


                        <Item regular style={{ marginTop: 10, }}>
                            <Textarea rowSpan={4} placeholder="Enter Description" />
                        </Item>

                        <Button onPress={() => {
                            ImagePicker.openPicker({
                                width: 300,
                                height: 400,
                                cropping: false
                            }).then(image => {
                                this.setState({ featureImage: image.path })
                                console.log(image);
                            });
                        }} transparent light style={{ marginTop: 10, }}>
                            <Text>Add Feature Image</Text>
                            <Icon name='add' />
                        </Button>

                        {this.state.featureImage != '' &&
                            <Image
                                source={{ uri: this.state.featureImage }}
                                style={{ width: 60, height: 60, alignSelf: 'center' }}
                            />
                        }

                        <Button onPress={() => {
                            ImagePicker.openPicker({
                                width: 300,
                                height: 400,
                                cropping: false,
                                multiple: true,
                            }).then(image => {
                                this.setState({ pictures: image })
                                console.log(image);
                            });
                        }}
                            transparent
                            light
                            style={{ marginTop: 10, }}>
                            <Text>Add Pictures</Text>
                            <Icon name='add' />

                        </Button>

                        <View style={{ flexDirection: 'row', }}>
                            {
                                this.state.pictures.length > 0 &&
                                this.state.pictures.map(item =>
                                    <Image source={{ uri: item.path }}
                                        style={{ width: 60, height: 60, marginStart: 10, }}
                                    />
                                )
                            }
                        </View>

                        <Button block style={{ marginTop: 10, }}>
                            <Text>Submit</Text>
                        </Button>


                    </Form>
                </Content>
            </Container>
        );
    }
}