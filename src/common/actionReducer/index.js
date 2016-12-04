/**
 * Created by yangmutong on 2016/12/4.
 */

/**
 * 将action和reducer打包，只需一处编写，可以只写action，也可分开写，有助于中间件处理
 * @param  {object} state   初始化state
 * @param  {object} actionAndReducer 一个对象包含着action和reducer
 * @return {object}       {reducer,creator}
 * @example
 * creator返回action,updater是接收处理者
 * actionReducer({data:123}, {
 *     actionName: {
 *         creator (data){
 *             //this就是返回的creators
 *             return {
 *                 payload:data
 *             }
 *         },
 *         updater (state, action){
 *             return Object.assign({},state,{data:action.payload.data});
 *         }
 *     }
 *     ...
 * });
 * actionName相当于action的type，注意不要冲突
 */
export default function actionReducer(initialState, actionAndReducer) {
    let standard = {};
    let creators = {};
    let reducer;
    if (Object.prototype.toString.call(actionAndReducer) === '[object Object]') {
        for (let key in actionAndReducer) {
            if (typeof actionAndReducer[key].creator === 'function') {
                standard[key] = {
                    creator: function () {
                        let action = actionAndReducer[key].creator.apply(creators, arguments) || {};
                        action.type = key;
                        return action;
                    },
                    updater: actionAndReducer[key].updater || function (state, action) {
                        return state;
                    }
                };
            }

        }
    }

    // 转换为redux中的action和reducer
    reducer = function (state = initialState, action) {
        for (let key in standard) {
            if (action.type === key) {
                return standard[key].updater(state, action) || state;
            }

        }
        return state;
    };

    // 将actions挂载返回函数属性上
    for (let key in standard) {
        creators[key] = standard[key].creator;
    }
    return {
        reducer,
        creators
    };
}
