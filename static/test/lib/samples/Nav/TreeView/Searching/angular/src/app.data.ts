import { Injectable } from '@angular/core';


export class TreeItem {
    header: string;
    keywords?: string;
    items?: TreeItem[]
}


@Injectable()
export class DataService {
    getData(): TreeItem[] {
        return [
            {
                header: 'Electronics', items: [
                    { header: 'Trimmers/Shavers', keywords: 'beard hair' },
                    { header: 'Tablets', keywords: 'screen computer android ios facebook' },
                    {
                        header: 'Phones', keywords: 'talk listen email fabebook', items: [
                            { header: 'Apple' },
                            { header: 'Motorola' },
                            { header: 'Nokia' },
                            { header: 'Samsung' }
                        ]
                    },
                    { header: 'Speakers', keywords: 'music loudspeaker' },
                    { header: 'Monitors', keywords: 'screen color lcd oled' }
                ]
            },
            {
                header: 'Toys', items: [
                    { header: 'Shopkins', keywords: 'animals collectibles' },
                    { header: 'Train Sets', keywords: 'models rail collectibles' },
                    { header: 'Science Kit', keywords: 'education physics chemistry' },
                    { header: 'Play-Doh', keywords: 'clay sculpt models' },
                    { header: 'Crayola', keywords: 'drawing painting wax chalk pencils' }
                ]
            },
            {
                header: 'Home', items: [
                    { header: 'Coffeee Maker', keywords: 'kitchen appliance drink' },
                    { header: 'Breadmaker', keywords: 'kitchen appliance food cooking' },
                    { header: 'Solar Panel', keywords: 'electric sun renewable energy' },
                    { header: 'Work Table', keywords: 'shop tools' },
                    { header: 'Propane Grill', keywords: 'food cooking barbecue meat' }
                ]
            }
        ];
    }
}