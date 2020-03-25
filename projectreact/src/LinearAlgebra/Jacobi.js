import React, { Component } from 'react';
import { Input, Button, Col,Row,Checkbox} from 'antd';
import { create, all } from 'mathjs';
import { Table,Card} from 'antd';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import '../App.css';

var A = [], B = [], X = [], matrixA = [], matrixB = [], matrixC = [], row, column, E = [] ,API
const { Header,Content } = Layout;
var data = []
var output = []
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
    },    {
        title: 'ERROR',
        dataIndex: 'ERROR',
        key: 'ERROR',
    }
];
class Jacobi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ROW: '',
            COLUMN: '',
            show: false,
            showMatrix: false
        }
        this.handleROW = this.handleROW.bind(this);
        this.handleCOLUMN = this.handleCOLUMN.bind(this);
        this.Setvalue = this.Setvalue.bind(this);

    }


    Setvalue(){
        axios.get('http://192.168.99.100/matrix')
        .then((response)=>{
            API = response
            this.setState({
                ROW:API.data[0].row,
                COLUMN:API.data[0].column,
            })
            this.row = parseFloat(this.state.ROW)
            this.column = parseFloat(this.state.COLUMN)
            this.CreateMatrixAPI(this.row,this.column)
        })
    }

    CreateMatrixAPI(row, column) {
        A = []
        B = []
        X = []
        matrixA = []
        matrixB = []
        matrixC = []
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input size='large' addonBefore={"A"+i+""+j}  style={{ width: '100px' }}
                    id={"a" + i + "" + j} value={API.data[0].matrixA[i-1][j-1]} key={"a" + i + "" + j}/>)
            }
            matrixA.push(<br />)
            matrixB.push(<Input size='large' addonBefore={"B"+i}  style={{ width: '100px' }}
                id={"b" + i} value={API.data[0].matrixB[i-1]} key={"b" + i} />)
                matrixC.push(<Input addonBefore={"X"+i} size='large' style={{ width: '100px' }}
                id={"x" + i} value={API.data[0].matrixC[i-1]} key={"x" + i}/>)
        }
        this.setState({
            showMatrix: true
        });
    }

    CreateMatrix(row, column) {
        A = []
        B = []
        X = []
        matrixA = []
        matrixB = []
        matrixC = []
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input size='large' addonBefore={"A"+i+""+j} style={{ width: '100px' }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input addonBefore={"B"+i} size='large' style={{ width: '100px' }}
                id={"b" + i} key={"b" + i}/>)
            matrixC.push(<Input addonBefore={"X"+i} size='large' style={{ width: '100px' }}
                id={"x" + i} key={"x" + i}/>)
        }
        this.setState({
            showMatrix: true
        });
    }

    jacobi() {
        data=[]
        this.valueMatrix();
        var Errorr = false
        var count = 0;
        do {
            var C = []
            var Xold = JSON.parse(JSON.stringify(X));
            for (var i = 0; i < this.row; i++) {
                var sum = 0
                for (var j = 0; j < this.column; j++) {
                    if (i != j) {
                        sum = sum + (A[i][j] * X[j])
                    }
                }
                C[i] = (B[i] - sum) / A[i][i]
            }
            X = JSON.parse(JSON.stringify(C))
            count++
        } while (this.Er(C, Xold, count))
        this.setState({
            show: true
        });
    }

    Er(xnew, xold, iteration) {
        var tag = ''
        for (var i = 0; i < this.row; i++) {
            E[i] = (xnew[i] - xold[i]) / xnew[i]

        }
        for (var i=0 ; i<this.row ; i++) {
            if(i>0){
                iteration =''
            }
            data.push({
                Iteration: iteration,
                X: "X"+(i+1)+" = "+xnew[i],
                ERROR: "Error x"+(i+1)+" = "+E[i]
    
            })
            }
        for (var i = 0; i < this.row; i++) {
            if (E[i] > 0.000001) {
                return true
            }
        }
        return false
    }


    valueMatrix() {
        for (var i = 0; i < this.row; i++) {
            A[i] = []
            for (var j = 0; j < this.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
            X.push(parseFloat(document.getElementById("x" + (i + 1)).value));
        }
    }

    handleROW(event) {
        this.setState({ ROW: event.target.value });

    }
    handleCOLUMN(event) {
        this.setState({ COLUMN: event.target.value });
    }

    valueset() {
        this.row = parseFloat(this.state.ROW)
        this.column = parseFloat(this.state.COLUMN)
        this.CreateMatrix(this.row, this.column)
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <Header style={{background: '#CEB3E5'}}><h1 style={{ color: 'white' }}>Jacobi</h1></Header>
                    <Layout>
                        <Content style={{ padding: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div style={{padding: 24, minHeight: 280 }}className={"wallpaperdefault"}>
                            <Card style={{ background: '#CEB3E5', width: '500px', margin: 'auto' }}>
                            <h1 style={{ height: '20px' }}></h1>
                                <Input addonBefore={"ROW"} size='large' style={{ width: '400px' }} value={this.state.ROW} onChange={this.handleROW} />
                                <h1 style={{ height: '20px' }}></h1>
                                <Input addonBefore={"COLUMN"} size='large' style={{ width: '400px' }} value={this.state.COLUMN} onChange={this.handleCOLUMN} />
                                <h1 style={{ height: '20px' }}></h1>
                                <Row>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                    </Col>
                                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Button  onClick={() => this.valueset()} style={{right:15}}>OK</Button>
                                    </Col>
                                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Checkbox style={{}} onChange={this.Setvalue}>AUTO</Checkbox>
                                    </Col>
                                    </Row>
                            </Card>
                                <h1 style={{ height: '20px' }}></h1>
                                {this.state.showMatrix && 
                                <Card style={{ background: '#CEB3E5', width: '500px', margin: 'auto' }}>
                                <h1 style={{ height: '20px' }}></h1>
                                {matrixA}<br />{matrixB}<br />{matrixC}
                                <h1 style={{ height: '20px' }}></h1>
                                <Button style={{background:'red'}} onClick={() => this.jacobi()}>START</Button>
                                </Card>}
                                {this.state.show && <Table columns={columns} dataSource={data} />}
                            </div>
                        </Content>
                    </Layout>
                </Layout>


            </div>
        );
    }
}

export default Jacobi;