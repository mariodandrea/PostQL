import React, { FC, useState, useEffect } from 'react';
import {
  Link, useRouteMatch,
} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import {
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../store';
import { setQueryData } from '../../../store/analytics/actions';

const mapStateToProps = (state: AppState) => ({
  queryData: state.analy.queryData,
});

interface AnalsProps {
  setQueryData: typeof setQueryData;
  queryData: any;
  thunkAnals: any;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const thunkAnals = (props: any): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  // if (props.queryData === []){
  fetch('/api/logs/display')
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .then((data) => dispatch(setQueryData({ queryData: data })));
  // }
};

interface Table {
  query: string;
  structure: string;
  timesRun: number;
  lastTime: number;
  timestamp: number;
  link: string;
}

const QueryData: FC<AnalsProps> = (props: any) => {
  const classes = useStyles();
  const { path } = useRouteMatch();
  // const [queryData, setQueryData] = useState([]);
  // const getData = () => {
  //   fetch('/api/logs/display')
  //     .then((response) => response.json())
  //     .then((data) => setQueryData(data));
  // };

  useEffect(() => {
    props.thunkAnals();
  }, []);

  console.log('QUERYDATA', props.queryData);

  return (
    <div>
      <div className="split">
        <h2 className="analyticstitle">Performance Analytics</h2>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <input
                  type="text"
                  placeholder="Search Query"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell align="right">Query Type</TableCell>
              <TableCell align="right">Times Run</TableCell>
              <TableCell align="right">Total Time of Last Instance&nbsp;(ms)</TableCell>
              <TableCell align="right">Timestamp of Last Run&nbsp;(XX)</TableCell>
              <TableCell align="right">More Analytics</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.queryData.map((row: any) => (
              <TableRow key={row.queryString}>
                <TableCell component="th" scope="row">
                  {row.queryString}
                </TableCell>
                <TableCell align="right">{row.queryString.includes('query') ? 'Query' : 'Mutation'}</TableCell>
                <TableCell align="right">{row.counter}</TableCell>
                <TableCell align="right">{ row.duration / 1000000 }</TableCell>
                <TableCell align="right">{row.timeStamp}</TableCell>
                <TableCell align="right"><Link to={`${path}/${row._id}`}>More Details</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default connect(
  mapStateToProps,
  { setQueryData, thunkAnals },
)(QueryData);
