// get the tree data
export function getData() {
    return [
        { header: 'Angular', items: [
                { header: '<a href="ng/intro">Introduction</a>' },
                { header: '<a href="ng/samples">Samples</a>' },
                { header: '<a href="ng/perf">Performance</a>' }
            ]
        },
        { header: 'React', items: [
                { header: '<a href="rc/intro">Introduction</a>' },
                { header: '<a href="rc/samples">Samples</a>' },
                { header: '<a href="rc/perf">Performance</a>' }
            ]
        },
        { header: 'Vue', items: [
                { header: '<a href="vue/intro">Introduction</a>' },
                { header: '<a href="vue/samples">Samples</a>' },
                { header: '<a href="vue/perf">Performance</a>' }
            ]
        },
        { header: 'Knockout', items: [
                { header: '<a href="ko/intro">Introduction</a>' },
                { header: '<a href="ko/samples">Samples</a>' },
                { header: '<a href="ko/perf">Performance</a>' }
            ]
        }
    ];
}
