import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { HttpClient } from "@microsoft/sp-http";
import * as strings from 'SpxWebPartStrings';
import Spx from './components/Spx';
import { ISpxProps } from './components/ISpxProps';

export interface ISpxWebPartProps {
  apiResponse: string;
}

export default class SpxWebPart extends BaseClientSideWebPart<ISpxWebPartProps> {

  public render(): void {
    if (!this.renderedOnce) {
      this._fetchSpaceX().then((response) => {
        const element: React.ReactElement<ISpxProps> =
          React.createElement(Spx, {
            apiResponse: response,
          });

        ReactDom.render(element, this.domElement);
      });
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  private async _fetchSpaceX(): Promise<any> {
    const response = await this.context.httpClient
      .get(
        `https://api.spacexdata.com/v4/launches/latest`,
        HttpClient.configurations.v1
      );
    return response.json();
    // .then(textResponse => {
    //   return textResponse;
    // }) as Promise<any>;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
 }
