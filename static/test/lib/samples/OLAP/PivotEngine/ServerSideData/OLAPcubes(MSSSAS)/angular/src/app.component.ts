import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';

//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  ngCube: wjOlap.PivotEngine;
  //
  constructor() {
    this.ngCube = new wjOlap.PivotEngine({
      //
      // specify the fields to use (no auto-generate)
      autoGenerateFields: false,
      fields: [{
        header: 'Customer Location',
        dimensionType: 0,
        subFields: [{
          binding: '[Customer].[Country]',
          header: 'Country',
          dataType: 1,
          dimensionType: 6
        },
        {
          binding: '[Customer].[State-Province]',
          header: 'State-Province',
          dataType: 1,
          dimensionType: 6
        }
        ]
      },
      {
        header: 'Product Information',
        dimensionType: 0,
        subFields: [{
          binding: '[Product].[Product]',
          header: 'Product',
          dataType: 1,
          dimensionType: 6
        },
        {
          binding: '[Product].[Model Name]',
          header: 'Model',
          dataType: 1,
          dimensionType: 6
        },
        {
          binding: '[Product].[Style]',
          header: 'Style',
          dataType: 1,
          dimensionType: 6
        },
        {
          binding: '[Product].[Category]',
          header: 'Category',
          dataType: 1,
          dimensionType: 6
        },
        {
          binding: '[Product].[Product Line]',
          header: 'Line',
          dataType: 1,
          dimensionType: 6
        }
        ]
      },
      {
        header: 'Internet Sales',
        dimensionType: 0,
        subFields: [{
          binding: '[Measures].[Internet Sales Amount]',
          header: 'Amount',
          dataType: 2,
          aggregate: 1,
          format: 'n0',
          dimensionType: 1
        },
        {
          binding: '[Measures].[Internet Order Quantity]',
          header: 'Order Quantity',
          dataType: 2,
          aggregate: 1,
          format: 'n0',
          dimensionType: 1
        },
        {
          binding: '[Measures].[Internet Extended Amount]',
          header: 'Extended Amount',
          dataType: 2,
          aggregate: 1,
          format: 'n0',
          dimensionType: 1
        },
        {
          binding: '[Measures].[Internet Freight Cost]',
          header: 'Freight Cost',
          dataType: 2,
          aggregate: 1,
          format: 'n0',
          dimensionType: 1
        },
        {
          binding: '[Measures].[Internet Total Product Cost]',
          header: 'Total Cost',
          dataType: 2,
          aggregate: 1,
          format: 'n0',
          dimensionType: 1
        },
        {
          binding: '[Measures].[Internet Gross Profit]',
          header: 'Gross Profit',
          dataType: 2,
          aggregate: 1,
          format: 'n0',
          dimensionType: 1
        },
        {
          binding: '[Measures].[Internet Gross Profit Margin]',
          header: 'Gross Profit Margin',
          dataType: 2,
          aggregate: 1,
          format: 'p2',
          dimensionType: 1
        }
        ]
      }
      ],
      //
      // build default view
      valueFields: ['[Measures].[Internet Sales Amount]'],
      rowFields: ['[Customer].[Country]'],
      //
      // connect to cube
      itemsSource: {
        url: 'https://ssrs.componentone.com/OLAP/msmdpump.dll',
        cube: 'Adventure Works'
      }
    });
  }
}
//
@NgModule({
  imports: [WjOlapModule, BrowserModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

