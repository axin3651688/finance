import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: wjcCore.CollectionView;

    constructor() {
        this.data = this._getData();
    }

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    ngOnInit() {
        // create the fast scroller element
        let theScroller = document.createElement('div');
        theScroller.classList.add('fast-scroller');
        for (let i = 65; i <= 90; i++) {
            let initial = wjcCore.createElement('<div>' + String.fromCharCode(i) + '</div>');
            theScroller.appendChild(initial);
        }
        this.flex.hostElement.firstElementChild.appendChild(theScroller);
        theScroller.addEventListener('mousedown', (e) => {
            // get initial we're looking for
            let initial = (<HTMLDivElement>e.target).textContent;
            this._scrollTo(initial);
            e.preventDefault();
        });
        //
        // allow scrolling by typing the initial as well
		this.flex.hostElement.addEventListener('keypress', (e) => {
    	    this._scrollTo(String.fromCharCode(e.keyCode));
		});
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        flex.formatItem.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) => {
            if (e.panel == s.cells && s.columns[e.col].binding == 'last') {
                let row = s.rows[e.row];
                let item = s.rows[e.row].dataItem;
                e.cell.innerHTML = row instanceof wjcGrid.GroupRow
                    ? wjcCore.format('&nbsp;&nbsp;<b>{name}</b>', item)
                    : wjcCore.format('{first} <b>{last}</b>', item);
            }
        });
    }

    // scroll the grid to show a given initial
    private _scrollTo(initial: string) {
        if (initial.length == 1) {
            initial = initial.toUpperCase();
            for (let i = 0; i < this.flex.rows.length; i++) {
                let row = this.flex.rows[i];
                if (row instanceof wjcGrid.GroupRow && row.dataItem.name == initial) {
					let rc = this.flex.cells.getCellBoundingRect(i, 0, true);
                    let pt = this.flex.scrollPosition;
                    wjcCore.animate((pct: number) => {
                        let y = (pt.y * (1 - pct)) + (-rc.top * pct);
                        this.flex.scrollPosition = new wjcCore.Point(pt.x, y);
                      }, 300);
                    break;
                }
            }
        }
    }

    private _getData() {
        let data = [];
        let first = 'Adeline,Alexander,Alice,Amelia,Andrew,Arabella,Aria,Aryan,Asher,Astrid,Audrey,Aurelia,Aurora,Austin,Ava,Axel,Benjamin,Bodhi,Caleb,Callum,Caroline,Charlotte,Chloe,Claire,Cora,Daniel,Declan,Eleanor,Eli,Elijah,Elise,Elizabeth,Ella,Eloise,Emily,Emma,Esme,Ethan,Evangeline,Ezra,Felix,Finn,Genevieve,Grace,Hazel,Henry,Imogen,Isaac,Isabella,Isla,Ivy,Jack,Jacob,James,Jane,Jasper,John,Julian,Khaleesi,Leo,Levi,Liam,Lucas,Lucy,Luke,Luna,Lydia,Maeve,Matthew,Maxwell,Maya,Mia,Mila,Miles,Milo,Nathaniel,Nora,Oliver,Olivia,Ophelia,Oscar,Penelope,Roman,Rose,Sadie,Samuel,Scarlett,Sebastian,Silas,Soren,Stella,Thea,Theodore,Thomas,Violet,William,Wyatt,Xavier,Zachary'.split(',');
        let last = 'Adams,Alexander,Allen,Anderson,Bailey,Baker,Barnes,Bell,Bennett,Black,Boyd,Brooks,Brown,Bryant,Burns,Butler,Campbell,Carter,Clark,Cole,Coleman,Collins,Cook,Cooper,Cox,Crawford,Cruz,Daniels,Davis,Diaz,Dixon,Edwards,Ellis,Evans,Fisher,Flores,Ford,Foster,Freeman,Garcia,Gibson,Gomez,Gonzales,Gonzalez,Gordon,Graham,Gray,Green,Griffin,Hall,Hamilton,Harris,Harrison,Hayes,Henderson,Henry,Hernandez,Hicks,Hill,Holmes,Howard,Hughes,Hunt,Hunter,Iachetta,Jackson,James,Jenkins,Johnson,Jones,Jordan,Kelly,Kennedy,King,Lee,Lewis,Long,Lopez,Marshall,Martin,Martinez,Mason,Mcdonald,Miller,Mitchell,Moore,Morales,Morgan,Morris,Murphy,Murray,Myers,Nelson,Ortiz,Owens,Parker,Patterson,Perez,Perry,Peterson,Phillips,Porter,Powell,Price,Quaid,Ramirez,Ramos,Reed,Reyes,Reynolds,Rice,Richardson,Rivera,Roberts,Robertson,Robinson,Rodriguez,Rogers,Ross,Russell,Sanchez,Sanders,Scott,Shaw,Simmons,Simpson,Smith,Stevens,Stewart,Sullivan,Taylor,Thomas,Thompson,Torres,Tucker,Turner,Udell,Valentine,Vaughan,Vickers,Walker,Wallace,Ward,Warren,Washington,Watson,Webb,Wells,West,White,Williams,Wilson,Wood,Woods,Wright,Xanders,Xavier,Young,Zabinski,Zacharias'.split(',');
        for (let i = 0; i < 1000; i++) {
            data.push({
                first: first[Math.floor(Math.random() * first.length)],
                last: last[Math.floor(Math.random() * last.length)],
            });
        }
        
        // group and sort it with a CollectionView
        let view = new wjcCore.CollectionView(data, {
            sortDescriptions: ['last', 'first'],
            groupDescriptions: [ // group by last name's initial
                new wjcCore.PropertyGroupDescription('last',
                    (item: any, propName: string) => {
                    return item[propName][0];
                })
            ]
        });

        return view;
    }
}
//
@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

