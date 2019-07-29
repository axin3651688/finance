export function getReports() {
    return {
        selectedReport: {
            categoryName: 'AdventureWorks',
            reportName: 'Company Sales'
        },
        categories: [
            {
                name: 'AdventureWorks',
                text: 'Adventure Works',
                reports: [
                    {
                        reportPath: 'AdventureWorks/Company Sales',
                        reportName: 'Company Sales',
                        reportTitle: 'Company Sales'
                    },
                    {
                        reportPath: 'AdventureWorks/Customers Near Stores',
                        reportName: 'Customers Near Stores',
                        reportTitle: 'Customers Near Stores'
                    },
                    {
                        reportPath: 'AdventureWorks/Employee Sales Summary Detail',
                        reportName: 'Employee Sales Summary Detail',
                        reportTitle: 'Employee Sales Summary Detail'
                    },
                    {
                        reportPath: 'AdventureWorks/Product Catalog',
                        reportName: 'Product Catalog',
                        reportTitle: 'Product Catalog'
                    },
                    {
                        reportPath: 'AdventureWorks/Product Line Sales',
                        reportName: 'Product Line Sales',
                        reportTitle: 'Product Line Sales'
                    },
                    {
                        reportPath: 'AdventureWorks/Sales by Region',
                        reportName: 'Sales by Region',
                        reportTitle: 'Sales by Region'
                    },
                    {
                        reportPath: 'AdventureWorks/Store Contacts',
                        reportName: 'Store Contacts',
                        reportTitle: 'Store Contacts'
                    },
                    {
                        reportPath: 'AdventureWorks/Territory Sales Drilldown',
                        reportName: 'Territory Sales Drilldown',
                        reportTitle: 'Territory Sales Drilldown'
                    }
                ]
            }
        ]
    };
}