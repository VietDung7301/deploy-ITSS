const { send_request } = require('./request_helper');
const fs = require('fs');

/**
 * Tạo 1 folder mới trên drop box có dạng: '/user/:user_id
 * @param {int} user_id 
 */
exports.create_folder = async (user_id) => {
    const API = 'https://api.dropboxapi.com/2/files/create_folder_v2';
    let result = await send_request(
        API, 'POST',
        {autorename: false, path: `/user_profile/${user_id}`},
        null, 
        {
            'Authorization': `Bearer ${DROPBOX_TOKEN}`,
            'Content-Type': 'application/json'
        }
    )
}

/**
 * Upload 1 file lên dropbox
 * @param {*} path Đường dẫn tới file muốn upload
 * @param {*} file_name Tên file sau khi upload
 * @param {*} user_id ID của user
 */
exports.upload_file = async (path, file_name, user_id) => {
    const API = 'https://content.dropboxapi.com/2/files/upload';
    let form = fs.createReadStream(path);
    let result = await send_request(
        API, 'POST', form, null,
        {
            'Authorization': `Bearer ${DROPBOX_TOKEN}`,
            'Dropbox-API-Arg': `{"path": "/user/${user_id}/${file_name}","autorename":false}`,
            'Content-Type': 'application/octet-stream'
        }
    );
    let shared_link = await this.share_file(result.data.path_display);
    return {
        name: result.data.name,
        path: shared_link.data.url
    }
}

exports.share_file = async (file_path) => {
    const API = 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';
    let result = await send_request(
        API, 'POST',
        {
            "path": file_path,
            "settings": {
                "access": "viewer",
                "allow_download": true,
                "audience": "public",
                "requested_visibility": "public"
            }
        },
        null,
        {
            'Authorization': `Bearer ${DROPBOX_TOKEN}`,
            'Content-Type': 'application/json'
        }
    )
    return result;
}
