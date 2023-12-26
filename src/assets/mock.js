export const mock_router = [{
    "name": "System",
    "path": "/system",
    "hidden": false,
    "redirect": "noRedirect",
    "component": "Layout",
    "alwaysShow": true,
    "meta": {
        "title": "系统管理",
        "icon": "system",
        "noCache": false,
        "link": null
    },
    "children": [
        {
            "name": "User",
            "path": "user",
            "hidden": false,
            "component": "system/user/index",
            "meta": {
                "title": "用户管理",
                "icon": "user",
                "noCache": false,
                "link": null
            }
        },
        {
            "name": "Records",
            "path": "records",
            "hidden": false,
            "component": "system/records/index",
            "meta": {
                "title": "到访记录",
                "icon": "user",
                "noCache": false,
                "link": null
            }
        },
        {
            "name": "Fingerprint",
            "path": "fingerprint",
            "hidden": false,
            "component": "system/fingerprint/index",
            "meta": {
                "title": "指纹列表",
                "icon": "user",
                "noCache": false,
                "link": null
            }
        },
        {
            "name": "FingerprintTypeList",
            "path": "fingerprintTypeList",
            "hidden": false,
            "component": "system/fingerprint/typeList",
            "meta": {
                "title": "指纹类型",
                "icon": "user",
                "noCache": false,
                "link": null
            }
        },
        // {
        //     "name": "Fingerprint",
        //     "path": "fingerprint",
        //     "hidden": false,
        //     "component": "system/fingerprint/index",
        //     "meta": {
        //         "title": "指纹列表",
        //         "icon": "user",
        //         "noCache": false,
        //         "link": null
        //     }
        // },
    ]
}]
export const user = {
    "createBy": "admin",
    "createTime": "2023-04-23 16:11:38",
    "updateBy": null,
    "updateTime": null,
    "remark": "管理员",
    "userId": 1,
    "deptId": 103,
    "userName": "admin",
    "nickName": "若依",
    "email": "ry@163.com",
    "phonenumber": "15888888888",
    "sex": "1",
    "avatar": "",
    "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
    "status": "0",
    "delFlag": "0",
    "loginIp": "113.92.95.140",
    "loginDate": "2023-11-22T11:29:53.000+08:00",
    "dept": {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "deptId": 103,
        "parentId": 101,
        "ancestors": "0,100,101",
        "deptName": "研发部门",
        "orderNum": 1,
        "leader": "若依",
        "phone": null,
        "email": null,
        "status": "0",
        "delFlag": null,
        "parentName": null,
        "children": []
    },
    "roles": [
        {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "roleId": 1,
            "roleName": "超级管理员",
            "roleKey": "admin",
            "roleSort": 1,
            "dataScope": "1",
            "menuCheckStrictly": false,
            "deptCheckStrictly": false,
            "status": "0",
            "delFlag": null,
            "flag": false,
            "menuIds": null,
            "deptIds": null,
            "permissions": null,
            "admin": true
        }
    ],
    "roleIds": null,
    "postIds": null,
    "roleId": null,
    "admin": true
}

export const tableData = [
    {
        id:1,
        time: '2016-05-03',
        name: '张三',
        phone: '123123',
    },
    {
        id:2,
        time: '2016-05-02',
        name: '李四',
        phone: '123123',
    },
    {
        time: '2016-05-04',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-01',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-08',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-06',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
    {
        time: '2016-05-07',
        name: 'Tom',
        phone: '123123',
    },
]