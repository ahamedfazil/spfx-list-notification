import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export const useTicketService = () => {
    (async () => { })();

    const getTicketsFromList = async (listId: string): Promise<any[]> => {
        try {
            const list = sp.web.lists.getById(listId);
            const ticketResponse: any[] = await list.items.get();
            console.log("getTicketsFromList -> ticketResponse", ticketResponse);
            return ticketResponse;
        } catch (error) {
            console.log("getTicketsFromList -> error", error);
            throw error;
        }
    };

    return {
        getTicketsFromList
    };
};
