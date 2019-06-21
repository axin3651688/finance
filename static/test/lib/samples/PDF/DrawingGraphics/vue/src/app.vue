<template>
    <div class="container-fluid">
        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import * as pdf from '@grapecity/wijmo.pdf';
    //
    let App = Vue.extend({
        name: 'app',
        a: 100, // sample area's size.
        c1: new wijmo.Color('#3173c0'),
        c2: new wijmo.Color('#e69500'),
        methods: {
            exportPDF() {
                let doc = new pdf.PdfDocument({
                    header: {
                        height: 0
                    },
                    footer: {
                        height: 0
                    },
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
                });
                //
                this.$_sample1(doc);
                this.$_sample2(doc);
                this.$_sample3(doc);
                this.$_sample4(doc);
                this.$_sample5(doc);
                //
                doc.end();
            },
            $_sample1(doc) {
                doc.drawText('Draw a series of lines with different styles: ');
                //
                let y = doc.y + doc.lineHeight(),
                    a = this.$options.a,
                    c1 =this.$options.c1;
                //
                // default document's pen (black color)
                doc.paths
                    .moveTo(0, y)
                    .lineTo(a, y)
                    .stroke();
                //
                // color
                doc.paths
                    .moveTo(0, y + 20)
                    .lineTo(a, y + 20)
                    .stroke(c1);
                //
                // color, line width = 3
                doc.paths
                    .moveTo(0, y + 40)
                    .lineTo(a, y + 40)
                    .stroke(new pdf.PdfPen(c1, 3));
                //
                // opacity color, line width = 3
                doc.paths
                    .moveTo(0, y + 60)
                    .lineTo(a, y + 60)
                    .stroke(new pdf.PdfPen(wijmo.Color.fromRgba(c1.r, c1.g, c1.b, 0.2), 3));
                //
                // color, dash pattern, line width = 3
                doc.paths
                    .moveTo(0, y + 80)
                    .lineTo(a, y + 80)
                    .stroke(new pdf.PdfPen(c1, 3, new pdf.PdfDashPattern(5)));
                //
                doc.y = y + a + doc.lineHeight();
            },
            $_sample2(doc) {
                doc.drawText('Draw a rectangle covered with a filled curved path:');
                //
                let y = doc.y + doc.lineHeight(),
                    a = this.$options.a,
                    c1 =this.$options.c1,
                    c2 =this.$options.c2;
                //
                doc.paths
                    .rect(0, y, a, a)
                    .stroke(c1);
                //
                doc.paths
                    .moveTo(0, y)
                    .bezierCurveTo(a / 2, y, a / 2, a + y, a, a + y)
                    .lineTo(0, a + y)
                    .lineTo(0, y)
                    .fill(c2);
                //
                doc.y = y + a + doc.lineHeight();
            },
            $_sample3(doc) {
                doc.drawText('Draw a rectangle, inscribe a circle into it, fill the circle with an opaque color and stroke it using a dashed line:');
                //
                let y = doc.y + doc.lineHeight(),
                    a = this.$options.a,
                    c1 =this.$options.c1,
                    c2 =this.$options.c2;
                //
                doc.paths
                    .rect(0, y, a, a)
                    .fill(c1);
                //
                doc.paths
                    .circle(a / 2, y + a / 2, a / 2)
                    .fillAndStroke(wijmo.Color.fromRgba(c2.r, c2.g, c2.b, 0.3), new pdf.PdfPen(c2, 2, new pdf.PdfDashPattern(5)));
                //
                doc.y = y + a + doc.lineHeight();
            },
            $_sample4(doc) {
                doc.drawText('Draw a simple pattern clipped by a circular clipping path:');
                //
                let y = doc.y + doc.lineHeight(),
                    a = this.$options.a,
                    c1 =this.$options.c1,
                    c2 =this.$options.c2,
                    a0 = 10;
                //
                doc.saveState();
                //
                // clipping path
                doc.paths
                    .circle(a / 2, y + a / 2, a / 2)
                    .clip();
                //
                // draw pattern
                for (let i = 0; i < 10; i++) {
                    doc.paths
                        .rect(0, y + i * a0, a, a0)
                        .fill(i % 2 ? c1 : c2);
                }
                //
                doc.restoreState();
                //
                doc.y = y + a + doc.lineHeight();
            },
            $_sample5(doc) {
                doc.drawText('Draw a series of rectangles and rotate every rectangle by 15 degrees to the previous:');
                //
                let y = doc.y + doc.lineHeight(),
                    sqrt2 = Math.sqrt(2),
                    degrees = 15,
                    samples = 90 / degrees,
                    a = this.$options.a,
                    c1 =this.$options.c1,
                    c2 =this.$options.c2;
                //
                doc.saveState();
                //
                for (let i = 0; i < samples; i++) {
                    doc
                        .rotate(degrees, new wijmo.Point(a / 2, y + a / 2))
                        .paths
                        // draw rectangle as if it is inscribed into a circle with the radius of a/ 2
                        .rect((a - a / sqrt2) / 2, y + ((a - a / sqrt2) / 2), a / sqrt2, a / sqrt2)
                        .fill(wijmo.Color.interpolate(c1, c2, i * (1 / (samples - 1))));
                }
                //
                doc.restoreState();
                //
                doc.y = y + a + doc.lineHeight();
            }
        }
    })
    //
    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }
</style>
