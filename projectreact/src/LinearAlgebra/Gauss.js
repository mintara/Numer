import React, { Component } from 'react';
import { Input, Button, Row,Col,Checkbox} from 'antd';
import { create, all } from 'mathjs';
import {Card } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import '../App.css';

var A = [], B = [], X, matrixA = [], matrixB = [], matrixC = [], row, column ,API
const { Header, Content } = Layout;

class Gauss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ROW: '',
            COLUMN: '',
            Show: false,
            showMatrix: false
        }
        this.handleROW = this.handleROW.bind(this);
        this.handleCOLUMN = this.handleCOLUMN.bind(this);
        this.Setvalue = this.Setvalue.bind(this);

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
                matrixA.push(<Input addonBefore={"A" + i + "" + j} size='large' style={{ width: '100px' }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input size='large' style={{ width: '100px' }}
                id={"b" + i} key={"b" + i} addonBefore={"B" + i} />)
        }
        this.setState({
            showMatrix: true
        });
    }

    gauss(n) {
        matrixC=[]
        this.valueMatrix();
        if (A[0][0] == 0) {
            var tempRow = JSON.parse(JSON.stringify(A[0]));
            var tempColumn = B[0];
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
        } //swap R
        for (var k = 0; k < n; k++) {
            for (var i = k + 1; i < n; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j = k; j < n; j++) {
                    A[i][j] = A[i][j] - factor * A[k][j];
                }
                B[i] = B[i] - factor * B[k];

            }
        }
        X = new Array(n);
        X[n - 1] = B[n - 1] / A[n - 1][n - 1];
        for (i = n - 2; i >= 0; i--) {
            var sum = B[i];
            for (j = i + 1; j < n; j++) {
                sum = sum - (A[i][j] * X[j]);
            }
            X[i] = sum / A[i][i];
        }
        matrixC=[]
        for (i = 0; i < n; i++) {
            matrixC.push("x" + (i + 1) + " = " + Math.round(X[i]));
            matrixC.push(<br />)
        }


        this.setState({
            show: true
        });


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
        }
        this.setState({
            showMatrix: true
        });
    }

    Setvalue(){
        axios.get('http://192.168.99.100/cramer')
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

    valueMatrix() {
        for (var i = 0; i < this.row; i++) {
            A[i] = []
            for (var j = 0; j < this.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
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
                    <Header style={{ background: '#CEB3E5' }}><h1 style={{ color: 'white' }}>Gauss Eliminaion</h1></Header>
                    <Layout>
                        <Content style={{ padding: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                                <Card style={{ background: '#CEB3E5', width: '500px', margin: 'auto' }}>
                                    <h1 style={{ height: '20px' }}></h1>
                                    <Input addonBefore="ROW" size='large' style={{ width: '400px' }} value={this.state.ROW} onChange={this.handleROW} />
                                    <h1 style={{ height: '20px' }}></h1>
                                    <Input addonBefore="COLUMN" size='large' style={{ width: '400px' }} value={this.state.COLUMN} onChange={this.handleCOLUMN} />
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
                                {this.state.showMatrix && <Card style={{ background: '#CEB3E5', width: '500px', margin: 'auto' }}>
                                    <h1 style={{ height: '20px' }}></h1>
                                    {matrixA}<br />{matrixB}
                                    <h1 style={{ height: '20px' }}></h1>
                                    <Button style={{background:'red'}} onClick={() => this.gauss(this.row)}>START</Button>
                                </Card>}
                            <h1 style={{ height: '20px' }}></h1>
                                {this.state.show && <h1>{matrixC}</h1>}
                            </div>
                        </Content>
                    </Layout>
                </Layout>


            </div>
        );
    }
}

export default Gauss;