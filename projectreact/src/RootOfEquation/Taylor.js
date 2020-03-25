import React, { Component } from 'react';
import { Input, Button, Checkbox,Row,Col } from 'antd';
import { create, all } from 'mathjs';
import {Card} from 'antd';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import '../App.css';

const { Header, Content } = Layout;
const config = {}
var data = [] , API
var Errorx

const math = create(all, config)
class Taylor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            A: '',
            B: '',
            C: '',
            D: '',
            Show:false
        }
        this.handleFx = this.handleFx.bind(this);
        this.handleX0 = this.handleX0.bind(this);
        this.handleX1 = this.handleX1.bind(this);
        this.handleN = this.handleN.bind(this);
        this.Setvalue = this.Setvalue.bind(this);
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

    Setvalue(){
        axios.get('http://localhost:8080/tay')
            .then((response)=>{
                API = response
                this.setState({
                    A:API.data[0].fx,
                    B:API.data[0].x0,
                    C:API.data[0].x1,
                    D:API.data[0].n
        
                })
            })
        
    }
    Taylorfx(){
        array=[]
        var x0
        var n1
        var N
        var array=[]
        const Fx = math.parse(this.state.A)
        const Fx1 = Fx.compile()
        var x=[]
        var x0= parseFloat(this.state.B)
        var x1= parseFloat(this.state.C)
        var n= parseFloat(this.state.D)
        let X0 = {
                x: x0
            }
        array[0]=math.derivative(Fx,'x')
        for(var i=0; i<n;i++){
            array[i+1]=math.derivative(array[i],'x')
        }
        Errorx=Fx1.evaluate(X0)+((x1-x0)*array[0].evaluate(X0))
        for(var i=1;i<n;i++){
            Errorx=Errorx+(math.pow((x1-x0),i+1)*array[i].evaluate(X0))
        }
        this.setState({Show:true})
    }

    render() {
        return (
            <div className='App'>
                <Layout>
                    <Header style={{background: '#CEB3E5'}}><h1 style={{color:'white'}}>Taylor</h1></Header>
                    <Layout>
                        <Content style={{ padding: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                                <Card style={{background:'#CEB3E5' ,width:'500px',margin: 'auto'}}>
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="FX" size='large' style={{ width: '400px' }} value={this.state.A} onChange={this.handleFx} />
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="X0" size='large' style={{ width: '400px'}} value={this.state.B} onChange={this.handleX0} />
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="X1" size='large' style={{ width: '400px'}} value={this.state.C} onChange={this.handleX1} />
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="N" size='large' style={{ width: '400px'}} value={this.state.D} onChange={this.handleN} />
                                <h1 style={{ height: '20px' }}></h1>
                                <Row>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                    </Col>
                                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Button  onClick={() => this.Taylorfx()} style={{right:15}}>OK</Button>
                                    </Col>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Checkbox style={{}} onChange={this.Setvalue}>AUTO</Checkbox>
                                    </Col>
                                    </Row>
                                </Card>
                                <h1 style={{ height: '50px' }}></h1>
                                <h1>{Errorx}</h1>
                                <h1 style={{ height: '50px' }}></h1>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Taylor;