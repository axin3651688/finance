export type TReport = {
    fileName: string;
    reportName: string;
    reportTitle: string;
};
//
export type TReportCategory = {
    name: string;
    text: string;
    reports: TReport[];
};
//
export type TReports = {
    selectedReport: {
        categoryName: string;
        reportName: string;
    };
    categories: TReportCategory[];
};
//
export function getReports() {
    return <TReports>{
        selectedReport: {
            categoryName: 'Formatting',
            reportName: 'AlternateBackground'
        },
        categories: [
            {
                name: 'Controls',
                text: 'Controls',
                reports: [
                    {
                        fileName: 'AllCharts.flxr',
                        reportName: 'AllCharts',
                        reportTitle: 'All Charts'
                    },
                    {
                        fileName: 'BarcodeProductLabels.flxr',
                        reportName: 'Product Labels (EAN-13, Label 5096)',
                        reportTitle: 'Barcode Product Labels'
                    },
                    {
                        fileName: 'BarcodeShippingLabels.flxr',
                        reportName: 'Shipping Labels (Code 128, Label 5164)',
                        reportTitle: 'Barcode Shipping Labels'
                    },
                    {
                        fileName: 'BoundImages.flxr',
                        reportName: 'Bound Images',
                        reportTitle: 'Bound Images'
                    },
                    {
                        fileName: 'Charts.flxr',
                        reportName: 'Charts',
                        reportTitle: 'Charts'
                    },
                    {
                        fileName: 'CheckBox.flxr',
                        reportName: 'CheckBox',
                        reportTitle: 'Check Box'
                    },
                    {
                        fileName: 'ComplexExpressions.flxr',
                        reportName: 'ComplexExpressions',
                        reportTitle: 'Complex Expressions'
                    },
                    {
                        fileName: 'NewCharts.flxr',
                        reportName: 'NewCharts',
                        reportTitle: 'New Charts'
                    },
                    {
                        fileName: 'PageHeadersInSubreports.flxr',
                        reportName: 'Page Headers in Subreports',
                        reportTitle: 'PageHeader In Subreports'
                    },
                    {
                        fileName: 'ParagraphField.flxr',
                        reportName: 'ParagraphField',
                        reportTitle: 'Paragraph Field'
                    },
                    {
                        fileName: 'RTFField.flxr',
                        reportName: 'RTFField',
                        reportTitle: 'RTF Field'
                    },
                    {
                        fileName: 'Shapes.flxr',
                        reportName: 'Shapes',
                        reportTitle: 'Shapes'
                    },
                    {
                        fileName: 'UnboundImages.flxr',
                        reportName: 'Unbound Images',
                        reportTitle: 'Unbound Images'
                    }
                ]
            },
            {
                name: 'DataBinding',
                text: 'Data Binding',
                reports: [
                    {
                        fileName: 'MultiDataSource.flxr',
                        reportName: 'MultiDataSource',
                        reportTitle: 'Multiple Data Source'
                    },
                    {
                        fileName: 'Nwind.flxr',
                        reportName: 'Invoice',
                        reportTitle: 'NWind'
                    },
                    {
                        fileName: 'StoredProcedure.flxr',
                        reportName: 'Alphabetical List of Products',
                        reportTitle: 'Stored Procedure'
                    }
                ]
            },
            {
                name: 'DataCalculations',
                text: 'Data Calculations',
                reports: [
                    {
                        fileName: 'Aggregates.flxr',
                        reportName: 'Aggregates',
                        reportTitle: 'Aggregates'
                    },
                    {
                        fileName: 'CalculatedFields.flxr',
                        reportName: 'CalculatedFields',
                        reportTitle: 'Calculated Fields'
                    },
                    {
                        fileName: 'GroupPageCounts.flxr',
                        reportName: 'GroupPageCounts',
                        reportTitle: 'Page Counts'
                    },
                    {
                        fileName: 'RunningSums.flxr',
                        reportName: 'Running Sums',
                        reportTitle: 'Running Sums'
                    }
                ]
            },
            {
                name: 'DataManipulation',
                text: 'Data Manipulation',
                reports: [
                    {
                        fileName: 'CascadingParameters.flxr',
                        reportName: 'Cascading Parameters',
                        reportTitle: 'Cascading Parameters'
                    },
                    {
                        fileName: 'MultivalueParameters.flxr',
                        reportName: 'MultivalueParameters',
                        reportTitle: 'Multivalue Parameters'
                    },
                    {
                        fileName: 'Parameters.flxr',
                        reportName: 'Parameters',
                        reportTitle: 'Parameters'
                    },
                    {
                        fileName: 'Sorting.flxr',
                        reportName: 'Sorting',
                        reportTitle: 'Sorting'
                    }
                ]
            },
            {
                name: 'EnterpriseReports',
                text: 'Enterprise Reports',
                reports: [
                    {
                        fileName: 'EmployeeExpReport.flxr',
                        reportName: 'EmpExpenseReport',
                        reportTitle: 'Employee Expense Report'
                    },
                    {
                        fileName: 'MarketingProjectPlan.flxr',
                        reportName: 'MarketingProjectPlan',
                        reportTitle: 'Marketing Project Plan'
                    },
                    {
                        fileName: 'MonthlyProjectExpenseTracking.flxr',
                        reportName: 'MonthlyProjectExpenseTracking',
                        reportTitle: 'Monthly Project Expense'
                    },
                    {
                        fileName: 'OrganizationChart.flxr',
                        reportName: 'OrganizationChart',
                        reportTitle: 'Organization Chart'
                    }
                ]
            },
            {
                name: 'FinancialReports',
                text: 'Financial Reports',
                reports: [
                    {
                        fileName: 'BalanceSheet.flxr',
                        reportName: 'BalanceSheet',
                        reportTitle: 'Balance Sheet'
                    },
                    {
                        fileName: 'InventoryManagementReport.flxr',
                        reportName: 'InventoryManagementReport',
                        reportTitle: 'Inventory Management Report'
                    },
                    {
                        fileName: 'MonthlyBudget.flxr',
                        reportName: 'MonthlyBudget',
                        reportTitle: 'Monthly Budget'
                    }
                ]
            },
            {
                name: 'Formatting',
                text: 'Formatting',
                reports: [
                    {
                        fileName: 'AlternateBackground.flxr',
                        reportName: 'AlternateBackground',
                        reportTitle: 'Alternating Background'
                    },
                    {
                        fileName: 'ConditionalFormatting.flxr',
                        reportName: 'ConditionalFormatting',
                        reportTitle: 'Conditional Formatting'
                    },
                    {
                        fileName: 'Watermark.flxr',
                        reportName: 'Watermark',
                        reportTitle: 'Watermark'
                    }
                ]
            },
            {
                name: 'Layout',
                text: 'Layout',
                reports: [
                    {
                        fileName: 'Layout.flxr',
                        reportName: 'Layout',
                        reportTitle: 'Can Grow/Can Shrink'
                    },
                    {
                        fileName: 'ContinuedHeaders.flxr',
                        reportName: 'Continued Headers',
                        reportTitle: 'Continued Headers'
                    },
                    {
                        fileName: 'CustomPaperSize.flxr',
                        reportName: 'Custom Paper Size',
                        reportTitle: 'Custom Paper Size'
                    },
                    {
                        fileName: 'DynamicPH.flxr',
                        reportName: 'Dynamic Page Header',
                        reportTitle: 'Dynamic Page Headers'
                    },
                    {
                        fileName: 'ForcePageBreaks.flxr',
                        reportName: 'Force Page Breaks',
                        reportTitle: 'Force Page Breaks'
                    },
                    {
                        fileName: 'Gutter.flxr',
                        reportName: 'Gutter',
                        reportTitle: 'Gutter'
                    },
                    {
                        fileName: 'SubSections.flxr',
                        reportName: 'SubSections',
                        reportTitle: 'Sub Sections'
                    }
                ]
            },
            {
                name: 'MedicalReports',
                text: 'Medical Reports',
                reports: [
                    {
                        fileName: 'BloodTestReport.flxr',
                        reportName: 'BloodTest',
                        reportTitle: 'Blood Test Report'
                    },
                    {
                        fileName: 'FoodAllergyTest.flxr',
                        reportName: 'FoodAllergyTest',
                        reportTitle: 'Food Allergy Test'
                    }
                ]
            },
            {
                name: 'MiscReports',
                text: 'Misc Reports',
                reports: [
                    {
                        fileName: 'CrossTab.flxr',
                        reportName: 'Cross-tab Reports',
                        reportTitle: 'Cross Tab Reports'
                    },
                    {
                        fileName: 'MailMerge.flxr',
                        reportName: 'Mail Merge',
                        reportTitle: 'Mail Merge'
                    },
                    {
                        fileName: 'PriceComparison.flxr',
                        reportName: 'PriceComparison',
                        reportTitle: 'Price Comparison'
                    }
                ]
            },
            {
                name: 'TelecomReports',
                text: 'Telecom Reports',
                reports: [
                    {
                        fileName: 'TelephoneBillReport.flxr',
                        reportName: 'TelephoneBill',
                        reportTitle: 'Telephone Bill Report'
                    }
                ]
            }
        ]
    };
}