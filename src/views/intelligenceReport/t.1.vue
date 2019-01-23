<template>
  <div>
    <input type="file" @change="importExcel($event.target)" />
        <div  style="overflow: auto;" v-if="tableTbody&&tableTbody.length>0">
            <table class="table table-bordered" style="min-width: 100%;">
                <thead>
                    <tr>
                        <th>行次</th>
                        <th v-for="(item,index) in tableHeader" :key="index">
                            {{item}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row,index) in tableTbody" :key="index">
                        <th scope="row">{{index}}</th>
                        <td v-for="col in tableHeader" :key="col.index">{{row[col]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">导入</el-button>
            <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
    </div>
</template>
<script>
import {ImportExcel} from "@/api/fill.js"
import XLSX from 'xlsx'
import "@/excel/xlsx.full.min.js"
export default {
    data() {
            return {
                // heights:document.body.offsetHeight,
                // wb: '',
                // tableHeader: [],
                // tableTbody: []
                 fileList: []
            }
        },
        created(){
            // ImportExcel.then(res=>{
            //     console.log(res)
            // })
        },
        methods: {
             handleRemove(file, fileList) {
                    console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
            // importExcel(obj) {
            //     debugger
            //     if (!obj.files) {
            //         return;
            //     }
            //     let file = obj.files[0],
            //         types = file.name.split('.')[1],
            //         fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(item => item === types);
            //     if (!fileType) {
            //         alert("格式错误！请重新选择");
            //         return;
            //     }
                // this.file2Xce(file).then(tabJson => {
                //     if (tabJson && tabJson.length > 0) {
                //         this.tableHeader = Object.keys(tabJson[0]);
                //         this.tableTbody = tabJson;
                //         alert("成功")
                //     }
                // });
            // },
            // file2Xce(file) {
            //     debugger
            //     return new Promise(function (resolve, reject) {
            //         let reader = new FileReader();
            //         reader.onload = function (e) {
            //             let data = e.target.result;
            //             this.wb = XLSX.read(data, {
            //                 type: 'binary'
            //             });
            //             resolve(XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]));
            //         };
            //         reader.readAsBinaryString(file);
            //     });
            // },
        }
}

</script>
<style scoped >
    /* .table-bordered{
        border:1px solid #ccc;
    } */
    table, th, td
  {
  border: 1px solid #ccc;
  }
  table
  {
  border-collapse:collapse;
  }

table,th, td
  {
  border: 1px solid black;
  }
</style>


