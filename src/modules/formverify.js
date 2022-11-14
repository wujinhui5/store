export function verify(str, reg, mess, expression = false) {
    // reg：正则表达式； expression：表达式；mess：数组，验证结果
    // 作用：验证表单输入str（字符串）是否正确，返回对应结果
    // 正则表达式验证时，输入前三个参数
    // expression验证时，reg输入0
    if ((reg && reg.test(str)) || expression) {
        return mess[1];
    }
    return mess[0];
}