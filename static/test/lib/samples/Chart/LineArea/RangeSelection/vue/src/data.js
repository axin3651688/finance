// some stock data from Google Finance
export function getData() {
    return [
        { date: new Date(2017, 2, 23), open: 841.39, high: 841.69, low: 833, close: 839.65, vol: 3287669 },
        { date: new Date(2017, 2, 22), open: 849.48, high: 855.35, low: 847, close: 849.8, vol: 1366749 },
        { date: new Date(2017, 2, 21), open: 870.06, high: 873.47, low: 847.69, close: 850.14, vol: 2537978 },
        { date: new Date(2017, 2, 20), open: 869.48, high: 870.34, low: 864.66, close: 867.91, vol: 1542199 },
        { date: new Date(2017, 2, 17), open: 873.68, high: 874.42, low: 868.37, close: 872.37, vol: 1868252 },
        { date: new Date(2017, 2, 16), open: 870.53, high: 872.71, low: 867.52, close: 870, vol: 1104452 },
        { date: new Date(2017, 2, 15), open: 867.94, high: 869.88, low: 861.3, close: 868.39, vol: 1332885 },
        { date: new Date(2017, 2, 14), open: 863.75, high: 867.58, low: 860.13, close: 865.91, vol: 1061692 },
        { date: new Date(2017, 2, 13), open: 860.83, high: 867.13, low: 860.82, close: 864.58, vol: 1166605 },
        { date: new Date(2017, 2, 10), open: 862.7, high: 864.23, low: 857.61, close: 861.4, vol: 1336585 },
        { date: new Date(2017, 2, 9), open: 853.69, high: 860.71, low: 852.67, close: 857.84, vol: 1347697 },
        { date: new Date(2017, 2, 8), open: 853.12, high: 856.93, low: 851.25, close: 853.64, vol: 1029834 },
        { date: new Date(2017, 2, 7), open: 847.26, high: 853.33, low: 845.52, close: 851.15, vol: 1038696 },
        { date: new Date(2017, 2, 6), open: 846.86, high: 848.94, low: 841.17, close: 847.27, vol: 1047872 },
        { date: new Date(2017, 2, 3), open: 848.94, high: 850.82, low: 844.7, close: 849.08, vol: 1006612 },
        { date: new Date(2017, 2, 2), open: 856.31, high: 856.49, low: 848.72, close: 849.85, vol: 1250938 },
        { date: new Date(2017, 2, 1), open: 851.38, high: 858, low: 849.02, close: 856.75, vol: 1818671 },
        { date: new Date(2017, 1, 28), open: 847.35, high: 848.83, low: 841.44, close: 844.93, vol: 1383119 },
        { date: new Date(2017, 1, 27), open: 844.95, high: 850.67, low: 843.01, close: 849.67, vol: 1010333 },
        { date: new Date(2017, 1, 24), open: 847.65, high: 848.36, low: 842.96, close: 847.81, vol: 1346189 },
        { date: new Date(2017, 1, 23), open: 851.08, high: 852.62, low: 842.5, close: 851, vol: 1386681 },
        { date: new Date(2017, 1, 22), open: 848, high: 853.79, low: 846.71, close: 851.36, vol: 1224889 },
        { date: new Date(2017, 1, 21), open: 847.99, high: 852.2, low: 846.55, close: 849.27, vol: 1261062 },
        { date: new Date(2017, 1, 17), open: 841.31, high: 846.94, low: 839.78, close: 846.55, vol: 1461210 },
        { date: new Date(2017, 1, 16), open: 838.5, high: 842.69, low: 837.26, close: 842.17, vol: 1005084 },
        { date: new Date(2017, 1, 15), open: 838.81, high: 841.77, low: 836.22, close: 837.32, vol: 1357185 },
        { date: new Date(2017, 1, 14), open: 839.77, high: 842, low: 835.83, close: 840.03, vol: 1363345 },
        { date: new Date(2017, 1, 13), open: 837.7, high: 841.74, low: 836.25, close: 838.96, vol: 1295708 },
        { date: new Date(2017, 1, 10), open: 832.95, high: 837.15, low: 830.51, close: 834.85, vol: 1415128 },
        { date: new Date(2017, 1, 9), open: 831.73, high: 831.98, low: 826.5, close: 830.06, vol: 1194238 },
        { date: new Date(2017, 1, 8), open: 830.53, high: 834.25, low: 825.11, close: 829.88, vol: 1302225 },
        { date: new Date(2017, 1, 7), open: 825.5, high: 831.92, low: 823.29, close: 829.23, vol: 1666605 },
        { date: new Date(2017, 1, 6), open: 820.92, high: 822.39, low: 814.29, close: 821.62, vol: 1350875 },
        { date: new Date(2017, 1, 3), open: 823.13, high: 826.13, low: 819.35, close: 820.13, vol: 1528095 },
        { date: new Date(2017, 1, 2), open: 815, high: 824.56, low: 812.05, close: 818.26, vol: 1689179 },
        { date: new Date(2017, 1, 1), open: 824, high: 824, low: 812.25, close: 815.24, vol: 2251047 },
        { date: new Date(2017, 0, 31), open: 819.5, high: 823.07, low: 813.4, close: 820.19, vol: 2020180 },
        { date: new Date(2017, 0, 30), open: 837.06, high: 837.23, low: 821.03, close: 823.83, vol: 3516933 },
        { date: new Date(2017, 0, 27), open: 859, high: 867, low: 841.9, close: 845.03, vol: 3752497 },
        { date: new Date(2017, 0, 26), open: 859.05, high: 861, low: 850.52, close: 856.98, vol: 3493251 },
        { date: new Date(2017, 0, 25), open: 853.55, high: 858.79, low: 849.74, close: 858.45, vol: 1662148 },
        { date: new Date(2017, 0, 24), open: 846.98, high: 851.52, low: 842.28, close: 849.53, vol: 1688375 },
        { date: new Date(2017, 0, 23), open: 831.61, high: 845.54, low: 828.7, close: 844.43, vol: 2457377 },
        { date: new Date(2017, 0, 20), open: 829.09, high: 829.24, low: 824.6, close: 828.17, vol: 1306183 },
        { date: new Date(2017, 0, 19), open: 829, high: 833, low: 823.96, close: 824.37, vol: 1070454 },
        { date: new Date(2017, 0, 18), open: 829.8, high: 829.81, low: 824.08, close: 829.02, vol: 1027698 },
        { date: new Date(2017, 0, 17), open: 830, high: 830.18, low: 823.2, close: 827.46, vol: 1440905 },
        { date: new Date(2017, 0, 13), open: 831, high: 834.65, low: 829.52, close: 830.94, vol: 1290182 },
        { date: new Date(2017, 0, 12), open: 828.38, high: 830.38, low: 821.01, close: 829.53, vol: 1350308 },
        { date: new Date(2017, 0, 11), open: 826.62, high: 829.9, low: 821.47, close: 829.86, vol: 1325394 },
        { date: new Date(2017, 0, 10), open: 827.07, high: 829.41, low: 823.14, close: 826.01, vol: 1197442 },
        { date: new Date(2017, 0, 9), open: 826.37, high: 830.43, low: 821.62, close: 827.18, vol: 1408924 },
        { date: new Date(2017, 0, 6), open: 814.99, high: 828.96, low: 811.5, close: 825.21, vol: 2017097 },
        { date: new Date(2017, 0, 5), open: 807.5, high: 813.74, low: 805.92, close: 813.02, vol: 1340535 },
        { date: new Date(2017, 0, 4), open: 809.89, high: 813.43, low: 804.11, close: 807.77, vol: 1515339 },
        { date: new Date(2017, 0, 3), open: 800.62, high: 811.44, low: 796.89, close: 808.01, vol: 1959033 },
        { date: new Date(2016, 11, 30), open: 803.21, high: 803.28, low: 789.62, close: 792.45, vol: 1735879 },
        { date: new Date(2016, 11, 29), open: 802.33, high: 805.75, low: 798.14, close: 802.88, vol: 1057392 },
        { date: new Date(2016, 11, 28), open: 813.33, high: 813.33, low: 802.44, close: 804.57, vol: 1214756 },
        { date: new Date(2016, 11, 27), open: 808.68, high: 816, low: 805.8, close: 809.93, vol: 975962 },
        { date: new Date(2016, 11, 23), open: 808.01, high: 810.97, low: 805.11, close: 807.8, vol: 765537 },
        { date: new Date(2016, 11, 22), open: 809.1, high: 811.07, low: 806.03, close: 809.68, vol: 1132119 },
        { date: new Date(2016, 11, 21), open: 815.72, high: 815.72, low: 805.1, close: 812.2, vol: 1459628 },
        { date: new Date(2016, 11, 20), open: 813.37, high: 816.49, low: 811, close: 815.2, vol: 1271883 },
        { date: new Date(2016, 11, 19), open: 809.28, high: 816.22, low: 804.5, close: 812.5, vol: 1263581 },
        { date: new Date(2016, 11, 16), open: 818.31, high: 819.2, low: 808.12, close: 809.84, vol: 2598866 },
        { date: new Date(2016, 11, 15), open: 817.36, high: 823, low: 812, close: 815.65, vol: 1769719 },
        { date: new Date(2016, 11, 14), open: 815.92, high: 824.26, low: 812.78, close: 817.89, vol: 1799654 },
        { date: new Date(2016, 11, 13), open: 812.39, high: 824.3, low: 811.94, close: 815.34, vol: 2128210 },
        { date: new Date(2016, 11, 12), open: 804.82, high: 811.35, low: 804.53, close: 807.9, vol: 1628602 },
        { date: new Date(2016, 11, 9), open: 799.3, high: 809.95, low: 798.05, close: 809.45, vol: 1904463 },
        { date: new Date(2016, 11, 8), open: 792.95, high: 799, low: 787.9, close: 795.17, vol: 1612531 },
        { date: new Date(2016, 11, 7), open: 779.95, high: 792, low: 773.53, close: 791.47, vol: 2029415 },
        { date: new Date(2016, 11, 6), open: 780.19, high: 785.28, low: 773.32, close: 776.18, vol: 1734099 },
        { date: new Date(2016, 11, 5), open: 770, high: 780, low: 766.97, close: 778.22, vol: 1688473 },
        { date: new Date(2016, 11, 2), open: 761.9, high: 770.5, low: 759, close: 764.46, vol: 1718846 },
        { date: new Date(2016, 11, 1), open: 778.55, high: 778.6, low: 753.36, close: 764.33, vol: 2867074 },
        { date: new Date(2016, 10, 30), open: 789.1, high: 791.51, low: 773.14, close: 775.88, vol: 2279054 },
        { date: new Date(2016, 10, 29), open: 788.38, high: 796.44, low: 785.34, close: 789.44, vol: 1561981 },
        { date: new Date(2016, 10, 28), open: 778.35, high: 799.74, low: 778.1, close: 785.79, vol: 2575432 },
        { date: new Date(2016, 10, 25), open: 782.61, high: 782.9, low: 778.19, close: 780.23, vol: 613549 },
        { date: new Date(2016, 10, 23), open: 789.52, high: 789.52, low: 772.65, close: 779, vol: 1312981 },
        { date: new Date(2016, 10, 22), open: 788.99, high: 793.77, low: 783.74, close: 785, vol: 1394174 },
        { date: new Date(2016, 10, 21), open: 778.1, high: 786.55, low: 776.3, close: 784.8, vol: 1630835 },
        { date: new Date(2016, 10, 18), open: 787.17, high: 791.29, low: 775.35, close: 775.97, vol: 1806264 },
        { date: new Date(2016, 10, 17), open: 782.5, high: 788.9, low: 779.85, close: 786.16, vol: 1533679 },
        { date: new Date(2016, 10, 16), open: 770.42, high: 783.5, low: 766.33, close: 779.98, vol: 1798360 },
        { date: new Date(2016, 10, 15), open: 765.47, high: 780.24, low: 765.22, close: 775.16, vol: 2943889 },
        { date: new Date(2016, 10, 14), open: 771.76, high: 771.78, low: 743.59, close: 753.22, vol: 3688274 },
        { date: new Date(2016, 10, 11), open: 776.81, high: 777.29, low: 765.54, close: 771.75, vol: 3592641 },
        { date: new Date(2016, 10, 10), open: 810, high: 810.06, low: 768.23, close: 780.29, vol: 5909609 },
        { date: new Date(2016, 10, 9), open: 801.83, high: 811.71, low: 792.04, close: 805.59, vol: 3098510 },
        { date: new Date(2016, 10, 8), open: 802.03, high: 816.04, low: 799.62, close: 811.98, vol: 1769069 },
        { date: new Date(2016, 10, 7), open: 794.95, high: 805, low: 792.9, close: 802.03, vol: 1992570 },
        { date: new Date(2016, 10, 4), open: 771.3, high: 788.48, low: 771, close: 781.1, vol: 1970603 },
        { date: new Date(2016, 10, 3), open: 784.5, high: 790, low: 778.63, close: 782.19, vol: 2175216 },
        { date: new Date(2016, 10, 2), open: 806.76, high: 806.76, low: 785, close: 788.42, vol: 2350736 },
        { date: new Date(2016, 10, 1), open: 810.87, high: 813.96, low: 798.26, close: 805.48, vol: 2355890 },
        { date: new Date(2016, 9, 31), open: 822.43, high: 822.63, low: 808, close: 809.9, vol: 2242679 },
        { date: new Date(2016, 9, 28), open: 829.94, high: 839, low: 817, close: 819.56, vol: 4354884 },
        { date: new Date(2016, 9, 27), open: 823.01, high: 826.58, low: 814.61, close: 817.35, vol: 2973486 },
        { date: new Date(2016, 9, 26), open: 827.12, high: 827.71, low: 816.35, close: 822.1, vol: 1794868 },
        { date: new Date(2016, 9, 25), open: 838.5, high: 838.5, low: 825.3, close: 828.55, vol: 1890712 },
        { date: new Date(2016, 9, 24), open: 830.09, high: 837.94, low: 829.04, close: 835.74, vol: 1447616 },
        { date: new Date(2016, 9, 21), open: 820, high: 824.29, low: 818.31, close: 824.06, vol: 1615814 },
        { date: new Date(2016, 9, 20), open: 827.56, high: 828.46, low: 820.55, close: 821.63, vol: 1393870 },
        { date: new Date(2016, 9, 19), open: 824.52, high: 829.81, low: 823.2, close: 827.09, vol: 1500142 },
        { date: new Date(2016, 9, 18), open: 814.21, high: 828.81, low: 813.33, close: 821.49, vol: 2289265 },
        { date: new Date(2016, 9, 17), open: 805.99, high: 813.49, low: 803.83, close: 806.84, vol: 1056367 },
        { date: new Date(2016, 9, 14), open: 807.45, high: 810.09, low: 802.32, close: 804.6, vol: 1111934 },
        { date: new Date(2016, 9, 13), open: 806.07, high: 806.56, low: 798.62, close: 804.08, vol: 1368981 },
        { date: new Date(2016, 9, 12), open: 811.96, high: 814.5, low: 808.55, close: 811.77, vol: 907876 },
        { date: new Date(2016, 9, 11), open: 814.17, high: 819.86, low: 807.37, close: 809.57, vol: 1721575 },
        { date: new Date(2016, 9, 10), open: 803.93, high: 817.38, low: 802.24, close: 814.17, vol: 1496115 },
        { date: new Date(2016, 9, 7), open: 805.93, high: 805.94, low: 796.82, close: 800.71, vol: 1163899 },
        { date: new Date(2016, 9, 6), open: 804.08, high: 806.94, low: 800.51, close: 803.08, vol: 1099909 },
        { date: new Date(2016, 9, 5), open: 806, high: 808.5, low: 800.71, close: 801.23, vol: 1213820 },
        { date: new Date(2016, 9, 4), open: 805, high: 806.5, low: 799.67, close: 802.79, vol: 1258706 },
        { date: new Date(2016, 9, 3), open: 802.55, high: 803.54, low: 796.23, close: 800.38, vol: 1489212 },
        { date: new Date(2016, 8, 30), open: 803.6, high: 808.09, low: 801.5, close: 804.06, vol: 1660201 },
        { date: new Date(2016, 8, 29), open: 807.23, high: 813.91, low: 800.86, close: 802.64, vol: 1349974 },
        { date: new Date(2016, 8, 28), open: 804.08, high: 810.25, low: 802.78, close: 810.06, vol: 1470280 },
        { date: new Date(2016, 8, 27), open: 801.83, high: 813.49, low: 801.83, close: 810.73, vol: 1367271 },
        { date: new Date(2016, 8, 26), open: 809.82, high: 810.08, low: 800.45, close: 802.65, vol: 1472732 },
        { date: new Date(2016, 8, 23), open: 815.14, high: 817, low: 812.73, close: 814.96, vol: 1411673 },
        { date: new Date(2016, 8, 22), open: 810, high: 819.06, low: 807.71, close: 815.95, vol: 1759290 },
        { date: new Date(2016, 8, 21), open: 801.26, high: 805.91, low: 796.03, close: 805.03, vol: 1348476 },
        { date: new Date(2016, 8, 20), open: 800, high: 802.75, low: 798.26, close: 799.78, vol: 1050041 },
        { date: new Date(2016, 8, 19), open: 801.11, high: 803.99, low: 793.56, close: 795.39, vol: 1149522 },
        { date: new Date(2016, 8, 16), open: 799.02, high: 799.02, low: 793.62, close: 797.97, vol: 2130571 },
        { date: new Date(2016, 8, 15), open: 790.01, high: 803.64, low: 788.66, close: 801.23, vol: 1566360 },
        { date: new Date(2016, 8, 14), open: 787.53, high: 796.33, low: 787.53, close: 790.46, vol: 1313912 },
        { date: new Date(2016, 8, 13), open: 794.01, high: 795.79, low: 784.33, close: 788.72, vol: 1809044 },
        { date: new Date(2016, 8, 12), open: 784.52, high: 800.17, low: 783.5, close: 798.82, vol: 1863737 },
        { date: new Date(2016, 8, 9), open: 798.77, high: 801.75, low: 788.05, close: 788.48, vol: 1887633 },
        { date: new Date(2016, 8, 8), open: 805.22, high: 808.42, low: 801.01, close: 802.84, vol: 1177660 },
        { date: new Date(2016, 8, 7), open: 807.93, high: 810.6, low: 803.72, close: 807.99, vol: 1145724 },
        { date: new Date(2016, 8, 6), open: 798.39, high: 810.89, low: 795.43, close: 808.02, vol: 1989537 },
        { date: new Date(2016, 8, 2), open: 795.27, high: 797.1, low: 793.26, close: 796.87, vol: 1347368 },
        { date: new Date(2016, 8, 1), open: 791.98, high: 792.89, low: 786.33, close: 791.4, vol: 1303460 },
        { date: new Date(2016, 7, 31), open: 789.6, high: 791.57, low: 787.2, close: 789.85, vol: 1071420 },
        { date: new Date(2016, 7, 30), open: 792.88, high: 798, low: 789.47, close: 791.92, vol: 1167413 },
        { date: new Date(2016, 7, 29), open: 793.05, high: 798.52, low: 790.32, close: 795.82, vol: 773698 },
        { date: new Date(2016, 7, 26), open: 792.49, high: 799.4, low: 789.41, close: 793.22, vol: 1248881 },
        { date: new Date(2016, 7, 25), open: 792, high: 794.72, low: 787.23, close: 791.3, vol: 1202680 },
        { date: new Date(2016, 7, 24), open: 796.86, high: 798.46, low: 790.76, close: 793.6, vol: 1284437 },
        { date: new Date(2016, 7, 23), open: 800.48, high: 801, low: 795.99, close: 796.59, vol: 917513 },
        { date: new Date(2016, 7, 22), open: 798.51, high: 799.3, low: 794.33, close: 796.95, vol: 853365 },
        { date: new Date(2016, 7, 19), open: 799.79, high: 801.23, low: 796.88, close: 799.65, vol: 1120763 },
        { date: new Date(2016, 7, 18), open: 805.36, high: 808, low: 801.63, close: 802.75, vol: 865160 },
        { date: new Date(2016, 7, 17), open: 800, high: 805.63, low: 796.3, close: 805.42, vol: 1066070 },
        { date: new Date(2016, 7, 16), open: 803.5, high: 804.26, low: 797, close: 801.19, vol: 1057897 },
        { date: new Date(2016, 7, 15), open: 807.21, high: 811.36, low: 804.03, close: 805.96, vol: 930074 },
        { date: new Date(2016, 7, 12), open: 805.09, high: 807.19, low: 803.64, close: 807.05, vol: 897283 },
        { date: new Date(2016, 7, 11), open: 810.47, high: 813.88, low: 806, close: 808.2, vol: 1282274 },
        { date: new Date(2016, 7, 10), open: 807.05, high: 810.88, low: 806.49, close: 808.49, vol: 918514 },
        { date: new Date(2016, 7, 9), open: 804.49, high: 813.33, low: 804.06, close: 807.48, vol: 1607685 },
        { date: new Date(2016, 7, 8), open: 806, high: 807.6, low: 801.69, close: 805.23, vol: 1221609 },
        { date: new Date(2016, 7, 5), open: 800.11, high: 807.22, low: 797.81, close: 806.93, vol: 1807271 },
        { date: new Date(2016, 7, 4), open: 798.24, high: 800.2, low: 793.92, close: 797.25, vol: 1076031 },
        { date: new Date(2016, 7, 3), open: 796.47, high: 799.54, low: 793.02, close: 798.92, vol: 1461025 },
        { date: new Date(2016, 7, 2), open: 797.33, high: 802.32, low: 794.53, close: 800.12, vol: 1996354 },
        { date: new Date(2016, 7, 1), open: 786.67, high: 807.49, low: 785.04, close: 800.94, vol: 3029658 },
        { date: new Date(2016, 6, 29), open: 797.71, high: 803.94, low: 790, close: 791.34, vol: 5090527 },
        { date: new Date(2016, 6, 28), open: 768.84, high: 768.97, low: 759.09, close: 765.84, vol: 3673221 },
        { date: new Date(2016, 6, 27), open: 758.97, high: 764.45, low: 755.93, close: 761.97, vol: 1608589 },
        { date: new Date(2016, 6, 26), open: 757.52, high: 759.26, low: 752.75, close: 757.65, vol: 1189573 },
        { date: new Date(2016, 6, 25), open: 757.68, high: 759.82, low: 754.07, close: 757.52, vol: 1073310 },
        { date: new Date(2016, 6, 22), open: 757.32, high: 759.45, low: 752.66, close: 759.28, vol: 1046024 },
        { date: new Date(2016, 6, 21), open: 757, high: 758.15, low: 751.52, close: 754.41, vol: 953053 },
        { date: new Date(2016, 6, 20), open: 754.05, high: 760.64, low: 754.05, close: 757.08, vol: 1125117 },
        { date: new Date(2016, 6, 19), open: 749.87, high: 756.59, low: 748.49, close: 753.41, vol: 1521795 },
        { date: new Date(2016, 6, 18), open: 737.91, high: 755.14, low: 736.51, close: 753.2, vol: 1934900 },
        { date: new Date(2016, 6, 15), open: 741, high: 741, low: 734.64, close: 735.63, vol: 1617087 },
        { date: new Date(2016, 6, 14), open: 733.94, high: 736.14, low: 730.59, close: 735.8, vol: 1070351 },
        { date: new Date(2016, 6, 13), open: 735.52, high: 735.52, low: 729.02, close: 729.48, vol: 1021827 },
        { date: new Date(2016, 6, 12), open: 731.92, high: 735.6, low: 727.5, close: 732.51, vol: 1328680 },
        { date: new Date(2016, 6, 11), open: 719.42, high: 728.93, low: 718.86, close: 727.2, vol: 1441113 },
        { date: new Date(2016, 6, 8), open: 710.56, high: 717.9, low: 708.11, close: 717.78, vol: 1497323 },
        { date: new Date(2016, 6, 7), open: 710.11, high: 710.17, low: 700.67, close: 707.26, vol: 1058698 },
        { date: new Date(2016, 6, 6), open: 699.84, high: 713, low: 699, close: 708.97, vol: 1445126 },
        { date: new Date(2016, 6, 5), open: 705.01, high: 708.12, low: 699.13, close: 704.89, vol: 1422028 },
        { date: new Date(2016, 6, 1), open: 705.1, high: 712.53, low: 703.73, close: 710.25, vol: 1549160 },
        { date: new Date(2016, 5, 30), open: 697.65, high: 703.77, low: 694.9, close: 703.53, vol: 2112513 },
        { date: new Date(2016, 5, 29), open: 694.26, high: 699.5, low: 692.68, close: 695.19, vol: 2156218 },
        { date: new Date(2016, 5, 28), open: 691.37, high: 692.74, low: 684.85, close: 691.26, vol: 1912280 },
        { date: new Date(2016, 5, 27), open: 682.49, high: 683.32, low: 672.66, close: 681.14, vol: 2919486 },
        { date: new Date(2016, 5, 24), open: 690.17, high: 705, low: 684.91, close: 685.2, vol: 4771780 },
        { date: new Date(2016, 5, 23), open: 710.55, high: 714.88, low: 700.25, close: 714.87, vol: 2125028 },
        { date: new Date(2016, 5, 22), open: 714.05, high: 714.21, low: 705.88, close: 710.47, vol: 1452884 },
        { date: new Date(2016, 5, 21), open: 710.05, high: 715.38, low: 704.66, close: 708.88, vol: 1515918 },
        { date: new Date(2016, 5, 20), open: 710.31, high: 715.87, low: 705.41, close: 706.13, vol: 2282725 },
        { date: new Date(2016, 5, 17), open: 721.39, high: 721.39, low: 701.12, close: 704.25, vol: 4113085 },
        { date: new Date(2016, 5, 16), open: 727.96, high: 730.39, low: 715.54, close: 724.25, vol: 2250083 },
        { date: new Date(2016, 5, 15), open: 734.92, high: 737.15, low: 731.31, close: 732.19, vol: 1161701 },
        { date: new Date(2016, 5, 14), open: 729.31, high: 736, low: 726.5, close: 733.25, vol: 1329176 },
        { date: new Date(2016, 5, 13), open: 729.82, high: 739, low: 729.82, close: 731.88, vol: 1167736 },
        { date: new Date(2016, 5, 10), open: 735.95, high: 739.64, low: 730.51, close: 733.19, vol: 1452456 },
        { date: new Date(2016, 5, 9), open: 737.07, high: 743.93, low: 736.5, close: 742.52, vol: 958963 },
        { date: new Date(2016, 5, 8), open: 739.5, high: 743.81, low: 735.76, close: 742.93, vol: 1615727 },
        { date: new Date(2016, 5, 7), open: 733.27, high: 736.71, low: 730.8, close: 731.09, vol: 1215741 },
        { date: new Date(2016, 5, 6), open: 738.5, high: 738.5, low: 728.29, close: 730.06, vol: 1499648 },
        { date: new Date(2016, 5, 3), open: 741.49, high: 741.49, low: 733.91, close: 735.86, vol: 1230376 },
        { date: new Date(2016, 5, 2), open: 746.1, high: 747.3, low: 737, close: 744.27, vol: 1695824 },
        { date: new Date(2016, 5, 1), open: 748.47, high: 751.37, low: 744.34, close: 748.46, vol: 1039847 },
        { date: new Date(2016, 4, 31), open: 748.76, high: 753.48, low: 745.57, close: 748.85, vol: 2124248 },
        { date: new Date(2016, 4, 27), open: 737.51, high: 747.91, low: 737.01, close: 747.6, vol: 1738913 },
        { date: new Date(2016, 4, 26), open: 736, high: 741.1, low: 733, close: 736.93, vol: 1298295 },
        { date: new Date(2016, 4, 25), open: 735, high: 739.89, low: 732.6, close: 738.1, vol: 1610773 },
        { date: new Date(2016, 4, 24), open: 719.85, high: 734.2, low: 719.64, close: 733.03, vol: 1890195 },
        { date: new Date(2016, 4, 23), open: 719.98, high: 723.5, low: 716.94, close: 717.25, vol: 1233407 },
        { date: new Date(2016, 4, 20), open: 716.46, high: 727.7, low: 715.01, close: 721.71, vol: 1722506 },
        { date: new Date(2016, 4, 19), open: 718.3, high: 720.5, low: 710.3, close: 715.31, vol: 1495741 },
        { date: new Date(2016, 4, 18), open: 718.5, high: 725.57, low: 715.02, close: 721.78, vol: 1620691 },
        { date: new Date(2016, 4, 17), open: 731.06, high: 735.85, low: 718, close: 720.19, vol: 1667998 },
        { date: new Date(2016, 4, 16), open: 724.32, high: 732.68, low: 720, close: 730.3, vol: 1124220 },
        { date: new Date(2016, 4, 13), open: 726.62, high: 731.29, low: 723.51, close: 724.83, vol: 1241301 },
        { date: new Date(2016, 4, 12), open: 732, high: 735.37, low: 724.27, close: 728.07, vol: 1352779 },
        { date: new Date(2016, 4, 11), open: 740.52, high: 740.8, low: 727.9, close: 730.55, vol: 1484998 },
        { date: new Date(2016, 4, 10), open: 734.96, high: 740, low: 731.61, close: 739.38, vol: 1627899 },
        { date: new Date(2016, 4, 9), open: 726.7, high: 734.29, low: 723.5, close: 729.13, vol: 1898866 },
        { date: new Date(2016, 4, 6), open: 712.2, high: 725.99, low: 711.95, close: 725.18, vol: 1982458 },
        { date: new Date(2016, 4, 5), open: 715, high: 717.55, low: 709.45, close: 714.71, vol: 1479828 },
        { date: new Date(2016, 4, 4), open: 706.77, high: 715.05, low: 704.05, close: 711.37, vol: 1610174 },
        { date: new Date(2016, 4, 3), open: 712.5, high: 713.37, low: 707.33, close: 708.44, vol: 1922797 },
        { date: new Date(2016, 4, 2), open: 711.92, high: 715.41, low: 706.36, close: 714.41, vol: 1672285 },
        { date: new Date(2016, 3, 29), open: 704.12, high: 712.11, low: 703.78, close: 707.88, vol: 2906358 },
        { date: new Date(2016, 3, 28), open: 723.29, high: 729.26, low: 703.2, close: 705.06, vol: 3114203 },
        { date: new Date(2016, 3, 27), open: 725.32, high: 727.15, low: 709.08, close: 721.46, vol: 3289534 },
        { date: new Date(2016, 3, 26), open: 744.42, high: 745.59, low: 720.32, close: 725.37, vol: 2754324 },
        { date: new Date(2016, 3, 25), open: 735.35, high: 744.88, low: 735.1, close: 742.21, vol: 2469163 },
        { date: new Date(2016, 3, 22), open: 743.91, high: 753.92, low: 730.37, close: 737.77, vol: 6978506 },
        { date: new Date(2016, 3, 21), open: 777.31, high: 781.68, low: 771.55, close: 780, vol: 3326803 },
        { date: new Date(2016, 3, 20), open: 779.16, high: 779.66, low: 771.27, close: 774.92, vol: 1706231 },
        { date: new Date(2016, 3, 19), open: 790.5, high: 790.95, low: 770.27, close: 776.25, vol: 2191366 },
        { date: new Date(2016, 3, 18), open: 780.19, high: 788.55, low: 777.61, close: 787.68, vol: 1669701 },
        { date: new Date(2016, 3, 15), open: 775.5, high: 780.93, low: 774.93, close: 780, vol: 1555865 },
        { date: new Date(2016, 3, 14), open: 775.36, high: 779.61, low: 773.22, close: 775.39, vol: 1348011 },
        { date: new Date(2016, 3, 13), open: 770.31, high: 775.75, low: 764.59, close: 771.91, vol: 1768980 },
        { date: new Date(2016, 3, 12), open: 758.43, high: 764.92, low: 751.56, close: 764.32, vol: 1366559 },
        { date: new Date(2016, 3, 11), open: 765.45, high: 767.22, low: 757.34, close: 757.54, vol: 1584036 },
        { date: new Date(2016, 3, 8), open: 765.87, high: 767.13, low: 755.77, close: 759.47, vol: 1171738 },
        { date: new Date(2016, 3, 7), open: 765.32, high: 769.36, low: 757.5, close: 760.12, vol: 1254028 },
        { date: new Date(2016, 3, 6), open: 757.84, high: 768.42, low: 756.3, close: 768.07, vol: 1257118 },
        { date: new Date(2016, 3, 5), open: 758.13, high: 762.87, low: 755.6, close: 758.57, vol: 1222147 },
        { date: new Date(2016, 3, 4), open: 769.51, high: 772.44, low: 761.78, close: 765.12, vol: 1343934 },
        { date: new Date(2016, 3, 1), open: 757.16, high: 770.04, low: 755.2, close: 769.67, vol: 1581222 },
        { date: new Date(2016, 2, 31), open: 768.34, high: 769.08, low: 758.25, close: 762.9, vol: 1623821 },
        { date: new Date(2016, 2, 30), open: 768.21, high: 777.31, low: 767.58, close: 768.34, vol: 2017229 },
        { date: new Date(2016, 2, 29), open: 753.68, high: 767.18, low: 748.29, close: 765.89, vol: 1987121 },
        { date: new Date(2016, 2, 28), open: 756.17, high: 758.3, low: 752.04, close: 753.28, vol: 1082515 }
    ];
}