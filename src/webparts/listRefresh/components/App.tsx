import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import TicketList from './TicketList';

export const App = (): JSX.Element => {
  const [showTickets, { toggle: toggleShowTickets }] = useBoolean(true);

  return (
    <>
      <Toggle label="Show tickets" defaultChecked onText="On" offText="Off" onChange={toggleShowTickets} />
      {showTickets && <TicketList />}
    </>
  );

};
