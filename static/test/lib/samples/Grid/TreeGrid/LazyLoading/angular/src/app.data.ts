import { Injectable } from '@angular/core';

let nodeId: number | undefined;
function getOneOf(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

@Injectable()
export class DataService {
    getData() {
        let tree = [];
        tree.push(this.createNode());
        tree.push(this.createNode());
        return tree;
    }
    createNode(dummy?: boolean): any {
        let first = 'Al,Bob,Cal,Dan,Ed,Fred,Greg,Hal,Ian,Jack,Karl,Lou,Moe,Nate,Oleg,Paul,Quincy,Rod,Sue,Uwe,Vic,Walt,Xiu,Yuri,Zack'.split(','),
            last = 'Adams,Baum,Cole,Dell,Evans,Fell,Green,Hill,Isman,Jones,Krup,Lee,Monk,Nye,Opus,Pitt,Quaid,Riems,Stark,Trell,Unger,Voss,Wang,Xie,Zalm'.split(','),
            name = dummy ? '' : getOneOf(first) + ' ' + getOneOf(last),
            children = [];
        if (!dummy) {
            children.push(this.createNode(true));
        }
        if (nodeId == null) nodeId = 0;
        return { id: nodeId++, name: name, children: children };
    }
}