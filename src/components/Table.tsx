import * as React from 'react';
import { FC } from 'react';
import { DataGrid, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';
import { ReactComponent as Calendar } from '../icons/calendar.svg';
import { ReactComponent as Hot } from '../icons/hot.svg';
import { ReactComponent as Sunny } from '../icons/sunny.svg';
import { ReactComponent as Showers } from '../icons/showers.svg';
import { ReactComponent as Snow } from '../icons/snow.svg';

const icon = (Icon: FC<any>) => {
  return <Icon style={{ width: '25px', marginRight: "3px" }}/>;
};


const columns: GridColDef[] = [
  {
    field: 'month', headerName: 'Month', type: 'number', flex: 1,
    renderHeader: (params: GridColumnHeaderParams) => (
      <>
        {icon(Calendar)}
        {params.colDef.headerName}
      </>
    )
  },
  {
    field: 'temperature', headerName: 'Average air temperature', type: 'number', flex: 2,
    renderHeader: (params: GridColumnHeaderParams) => (
      <>
        {icon(Hot)}
        {params.colDef.headerName}
      </>
    )
  },
  {
    field: 'sunshine', headerName: 'Duration of sunshine', type: 'number', flex: 2,
    renderHeader: (params: GridColumnHeaderParams) => (
      <>
        {icon(Sunny)}
        {params.colDef.headerName}
      </>
    )
  },
  {
    field: 'precipitation', headerName: 'Average precipitation', type: 'number', flex: 2,
    renderHeader: (params: GridColumnHeaderParams) => (
      <>
        {icon(Showers)}
        {params.colDef.headerName}
      </>
    )
  },
  {
    field: 'snow', headerName: "Height of snow cover", type: 'number', flex: 2,
    renderHeader: (params: GridColumnHeaderParams) => (
      <>
        {icon(Snow)}
        {params.colDef.headerName}
      </>
    )
  },
];

const rows = [
  { month: 1, temperature: 5, sunshine: 10, precipitation: 10, snow: 35 },
  { month: 2, temperature: 4, sunshine: 15, precipitation: 0, snow: 0, },
  { month: 3, temperature: 20, sunshine: 7, precipitation: 100, snow: 15 },
  { month: 4, temperature: 8, sunshine: 0, precipitation: 20, snow: 70 },
  { month: 5, temperature: -10, sunshine: 10, precipitation: 10, snow: 35 },
  { month: 6, temperature: 5, sunshine: 10, precipitation: 10, snow: 35 },
  { month: 7, temperature: 5, sunshine: 10, precipitation: 10, snow: 35 },
  { month: 8, temperature: 5, sunshine: 10, precipitation: 10, snow: 35 },
  { month: 9, temperature: 5, sunshine: 10, precipitation: 10, snow: 35 },
  { month: 10, temperature: 5, sunshine: 10, precipitation: 10, snow: 35 },
  { month: 11, temperature: 5, sunshine: 10, precipitation: 10, snow: 35 },
  { month: 12, temperature: 5, sunshine: 10, precipitation: 10, snow: 35 },
];

const Table = () => {
  return (
    <div style={{height: "100%", width: '80%', margin: "100px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        hideFooter={true}
        autoHeight={true}
        getRowId={(row) => row.month}
        rowHeight={40}
      />
    </div>
  );
};

export default Table;
