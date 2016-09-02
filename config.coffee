module.exports = {
    WILDDOG:{
        KEY : "spN1uMmRq7Z2LWuUqoldcL31Vk2MRDLNuLIiN0k9"
        SITE : "test123"
    },
    rules: {
        ".read": true,
        ".write": true,
        group:
            admin: {
                ".read": true
                ".write": true
                ".validate" : "newData.isNumber() && newData.val().isBoolean()"
            }
        admin_log:{
            ".read": true
            ".write": true
        }
    }
}

