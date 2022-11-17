import React, { FC } from 'react';
import clsx from 'clsx';

type Props = {
    className?: string
}

const DataSource: FC<Props> = ({ className }) => {
  return (
    <p className={clsx(className, 'text-right text-xs')}>Source: <a
      href={'https://www.chmi.cz/files/portal/docs/meteo/ok/open_data/Podminky_uziti_udaju.pdf'}
      target={'_blank'} rel={'noreferrer noopener'}
      className={'underline'}>ČHMÚ</a></p>
  );
};

export default DataSource;
