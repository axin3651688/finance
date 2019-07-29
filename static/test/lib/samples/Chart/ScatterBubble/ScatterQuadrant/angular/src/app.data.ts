import { Injectable } from '@angular/core';
//
export type TDataItem = {
    movie: string;
    rating: number;
    gross: number;
}
//
@Injectable()
export class DataService {
    getData() {
        return <TDataItem[]>[
            { movie: 'Black Panther', rating: 7.4, gross: 700059 },
            { movie: 'Avengers: Infinity War', rating: 8.5, gross: 678815 },
            { movie: 'Incredibles 2', rating: 7.8, gross: 608581 },
            { movie: 'Jurassic World: Fallen Kingdom', rating: 6.2, gross: 416769 },
            { movie: 'Deadpool 2', rating: 7.8, gross: 318491 },
            { movie: "Dr. Seuss' The Grinch", rating: 6.4, gross: 261335 },
            { movie: 'Mission: Impossible - Fallout', rating: 7.9, gross: 220159 },
            { movie: 'Ant-Man and the Wasp', rating: 7.2, gross: 216648 },
            { movie: 'Venom', rating: 6.8, gross: 213205 },
            { movie: 'A Star is Born', rating: 8.1, gross: 200539 },
            { movie: 'Bohemian Rhapsody', rating: 8.3, gross: 186856 },
            { movie: 'Crazy Rich Asians', rating: 7.1, gross: 174016 },
            { movie: 'Ralph Breaks the Internet', rating: 7.4, gross: 169181 },
            { movie: 'Halloween', rating: 6.9, gross: 159326 },
            { movie: 'The Meg', rating: 5.8, gross: 145443 },
            { movie: "Ocean's 8", rating: 6.2, gross: 140218 },
            { movie: 'Ready Player One', rating: 7.5, gross: 137690 },
            { movie: 'Aquaman', rating: 7.6, gross: 137235 }
        ];
    }
}