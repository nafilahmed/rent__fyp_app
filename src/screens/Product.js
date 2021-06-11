import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Container, Form, Icon, Input, Item, Picker, Text, Textarea, Toast } from "native-base";
import React from "react";
import { Image, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';


export default class Product extends React.Component {

    constructor(props) {
        super(props);
        // AsyncStorage.clear();
        this.addProduct = this.addProduct.bind(this)
        this.state = {
            productName: '',
            userId: '',
            desc: '',
            price: '',
            categoriesPickerData: [],
            unitPickerData: [],
            selectedCategory: '',
            selectedCity: '',
            selectedUnit: '',
            featureImage: '',
            pictures: []
        }
    }

    async componentDidMount() {

        var productDetails = this.props.navigation.state.params?.productDetails
        this.setState({
            categoriesPickerData: await this.getCategoriesData(),
            unitPickerData: await this.getUnitData()
        })

        if (productDetails != undefined) {
            this.setState({
                productName: productDetails.name,
                price: productDetails.price,
                desc: productDetails.desc,
                selectedCategory: parseInt(productDetails.cat_id),
                featureImage: `http://alkarimfabrics.com.pk/rent_api/public/${productDetails.feature_image}`,
                selectedUnit: productDetails.unit,
            })
        }
    }

    async getCategoriesData() {
        let response = await axios.get('http://alkarimfabrics.com.pk/rent_api/public/api/all_cat')
        return response.data;
    }

    async getUnitData() {
        let response = await axios.get('http://alkarimfabrics.com.pk/rent_api/public/api/all_cities')
        return response.data;
    }

    async addProduct() {


        if (this.state.featureImage != "" && this.state.productName != "" && this.state.price != "") {

            const userId = await AsyncStorage.getItem("user_id")
            const uuid = uuidv4();
            const formData = new FormData();
            const galleryFormData = new FormData();
            var galleryObj = {}



            formData.append('feature_image', { uri: this.state.featureImage, name: 'test.jpg', type: 'image/*' })
            formData.append('name', this.state.productName)
            formData.append('user_id', userId)
            formData.append('cat_id', this.state.selectedCategory)
            formData.append('desc', this.state.desc)
            formData.append('price', this.state.price)
            formData.append('unit', this.state.selectedUnit)
            formData.append('token', uuid)



            this.state.pictures
                .map((item, index) => galleryFormData.append(`file${index + 1}`,
                    { uri: item.path, name: `file${index + 1}.jpg`, type: 'image/*' }))
            galleryFormData.append('token', uuid)


            // const product = {
            //     name: this.state.productName,
            //     user_id: userId,
            //     cat_id: this.state.selectedCategory,
            //     desc: this.state.desc,
            //     feature_image: formData,
            //     price: this.state.price,
            //     unit: this.state.selectedUnit,
            //     gallery: '',
            // }

            // console.log(product)

            let response = await axios.post('http://alkarimfabrics.com.pk/rent_api/public/api/add_product',
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )


            axios.post('http://alkarimfabrics.com.pk/rent_api/public/api/add_gallery', galleryFormData)

            ToastAndroid.show(response.data.success, ToastAndroid.LONG)
            this.setState({
                productName: '',
                price: '',
                desc: '',
                featureImage: '',
                selectedCity: '0',
                selectedUnit: '0',
                selectedCategory: '0',
                pictures: []
            })
        }
        else {
            ToastAndroid.show('Please enter mandatory fields', ToastAndroid.LONG)
        }

    }


    render() {

        return (
            <ScrollView style={{ flex: 1, }}>
                <Container style={{ padding: 10 }}>
                    <Form>
                        <Item regular style={{ marginTop: 10, }}>
                            <Input placeholder="Enter Name"
                                onChangeText={(text) => { this.setState({ productName: text }) }}
                                value={this.state.productName}
                            />
                        </Item>
                        <Item regular style={{ marginTop: 10, }}>
                            <Input placeholder="Enter Price"
                                onChangeText={(text) => { this.setState({ price: text }) }}
                                value={this.state.price}
                            />
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
                                {this.state.categoriesPickerData.map(item => <Picker.Item label={item.name} value={item.id}></Picker.Item>)}
                            </Picker>
                        </Item>

                        <Item regular style={{ marginTop: 10, }}>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select Unit"
                                style={{ width: undefined }}
                                selectedValue={this.state.selectedUnit}
                                onValueChange={(itemValue, itemIndex) => { this.setState({ selectedUnit: itemValue }) }}
                            >
                                <Picker.Item label="Select Unit" value="0"></Picker.Item>
                                <Picker.Item label={"Days"} value={"days"}></Picker.Item>
                                <Picker.Item label={"Hours"} value={"hours"}></Picker.Item>

                            </Picker>
                        </Item>


                        <Item regular style={{ marginTop: 10, }}>
                            <Textarea rowSpan={4} placeholder="Enter Description" onChangeText={(text) => { this.setState({ desc: text }) }} value={this.state.desc} />
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

                        <Button onPress={this.addProduct} block style={{ marginTop: 10, }}>
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                </Container>
            </ScrollView>
        );
    }

}