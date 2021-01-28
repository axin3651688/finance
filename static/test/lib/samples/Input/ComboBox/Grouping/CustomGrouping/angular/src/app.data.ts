import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    // some data for the list/combo
    getData() {
        return [
            'Andrus Lockie',
            'Davy Imos',
            'Kathryn Lotze',
            'Vin Colbran',
            'Scarlett Spalls',
            'Robbi Eckford',
            'Feodor Rippin',
            'Jami Balmforth',
            'Wenonah Clemendot',
            'Cortney Cota',
            'Iormina Sullly',
            'Leona Philpot',
            'Renelle Dulinty',
            'Dorella Gawthrope',
            'Brenda Hannaway',
            'Katya Thiem',
            'Tommy Beenham',
            'Dari Willets',
            'Gilburt Seagrove',
            'Silvana Gabbett',
            'Noemi McCree',
            'Jaquelyn Autie',
            'D\'arcy Myton',
            'Wash Petrasso',
            'Bertrand Costi',
            'Garrick Attyeo',
            'Helaina Castle',
            'Gauthier Hosby',
            'Aime Danhel',
            'Tiffie Sallis',
            'Charmian Pettipher',
            'Yolanthe Wildt',
            'Toiboid Stoyles',
            'Cati Lamble',
            'Mohandas Bellord',
            'Brew World',
            'Dorri Davydochkin',
            'Winonah Doudny',
            'Sax Broadhead',
            'Gilligan Maskelyne',
            'Aldus McIntee',
            'Pammy Sheivels',
            'Israel Hodgin',
            'Odo Berrisford',
            'Aldo Lobell',
            'Erik Ca',
            'Roy Hallatt',
            'Wally Edie',
            'Ash Adamowicz',
            'Alexandrina Whitney',
            'Jenelle Matthis',
            'Bobina Emlin',
            'Emmet Townshend',
            'Baudoin Dulen',
            'Dominga MacPaik',
            'Mela Guare',
            'Edwina Scotchmoor',
            'Dorree Creus',
            'Ivor Burnep',
            'Guinna Leggin',
            'Marice Woodier',
            'Jamesy Kettlewell',
            'Mommy Barrows',
            'Waylin Beeres',
            'Preston Culham',
            'Adolf Shirtcliffe',
            'Jorey Rigge',
            'Toni Huriche',
            'Merrily Corryer',
            'Ellary Jepson',
            'Clemence Niblo',
            'Petey Tireman',
            'Juan Biddlecombe',
            'Durand Eddy',
            'Tersina Baggiani',
            'Margery Philpotts',
            'Robin Bonafacino',
            'Dalia Kneebone',
            'Libbi Bransdon',
            'Parke Niblo',
            'Clark Powell',
            'Flory Bleythin',
            'Chandler Olenov',
            'Horton Birdis',
            'Frazer Dragoe',
            'Suzie Ackroyd',
            'Adams Wilcox',
            'Duane Ceschelli',
            'Cris Vakhlov',
            'Hodge Jedrzej',
            'Alexio Ionnidis',
            'Dalia Piotrowski',
            'Rhodia Gritsunov',
            'Melody Driuzzi',
            'Gauthier Waycott',
            'Ivy Domerque',
            'Carolyne Gadsdon',
            'Maison Durdan',
            'Blancha Hissie',
            'Ty Mouan',
            'Ania Whittock',
            'Riki Mariet',
            'Tybi Levesley',
            'Jemmie Ghilardini',
            'Boniface Lighton',
            'Janetta Gaskell',
            'Darrelle Hartless',
            'Theadora Taberer',
            'Tabb Pawley',
            'Cleavland Wardesworth',
            'Risa Mary',
            'Clovis Dilks',
            'Linn Duckinfield',
            'Rachele Tampen',
            'Raeann Boddis',
            'Lydon Warden',
            'Kennedy Duberry',
            'Barb Colegate',
            'Regine Feldbrin',
            'Kerr Boddie',
            'Rube Giamuzzo',
            'Thibaud Arnaldo',
            'Gherardo Swinglehurst',
            'Ofilia Obin',
            'Jae Craigie',
            'Benoit Rabson',
            'Cass Kempston',
            'Yard Drewson',
            'Dex Aloshikin',
            'Carlos Yurasov',
            'Any Moriarty',
            'Kaspar Broady',
            'Vlad Maffucci',
            'Ginelle Barus',
            'Nance Gommey',
            'Chandra Flay',
            'Shem Woffinden',
            'Theodor Coase',
            'Jillana Olivet',
            'Cornelle Donnan',
            'Andie Bourrel',
            'Miquela MacIlory',
            'Schuyler Ramsbottom',
            'Heddie Saull',
            'Devi Boch',
            'Sissie Gaunson',
            'Porty Goodliffe',
            'Donalt Bore',
            'Elvyn Toffano',
            'Mata Glassup',
            'Maximilian Schanke',
            'Kenton Tourle',
            'Maurine Revitt',
            'Hyacinthe Kira',
            'Husain Nairy',
            'Janaya Isted',
            'Cindy Helling',
            'Astrid Glasner',
            'Ganny Treece',
            'Marybelle Belson',
            'Jarrod Ferreira',
            'Stephine Rapier',
            'Randene Hadenton',
            'Amie Durrett',
            'Rawley Arlidge',
            'Rolf Cattrall',
            'Germain Sibbons',
            'Lynnette Akam',
            'Bobinette Paige',
            'Dido House',
            'Helen-elizabeth Hedgecock',
            'Gaylord McCuaig',
            'Alexei Chaikovski',
            'Beverlie Worral',
            'Roana Quinevan',
            'Collete Townson',
            'Ezequiel Johanning',
            'Alyce Shanley',
            'Vilma Piscopello',
            'Michel Amiss',
            'Leia Monan',
            'Ana Wedmore',
            'Elnar Frankcom',
            'Rachel Lovett',
            'Rubia Hague',
            'Andy Switland',
            'Nonah Barkway',
            'Lira Ardy',
            'Kylila Hows',
            'Sondra Meechan',
            'Colly Skerritt',
            'Lanae Morrissey',
            'Lukas Eronie',
            'Marjy Ffoulkes',
            'Bern Pacey',
            'Carroll Bentsen',
            'Kim McCaw',
            'Aigneis Tousy',
            'Damita Dunderdale',
            'Rahel Silvermann',
            'Roosevelt Handes',
            'Shandee Dutnall',
            'Milicent Beevor',
            'Oberon Bilbrook',
            'Genia Etherton',
            'Carlee Valenta',
            'Edgard Lindholm',
            'Tiebold Seeler',
            'Peggie Withur',
            'Steffie Ruppertz',
            'Charles Kordas',
            'Phylys Joscelin',
            'Eberto Byrd',
            'Ewan Ding',
            'Gilemette Mewton',
            'Linell Birkmyre',
            'Faydra Tineman',
            'Bidget Girton',
            'Barton Tomney',
            'Mellisa Aburrow',
            'Rivy Shreeve',
            'Barbabra Espinha',
            'Fidelio Kimmince',
            'Bendix Lavens',
            'Michaela Skains',
            'Isadore Woodruff',
            'Doralyn Davidowsky',
            'Quinn Tett',
            'Harriett Curman',
            'Ephraim Dicks',
            'Mayor Cords',
            'Mattheus Bowcock',
            'Nataniel Gadsdon',
            'Sharyl Bolver',
            'Kristo Rizzi',
            'Andromache Gregan',
            'Modestia Strete',
            'Malva Reach',
            'Lanie Myton',
            'Stern Grandisson',
            'Carlyn Emmins',
            'Mikkel Dalston',
            'Dina Curtoys',
            'Daloris Pasquale',
            'Lenora Alexandrescu',
            'Harbert Flag',
            'Niles Hucquart',
            'Nananne Castledine',
            'Wallache Lasseter',
            'Jordan Thornally',
            'Dallas Aldred',
            'Theodore Dugget',
            'Carlita Dillinger',
            'Giles Lulham',
            'Micah Frizzell',
            'Corenda Dunsford',
            'Carrol Wittke',
            'Aylmar Frayn',
            'Melisa Farenden',
            'Diarmid Goodboddy',
            'Gregoire Pinsent',
            'Roderigo Palumbo',
            'Lion Deny',
            'Rhys Wyeth',
            'Madella Hold',
            'Agata Leates',
            'Angelica O\'Kennedy',
            'Webb Coen',
            'Dorris McAlpine',
            'Oswell Castelijn',
            'Rolfe Burns',
            'Marion Kirkam',
            'Stefania Millichip',
            'Arlette Tufts',
            'Dre Lewzey',
            'Jaymee Markel',
            'Helen-elizabeth Eich',
            'Melodee Deveral',
            'Darell Borne',
            'Junette Burkill',
            'Winonah Obbard',
            'Ansel Dibsdale',
            'Rozalie Chidley',
            'Saree Greendale',
            'Nanine Eisikowitch',
            'Nisse Forbear',
            'Kit Tournay',
            'Thia Boorn',
            'Vivie Aspinal',
            'Dirk Wigan',
            'Tammie Knowlson',
            'Morten Purcell',
            'Eolanda Messum',
            'Samuele Heineken',
            'Cam Fyndon',
            'Zane Horwell',
            'Gabie Mazey',
            'Durward Healey',
            'Des Ellams',
            'Gabrila Molen',
            'Dimitri Limrick',
            'Filmore Slemming',
            'Zaccaria Jencken',
            'Raimondo Cathcart',
            'Raymond Skipper',
            'Garrek Labden',
            'Wolfy Fabri',
            'Jarrad D\'Alessandro',
            'Calli Ainley',
            'Sayres Train',
            'Malissia Gilbride',
            'Cornell Colclough',
            'Jens Clackson',
            'Filippo Spoure',
            'Leigh Tremouille',
            'Aldon Rois',
            'Rey Lethieulier',
            'Whit Vasic',
            'Melly Blankhorn',
            'Dorie Anker',
            'Brier Rosbrough',
            'Manon Phipard-Shears',
            'Sondra Spencers',
            'Mylo Pease',
            'Rhea Antyshev',
            'Rosa Crellin',
            'Marlee Chaster',
            'Erie Frankema',
            'Gonzalo McCrillis',
            'Sadella Zink',
            'Roscoe Paffot',
            'Angel Armal',
            'Clifford Sackes',
            'Kiah Velasquez',
            'Dewey Jobern',
            'Elnar Free',
            'Paule Shannon',
            'Fawne Cassar',
            'Shawnee Mc Ilwrick',
            'Jessie Stops',
            'Sharlene Blaiklock',
            'Anna-diana Gockeler',
            'Mahala Offell',
            'Jourdan Skipp',
            'Ignacius Wathall',
            'Marijn Maber',
            'Alexandr Lathey',
            'Sutton Lambrecht',
            'Michael Penhaligon',
            'Rebbecca Kinnin',
            'Mill Hickford',
            'Bendick Wheadon',
            'Sissie Kiss',
            'Dan Reeders',
            'Valentine Swadlin',
            'Odessa Sancias',
            'Lurlene Woolford',
            'Donica Fearenside',
            'Ortensia Galpen',
            'Cthrine Lilian',
            'Gaby Thresh',
            'Dalis Whyberd',
            'Colver Malster',
            'Nomi Klesl',
            'Winston Slyne',
            'Bianca Hazzard',
            'Gaultiero Rottcher',
            'Arte Fairfoul',
            'Bendite Ardling',
            'Aggy Spearett',
            'Fremont McKirton',
            'Phillis Addlestone',
            'Zelig Durman',
            'Bo Bremond',
            'Luz Stirrup',
            'Ofelia Andreotti',
            'Morey Gilhool',
            'Derril Brisse',
            'Dian Denness',
            'Feodora Michie',
            'Sheri Screach',
            'Kellina Braxay',
            'Nanni Handslip',
            'Cobby Grzelczyk',
            'Alf Bankes',
            'Jim Crichmere',
            'Calypso Cheshir',
            'Waring Altimas',
            'Nikos MacMurray',
            'Web Blayney',
            'Barbe Meachan',
            'Fonz Rennebach',
            'Electra Neissen',
            'Reynolds Peterffy',
            'Murry Hannam',
            'Ileana Rodolfi',
            'Star Lauritsen',
            'Reginald Maliphant',
            'Minny Flanne',
            'Delmer Cornil',
            'Vina Ion',
            'Arnold Krelle',
            'Sayres Kernan',
            'Matti Ilyukhov',
            'Hastings Von Oertzen',
            'Thea Hugenin',
            'Maurise Leitch',
            'Marsha Falck',
            'Merry Ladlow',
            'Mandi Fouracre',
            'Emmett Kahan',
            'Ronnie Chastan',
            'Ricoriki Shah',
            'Kevin Burfoot',
            'Felicia Dyke',
            'Corena Glazer',
            'Eirena Skillen',
            'Pierce Jobling',
            'Blythe Gambles',
            'Orella Ollett',
            'Cristin Callendar',
            'Killian Cromar',
            'Pembroke Carlyle',
            'Ben Toopin',
            'Ansel Shoebrook',
            'Timmy Huyghe',
            'Noni Seccombe',
            'Georgianne Larcier',
            'Jimmy Pannaman',
            'Antonio Nuccitelli',
            'Hildy Angier',
            'Grenville Baise',
            'Blakelee Addekin',
            'Raquela Karys',
            'Sharline Blackler',
            'Florrie Ricks',
            'Lou Osan',
            'Charmian Mount',
            'Dunc Houdhury',
            'Nelle Illingsworth',
            'Audra Jeannel',
            'Raoul Church',
            'Adrien Grigoriscu',
            'Sybilla Benzi',
            'Natal Lamke',
            'Burgess Furphy',
            'Vaughan Yakubovich',
            'Laverna Snarr',
            'Ettore Blanpein',
            'Chrissy Cranshaw',
            'Reg Rispin',
            'Raymund Uccelli',
            'Irv Baskerville',
            'Preston Hembling',
            'Lew Battershall',
            'Leigh Gingles',
            'Benjamin Chicchetto',
            'Ailina Padden',
            'Dasya Terbruggen',
            'Gerrie Danaher',
            'Danyelle Finnigan',
            'Benny Neeves',
            'Prescott Trappe',
            'Marya Burstowe',
            'Pincas Ludlem',
            'Bondie Patton',
            'Robena Friedlos',
            'Kelila Minithorpe',
            'Shalom Bargery',
            'Cad Grosvener',
            'Alisun Ranklin',
            'Rustie Inold',
            'Domenic Crosser',
            'Silas Hannan',
            'Benny Tax',
            'Gabrielle Rickardsson',
            'Jannel Dominetti',
            'Ron Shewen',
            'Saidee Dorken',
            'Cart Pullman',
            'Jaquelyn Chrispin',
            'Theressa Coil',
            'Judah Ritchman',
            'Tammie Ivantsov',
            'Rubetta Hemstead',
            'Fifine McGuggy',
            'Consolata Pendrill',
            'Raquel Brokenshire',
            'Audry Physick',
            'Siusan Magner',
            'Napoleon Hoggins',
            'Skipp Besson',
            'Myrvyn Caruth',
            'Meredithe Pickworth',
            'Dudley Worters',
            'Anatollo Kenefick',
            'Maurits Di Ruggero',
            'Odetta Hanalan',
            'Brittani Moorman',
            'Marilee Pickering',
            'Jo-anne Tweedy',
            'Bing Enochsson',
            'Baird Hebborne',
            'Jervis Brierton',
            'Frederick Boorn',
            'Alane Bertin',
            'Danita Dytham',
            'Ruby Craufurd',
            'Miller Godwin',
            'Giacobo Erwin',
            'Cary Stryde',
            'Hephzibah Fiddy',
            'Tadd Saunton',
            'Linnie Halsted',
            'Beauregard Selvey',
            'Marlow Cappleman',
            'Kissiah Mannering',
            'Meriel Poschel',
            'Sanders Althrop',
            'Delmar Shelford',
            'Ailene Trahair',
            'Merci Garrie',
            'Lance Isaak',
            'Rafe Maier',
            'Somerset Kern',
            'Quincy Fayerbrother',
            'Gussy Kits',
            'Ode Cownden',
            'Cairistiona Gocke',
            'Patrice Freebury',
            'Gavra Cuell',
            'Edita Liebermann',
            'Zonnya Stanborough',
            'Goraud Bence',
            'Pen Headington',
            'Charyl Leap',
            'Cherrita Danilov',
            'Derward Murney',
            'Gayla Martinec',
            'Joly Furman',
            'Frasco Antoney',
            'Kahlil Cawthorne',
            'Billie Burkart',
            'Jobey Ilyin',
            'Virginia Frayn',
            'Toni Cosgrove',
            'Pamella Rodgerson',
            'Rubia Thorndycraft',
            'Ezechiel Aubray',
            'Marlowe Drew-Clifton',
            'Charlotta Cainey',
            'Allyson Braikenridge',
            'Alidia Tutt',
            'Margaretha Ovendale',
            'Beatrisa Ilett',
            'Wilfrid Ellson',
            'Alvera Slym',
            'Ann Brocklebank',
            'Nisse Bleiman',
            'Allan Limbourne',
            'Myrtie Althrop',
            'Arden Zmitrichenko',
            'Ileana Leifer',
            'Elva Hewes',
            'Felecia Galland',
            'Tamara Pinsent',
            'Marlon Gleadle',
            'Sorcha Sallowaye',
            'Letizia Trenouth',
            'Claudio Hammer',
            'Roberto Neill',
            'Terrijo Hansman',
            'Yank Darrigrand',
            'Agna Perutto',
            'Thekla Verillo',
            'Gonzalo Spilsburie',
            'Bern Crowhurst',
            'Odetta Depka',
            'Marlowe Fellenor',
            'Prescott De Rechter',
            'Karoline Tolotti',
            'Hadley Caddell',
            'Hewie Smiley',
            'Sharla Stryde',
            'Nolana Stern',
            'Merwin Bassill',
            'Ikey Longforth',
            'Holly Chaperlin',
            'Fowler Yurin',
            'Wally Colomb',
            'Ricky Ibert',
            'Audry Joris',
            'Vanna Sponton',
            'Zeke Prettyjohn',
            'Clayson McClifferty',
            'Clare Allot',
            'Bowie De Bruijne',
            'Gordie Jentgens',
            'Alyss Hazelgreave',
            'Lisette Danks',
            'Poppy Haysar',
            'Bryn Bubbear',
            'Glori Darco',
            'Manuel Plevin',
            'Erika Oldford',
            'Gottfried O\'Currine ',
            'Clywd Claasen',
            'Kass Judgkins',
            'Noella Langfat',
            'Damian Conan',
            'Patrizius Culp',
            'Gwennie Jenner',
            'Lyman Hollow',
            'Gayelord Brunke',
            'Blane Zywicki',
            'Tibold Crielly',
            'Roman Wankling',
            'Rosaline Skullet',
            'Adele Muffin',
            'Demetria Peete',
            'Stanislaw Spera',
            'Rolph Ivanyutin',
            'Trixie Brislawn',
            'Freda Bower',
            'Dorree Lardeur',
            'Benni Petzolt',
            'Joseph Dunbleton',
            'Hart Dimont',
            'Dwayne Liddyard',
            'Conrad Smalls'
        ];
    }
}