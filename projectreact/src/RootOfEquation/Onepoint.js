import React, { Component } from 'react';
import { Input, Button, Col,Row,Checkbox ,Card} from 'antd';
import { create, all } from 'mathjs';
import { Table} from 'antd';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import '../App.css';

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
        title: 'X',
        dataIndex: 'X',
        key: 'X',
    },
    {
        title: 'Errorr',
        dataIndex: 'Errorr',
        key: 'Errorr',
    }
];
const math = create(all, config)

class Onepoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            A: '',
            B: '',
            Show:false
        }
        this.handleFx = this.handleFx.bind(this);
        this.handleX = this.handleX.bind(this);
        this.Setvalue = this.Setvalue.bind(this);
    }
    handleFx(event) {
        this.setState({ A: event.target.value });
    }
    handleX(event) {
        this.setState({ B: event.target.value });
    }

    Setvalue(){
        console.log('response');
        axios.get('http://192.168.99.100:8080/ons')
            .then((response)=>{
                API = response
                this.setState({
                    A:API.data[0].fx,
                    B:API.data[0].x
            })
        })
        
    }
    onepointfx(){
        data=[]
        var j=0
        var Errornew=0
        var Errorx=-1
        const Fx = math.parse(this.state.A)
        const Fx1 = Fx.compile()
        var x=[]
        x[0]= parseFloat(this.state.B)
            let X = {
                x: x[j]
            }
            x[j+1] = Fx1.evaluate(X)
            Errornew=Math.abs((x[j+1]-x[j])/x[j+1])
            data.push({
                Iteration: j,
                X: x[j],
                Errorr:''
            })
            data.push({
                Iteration: j+1,
                X: x[j+1],
                Errorr:Errornew.toFixed(6)
            })
        while(Errornew>0 && Errorx!==Errornew){
                j++
                Errorx=Errornew
                let X = {
                    x: x[j]
                }
                x[j+1] = Fx1.evaluate(X)
                Errornew=Math.abs((x[j+1]-x[j])/x[j+1])
                data.push({
                    Iteration: j+1,
                    X: x[j+1],
                    Errorr:Errornew.toFixed(6)
                })
        }
        this.setState({Show:true})
    }
    render() {
        return (
<div className="App">
                <Layout>
                    <Header style={{background: '#CEB3E5'}}><h1 style={{color:'white'}}>OnePoint</h1></Header>
                    <Layout>
                        <Content style={{ padding: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <Card style={{background:'#CEB3E5' ,width:'500px',margin: 'auto'}}>
                            <h1 style={{ height: '20px' }}></h1>
                                <Input addonBefore="FX" size='large' style={{ width: '400px' }} value={this.state.A} onChange={this.handleFx} />
                                <h1 style={{ height: '20px' }}></h1>
                                <Input addonBefore="X0" size='large' style={{ width: '400px'}} value={this.state.B} onChange={this.handleX} />
                                <h1 style={{ height: '20px' }}></h1>
                                <Row>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                    </Col>
                                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Button  onClick={() => this.onepointfx()} style={{right:15}}>OK</Button>
                                    </Col>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Checkbox style={{}} onChange={this.Setvalue}>AUTO</Checkbox>
                                    </Col>
                                    </Row>
                                </Card>
                                {this.state.Show&&<Table columns={columns} dataSource={data} />}
                                <h1 style={{ height: '20px' }}></h1>
                            </div>
                        </Content>
                    </Layout>
                </Layout>


            </div>
        );
    }
}

export default Onepoint;