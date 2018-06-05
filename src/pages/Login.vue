<style >
    .login {
        width: 100%;
        height: 100%;
        background-image: url('../img/loginBg.jpeg');
        background-size: cover;
        background-position: center;
        position: relative;
    }
    .login-con{
            position: absolute;
            right: 160px;
            top: 50%;
            transform: translateY(-60%);
            width: 300px;
    }
    .login-header{
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
    }

    .form-con{
        padding: 10px 0 0;
    }
    .login-tip{
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
    }

</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
//    import Cookies from 'js-cookie';
    export default {
        data () {
            return {
                form: {
                    userName: 'admin',
                    password: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
//                        Cookies.set('user', this.form.userName);
//                        Cookies.set('password', this.form.password);
                         //this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                        if (this.form.userName === 'admin') {
//                            Cookies.set('access', 0);
                        } else {
//                            Cookies.set('access', 1);
                        }

                        this.$router.push({path: 'main'});
                    }
                });
            }
        }
    };
</script>

<style>

</style>
