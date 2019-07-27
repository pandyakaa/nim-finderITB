import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Input } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const barstyle = {
  background: '#2763d8'
}

const inpstyle = {
  width: "300px",
}

const tablestyle = {
  width: '50%',
  marginTop: 25,
  overflowX: "auto",
};

const bodstyle = {
  marginLeft: 20
}

const butstyle = {
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 110
}

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      query : '',
      page : 0,
      count : 10,
      data : [],
      isAny : undefined
    }
    this.handleChange = this.handleChange.bind(this);
  }

  setQuery = (event, newq) => {
    this.setState({
      query: newq
    })
  }

  setCount = (event, newc) => {
    this.setState({
      count: newc
    })
  }

      /* Fungsi incrPage()
       Digunakan untuk melakukan increment pada state page
       Menggunakan versi setState() dengan pemanggilan fungsi
    */
   incrPage = () => {
    this.setState((prevState) => {
        return {page: prevState.page + 1}
        })
    }

    /* Fungsi decrPage()
      Digunakan untuk melakukan decrement pada state page
      Menggunakan versi setState() dengan pemanggilan fungsi
    */
    decrPage = () => {
        this.setState((state) => {
            if (state.page - 1 >= 0) {
                return {page: state.page - 1}
            }
        })
    }

    /* Fungsi neutPage()
      Digunakan untuk set page dengan nilai 0
      Menggunakan versi setState() dengan pemanggilan fungsi
    */
    neutPage = () => {
        this.setState((state) => {
            return {page: 0}
        })
    }

    /* Fungsi handleNext
       @param = event
       Melakukan pengiriman data ke API ketika ada event oleh nextButton
    */
  handleNext = (event) => {
    var url = "https://api.pandyaka.com/nim";
    if (this.state.query.length !== 0) {
        this.incrPage()
        axios.post(url,{
          query: this.state.query,
          page: this.state.page+1
        }).then(
            response => this.handleNextResponse(response)
        )
    }
  }

  /* Fungsi handlePrev
    @param = event
    Melakukan pengiriman data ke API ketika ada event oleh prevButton
  */
  handlePrev = (event) => {
    var url = "https://api.pandyaka.com/nim";
    if (this.state.query.length !== 0) {
      if(this.state.page > 0) {
        this.decrPage()
        axios.post(url,{
          query: this.state.query,
          page: this.state.page-1
        }).then(
            response => this.handleResponse(response)
        )
      }
    }
  }
  
    /* Fungsi handleNextResponse
       @param = response
       Melakukan validasi pada response yang diterima dari API
       ketika ada event oleh NextButton
    */
  handleNextResponse = (response) => {
    if (response.data.payload.length !== 0) {
        this.handleResponse(response)
    } else {
        this.decrPage()
    }
  }

  handleChange = (event) => {
    var url = "https://api.pandyaka.com/nim";
    this.neutPage();
    this.setState({
      query: event.target.value
    });
    axios.post(url,{
      query: event.target.value
    }).then(
      response => this.handleResponse(response)
    )
  }

  handleResponse = (response) => { 
      if (response.data.code === 0) {
          this.setState({
              isAny: false
          })
      } else if (response.data.code > 0) {
          this.setState({
              data: response.data.payload,
              isAny: true
          })
      }
  }

  renderUtil = () => {
      if (this.state.isAny === true ) {
          return (
              <div className="body" style={bodstyle}>
                <div className="table">
                    <Table style={tablestyle} >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize: '13pt'}}>Nama</TableCell>
                                <TableCell style={{fontSize: '13pt'}}>NIM TPB</TableCell>
                                <TableCell style={{fontSize: '13pt'}}>NIM Jurusan</TableCell>
                                <TableCell style={{fontSize: '13pt'}}>Jurusan</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                this.state.data.map(function(res) {
                                    return (
                                        <TableRow key={res.nim_tpb}>
                                            <TableCell>{res.name}</TableCell>
                                            <TableCell>{res.nim_tpb}</TableCell>
                                            <TableCell>{res.nim_jur}</TableCell>
                                            <TableCell>{res.jur}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>

                    <MuiThemeProvider>
                      <div className="Button" style={butstyle}>
                        <RaisedButton
                        label="Prev"
                        onClick={this.handlePrev}>
                        </RaisedButton>

                        <RaisedButton
                        label="Next"
                        onClick={this.handleNext}>
                        </RaisedButton>
                      </div>
                    </MuiThemeProvider>
                </div>
              </div>
          )
      } else if (this.state.isAny === false) {
          return (
              <Table style={tablestyle} >
                  <TableHead>
                      <TableRow>
                          <TableCell>
                              Data tidak ditemukan
                          </TableCell>
                      </TableRow>
                  </TableHead>
              </Table>
          )
      }
  }

  mainRender = () => {
    if(this.state.query !== '') {
      return this.renderUtil();
    }
  }

  render() {
    return (
      <div className="App">
          <div className="Header">
            <AppBar style={barstyle}>
              <Toolbar>
                <div className="Head">
                  <Typography variant="h5" color="inherit">
                    ITB NIM Finder
                  </Typography>
                </div>
              </Toolbar>
            </AppBar>
          </div>
  
          <div className="Body">
            <Input
            placeholder="Find Name/NIM"
            onChange={this.handleChange}
            style={inpstyle}>
            </Input>
          </div>
  
          <div className="Footer">
  
          </div>
            {this.mainRender()}
      </div>
    );
  }
}

export default App;
