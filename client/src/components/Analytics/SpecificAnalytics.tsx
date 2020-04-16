import React, { FC } from 'react';
import {
  useRouteMatch, Switch, Route,
} from 'react-router-dom';
import SpecificOverview from './SpecificOverview';
import Graph from './D3';

export interface PropTypes {
  previousUrl: string;
}

const SpecificAnalytics: FC<PropTypes> = ({ previousUrl }) => {
  const { path } = useRouteMatch();
  return (
    <div className="specificanalytics">
      <Switch>
        <Route path={`${path}/:instanceID`}>
          <Graph previousUrl={path} />
        </Route>
        <Route path={path} exact>
          <SpecificOverview previousUrl={previousUrl} />
        </Route>
      </Switch>
    </div>
  );
};

export default SpecificAnalytics;
