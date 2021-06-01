import { MessageBar, MessageBarType, Spinner } from '@microsoft/office-ui-fabric-react-bundle';
import { Guid } from '@microsoft/sp-core-library';
import { IListSubscription } from '@microsoft/sp-list-subscription';
import * as React from 'react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTicketService } from '../../../common/services/useTicketService';
import { AppContext } from '../hooks/AppContext';

const { getTicketsFromList } = useTicketService();

interface ITicketResponse {
    loading: boolean;
    error: any;
    value: any[];
}
const TicketList = (): JSX.Element => {

    const { appContext } = useContext(AppContext);
    const [tickets, setTickets] = useState<ITicketResponse>({
        loading: true,
        error: null,
        value: []
    });

    const loadTickets = async () => {
        try {
            const localTickets = await getTicketsFromList(appContext.properties.ticketListId);
            console.log("loadTickets -> localTickets", localTickets);
            setTickets({
                ...tickets,
                loading: false,
                value: localTickets
            });
        } catch (error) {
            console.log("loadTickets -> error", error);
            setTickets({
                ...tickets,
                loading: false,
                error: error
            });
        }
    };

    // subscribe to list
    useEffect(() => {
        let listSub: IListSubscription;
        console.log("Subscribing");
        const subscribeForTicketList = async () => {
            listSub = await appContext.listSubscriptionFactory.createSubscription({
                listId: Guid.parse(appContext.properties.ticketListId),
                callbacks: {
                    notification: async () => {
                        console.log("Something changed in Ticket list - Reload");
                        await loadTickets();
                    }
                }
            });
        };
        subscribeForTicketList();

        return () => {
            console.log("Remove subscription");
            appContext.listSubscriptionFactory.deleteSubscription(listSub);
        };

    }, []);

    useEffect(() => {
        loadTickets();
    }, []);


    if (tickets.loading)
        return <>
            <Spinner />
        </>;

    if (tickets.error)
        return <>
            <MessageBar messageBarType={MessageBarType.error}>Something went wrong</MessageBar>
        </>;


    return (
        <div>
            <h3>Available Ticket</h3>
            {tickets.value.map(val => {
                return <li>{val.Title}</li>;
            })}

        </div>
    );
};

export default TicketList;