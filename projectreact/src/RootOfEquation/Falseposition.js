import React, { Component } from 'react';
import { Input, Button, Row,Col ,Card,Checkbox} from 'antd';
import { create, all } from 'mathjs';
import { Table} from 'antd';
import { Layout, Breadcrumb } from 'antd';
import '../App.css';
import axios from 'axios';

const { Header, Content } = Layout;
const config = {}
var data = [] , API

const columns = [
    {
        title: 'Iteration',
        dataIndex: 'Iteration',
        key: 'Iteration',
    },
    {
        title: 'XL',
        dataIndex: 'XL',
        key: 'XL',
    },
    {
        title: 'XR',
        dataIndex: 'XR',
        key: 'XR',
    },
    {
        title: 'XM',
        dataIndex: 'XM',
        key: 'XM',
    },
    {
        title: 'ERROR',
        dataIndex: 'ERROR',
        key: 'ERROR',
    }
];
const math = create(all, config)

class Falseposition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            A: '',
            B: '',
            C: '',
            Show:false
        }
        this.handleFx = this.handleFx.bind(this);
        this.handleXL = this.handleXL.bind(this);
        this.handleXR = this.handleXR.bind(this);
        this.Setvalue = this.Setvalue.bind(this);
    }
    handleFx(event) {
        this.setState({ A: event.target.value });
    }
    handleXR(event) {
        this.setState({ C: event.target.value });
    }
    handleXL(event) {
        this.setState({ B: event.target.value });
    }

    Setvalue(){
        axios.get('http://192.168.99.100:8080/b')
            .then((response)=>{
                API = response
                this.setState({
                    A:API.data[0].fx,
                    B:API.data[0].xl,
                    C:API.data[0].xr,
        
                })
            })
        
    }
    Fxfalseposition() {
        data=[]
        var count = 0
        const Fx = math.parse(this.state.A)
        const Fx1 = Fx.compile()
        var ERROR = 0;
        var xl = parseFloat(this.state.B)
        var xr = parseFloat(this.state.C)
        let XL = {
            x: xl
        }
        let XR = {
            x: xr
        }
        var Fxl = Fx1.evaluate(XL)
        var Fxr = Fx1.evaluate(XR)
        var xmf = (xl * Fxr - xr * Fxl) / (Fxr - Fxl);
        let XM = {
            x: xmf
        }
        var Fxm = Fx1.evaluate(XM)
        data.push({
            Iteration: count,
            XL: xl,
            XR: xr,
            XM: xmf.toFixed(6),
            ERROR: ''

        })
        if (Fxm * Fxr < 0) {
            xl = xmf
        }
        else {
            xr = xmf
        }
        count++
        do {
            let XL = {
                x: xl
            }
            let XR = {
                x: xr
            }
            var Fxl = Fx1.evaluate(XL)
            var Fxr = Fx1.evaluate(XR)
            var xm = (xl * Fxr - xr * Fxl) / (Fxr - Fxl);
            let XM = {
                x: xmf
            }
            var Fxm = Fx1.evaluate(XM)
            if (Fxm * Fxr < 0) {
                xl = xm
            }
            else {
                xr = xm
            }
            ERROR = math.abs((xm - xmf) / xm)
            data.push({
                Iteration: count,
                XL: xl.toFixed(6),
                XR: xr.toFixed(6),
                XM: xm.toFixed(6),
                ERROR: ERROR.toFixed(6)

            })
            xmf = xm
            count++

        } while (ERROR > 0.000001)
        this.setState({Show:true})
    }
    render() {
        return (
            <div className="App">
                <Layout>
                    <Header style={{background: '#CEB3E5'}}><h1 style={{color:'white'}}>False Position</h1></Header>
                    <Layout>
                        <Content style={{ padding: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                                <Card style={{background:'#CEB3E5' ,width:'500px',margin: 'auto'}}>
                                <h1 style={{ height: '20px' }}></h1>
                                <Input addonBefore="FX" size='large' style={{ width: '400px' }} value={this.state.A} onChange={this.handleFx} />
                                <h1 style={{ height: '20px' }}></h1>
                                <Input addonBefore="XL" size='large' style={{ width: '400px',}} value={this.state.B} onChange={this.handleXL} />
                                <h1 style={{ height: '20px' }}></h1>
                                <Input addonBefore="XR" size='large' style={{ width: '400px'}} value={this.state.C} onChange={this.handleXR} />
                                <h1 style={{ height: '20px' }}></h1>
                                <Row>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                    </Col>
                                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Button  onClick={() => this.Fxfalseposition()} style={{right:15}}>OK</Button>
                                    </Col>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Checkbox style={{}} onChange={this.Setvalue}>AUTO</Checkbox>
                                    </Col>
                                    </Row>
                                </Card>
                                <h1 style={{ height: '50px' }}></h1>
                                {this.state.Show&&<Table columns={columns} dataSource={data} />}
                            </div>
                        </Content>
                    </Layout>
                </Layout>


            </div>
        );
    }
}
export default Falseposition;