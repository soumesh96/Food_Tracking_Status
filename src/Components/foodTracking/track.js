import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Stepper,
  Step,
  StepContent,
  StepLabel
} from '@material-ui/core';
// import HEREMap, { Marker } from 'react-here-maps';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { simpleAction } from './store/actions/simpleAction';
import OrderList from '../../db.json';

function getSteps() {
  return ['ORDERED', 'APPROVED', 'PREPARING', ' ON TRACK', ' DELIVERED'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Order Successfully placed`
    case 1:
      return 'Approved By The Restaurant';
    case 2:
      return `Food is being prepared`;
    case 3:
      return `Food is on the way`;
    case 4:
      return `Food Deliverd`;
    default:
      return 'Unknown step';
  }
}

const TrackFood = ({
  simpleAction,
  props,
  values,
  lists,
  dataLoading
}) => {
  // const getStore = () => {
  //   simpleAction()
  // }
  const [orderId, setOrderId] = useState('')
  const [user, setUserId] = useState('')
  const [orderDetails, setOrderDetails] = useState('')
  const [selectedData, setSelectedData] = useState({})
  const [activeStep, setActiveStep] = useState(0);
  // const [center, setCenter] = useState({ lat: 0, lng: 0 })

  const steps = getSteps();
  const status = { 'ORDERED': 0, 'APPROVED': 1, 'PREPARING': 2, 'ON TRACK': 3, 'DELIVERED': 4 }

  useEffect(() => {
    if (OrderList) {
      console.log(OrderList);
      setOrderId(OrderList.latestOrders[Object.keys(OrderList.latestOrders)]);
      setUserId(Object.keys(OrderList.latestOrders))
    }
  }, []);

  useEffect(() => {
    if (orderId && OrderList) {
      setSelectedData(OrderList.orders[orderId])
    }
  }, [orderId])

  useEffect(() => {
    if (user) {
      simpleAction(user)
    }
  }, [user, simpleAction])

  useEffect(() => {
    if (orderDetails && selectedData && lists) {
      // const obj = {
      //   lat: orderDetails.delivery.location.lat,
      //   lng: orderDetails.delivery.location.lng
      // }
      // setCenter(obj);
      setActiveStep(status[lists.status]);
    }
  }, [orderDetails, status, selectedData, lists]);

  useEffect(() => {
    if (lists && lists.items && lists.items.length > 0) {
      console.log('lists', lists)
      // console.log('list u', lists.orders[Object.keys(lists.latestOrders)])
      setOrderDetails(lists)
      // setOrderId(lists.orders[Object.keys(lists.latestOrders)]);
      // setUserId(Object.keys(lists.latestOrders))
    }
  }, [lists])

  const getTableDetails = () => {
    let row = null
    if (row) {
      row = (
        <TableRow>
          <TableCell align='left'>S.No</TableCell>
          <TableCell align='left'>Item name</TableCell>
          <TableCell align='left'>Quantity</TableCell>
          <TableCell align='left'>Price</TableCell>
          <TableCell align='left'>Dicounted Price</TableCell>
        </TableRow>
      )
    }
    return row
  }

  const getfoodDetails = () => {
    let data = null
    if (lists && orderDetails) {
      data = orderDetails.items.map((val, index) => (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>{index + 1}</TableCell>
              <TableCell align='left'>{val.title ? val.title : ''}</TableCell>
              <TableCell align='left'>{val.quantity ? val.quantity : ''}</TableCell>
              <TableCell align='left'>{val.price ? val.price : 0}</TableCell>
              <TableCell align='left'>{val.discountedPrice ? val.discountedPrice : 0}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getTableDetails()}
          </TableBody>
        </Table>
      ))
    }
    return data
  }

  return (
    <React.Fragment>
      {/* <div>
        <pre>
          {
            JSON.stringify(values)
          }
        </pre>
        <button onClick={getStore}>Test redux action</button>
      </div> */}
      <Grid container justify='center' alignItems='center'>
        <Grid item xs={6} style={{ background: '#6292BF' }}>
          <Card>
            <CardContent style={{ padding: '20px', marginBottom: '30px' }}>
              <span style={{ float: 'left' }}>
                <Paper
                  style={{ background: '#BDC3C7', padding: '20px', width: '200px', textAlign: 'center' }}>
                  <label>OrderId :</label>&nbsp;{orderId || ''}
                </Paper>
              </span>
              <span style={{ float: 'right' }}>
                <Paper style={{ background: '#BDC3C7', padding: '20px', width: '200px', textAlign: 'center' }}>
                  <label>Estimated Time :</label>&nbsp;30 Mins
                </Paper>
              </span>
            </CardContent>
            {/* <CardHeader
              avatar={
                <Avatar aria-label="id">
                  I
                </Avatar>
              }
              title='Order Id'
              subheader={orderId || ''}
            /> */}
            <CardContent>
              {getfoodDetails()}
              Total Amount : {OrderList && orderDetails ? orderDetails.total : 0}
            </CardContent>
            <CardContent>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography>{getStepContent(index)}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
            {/* <CardActions>
              <HEREMap
                appId='DV2ObM2Qc7SVPU8fI83C'
                appCode='IX3E-CgpibE1mjZzU_bFVw'
                center={center}
                zoom={14}
              >
                <Marker {...center}>
                  <div className="circle-marker"></div>
                </Marker>
              </HEREMap>
            </CardActions> */}
            {/* <CardActions>
              <Map
                google={google}
                zoom={14}
                style={style}
                initialCenter={{ lat: -1.2884, lng: 36.8233 }
              >
                <Marker
                  onClick={this.onMarkerClick}
                  name={'Kenyatta International Convention Centre'}
                />
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                </InfoWindow>
                </Map>
            </CardActions> */}
            <CardContent>
              <Typography align='left'>Delivery Agent</Typography>
              <CardHeader
                avatar={
                  <Avatar aria-label="deliveryAgent">
                    {OrderList && orderDetails ? orderDetails.delivery.assignee.rating : 0}
                  </Avatar>
                }
                title={OrderList && orderDetails ? orderDetails.delivery.assignee.name : ''}
                subheader={OrderList && orderDetails ? orderDetails.delivery.assignee.mobile : ''}
              />
            </CardContent>
            <CardActions style={{ display: 'flex', margin: 'auto' }}>
              Enjoy your Meal
            </CardActions>
            {/* <CardActions>
              <Map
                google={props && props.google}
                zoom={8}
                // style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
              >
                <Marker position={{ lat: 48.00, lng: -122.00 }} />
              </Map>
            </CardActions> */}
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  simpleAction: (id) => dispatch(simpleAction({ id }))
})

const mapStateToProps = state => ({
  lists: state.simpleReducer.latestOrders
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackFood);
// export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
//   apiKey: ('AIzaSyArJFzZW1pQ3kTYFnQnRf6E2v0OqXScDbs')
// })(TrackFood))