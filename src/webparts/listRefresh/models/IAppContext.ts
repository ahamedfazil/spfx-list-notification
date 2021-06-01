import { ListSubscriptionFactory } from "@microsoft/sp-list-subscription";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListRefreshWebPartProps } from "../ListRefreshWebPart";

export interface IAppContext {
    webpartContext: WebPartContext;
    properties: IListRefreshWebPartProps;
    listSubscriptionFactory: ListSubscriptionFactory;
}