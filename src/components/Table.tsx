import * as React from 'react';
import { FC, FunctionComponent, SVGProps } from 'react';
import { DataGrid, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';
import { ReactComponent as Calendar } from '../icons/calendar.svg';
import { ReactComponent as Hot } from '../icons/hot.svg';
import { ReactComponent as Sunny } from '../icons/sunny.svg';
import { ReactComponent as Showers } from '../icons/showers.svg';
import { ReactComponent as Snow } from '../icons/snow.svg';
import clsx from 'clsx';
import useUrlState from '@ahooksjs/use-url-state';

const icon = (Icon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>) => {
  return <Icon style={{ width: '25px', marginRight: '3px' }}/>;
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
    field: 'snow', headerName: 'Height of snow cover', type: 'number', flex: 2,
    renderHeader: (params: GridColumnHeaderParams) => (
      <>
        {icon(Snow)}
        {params.colDef.headerName}
      </>
    )
  },
];

type Row = {
    month: number;
    temperature: number;
    sunshine: number;
    precipitation: number;
    snow: number;
}

type Props = {
    rows: Row[];
}

const Table: FC<Props> = ({ rows }) => {
  const [{ monthIdx }] = useUrlState({ monthIdx: undefined });

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableColumnMenu
      hideFooter={true}
      autoHeight={true}
      getRowId={(row) => row.month}
      rowHeight={40}
      getRowClassName={(params) => clsx((params.id === Number(monthIdx) + 1) && 'bg-secondary')}
    />
  );
};

export default Table;
