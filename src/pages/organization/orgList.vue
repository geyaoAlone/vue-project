
<template>
  <div>
    <Table border :columns="columns" :data="data.rows"></Table>
    <Page :total="data.total" :current="data.pageNo" size="small" show-elevator show-sizer show-total @on-change = "queryListByPageNo"  @on-page-size-change =  "queryListByPageSize"  ></Page>
  </div>
</template>
<script>
    const merge = require('webpack-merge')
    import {orgData}  from './org-data';
    export default {
        data() {
            return {
                columns: [{
                    title: 'ID',
                    key: 'ID',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.ID)
                        ]);
                    }
                }, {
                    title: 'username',
                    key: 'USERNAME'
                }, {
                    title: 'ORG_NAME',
                    key: 'ORG_NAME'
                }, {
                    title: '操作',
                    key: 'none',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }],
                data: {
                    rows:[],
                    total:0,
                    pageNo:1,
                    pageSize:10
                }
            }
        },
        methods: {
            show(index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data.rows[index].USERNAME}<br>Age：${this.data.rows[index].USERNAME}<br>Address：${this.data.rows[index].ID}`
                })
            },
            remove(index) {
                this.data.rows.splice(index, 1);

            },
            queryList (pageNo, pageSize, param) {
                this.$http.post('test/orgPageList.action', merge(param, { pageSize, pageNo})
                ).then(result => {
                    this.data = result;
                });
            },
            queryListByPageNo (pageNo) {
                this.queryList(this.data.pageNo = pageNo,this.data.pageSize);
            },
            queryListByPageSize (pageSize) {
                this.queryList(this.data.pageNo =1,this.data.pageSize = pageSize);
            }

        },
        created() {
            this.data = orgData;
//            this.queryList(1);

        }

    }
</script>

