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
var Errorr ,API
const math = create(all, config)
var Algebrite = require('algebrite')

class Simson extends Component {
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
        this.Setvalue = this.Setvalue.bind(this);
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
    
    Simson(){
        var array=[]
        const Fx = math.parse(this.state.A)
        const Fx1 = Fx.compile()
        var a= parseFloat(this.state.B)
        var b= parseFloat(this.state.C)
        var n= parseFloat(this.state.D)
        var Inn = math.compile(Algebrite.integral(Algebrite.eval(this.state.A)).toString())
        var Intigral = Inn.eval({x:b})-Inn.eval({x:a})
        var h=(b-a)/n
        var fx=[]
        var x=a
        var Exkoo=0,Exkee=0
        for(var i=0;i<=n;i++){
            let X = {
                x:x
            }
            fx[i]=Fx1.evaluate(X)
            x=x+h
            if(i!=0&&i!=n && math.mod(i,2)==0){
                Exkoo=Exkoo+fx[i]
                console.log(i)
            }
            else if(i!=0&&i!=n && math.mod(i,2)!=0){
                Exkee=Exkee+fx[i]
                console.log(i)
            }
        }       
        var sum=(h/3)*(fx[0]+fx[n]+(2*Exkoo)+(4*Exkee))
        Errorr = (Intigral-sum)/Intigral
        Errorr = math.abs(Errorr.toFixed(6))
        this.setState({Show:true})
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

    render() {
        return (
<div className='App'>
                <Layout>
                    <Header style={{background: '#CEB3E5'}}><h1 style={{color:'white'}}>Composite Simson</h1></Header>
                    <Layout>
                        <Content style={{ padding: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div style={{ padding: 24, minHeight: 280 }}className="wallpaperdefault">
                                <Card style={{background:'#CEB3E5' ,width:'500px',margin: 'auto'}}>
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="FX" size='large' style={{ width: '400px' }} value={this.state.A} onChange={this.handleFx} />
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="A" size='large' style={{ width: '400px'}} value={this.state.B} onChange={this.handleX0} />
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="B" size='large' style={{ width: '400px'}} value={this.state.C} onChange={this.handleX1} />
                                <h1 style={{height:'20px'}}></h1>
                                <Input addonBefore="N" size='large' style={{ width: '400px'}} value={this.state.D} onChange={this.handleN} />
                                <h1 style={{ height: '20px' }}></h1>
                                <Row>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                    </Col>
                                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Button  onClick={() => this.Simson()} style={{right:15}}>OK</Button>
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

export default Simson;