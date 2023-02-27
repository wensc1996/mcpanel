interface Route {
    path: string;
    parent: null | string;
    icon: string;
    name: string;
}
const routes: Route[] = [ {
    path: 'userManage',
    parent: '/',
    icon: '',
    name: '用户管理'
}, {
    path: 'userRegister',
    parent: 'userManage',
    icon: '',
    name: '用户注册'
}]
const treeRoute = [{
    path: '/',
    parent: null,
    icon: '',
    name: '首页',
    children: []
}]
function recurrence (root: any[], current: Route) {
    let targetIndex = root.findIndex(saved => saved.parent == current.parent)
    if(targetIndex > -1) {
        root[targetIndex].children.push(current)
    } else {
        root.forEach(origin => {
            recurrence(origin.children, current)
        })
    }
}
routes.forEach(ele => {
    recurrence(treeRoute, ele)
})
console.log(treeRoute)
export default routes