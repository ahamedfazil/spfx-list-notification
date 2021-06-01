import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration, PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ListRefreshWebPartStrings';
import { App } from './components/App';
import { ListSubscriptionFactory } from '@microsoft/sp-list-subscription';
import { IAppContext } from './models/IAppContext';
import { AppContext } from './hooks/AppContext';
import { sp } from '@pnp/sp';

export interface IListRefreshWebPartProps {
  ticketListId: string;
}

export default class ListRefreshWebPart extends BaseClientSideWebPart<IListRefreshWebPartProps> {

  public async onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });
    await super.onInit();
  }

  public render(): void {
    // One main context that will hold all necessary context, properties for your webpart
    const appContext: IAppContext = {
      webpartContext: this.context,
      properties: this.properties,
      listSubscriptionFactory: new ListSubscriptionFactory(this)
    };

    const element: React.ReactElement = React.createElement(
      AppContext.Provider,
      {
        value: {
          appContext: appContext
        }
      },
      React.createElement(App)
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ticketListId', {
                  label: "Ticket List Id"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
