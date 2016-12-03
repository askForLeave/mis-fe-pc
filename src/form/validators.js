/**
 * 表单校验
 */

const validators = {
    'age': {
        rules: [
            {
                type: 'number',
                required: true,
                message: '必填项目'
            },
            {
                validator: (rule, value, callback) => {
                    var reg = /^\d+$/g;
                    if (!reg.test(value)) {
                        callback('请输入正确的数字');
                    } else {
                        callback();
                    }
                }
            }
        ]
    },
    'email': {
        rules: [
            {
                type: 'email',
                message: '请输入正确的邮箱'
            }
        ]
    }
}
export default validators;
