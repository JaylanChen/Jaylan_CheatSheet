## 水平居中

## 垂直居中

### 1.绝对定位垂直居中

HTML

    <div class="container">
        <div class="absolute_center">
         </div>
    </div>

CSS

    .container {
        width: 500px;
        height: 500px;
        position: relative;

        background-color: brown;
    }
    .absolute_center {
        position:absolute;
        width:200px;
        height:200px;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin:auto;
        resize:both;/*用于设置了所有除overflow为visible的元素*/
        overflow:auto;

        background:#518fca;
    }
    原理：元素在过度受限情况下，将margin设置为auto，浏览器会重算margin的值，过度受限指的是同时设置top/bottom与height或者left/right与width。
    注意：使用绝对定位要求元素必须设置明确高度。内容超过元素高度时需要设置overflow决定滚动条的出现
    优点：支持响应式，只有这种方法在resize之后仍然垂直居中
    缺点：没有显式设置overflow时，内容超过元素高度时会溢出，没有滚动条

### 2.负marginTop方式

HTML

    <div class="container">
        <div class="negative_margin_top">
         </div>
    </div>

CSS

    .container {
        width: 500px;
        height: 500px;
        position: relative;

        background-color: brown;
    }
    .negative_margin_top {
        position:absolute;
        top:50%;
        left:0;
        right:0;
        margin:auto;
        margin-top:-100px; /*-(height+padding)/2*/
        width:200px;
        height:200px;

        background:#518fca;
    }
    原理：top：50%元素上边界位于包含框中点，设置负外边界使得元素垂直中心与包含框中心重合；已知元素高度后，使用绝对定位将top设置为50%，mergin-top设置为内容高度的一半(height + padding) / 2；内容超过元素高度时需要设置overflow决定滚动条的出现。
    优点：代码量少、浏览器兼容性高支持ie6 ie7
　  缺点：不支持响应式(不能使用百分比、min/max-width)

### 3.借助额外元素floater

HTML

    <div class="container">
        <div class="floater"></div>
        <div class="floater_center">
         </div>
    </div>

CSS

    .container {
        width: 500px;
        height: 500px;
        position: relative;

        background-color: brown;
    }
    .floater{
        height:50%;
        margin-bottom:-100px;
    }
    .floater_center {
        height:200px;
        width:200px;
        margin:auto;

        background:#518fca;
    }
    原理：原理与2方法类似，floater的下边界是包含框的中心线，负下外边界保证center的中心线与包含框中心线重合。元素高度已知，在center元素外插入一个额外元素floater，设置floater的height为50%；margin-bottom为center元素高度的一半(height + padding) / 2。内容超过元素高度时需要设置overflow决定滚动条的出现。
    优点：浏览器兼容性好，支持旧版本ie
    缺点：需要额外元素，不支持响应式

### 4.table-cell方式

HTML

    <div class="container">
        <div class="table_cell_center">
         </div>
    </div>

CSS

    .container {
        display:table;
        height:500px;

        background-color: brown;
    }
    .table_cell_center {
        /*将cell垂直居中，如果外层div不为table则tablecell必须有高度*/
        display:table-cell;
        vertical-align:middle;

        background:#518fca;
    }
    原理：将center元素的包含框display设置为table，center元素的display设置为table-cell，vertical-align设置为middle。利用表布局特点，vertical-align设置为middle后，单元格中内容中间与所在行中间对齐
    优点：支持任意内容的可变高度、支持响应式
    缺点：每一个需要垂直居中的元素都会需要加上额外标签（需要table、table-cell两个额外元素）

### 5.inline-block方式

HTML

    <div class="container">
        <div class="inline_block_center">
         </div>
    </div>

CSS

    .container {
        display:block;

        background-color: brown;
    }
    /*inline-block的前世今生*/
    .container:after{
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 100%;
    }
    .inline_block_center {
        display:inline-block;
        vertical-align:middle;

        background:#518fca;
    }
    原理：将center元素display设置为inline-block，vertical-align设置为middle，为包含框设置after伪元素，将伪元素display设置为inline-block,vercial-align设置为middle，同时设置height为100%，撑开容器。为同一行的inline-block元素设置vertical-align：middle，该行内的inline-block元素会按照元素的垂直中心线对齐。
    优点：支持响应式、支持可变高度
    缺点：会加上额外标记

### 6.line-height方式

HTML

    <div class="container">
        <div class="inline_block_center">
         </div>
    </div>

CSS

    .line-height {
        height: 30px;
        font-size: 14px;
        line-height: 30px;

        border: 1px solid #518dca;
    }
    原理：如果line-height高度大于font-size，生于高度浏览器会平分到文字上下两端。该方式只适用于情况比较简单的单行文本，将line-height设置与元素高度同高。
    优点：简单明了
    缺点：只适用于单行文本，局限性大

### 7.弹性盒式布局

HTML

    <div class="container">
        <div class="center">
         </div>
    </div>

CSS

    .container {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;

        background-color: brown;
    }
    .center {
        height:200px;
        width:200px;

        background:#518fca;
    }
    原理：利用弹性盒式布局，将字元素的主轴、侧轴的排列方式都设置为居中对齐
    优点：真正的垂直居中布局
    缺点：ie11才开始支持弹性布局