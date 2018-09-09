<template>
  <div>
    <Row>
      <Col offset="12">
        <Card style="width:340px; left: -170px;">
          <div style="text-align:center">
            <Form ref="formLogin" :model="formLogin" :rules="ruleLogin" label-position="top-left"
                  v-show="!isShowRegister">
              <FormItem label="user name (Email/Phone)" prop="user">
                <Input type="text" v-model="formLogin.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem label="password" prop="password">
                <Input type="password" v-model="formLogin.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formLogin')">Sign In</Button>
                <Button type="default" @click="toggleRegister('formLogin')" style="margin-left: 24px">Sign Up</Button>
              </FormItem>
            </Form>
            <Form ref="formSignUp" :model="formSignUp" :rules="ruleSignUp" :label-width="80" v-show="isShowRegister">
              <FormItem label="Name" prop="name">
                <Input type="text" v-model="formSignUp.name"></Input>
              </FormItem>
              <FormItem label="Password" prop="passwd">
                <Input type="password" v-model="formSignUp.passwd"></Input>
              </FormItem>
              <FormItem label="Confirm" prop="passwdCheck">
                <Input type="password" v-model="formSignUp.passwdCheck"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formSignUp')">Submit</Button>
                <Button @click="toggleRegister('formSignUp')" style="margin-left: 8px">Reset</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        }
        else if (value.length < 6) {
          callback(new Error('Please enter at least 6 chars.'));
        }
        else {
          if (this.formSignUp.passwdCheck !== '') {
            this.$refs.formSignUp.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'));
        } else if (value !== this.formSignUp.passwd) {
          callback(new Error('The two input passwords do not match!'));
        } else {
          callback();
        }
      };

      return {
        isShowRegister: false,
        formLogin: {
          user: '',
          password: '',
        },
        ruleLogin: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'},
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'},
          ],
        },
        formSignUp: {
          name: '',
          passwd: '',
          passwdCheck: '',
        },
        ruleSignUp: {
          name: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'},
          ],
          passwd: [
            {required: true, validator: validatePass, trigger: 'blur'},
          ],
          passwdCheck: [
            {required: true, validator: validatePassCheck, trigger: 'blur'},
          ],
        },
      };
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.login();
          } else {
            this.$Message.error('Fail!');
          }
        });
      },
      toggleRegister (name) {
        this.handleReset(name);
        this.isShowRegister = !this.isShowRegister;
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      async login () {
        let formData = {
          name: formLogin.user,
          password: formLogin.password
        };
        let response = await this.$rest.login(formData);
        if(response.success) {

        }
      }
    },
  };
</script>

<style scoped>
</style>
