<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-4">
                <wj-radial-gauge :min=0 :max=100 :value=25 :isReadOnly=false>
                </wj-radial-gauge>
            </div>
            <div class="col-xs-4">
                <wj-radial-gauge :min=0 :max=100 :value=25 :startAngle=-45 :sweepAngle=270 :isReadOnly=false>
                </wj-radial-gauge>
            </div>
            <div class="col-xs-4">
                <wj-radial-gauge :min=0 :max=500 :value=100 :startAngle=-45 :sweepAngle=-270 :isReadOnly=false>
                </wj-radial-gauge>
            </div>
        </div>

        <p>
            If you prefer a more traditional needle-style pointer, you can add an extra SVG shape to the control and apply
            a transform to move the needle. Here is an example that adds a drop-shaped needle pointer:
        </p>

        <div class="row">
            <div class="col-xs-4">
                <wj-radial-gauge :min=0 :max=100 :value=25 :showTicks=true :tickSpacing=10
                    :thickness=0.1 showText="MinMax" :isReadOnly=false :initialized="initializeNeedleRounded"
                    :valueChanged="updateNeedleRounded">
                </wj-radial-gauge>
            </div>
            <div class="col-xs-4">
                <wj-radial-gauge :min=0 :max=100 :value=25 :startAngle=-45 :sweepAngle=270
                    :showTicks=true :tickSpacing=10 :thickness=0.1 showText="MinMax" :isReadOnly=false
                    :initialized="initializeNeedleRounded" :valueChanged="updateNeedleRounded">
                </wj-radial-gauge>
            </div>
            <div class="col-xs-4">
                <wj-radial-gauge :min=0 :max=500 :value=100 :startAngle=-45 :sweepAngle=-270
                    :showTicks=true :tickSpacing=25 :thickness=0.1 showText="MinMax" :isReadOnly=false
                    :initialized="initializeNeedleRounded" :valueChanged="updateNeedleRounded">
                </wj-radial-gauge>
            </div>
        </div>

        <p>
            Because the pointer is just an SVG path, you can customize it very easily by changing the path parameters
            and/or the CSS associated with the needle element:
        </p>

        <div class="row">
            <div class="col-xs-4">
                <wj-radial-gauge :min=0 :max=100 :value=25 :showTicks=true :tickSpacing=10
                    :thickness=0.1 showText="MinMax" :isReadOnly=false :initialized="initializeNeedlePointed"
                    :valueChanged="updateNeedlePointed">
                </wj-radial-gauge>
            </div>
            <div class="col-xs-4">
                <wj-radial-gauge :min=0 :max=100 :value=25 :startAngle=45 :sweepAngle=270
                    :showTicks=true :tickSpacing=10 :thickness=0.1 showText="MinMax" :isReadOnly=false
                    :initialized="initializeNeedlePointed" :valueChanged="updateNeedlePointed">
                </wj-radial-gauge>
            </div>
            <div class="col-xs-4">
                <wj-radial-gauge :min=0 :max=500 :value=100 :startAngle=-45 :sweepAngle=-270
                    :showTicks=true :tickSpacing=25 :thickness=0.1 showText="MinMax" :isReadOnly=false
                    :initialized="initializeNeedlePointed" :valueChanged="updateNeedlePointed">
                </wj-radial-gauge>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.gauge';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                theGauge: {
                    pointer: {
                        color: '#000000',
                        thickness: 1
                    }
                }
            }
        },
        methods: {
            onInputValueChanged: function(s,e) {
                this.theGauge.pointer[s.hostElement.id] = s.value;
            },
            initializeNeedleRounded: function(s,e){
                s.refreshed.addHandler((s) => {
                    this.updateNeedleRounded(s);
                });
            },
            updateNeedleRounded: function(s,e){
                if (!s.clientSize) {
                    return;
                }
                //
                // add needle element if necessary
                let needle = s.hostElement.querySelector('.needle');
                if (!needle) {
                    let svg = s.hostElement.querySelector('svg');
                    needle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    wijmo.addClass(needle, 'needle');
                    svg.appendChild(needle);
                }
                //
                // update needle parameters
                let args = this.getArgs(s);
                needle.setAttribute('d', wijmo.format('M {lft} {y} A {wid} {wid} 0 0 0 {rgt} {y} L {x} {top} Z', args));
                needle.setAttribute('transform', wijmo.format('rotate({angle} {x} {y})', args));
            },
            initializeNeedlePointed: function(s,e){
                s.refreshed.addHandler((s) => {
                    this.updateNeedlePointed(s);
                });
            },
            updateNeedlePointed: function(s,e){
                if (!s.clientSize) {
                    return;
                }
                //
                // add needle element if necessary
                let needle = s.hostElement.querySelector('.needle');
                if (!needle) {
                    let svg = s.hostElement.querySelector('svg');
                    needle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    wijmo.addClass(needle, 'needle');
                    svg.appendChild(needle);
                }
                //
                // update needle parameters
                let args = this.getArgs(s);
                needle.setAttribute('d', wijmo.format('M {lft} {y} L {x} {bot} L {rgt} {y} L {x} {top} Z', args));
                needle.setAttribute('transform', wijmo.format('rotate({angle} {x} {y})', args));
            },
            getArgs: function(g){
                let rc = g.clientSize,
                    cx = rc.width / 2,
                    cy = rc.height / 2,
                    r = Math.min(rc.width, rc.height) / 2,
                    wid = r / 10,
                    pct = (g.max > g.min) ? (g.value - g.min) / (g.max - g.min) : 0,
                    angle = g.startAngle + g.sweepAngle * wijmo.clamp(pct, 0, 1) - 90;
                //
                return {
                    angle: angle,
                    x: cx.toFixed(4),
                    y: cy.toFixed(4),
                    wid: wid.toFixed(4),
                    lft: (cx - wid).toFixed(4),
                    rgt: (cx + wid).toFixed(4),
                    top: (cy - r).toFixed(4),
                    bot: (cy + wid).toFixed(4)
                };
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-radialgauge {
        height: 250px;
        padding: 24pt;
        margin: auto auto;
    }

    .container-fluid .wj-radialgauge .needle {
        fill: orange;
        stroke: black;
        stroke-width: 1px;
        transition: transform 400ms;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
