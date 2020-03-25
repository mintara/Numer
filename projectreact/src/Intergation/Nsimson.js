import React, { Component } from 'react';
import { Input, Button, Checkbox,Row,Col } from 'antd';
import { create, all } from 'mathjs';
import {Card} from 'antd';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import '../App.css';

const { Header, Content } = Layout;
const config = {}
var data = []
var Errorr,API
const math = create(all, config)
var Algebrite = require('algebrite')

class NSimson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            A: '',
            B: '',
            C: '',
            Show:false
        }
        this.handleFx = this.handleFx.bind(this);
        this.Setvalue = this.Setvalue.bind(this);
        this.handleX0 = this.handleX0.bind(this);
        this.handleX1 = this.handleX1.bind(this);
        this.handleN = this.handleN.bind(this);
    }
    handleFx(event) {
        this.setState({ A: event.target.value });
    }
    handleX0(event) {
        this.setState({ B: event.target.value });
    }
    handleX1(event) {
        this.setState({ C: event.target.value });
    }
    handleN(event) {
        this.setState({ D: event.target.value });
    }

    NSimson(){
        var array=[]
        const Fx = math.parse(this.state.A)
        const Fx1 = Fx.compile()
        var a= parseFloat(this.state.B)
        var b= parseFloat(this.state.C)
        var Inn = math.compile(Algebrite.integral(Algebrite.eval(this.state.A)).toString())
        var Intigral = Inn.eval({x:b})-Inn.eval({x:a})
        var h=(b-a)
        var fx=[]
        var x=a
        var Ex=0
            let X = {
                x:a
            }
            let Y = {
                x:b
            }
            let Z = {
                x:h
            }
            fx[0]=Fx1.evaluate(X)    
            fx[1]=Fx1.evaluate(Z) 
            fx[2]=Fx1.evaluate(Y)    
        var sum=(h/3)*(fx[0]+ fx[1]+fx[2])
        Errorr = (Intigral-sum)/Intigral
        Errorr = math.abs(Errorr.toFixed(6))
        this.setState({Show:true})
    }


    Setvalue(){
        axios.get('http://192.168.99.100:8080/tay')
        .then((response)=>{
            API = response
            this.setState({
                A:API.data[0].fx,
                B:API.data[0].x0,
                C:API.data[0].x1,
    
            })
        })
        
    }

    render() {
        return (
<div className='App'>
                <Layout>
                    <Header style={{background: '#CEB3E5'}}><h1 style={{color:'white'}}>Trapzaidol</h1></Header>
                    <Layout>
                        <Content style={{ padding: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div style={{padding: 24, minHeight: 280 }}className={"wallpaperdefault"}>
                                <Card style={{background:'#CEB3E5' ,width:'500px',margin: 'auto'}}>
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="FX" size='large' style={{ width: '400px' }} value={this.state.A} onChange={this.handleFx} />
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="A" size='large' style={{ width: '400px'}} value={this.state.B} onChange={this.handleX0} />
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="B" size='large' style={{ width: '400px'}} value={this.state.C} onChange={this.handleX1} />
                                <h1 style={{height:'20px'}}></h1>
                                <Row>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                    </Col>
                                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Button  onClick={() => this.NSimson()} style={{right:15}}>OK</Button>
                                    </Col>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Checkbox style={{}} onChange={this.Setvalue}>AUTO</Checkbox>
                                    </Col>
                                    </Row>
                                </Card>
                                <h1 style={{ height: '20px' }}></h1>
                                {this.state.Show&&<h1>Error = {Errorr}</h1>}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default NSimson;