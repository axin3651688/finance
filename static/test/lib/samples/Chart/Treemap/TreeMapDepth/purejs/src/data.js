// Get random data.
export function getData() {
    var data = [
        {
            type: 'Music', items: [
                {
                    type: 'Country', items: [
                        { type: 'Classic Country', sales: getSales() },
                        { type: 'Cowboy Country', sales: getSales() },
                        { type: 'Outlaw Country', sales: getSales() },
                        { type: 'Western Swing', sales: getSales() },
                        { type: 'Roadhouse Country', sales: getSales() }
                    ]
                },
                {
                    type: 'Rock', items: [
                        { type: 'Hard Rock', sales: getSales() },
                        { type: 'Blues Rock', sales: getSales() },
                        { type: 'Funk Rock', sales: getSales() },
                        { type: 'Rap Rock', sales: getSales() },
                        { type: 'Guitar Rock', sales: getSales() },
                        { type: 'Progressive Rock', sales: getSales() }
                    ]
                },
                {
                    type: 'Classical', items: [
                        { type: 'Symphonies', sales: getSales() },
                        { type: 'Chamber Music', sales: getSales() }
                    ]
                },
                {
                    type: 'Soundtracks', items: [
                        { type: 'Movie Soundtracks', sales: getSales() },
                        { type: 'Musical Soundtracks', sales: getSales() }
                    ]
                },
                {
                    type: 'Jazz', items: [
                        { type: 'Smooth Jazz', sales: getSales() },
                        { type: 'Vocal Jazz', sales: getSales() },
                        { type: 'Jazz Fusion', sales: getSales() },
                        { type: 'Swing Jazz', sales: getSales() },
                        { type: 'Cool Jazz', sales: getSales() },
                        { type: 'Traditional Jazz', sales: getSales() }
                    ]
                },
                {
                    type: 'Electronic', items: [
                        { type: 'Electronica', sales: getSales() },
                        { type: 'Disco', sales: getSales() },
                        { type: 'House', sales: getSales() }
                    ]
                }
            ]
        },
        {
            type: 'Video', items: [
                {
                    type: 'Movie', items: [
                        { type: 'Kid & Family', sales: getSales() },
                        { type: 'Action & Adventure', sales: getSales() },
                        { type: 'Animation', sales: getSales() },
                        { type: 'Comedy', sales: getSales() },
                        { type: 'Drama', sales: getSales() },
                        { type: 'Romance', sales: getSales() }
                    ]
                },
                {
                    type: 'TV', items: [
                        { type: 'Science Fiction', sales: getSales() },
                        { type: 'Documentary', sales: getSales() },
                        { type: 'Fantasy', sales: getSales() },
                        { type: 'Military & War', sales: getSales() },
                        { type: 'Horror', sales: getSales() }
                    ]
                }
            ]
        },
        {
            type: 'Books', items: [
                {
                    type: 'Arts & Photography', items: [
                        { type: 'Architecture', sales: getSales() },
                        { type: 'Graphic Design', sales: getSales() },
                        { type: 'Drawing', sales: getSales() },
                        { type: 'Photography', sales: getSales() },
                        { type: 'Performing Arts', sales: getSales() }
                    ]
                },
                {
                    type: 'Children\'s Books', items: [
                        { type: 'Beginning Readers', sales: getSales() },
                        { type: 'Board Books', sales: getSales() },
                        { type: 'Chapter Books', sales: getSales() },
                        { type: 'Coloring Books', sales: getSales() },
                        { type: 'Picture Books', sales: getSales() },
                        { type: 'Sound Books', sales: getSales() }
                    ]
                },
                {
                    type: 'History', items: [
                        { type: 'Ancient', sales: getSales() },
                        { type: 'Medieval', sales: getSales() },
                        { type: 'Renaissance', sales: getSales() }
                    ]
                },
                {
                    type: 'Mystery', items: [
                        { type: 'Mystery', sales: getSales() },
                        { type: 'Thriller & Suspense', sales: getSales() }
                    ]
                },
                {
                    type: 'Romance', items: [
                        { type: 'Action & Adventure', sales: getSales() },
                        { type: 'Holidays', sales: getSales() },
                        { type: 'Romantic Comedy', sales: getSales() },
                        { type: 'Romantic Suspense', sales: getSales() },
                        { type: 'Western', sales: getSales() },
                        { type: 'Historical', sales: getSales() }
                    ]
                },
                {
                    type: 'Sci-Fi & Fantasy', items: [
                        { type: 'Fantasy', sales: getSales() },
                        { type: 'Gaming', sales: getSales() },
                        { type: 'Science Fiction', sales: getSales() }
                    ]
                }
            ]
        },
        {
            type: 'Electronics', items: [
                {
                    type: 'Camera', items: [
                        { type: 'Digital Cameras', sales: getSales() },
                        { type: 'Film Photography', sales: getSales() },
                        { type: 'Lenses', sales: getSales() },
                        { type: 'Video', sales: getSales() },
                        { type: 'Accessories', sales: getSales() }
                    ]
                },
                {
                    type: 'Headphones', items: [
                        { type: 'Earbud headphones', sales: getSales() },
                        { type: 'Over-ear headphones', sales: getSales() },
                        { type: 'On-ear headphones', sales: getSales() },
                        { type: 'Bluetooth headphones', sales: getSales() },
                        { type: 'Noise-cancelling headphones', sales: getSales() },
                        { type: 'Audiophile headphones', sales: getSales() }
                    ]
                },
                {
                    type: 'Cell Phones', items: [
                        { type: 'Cell Phones', sales: getSales() },
                        {
                            type: 'Accessories', items: [
                                { type: 'Batteries', sales: getSales() },
                                { type: 'Bluetooth Headsets', sales: getSales() },
                                { type: 'Bluetooth Speakers', sales: getSales() },
                                { type: 'Chargers', sales: getSales() },
                                { type: 'Screen Protectors', sales: getSales() }
                            ]
                        }
                    ]
                },
                {
                    type: 'Wearable Technology', items: [
                        { type: 'Activity Trackers', sales: getSales() },
                        { type: 'Smart Watches', sales: getSales() },
                        { type: 'Sports & GPS Watches', sales: getSales() },
                        { type: 'Virtual Reality Headsets', sales: getSales() },
                        { type: 'Wearable Cameras', sales: getSales() },
                        { type: 'Smart Glasses', sales: getSales() }
                    ]
                }
            ]
        },
        {
            type: 'Computers & Tablets', items: [
                {
                    type: 'Desktops', items: [
                        { type: 'All-in-ones', sales: getSales() },
                        { type: 'Minis', sales: getSales() },
                        { type: 'Towers', sales: getSales() }
                    ]
                },
                {
                    type: 'Laptops', items: [
                        { type: '2 in 1 laptops', sales: getSales() },
                        { type: 'Traditional laptops', sales: getSales() }
                    ]
                },
                {
                    type: 'Tablets', items: [
                        { type: 'iOS', sales: getSales() },
                        { type: 'Android', sales: getSales() },
                        { type: 'Fire OS', sales: getSales() },
                        { type: 'Windows', sales: getSales() }
                    ]
                }
            ]
        }
    ];
    return data;
}
//
function getSales() {
    return Math.round(Math.random() * 100);
}
