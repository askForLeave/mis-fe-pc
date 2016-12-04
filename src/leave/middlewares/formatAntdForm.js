/**
 * @file 把form获取表单数据转换成，antd表单初始值格式
 * @author chenxingdi
 * action:
 *     {
 *         antdForm: true,
 *         payload: {
 *             字段: XXX
 *         }
 *     }
 *转换为
 *     {
 *         antdForm: true,
 *         payload: {
 *             字段: {
 *                 value: XXX
 *             }
 *         }
 *     }
 * 
 */
export default ({dispatch, getState}) => next => action => {
    if (typeof action === 'object' && action.antdForm && action.payload) {
        let form = {};
        for (var key in action.payload) {
            form[key] = {
                value: action.payload[key]
            };
        }
        action.payload = form;
    }

    return next(action);
};
