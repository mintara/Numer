import React, { Component } from 'react';
import { Input, Button, Checkbox, Row, Col } from 'antd';
import { create, all } from 'mathjs';
import { Table} from 'antd';
import { Layout, Breadcrumb, Card } from 'antd';
import '../App.css';
import axios from 'axios';

const { Header,Content } = Layout;
const config = {}
var data = []
var arrayxm = []
var API 
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
class Bisection extends Component {
    constructor() {
        super();
        this.state = {
            A: '',
            B: '',
            C: '',
            Show: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.auto = this.auto.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    FxBisection() {
        data = []
        var count = 0
        const Fx = math.parse(this.state.A)
        const Fx1 = Fx.compile()
        var ERROR = 0;
        var xl = parseFloat(this.state.B)
        var xr = parseFloat(this.state.C)
        arrayxm[count] = (xl + xr) / 2
        data.push({
            Iteration: count,
            XL: xl,
            XR: xr,
            XM: arrayxm[count],
            ERROR: ''

        })
        let XR = {
            x: xr
        }
        let XM = {
            x: arrayxm[count]
        }
        var Fxr = Fx1.evaluate(XR)
        var Fxm = Fx1.evaluate(XM)
        if (Fxm * Fxr < 0) {
            xl = arrayxm[count]
        }
        else {
            xr = arrayxm[count]
        }
        count++
        do {
            arrayxm[count] = (xl + xr) / 2
            let XR = {
                x: xr
            }
            let XM = {
                x: arrayxm[count]
            }
            var Fxr = Fx1.evaluate(XR)
            var Fxm = Fx1.evaluate(XM)
            if (Fxm * Fxr < 0) {
                xl = arrayxm[count]
            }
            else {
                xr = arrayxm[count]
            }
            ERROR = math.abs((arrayxm[count] - arrayxm[count - 1]) / arrayxm[count])
            data.push({
                Iteration: count,
                XL: xl.toFixed(6),
                XR: xr.toFixed(6),
                XM: arrayxm[count].toFixed(6),
                ERROR: ERROR.toFixed(6)

            })
            count++

        } while (ERROR > 0.000001)
        this.forceUpdate()
        this.setState({ Show: true })

    }

    auto(event) {
        axios.get('http://192.168.99.100:8080/b').then((response) => {
            API=response
                this.setState({
                A:API.data[0].fx,
                B:API.data[0].xl,
                C:API.data[0].xr,
            })
        })
    }

    Setvalue(){
        this.setState({
            A:API.data[0].fx,
            B:API.data[0].xl,
            C:API.data[0].xr,

        })
    }
    render() {
        return (
            <div className="App">
                <Layout>
                    <Header style={{ background: '#CEB3E5' }}><h1 style={{ color: 'white' }}>Bisection</h1></Header>
                    <Layout>
                        <Content style={{ padding: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div style={{ background: 'white', padding: 24, minHeight: 280 }}>
                                <Card style={{ background: '#CEB3E5', width: '500px', margin: 'auto' }}>
                                    <h1 style={{ height: '20px' }}></h1>
                                    <Input addonBefore="FX" size='large' style={{ width: '400px' }} name="A" value={this.state.A} onChange={this.handleChange} />
                                    <h1 style={{ height: '20px' }}></h1>
                                    <Input addonBefore="XL" size='large' style={{ width: '400px', }} name="B" value={this.state.B} onChange={this.handleChange} />
                                    <h1 style={{ height: '20px' }}></h1>
                                    <Input addonBefore="XR" size='large' style={{ width: '400px', }} name="C" value={this.state.C} onChange={this.handleChange} />
                                    <h1 style={{ height: '20px' }}></h1>
                                    <Row>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                    </Col>
                                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Button  onClick={() => this.FxBisection()} style={{right:15}}>OK</Button>
                                    </Col>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Checkbox onChange={this.auto}>AUTO</Checkbox>
                                    </Col>
                                    </Row>
                                </Card>
                                {this.state.Show && <Table columns={columns} dataSource={data} />}
                                <h1 style={{ height: '50px' }}></h1>
                            </div>
                        </Content>
                    </Layout>
                </Layout>

            </div>
        );
    }
}

export default Bisection;