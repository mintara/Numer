import React, { Component } from 'react';
import { Input, Button,Col,Row,Checkbox} from 'antd';
import { create, all } from 'mathjs';
import {Card } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import '../App.css';

var A = [], B = [], X, matrixA = [], matrixB = [], matrixC = [], row, column, Output = []
const { Header,Content } = Layout;
const config = {}
const math = create(all, config)
var API
const data=[]

class CramerRule extends Component {
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

    Setvalue(){
        axios.get('http://192.168.99.100:8080/cramer')
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

    CreateMatrix(row, column) {
        A = []
        B = []
        matrixA = []
        matrixB = []
        matrixC = []
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input size='large' addonBefore={"A"+i+""+j}  style={{ width: '100px' }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j}/>)
            }
            matrixA.push(<br />)
            matrixB.push(<Input size='large' addonBefore={"B"+i}  style={{ width: '100px' }}
                id={"b" + i}  key={"b" + i} />)
        }
        this.setState({
            showMatrix: true
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
        this.forceUpdate()
        this.setState({
            showMatrix: true
        });
    }

    cramer() {
        this.valueMatrix();
        matrixC=[]
        var counter
        for (counter=0;counter < this.row;counter++) { 
            var transformMatrix = JSON.parse(JSON.stringify(A));
            for (var i=0 ; i<this.row ; i++) {
                for (var j=0 ; j<this.column ; j++) {
                    if (j == counter) { 
                        transformMatrix[i][j] = B[i]
                        break;
                    }
                    
                }
            
            } 
            var answer=Math.round(math.det(transformMatrix))/Math.round(math.det(A))
            matrixC.push("x" + (counter + 1) + " = " + answer);
            matrixC.push(<br />)
            
            

        }
        this.setState({
            Show: true
        });
    }

    valueMatrix() {
        A=[]
        B=[]
        for (var i = 0; i < this.row; i++) {
            A[i]=[]
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

    valueset(){
        this.row = parseFloat(this.state.ROW)
        this.column = parseFloat(this.state.COLUMN)
        this.CreateMatrix(this.row,this.column)
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <Header style={{background: '#CEB3E5'}}><h1 style={{ color: 'white' }}>Cramer Rule</h1></Header>
                    <Layout>
                        <Content style={{ padding: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <Card style={{background:'#CEB3E5' ,width:'500px',margin: 'auto'}}>
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
                                {this.state.showMatrix && <Card style={{background:'#CEB3E5' ,width:'500px',margin: 'auto'}}>
                                {matrixA}<br/>{matrixB}
                                <h1 style={{ height: '20px' }}></h1>
                                <Button style={{background:'red'}} onClick={() => this.cramer()}>START</Button>
                                </Card>} 
                                <h1 style={{ height: '20px' }}></h1> 
                                {this.state.Show &&<h1>{matrixC}</h1> }
                            </div>
                        </Content>
                    </Layout>
                </Layout>


            </div>
        );
    }
}

export default CramerRule;